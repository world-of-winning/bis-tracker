/**
 * Generate scripts/priority-stats.json from observed gear.
 *
 * Stat priority used to come from Maxroll's stat-priority widget, with this
 * file as a hand-maintained override. A published order cannot say that two
 * stats are worth the same, and on twenty-six of the forty specs it had
 * drifted from what high-performing players equip. So the file is generated:
 * murlok.io publishes the roster — characters with full equipment and
 * per-item stat ratings — and the ranking and the grouping are ours.
 *
 * See docs/adr/0001-observed-stat-priority.md. The derivation itself lives in
 * priority-groups.mjs, which has no network and no disk.
 *
 * The upstream rate-limits hard enough that a forty-spec pass cannot be paced
 * around it — the limit is roughly three requests a minute and it escalates
 * once tripped. So the cache is not an optimisation here, it is how a run
 * completes at all. Requests are still paced and backed off, but on the
 * understanding that a cold pass will take 401s and lean on what it has.
 *
 * Usage:
 *   node scripts/generate-priority-stats.mjs                # print only
 *   node scripts/generate-priority-stats.mjs --write        # commit the results
 *   node scripts/generate-priority-stats.mjs --refresh      # treat every cache entry as stale
 *   node scripts/generate-priority-stats.mjs --max-age 30   # days before an entry goes stale
 *   node scripts/generate-priority-stats.mjs --spec prot-paladin
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {
    SECONDARY_STATS,
    deriveGroups,
    flattenGroups,
    priorityGroups,
    priorityList,
    renderPriorityFile,
    trimRoster,
} from "./priority-groups.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRIORITY_STATS_FILE = resolve(__dirname, "priority-stats.json");
const CACHE_DIR = resolve(__dirname, ".murlok-cache");
const DATA_DIR = resolve(__dirname, "../src/data");

const API = (classSlug, specSlug) =>
    `https://murlok.io/api/guides/${classSlug}/${specSlug}/m+`;

/**
 * Spec key → upstream slugs, checked against murlok.io's sitemap. Devourer
 * Demon Hunter is the one spec the sitemap omits, but the endpoint answers for
 * it — the sitemap is stale, not the API.
 */
const SPEC_SLUGS = {
    "blood-dk": ["death-knight", "blood"],
    "frost-dk": ["death-knight", "frost"],
    "unholy-dk": ["death-knight", "unholy"],
    "havoc-dh": ["demon-hunter", "havoc"],
    "veng-dh": ["demon-hunter", "vengeance"],
    "devourer-dh": ["demon-hunter", "devourer"],
    "balance-druid": ["druid", "balance"],
    "feral-druid": ["druid", "feral"],
    "guardian-druid": ["druid", "guardian"],
    "resto-druid": ["druid", "restoration"],
    "dev-evoker": ["evoker", "devastation"],
    "pres-evoker": ["evoker", "preservation"],
    "aug-evoker": ["evoker", "augmentation"],
    "bm-hunter": ["hunter", "beast-mastery"],
    "mm-hunter": ["hunter", "marksmanship"],
    "surv-hunter": ["hunter", "survival"],
    "arcane-mage": ["mage", "arcane"],
    "fire-mage": ["mage", "fire"],
    "frost-mage": ["mage", "frost"],
    "brew-monk": ["monk", "brewmaster"],
    "ww-monk": ["monk", "windwalker"],
    "mw-monk": ["monk", "mistweaver"],
    "holy-paladin": ["paladin", "holy"],
    "prot-paladin": ["paladin", "protection"],
    "ret-paladin": ["paladin", "retribution"],
    "disc-priest": ["priest", "discipline"],
    "holy-priest": ["priest", "holy"],
    "shadow-priest": ["priest", "shadow"],
    "assa-rogue": ["rogue", "assassination"],
    "outlaw-rogue": ["rogue", "outlaw"],
    "sub-rogue": ["rogue", "subtlety"],
    "ele-shaman": ["shaman", "elemental"],
    "enh-shaman": ["shaman", "enhancement"],
    "resto-shaman": ["shaman", "restoration"],
    "aff-lock": ["warlock", "affliction"],
    "demo-lock": ["warlock", "demonology"],
    "destro-lock": ["warlock", "destruction"],
    "arms-warrior": ["warrior", "arms"],
    "fury-warrior": ["warrior", "fury"],
    "prot-warrior": ["warrior", "protection"],
};

// The endpoint rate-limits on a sliding window rather than a fixed burst: a
// sustained sequential pass answers 401 at scattered positions. Measured, it
// allows roughly three requests a minute, 4s spacing trips it immediately, and
// a window that has been hammered stays shut for several minutes rather than
// the ~90s a politely-closed one takes.
//
// Pacing does not solve this and is not claimed to. It starts at 40s, widens
// by half again on every 401 for the rest of the run, and the retry ladder is
// patient — but a cold forty-spec pass will still be interrupted. What carries
// a run through is the cache below and the rule that a spec which cannot be
// reached keeps the roster, and failing that the priority, it already had.
const PACE_MS = 40000;
const MAX_PACE_MS = 300000;
const RETRY_BACKOFF_MS = [60000, 180000, 300000, 600000];

// How old a cached roster may be before a run tries to replace it. Rosters
// move slowly — the upstream restamps a spec every day or so and the gear
// behind a group boundary shifts over weeks — so a fortnight is short enough
// to catch a tuning change and long enough that ordinary runs stay offline.
const MAX_AGE_DAYS = 14;
const DAY_MS = 86400000;

const argv = process.argv.slice(2);
const doWrite = argv.includes("--write");
const doRefresh = argv.includes("--refresh");
const specArg = argv.indexOf("--spec");
const onlySpec = specArg >= 0 ? argv[specArg + 1] : null;
const maxAgeArg = argv.indexOf("--max-age");
const maxAgeDays = doRefresh
    ? 0
    : maxAgeArg >= 0
      ? Number(argv[maxAgeArg + 1])
      : MAX_AGE_DAYS;
if (!Number.isFinite(maxAgeDays) || maxAgeDays < 0) {
    console.error(`--max-age wants a number of days, got ${argv[maxAgeArg + 1]}`);
    process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pace = PACE_MS;
function widenPace() {
    pace = Math.min(Math.round(pace * 1.5), MAX_PACE_MS);
}

function loadStored() {
    try {
        return JSON.parse(readFileSync(PRIORITY_STATS_FILE, "utf8"));
    } catch {
        return {};
    }
}

// ─── Roster cache ─────────────────────────────────────────────
// One file per spec holding the response, plus an index carrying the fetch
// times. The index is what makes an entry expire: mtime would be rewritten by
// anything that touched the file, and the upstream's own UpdatedAt says when
// murlok last rebuilt the roster, not when we last read it. Both are recorded
// — the first decides staleness, the second tells a maintainer whether a
// refetch actually brought anything new.

const INDEX_FILE = resolve(CACHE_DIR, "index.json");

function loadIndex() {
    try {
        const raw = JSON.parse(readFileSync(INDEX_FILE, "utf8"));
        return raw && raw.entries ? raw.entries : {};
    } catch {
        return {};
    }
}

function saveIndex(entries) {
    mkdirSync(CACHE_DIR, { recursive: true });
    const ordered = Object.fromEntries(
        Object.keys(entries)
            .sort()
            .map((k) => [k, entries[k]]),
    );
    writeFileSync(
        INDEX_FILE,
        JSON.stringify({ version: 1, entries: ordered }, null, 2) + "\n",
        "utf8",
    );
}

const cacheIndex = loadIndex();

function cacheFile(specKey) {
    return resolve(CACHE_DIR, `${specKey}.json`);
}

/** Days since this spec was last fetched, or Infinity if it never was. */
function cacheAge(specKey) {
    const entry = cacheIndex[specKey];
    if (!entry || !entry.fetchedAt) return Infinity;
    const at = Date.parse(entry.fetchedAt);
    if (Number.isNaN(at)) return Infinity;
    return (Date.now() - at) / DAY_MS;
}

function readCache(specKey) {
    const path = cacheFile(specKey);
    if (!existsSync(path)) return null;
    try {
        return JSON.parse(readFileSync(path, "utf8"));
    } catch {
        // A truncated write from an interrupted run. Treat it as absent.
        return null;
    }
}

function writeCache(specKey, payload) {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cacheFile(specKey), JSON.stringify(payload), "utf8");
    cacheIndex[specKey] = {
        fetchedAt: new Date().toISOString(),
        upstreamUpdatedAt: payload.UpdatedAt || null,
        characters: (payload.Characters || []).length,
    };
    saveIndex(cacheIndex);
}

async function fetchPayload(specKey) {
    const [classSlug, specSlug] = SPEC_SLUGS[specKey];
    const url = API(classSlug, specSlug);

    for (let attempt = 0; ; attempt++) {
        const res = await fetch(url, {
            headers: { "User-Agent": "bis-tracker/generate-priority-stats" },
        });
        if (res.ok) return res.json();
        // 401 is what this endpoint answers when the window is full.
        const retriable = res.status === 401 || res.status === 429 || res.status >= 500;
        if (!retriable || attempt >= RETRY_BACKOFF_MS.length) {
            throw new Error(`HTTP ${res.status}`);
        }
        widenPace();
        const wait = RETRY_BACKOFF_MS[attempt];
        process.stdout.write(
            ` HTTP ${res.status}, waiting ${wait / 1000}s, pacing now ${pace / 1000}s ...`,
        );
        await sleep(wait);
    }
}

/**
 * Resolve a spec's roster, refetching only when the cached one has expired.
 *
 * A stale entry that cannot be replaced is used anyway, loudly. Old numbers
 * are worth more than none: the alternative is to fail the spec and fall back
 * to a priority that is older still, and unlike the roster carries no date
 * saying so.
 *
 * `source` is one of: "cache" (fresh), "fetched" (no cache existed),
 * "refetched" (stale, replaced), "stale" (stale, could not be replaced).
 */
async function loadRoster(specKey) {
    const cached = readCache(specKey);
    const age = cacheAge(specKey);
    if (cached && age <= maxAgeDays) {
        return { characters: trimRoster(cached), source: "cache", age, fetched: false };
    }
    try {
        const payload = await fetchPayload(specKey);
        writeCache(specKey, payload);
        return {
            characters: trimRoster(payload),
            source: cached ? "refetched" : "fetched",
            age: 0,
            fetched: true,
        };
    } catch (err) {
        if (!cached) throw err;
        return {
            characters: trimRoster(cached),
            source: "stale",
            age,
            fetched: true,
            error: err.message,
        };
    }
}

function fmtGroups(groups) {
    return groups.map((g) => g.join("=")).join(" > ");
}

function fmtMeans(means) {
    return SECONDARY_STATS.slice()
        .sort((a, b) => means[b] - means[a])
        .map((s) => `${s} ${Math.round(means[s])}`)
        .join("  ");
}

/** Patch PRIORITY_STATS in a spec data file with the spec's equivalence groups. */
function writeSpecFile(specKey, groups) {
    const path = resolve(DATA_DIR, `${specKey}.js`);
    if (!existsSync(path)) return false;
    const src = readFileSync(path, "utf8");
    const BLOCK = /export var PRIORITY_STATS = \[[^;]*\];/;
    if (!BLOCK.test(src)) {
        console.warn(`  ! no PRIORITY_STATS block in ${specKey}.js`);
        return false;
    }
    const next = src.replace(
        BLOCK,
        `export var PRIORITY_STATS = ${JSON.stringify(groups)};`,
    );
    if (next === src) return false;
    writeFileSync(path, next, "utf8");
    return true;
}

async function main() {
    const keys = Object.keys(SPEC_SLUGS).filter((k) => !onlySpec || k === onlySpec);
    if (!keys.length) throw new Error(`Unknown spec: ${onlySpec}`);

    const stored = loadStored();
    // Local date, not UTC: a maintainer running this in the evening in Seoul
    // should not read yesterday's date back out of the file. (sv-SE formats as
    // YYYY-MM-DD.)
    const collected = new Date().toLocaleDateString("sv-SE");
    const next = { ...stored };
    const changed = [];
    const failed = [];
    const stale = [];
    const grouped = [];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        process.stdout.write(`${key.padEnd(16)}`);
        let roster;
        try {
            roster = await loadRoster(key);
        } catch (err) {
            // Never blank a spec. A run that cannot reach the upstream and has
            // no roster to fall back on leaves the spec exactly as it was.
            console.log(` FAILED (${err.message}) — keeping existing value`);
            failed.push(`${key}: ${err.message}`);
            if (i < keys.length - 1) await sleep(pace);
            continue;
        }
        if (roster.source === "stale") {
            stale.push(`${key}: ${Math.round(roster.age)}d old, ${roster.error}`);
        }

        const { groups, means, n, threshold } = deriveGroups(roster.characters);
        if (!groups) {
            console.log(` empty roster — keeping existing value`);
            failed.push(`${key}: empty roster`);
            if (roster.fetched && i < keys.length - 1) await sleep(pace);
            continue;
        }

        const flat = flattenGroups(groups);
        const before = priorityList(stored[key]);
        if (before && before.join(",") !== flat.join(",")) {
            changed.push({ key, before, after: flat });
        }
        if (groups.some((g) => g.length > 1)) grouped.push(key);

        next[key] = {
            groups,
            means: Object.fromEntries(
                SECONDARY_STATS.map((s) => [s, Math.round(means[s] * 10) / 10]),
            ),
            n,
            collected,
        };

        console.log(
            ` n=${String(n).padStart(2)} t=${threshold}  ${fmtGroups(groups).padEnd(40)} ${fmtMeans(means)}` +
                `  (${roster.source}${roster.source === "cache" || roster.source === "stale" ? ` ${Math.round(roster.age)}d` : ""})`,
        );
        if (roster.fetched && i < keys.length - 1) await sleep(pace);
    }

    console.log(`\n${grouped.length} spec(s) with a multi-stat group: ${grouped.join(", ") || "none"}`);

    console.log(`\n${changed.length} spec(s) changed order:`);
    for (const c of changed) {
        console.log(`  ${c.key.padEnd(16)} ${c.before.join(",")}  ->  ${c.after.join(",")}`);
    }
    if (!changed.length) console.log("  none");

    if (stale.length) {
        console.log(
            `\n${stale.length} spec(s) derived from a stale roster the run could not replace:`,
        );
        for (const t of stale) console.log(`  ${t}`);
    }

    if (failed.length) {
        console.log(`\n${failed.length} spec(s) failed, existing values kept:`);
        for (const f of failed) console.log(`  ${f}`);
    }

    if (!doWrite) {
        console.log("\n(print only — pass --write to update priority-stats.json and src/data/*.js)");
        return;
    }

    writeFileSync(PRIORITY_STATS_FILE, renderPriorityFile(next), "utf8");
    console.log(`\n${PRIORITY_STATS_FILE} written`);

    let patched = 0;
    for (const key of keys) {
        const groups = priorityGroups(next[key]);
        if (groups && writeSpecFile(key, groups)) patched++;
    }
    console.log(`${patched} spec data file(s) updated`);
}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});
