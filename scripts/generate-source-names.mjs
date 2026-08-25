#!/usr/bin/env node
/**
 * Generate localized dungeon and boss names from Blizzard's client DB2 tables,
 * then derive the short labels the filter row needs.
 *
 * Stage 1 — full names. Every name the tracker shows as an item source already
 * exists in the game client in all ten locales. wago.tools exposes those tables
 * as CSV, one request per table per locale, so the translations do not have to
 * be written by hand. The hand-written ones were both incomplete (most locales
 * still carried the English boss names) and occasionally wrong (zhCN rendered
 * "Chimaerus" as 奇美拉, the generic chimera, instead of the game's 奇美鲁斯).
 * Rows join across locales by DB2 row ID, never by name, so a translated row
 * can never be matched to the wrong English one.
 *
 * Stage 2 — short labels, derived from stage 1's output. Two blocks:
 *
 *   `dungeons`  Filter-button labels. Only ko/zhCN/zhTW are generated: those
 *               readerships do not use the English M+ acronyms, and their full
 *               names are short enough to stand on their own. The Latin and
 *               Cyrillic locales keep the hand-written acronyms, which is what
 *               the tooling those players already use ships them — the Raider.IO
 *               addon hands `POS`/`SR` to every client regardless of locale.
 *               A name wider than SHORT_MAX columns needs an entry in
 *               scripts/dungeon-short.json; without one the script exits.
 *
 *   `sources`   Boss and raid labels, trimmed from `sourcesFull` by rule (see
 *               shortenSource) with exceptions in scripts/source-short.json.
 *               `en.sources` is hand-written and never generated.
 *
 * Block ownership, not file ownership: `en.dungeonsFull` and `en.sourcesFull`
 * are the client's own strings and are generated like any other locale, while
 * `en.dungeons` and `en.sources` stay hand-written.
 *
 * Source keys with no DB2 row (Tier, Crafted, Catalyst, The Great Vault) are UI
 * concepts, reported as unresolved and left alone.
 *
 * Usage:
 *   node scripts/generate-source-names.mjs                 # print the diff only
 *   node scripts/generate-source-names.mjs --write         # apply to src/i18n/*.json
 *   node scripts/generate-source-names.mjs --section sources
 *   node scripts/generate-source-names.mjs --locale de,fr
 *   node scripts/generate-source-names.mjs --resolve       # candidate rows for unmapped keys
 *   node scripts/generate-source-names.mjs --refresh       # bypass the CSV cache
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fetchTable as fetchDb2Table, nameIndex as db2NameIndex } from "./wago-db2.mjs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const I18N_DIR = resolve(__dirname, "../src/i18n");
const DUNGEON_SHORT_FILE = resolve(__dirname, "dungeon-short.json");
const SOURCE_SHORT_FILE = resolve(__dirname, "source-short.json");

// Project locale key -> Blizzard locale code used by wago.tools.
const LOCALES = {
    en: "enUS",
    ko: "koKR",
    de: "deDE",
    fr: "frFR",
    es: "esES",
    pt: "ptBR",
    it: "itIT",
    ru: "ruRU",
    zhCN: "zhCN",
    zhTW: "zhTW",
};

// Locales whose `dungeons` labels are generated rather than hand-written.
const SHORT_DUNGEON_LOCALES = new Set(["ko", "zhCN", "zhTW"]);

// Display columns a filter-button label may occupy before it needs shortening.
// 18 is the widest full name the generated locales currently produce
// (ko "루비 생명의 웅덩이"), so this season only the legacy ko entry for Priory
// of the Sacred Flame crosses it. The filter row already wraps, so a label a
// little over the old acronym width costs one wrapped row, not a broken layout.
const SHORT_MAX = 18;

// Blocks nobody generates. `en.dungeons` holds the English M+ acronyms and
// `en.sources` the trimmed badge labels the UI was laid out around; both are
// deliberate hand-written choices, unlike the *Full blocks beside them.
function isGenerated(block, loc) {
    if (block === "dungeons") return SHORT_DUNGEON_LOCALES.has(loc);
    if (block === "sources") return loc !== "en";
    return true;
}

// dungeonsFull key -> MapChallengeMode.ID.
// Every dungeon in the pool has a challenge-mode row, including the legacy
// ones, because the Mythic+ rotation is what put them in the pool.
const DUNGEON_IDS = {
    "Pit of Saron": 556,
    "Nexus-Point Xenas": 559,
    "Windrunner Spire": 557,
    "Magisters' Terrace": 558,
    "Skyreach": 161,
    "Seat of the Triumvirate": 583,
    "Algeth'ar Academy": 402,
    "Maisara Caverns": 560,
    "Halls of Atonement": 378,
    "Priory of the Sacred Flame": 499,
    "The Blinding Vale": 584,
    "Altar of Fangs": 588,
    "Murder Row": 587,
    "Voidscar Arena": 585,
    "Kings' Rest": 249,
    "Den of Nalorakk": 586,
    "Temple of Sethraliss": 250,
    "Ruby Life Pools": 399,
};

// sources key -> DB2 row. JournalEncounter holds bosses, JournalInstance holds
// the raid/dungeon they sit in. IDs were resolved once against the enUS export;
// re-resolve with --resolve if a key stops matching after a content patch.
const SOURCE_IDS = {
    // The Voidspire (JournalInstance 1307) — Season 2 raid
    "Midnight Falls": { table: "JournalEncounter", id: 2740 },
    "Crown of the Cosmos": { table: "JournalEncounter", id: 2738 },
    "Imperator Averzian": { table: "JournalEncounter", id: 2733 },
    "Vorasius": { table: "JournalEncounter", id: 2734 },
    "Vaelgor & Ezzorak": { table: "JournalEncounter", id: 2735 },
    "Fallen-King Salhadaar": { table: "JournalEncounter", id: 2736 },
    "Lightblinded Vanguard": { table: "JournalEncounter", id: 2737 },
    // March on Quel'Danas (1308) / The Dreamrift (1314) / Sporefall (1305)
    "Belo'ren": { table: "JournalEncounter", id: 2739 },
    "Chimaerus": { table: "JournalEncounter", id: 2795 },
    "Rotmire": { table: "JournalEncounter", id: 2711 },
    // The Tidebound Grotto (1317)
    "Nymrissa Wavecaller": { table: "JournalEncounter", id: 2849 },
    // The Venomous Abyss (1320)
    "Sszorak": { table: "JournalEncounter", id: 2871 },
    "Entombed Sentinels": { table: "JournalEncounter", id: 2874 },
    "Vashnik the Malignant": { table: "JournalEncounter", id: 2882 },
    "The Coiled Altar": { table: "JournalEncounter", id: 2883 },
    "The Twin Fangs": { table: "JournalEncounter", id: 2887 },
    "Nek'zali the Soulcoiler": { table: "JournalEncounter", id: 2888 },
    "The Lost Explorers": { table: "JournalEncounter", id: 2894 },
    "Ula'tek": { table: "JournalEncounter", id: 2895 },
};

// Keys the client has no row for. Listed so the report can tell "nobody looked
// this up" apart from "looked it up and the row is gone".
const NO_DB_ROW = new Set(["Tier", "Crafted", "Catalyst", "The Great Vault"]);

// Rows where the shipped client string is not a translation of the encounter.
// esES JournalEncounter 2740 reads "L'ura" — an unrelated Argus entity — while
// every other locale carries a rendering of "Midnight Falls". Writing it would
// put a wrong boss name in front of Spanish users, so the row is left to the
// hand-written value. Drop the entry once Blizzard corrects the string.
const BAD_ROWS = { es: new Set(["Midnight Falls"]) };

// Dropped from the --resolve needle: too common to narrow anything down.
const STOPWORDS = new Set(["the", "and", "of", "great", "lost"]);

// Determiners that introduce an epithet clause after a boss's name:
// "Vashnik der Bösartige", "Nek'zali la Volutadora de Almas". Only counted
// past the first token, so "Die Zwillingsfänge" keeps its leading article.
const DETERMINERS = {
    de: ["der", "die", "das", "den", "dem"],
    fr: ["le", "la", "les"],
    es: ["el", "la", "los", "las"],
    it: ["il", "lo", "la", "i", "gli", "le"],
    pt: ["o", "a", "os", "as"],
};

// A determiner right after a preposition belongs to that phrase, not to an
// epithet: cutting "Vanguardia Cegada por la Luz" at "la" leaves the dangling
// "Vanguardia Cegada por".
const PREPOSITIONS = {
    de: ["von", "vom", "zu", "zur", "zum", "in", "im", "an", "am", "auf", "aus", "bei", "mit", "nach", "über", "unter", "vor"],
    fr: ["de", "du", "des", "à", "au", "aux", "en", "par", "pour", "sur", "sous", "avec"],
    es: ["de", "del", "por", "para", "en", "con", "sin", "sobre", "a", "al"],
    it: ["di", "del", "della", "da", "dal", "in", "nel", "per", "con", "su", "a", "al"],
    pt: ["de", "do", "da", "dos", "das", "por", "para", "em", "no", "na", "com", "a", "ao"],
};

// ─── args ───────────────────────────────────────────────────
const argv = process.argv.slice(2);
const doWrite = argv.includes("--write");
const doRefresh = argv.includes("--refresh");
const doResolve = argv.includes("--resolve");

function argValue(flag) {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : null;
}

const section = argValue("--section") || "all";
if (!["all", "dungeons", "sources"].includes(section)) {
    console.error(`Unknown --section ${section} (expected all | dungeons | sources)`);
    process.exit(1);
}

const localeFilter = argValue("--locale");
const targetLocales = localeFilter
    ? localeFilter.split(",").map((s) => s.trim()).filter(Boolean)
    : Object.keys(LOCALES);
for (const loc of targetLocales) {
    if (!LOCALES[loc]) {
        console.error(`Unknown locale ${loc} (expected one of ${Object.keys(LOCALES).join(", ")})`);
        process.exit(1);
    }
}

// The DB2 tables live in wago-db2.mjs, shared with find-alts. These two carry
// this script's --refresh flag and User-Agent into it.
const fetchTable = (table, wagoLocale) =>
    fetchDb2Table(table, wagoLocale, { refresh: doRefresh, agent: "bis-tracker/generate-source-names" });
const nameIndex = (table, wagoLocale) =>
    db2NameIndex(table, wagoLocale, { refresh: doRefresh, agent: "bis-tracker/generate-source-names" });

function readJsonOr(file, fallback) {
    if (!existsSync(file)) return fallback;
    return JSON.parse(readFileSync(file, "utf8"));
}

const DUNGEON_SHORT = readJsonOr(DUNGEON_SHORT_FILE, {});
const SOURCE_SHORT = readJsonOr(SOURCE_SHORT_FILE, {});

// ─── resolve mode ───────────────────────────────────────────
/**
 * Prints candidate rows for every source key that is not in SOURCE_IDS yet.
 * Fuzzy matching runs here and only here — the generated output above is
 * keyed on IDs a human confirmed.
 */
async function resolveMode() {
    const en = JSON.parse(readFileSync(resolve(I18N_DIR, "en.json"), "utf8"));
    const unknown = Object.keys(en.sources || {}).filter((k) => !SOURCE_IDS[k]);
    if (!unknown.length) {
        console.log("Every source key is already mapped.");
        return;
    }
    const tables = ["JournalEncounter", "JournalInstance"];
    const indices = {};
    for (const t of tables) indices[t] = await nameIndex(t, "enUS");

    for (const key of unknown) {
        const needle = key.toLowerCase();
        // "The Great Vault" would otherwise match every boss whose name starts
        // with "the", so the head word only counts when it carries meaning.
        const words = needle.split(/[\s,]+/).filter((w) => w.length > 3 && !STOPWORDS.has(w));
        const head = words[0] || null;
        console.log(`\n${key}${NO_DB_ROW.has(key) ? "  (listed as having no DB row)" : ""}`);
        let hits = 0;
        for (const t of tables) {
            for (const [id, name] of indices[t]) {
                const hay = name.toLowerCase();
                if (!hay.includes(needle) && !(head && hay.includes(head))) continue;
                console.log(`  ${t} ${id}: ${name}`);
                if (++hits >= 8) break;
            }
        }
        if (!hits) console.log("  no candidates");
    }
}

// ─── shortening ─────────────────────────────────────────────
/** Visual width proxy: CJK glyphs occupy roughly two Latin columns. */
function displayWidth(s) {
    let w = 0;
    for (const ch of s) w += /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹯＀-｠￠-￦]/.test(ch) ? 2 : 1;
    return w;
}

/**
 * Trim a boss's epithet off the client's full name. Three shapes cover most of
 * what Blizzard ships; anything they miss belongs in source-short.json rather
 * than in a fourth rule, because past this point the patterns stop being
 * mechanical (ko puts the epithet in front, ru inflects it).
 */
function shortenSource(full, loc) {
    let s = full;
    // Leading bracketed epithet: zhTW 『夢境之神』奇美魯斯
    s = s.replace(/^[『「《][^』」》]*[』」》]\s*/, "");
    // Appositive clause: de "Chimaerus, der ungeträumte Gott"
    const comma = s.indexOf(",");
    if (comma > 0) s = s.slice(0, comma);
    // Trailing determiner clause: es "Nek'zali la Volutadora de Almas"
    const dets = DETERMINERS[loc];
    if (dets) {
        const preps = PREPOSITIONS[loc] || [];
        const parts = s.split(/\s+/);
        const cut = parts.findIndex((w, i) =>
            i > 0 && dets.includes(w.toLowerCase()) && !preps.includes(parts[i - 1].toLowerCase()));
        if (cut > 0) s = parts.slice(0, cut).join(" ");
    }
    return s.trim() || full;
}

/**
 * Candidates offered when a dungeon name is too wide and has no override yet.
 * Deliberately not auto-picked: the shortest unique token lands on words like
 * "Vida" or "Омуты", and the leading noun lands on adjectives in de and ru.
 */
function shortCandidates(full) {
    const words = full.split(/\s+/).filter(Boolean);
    if (words.length < 2) return [full.slice(0, 4)];
    return [...new Set([words[0], words[words.length - 1], words.slice(1).join(" ")])];
}

// ─── generate ───────────────────────────────────────────────
function readLocale(loc) {
    return JSON.parse(readFileSync(resolve(I18N_DIR, `${loc}.json`), "utf8"));
}

/** Keep `sourcesFull` next to `sources` instead of appended after everything. */
function orderBlocks(data) {
    const out = {};
    for (const k of Object.keys(data)) {
        if (k === "sourcesFull") continue;
        out[k] = data[k];
        if (k === "sources" && data.sourcesFull) out.sourcesFull = data.sourcesFull;
    }
    if (data.sourcesFull && !out.sourcesFull) out.sourcesFull = data.sourcesFull;
    return out;
}

async function generate() {
    const wagoLocales = [...new Set(targetLocales.map((l) => LOCALES[l]))];
    const tables = new Set();
    if (section !== "sources") tables.add("MapChallengeMode");
    if (section !== "dungeons") for (const s of Object.values(SOURCE_IDS)) tables.add(s.table);

    console.log(`Loading ${tables.size} table(s) x ${wagoLocales.length} locale(s)`);
    const indices = {}; // table -> wagoLocale -> Map
    for (const t of tables) {
        indices[t] = {};
        for (const wl of wagoLocales) indices[t][wl] = await nameIndex(t, wl);
    }

    const en = readLocale("en");
    const missingRows = new Set();
    const skippedBadRows = [];
    const needOverride = [];
    const collisions = [];
    const wideSources = [];
    let changed = 0;

    for (const loc of targetLocales) {
        const wl = LOCALES[loc];
        const data = readLocale(loc);
        const edits = [];

        const apply = (block, key, next) => {
            if (next == null || next === "") return;
            if (!isGenerated(block, loc)) return;
            if (BAD_ROWS[loc]?.has(key)) {
                skippedBadRows.push(`${loc}  ${key}: client says "${next}"`);
                return;
            }
            const prev = (data[block] || {})[key];
            if (prev === next) return;
            data[block] = data[block] || {};
            data[block][key] = next;
            edits.push({ block, key, prev, next });
        };

        // Stage 1 — full names straight from the client.
        if (section !== "sources") {
            for (const [name, id] of Object.entries(DUNGEON_IDS)) {
                const found = indices.MapChallengeMode[wl].get(id);
                if (found == null) missingRows.add(`MapChallengeMode ${id} (${name})`);
                apply("dungeonsFull", name, found);
            }
        }
        if (section !== "dungeons") {
            for (const [key, ref] of Object.entries(SOURCE_IDS)) {
                const found = indices[ref.table][wl].get(ref.id);
                if (found == null) missingRows.add(`${ref.table} ${ref.id} (${key})`);
                apply("sourcesFull", key, found);
            }
        }

        // Stage 2 — short labels, derived from what stage 1 just wrote.
        if (section !== "sources" && isGenerated("dungeons", loc)) {
            const picked = new Map();
            for (const name of Object.keys(DUNGEON_IDS)) {
                const full = (data.dungeonsFull || {})[name];
                if (!full) continue;
                const override = (DUNGEON_SHORT[loc] || {})[name];
                let short = override || full;
                if (!override && displayWidth(full) > SHORT_MAX) {
                    needOverride.push(
                        `${loc}  ${name}: "${full}" is ${displayWidth(full)} columns` +
                        `\n        candidates: ${shortCandidates(full).map((c) => `"${c}"`).join(", ")}`
                    );
                    continue;
                }
                if (picked.has(short)) {
                    collisions.push(`${loc}  "${short}" claimed by both ${picked.get(short)} and ${name}`);
                    continue;
                }
                picked.set(short, name);
                apply("dungeons", name, short);
            }
        }
        if (section !== "dungeons" && isGenerated("sources", loc)) {
            for (const key of Object.keys(SOURCE_IDS)) {
                const full = (data.sourcesFull || {})[key];
                if (!full) continue;
                const override = (SOURCE_SHORT[loc] || {})[key];
                const short = override || shortenSource(full, loc);
                apply("sources", key, short);
                // Not fatal the way an unlabelled dungeon is — a long boss
                // label makes its filter button wide, it does not make two
                // buttons indistinguishable.
                if (!override && displayWidth(short) > SHORT_MAX) {
                    wideSources.push(`${loc}  ${key}: "${short}" is ${displayWidth(short)} columns`);
                }
            }
        }

        changed += edits.length;
        if (edits.length) {
            console.log(`\n${loc}  ${edits.length} change(s)`);
            for (const e of edits) console.log(`  ${e.block}.${e.key}: ${JSON.stringify(e.prev)} -> ${JSON.stringify(e.next)}`);
        } else {
            console.log(`\n${loc}  up to date`);
        }

        if (doWrite && edits.length) {
            writeFileSync(resolve(I18N_DIR, `${loc}.json`), JSON.stringify(orderBlocks(data), null, 4) + "\n", "utf8");
        }
    }

    const unresolved = Object.keys(en.sources || {}).filter((k) => !SOURCE_IDS[k]);
    if (unresolved.length && section !== "dungeons") {
        console.log(`\nUnresolved source keys (left untouched):`);
        for (const k of unresolved) {
            console.log(`  ${k}${NO_DB_ROW.has(k) ? "" : "  <- not in SOURCE_IDS, run --resolve"}`);
        }
    }
    if (missingRows.size) {
        console.log(`\nDB rows that no longer exist — re-resolve these IDs:`);
        for (const m of missingRows) console.log(`  ${m}`);
    }
    if (skippedBadRows.length) {
        console.log(`\nSkipped — client string is not a translation of this encounter:`);
        for (const s of skippedBadRows) console.log(`  ${s}`);
    }

    if (wideSources.length) {
        console.log(`\nWider than ${SHORT_MAX} columns — add to scripts/source-short.json if the filter row bothers you:`);
        for (const w of wideSources) console.log(`  ${w}`);
    }

    console.log(`\n${changed} change(s) across ${targetLocales.length} locale(s).`);

    // A filter button with no label, or two dungeons sharing one, is worse than
    // a failed run: both ship silently and the user cannot tell them apart.
    if (needOverride.length || collisions.length) {
        if (needOverride.length) {
            console.error(`\nToo wide for a filter button and no entry in scripts/dungeon-short.json:`);
            for (const n of needOverride) console.error(`  ${n}`);
        }
        if (collisions.length) {
            console.error(`\nTwo dungeons resolved to the same label:`);
            for (const c of collisions) console.error(`  ${c}`);
        }
        process.exit(1);
    }
    if (!doWrite && changed) console.log("Re-run with --write to apply.");
}

if (doResolve) await resolveMode();
else await generate();
