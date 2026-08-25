/**
 * Generate scripts/priority-stats.json from observed gear.
 *
 * murlok publishes, on each spec's guide page, the secondary-stat ratings its
 * sample of high-performing characters actually carries — gear, consumables,
 * enchants and gems together. This reads that chart. The grouping is ours: the
 * page also prints a flat order, and a flat order cannot say that two stats are
 * worth the same, which is the whole point of the equivalence groups.
 *
 * Earlier versions summed the ratings themselves off the roster JSON. That
 * cannot work — the roster carries no enchants and no gems, which is where
 * haste and versatility mostly sit — and it produced a Blood Death Knight
 * priority with haste in third place. See
 * docs/adr/0003-stat-priority-from-the-published-chart.md, which supersedes
 * 0001. The derivation itself lives in priority-groups.mjs, which has no
 * network and no disk.
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
    parseStatChart,
} from "./priority-groups.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRIORITY_STATS_FILE = resolve(__dirname, "priority-stats.json");
const CACHE_DIR = resolve(__dirname, ".murlok-cache");
const DATA_DIR = resolve(__dirname, "../src/data");

const GUIDE_URL = (classSlug, specSlug) =>
    `https://murlok.io/${classSlug}/${specSlug}/m+`;

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
// reached keeps the page, and failing that the priority, it already had.
const PACE_MS = 40000;
const MAX_PACE_MS = 300000;
const RETRY_BACKOFF_MS = [60000, 180000, 300000, 600000];

// How old a cached page may be before a run tries to replace it. The chart
// moves slowly — the upstream restamps a spec every day or so and the gear
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

// ─── Page cache ───────────────────────────────────────────────
// One file per spec holding the guide page as it arrived, plus an index
// carrying the fetch times. The index is what makes an entry expire: mtime
// would be rewritten by anything that touched the file. The page is kept whole
// rather than trimmed to the chart, so widening what the parser reads does not
// mean refetching forty specs through the rate limit.

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
    return resolve(CACHE_DIR, `${specKey}.html`);
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
    // A truncated write from an interrupted run parses to no chart, which the
    // caller then treats the same way as a page it could not fetch.
    return readFileSync(path, "utf8") || null;
}

function writeCache(specKey, html) {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cacheFile(specKey), html, "utf8");
    cacheIndex[specKey] = { fetchedAt: new Date().toISOString() };
    saveIndex(cacheIndex);
}

async function fetchPayload(specKey) {
    const [classSlug, specSlug] = SPEC_SLUGS[specKey];
    const url = GUIDE_URL(classSlug, specSlug);

    for (let attempt = 0; ; attempt++) {
        const res = await fetch(url, {
            headers: { "User-Agent": "bis-tracker/generate-priority-stats" },
        });
        if (res.ok) return res.text();
        // 401 is what the upstream answers when the window is full.
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
 * Resolve a spec's guide page, refetching only when the cached one has expired.
 *
 * A stale entry that cannot be replaced is used anyway, loudly. Old numbers
 * are worth more than none: the alternative is to fail the spec and fall back
 * to a priority that is older still, and unlike the page carries no date
 * saying so.
 *
 * `source` is one of: "cache" (fresh), "fetched" (no cache existed),
 * "refetched" (stale, replaced), "stale" (stale, could not be replaced).
 */
async function loadChart(specKey) {
    const cached = readCache(specKey);
    const age = cacheAge(specKey);
    if (cached && age <= maxAgeDays) {
        return { chart: parseStatChart(cached), source: "cache", age, fetched: false };
    }
    try {
        const html = await fetchPayload(specKey);
        writeCache(specKey, html);
        return {
            chart: parseStatChart(html),
            source: cached ? "refetched" : "fetched",
            age: 0,
            fetched: true,
        };
    } catch (err) {
        if (!cached) throw err;
        return {
            chart: parseStatChart(cached),
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

function fmtMeans(ratings) {
    return SECONDARY_STATS.slice()
        .sort((a, b) => ratings[b] - ratings[a])
        .map((s) => `${s} +${Math.round(ratings[s])}`)
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
    const reordered = [];
    const regrouped = [];
    const failed = [];
    const stale = [];
    const grouped = [];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        process.stdout.write(`${key.padEnd(16)}`);
        let page;
        try {
            page = await loadChart(key);
        } catch (err) {
            // Never blank a spec. A run that cannot reach the upstream and has
            // no cached page to fall back on leaves the spec exactly as it was.
            console.log(` FAILED (${err.message}) — keeping existing value`);
            failed.push(`${key}: ${err.message}`);
            if (i < keys.length - 1) await sleep(pace);
            continue;
        }
        if (page.source === "stale") {
            stale.push(`${key}: ${Math.round(page.age)}d old, ${page.error}`);
        }

        const { groups, chart, threshold } = deriveGroups(page.chart);
        if (!groups) {
            console.log(` no stat chart on the page — keeping existing value`);
            failed.push(`${key}: no stat chart`);
            if (page.fetched && i < keys.length - 1) await sleep(pace);
            continue;
        }

        // Two different changes, reported apart. A spec can keep its order and
        // still change what the matcher does — merging mastery with crit turns
        // every crit item in that slot from a re-farm order into a finished
        // slot, and splitting them turns it back. Comparing flattened orders
        // sees neither, and the loudest change in a run would pass silently.
        const beforeGroups = priorityGroups(stored[key]);
        if (beforeGroups) {
            const flat = flattenGroups(groups);
            const beforeFlat = flattenGroups(beforeGroups);
            if (beforeFlat.join(",") !== flat.join(",")) {
                reordered.push({ key, before: beforeFlat, after: flat });
            } else if (fmtGroups(beforeGroups) !== fmtGroups(groups)) {
                regrouped.push({ key, before: beforeGroups, after: groups });
            }
        }
        if (groups.some((g) => g.length > 1)) grouped.push(key);

        next[key] = { groups, ratings: chart.totals, collected };

        console.log(
            ` t=${threshold}  ${fmtGroups(groups).padEnd(40)} ${fmtMeans(chart.totals)}` +
                `  (${page.source}${page.source === "cache" || page.source === "stale" ? ` ${Math.round(page.age)}d` : ""})`,
        );
        if (page.fetched && i < keys.length - 1) await sleep(pace);
    }

    console.log(`\n${grouped.length} spec(s) with a multi-stat group: ${grouped.join(", ") || "none"}`);

    console.log(`\n${reordered.length} spec(s) changed order:`);
    for (const c of reordered) {
        console.log(`  ${c.key.padEnd(16)} ${c.before.join(",")}  ->  ${c.after.join(",")}`);
    }
    if (!reordered.length) console.log("  none");

    console.log(`\n${regrouped.length} spec(s) kept their order and moved a group boundary:`);
    for (const c of regrouped) {
        console.log(`  ${c.key.padEnd(16)} ${fmtGroups(c.before)}  ->  ${fmtGroups(c.after)}`);
    }
    if (!regrouped.length) console.log("  none");

    if (stale.length) {
        console.log(
            `\n${stale.length} spec(s) derived from a stale page the run could not replace:`,
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
