#!/usr/bin/env node
/**
 * Generate localized dungeon and boss names from Blizzard's client DB2 tables.
 *
 * Every name the tracker shows as an item source — the dungeon a piece drops
 * in, the boss that holds it, the raid it belongs to — already exists in the
 * game client in all ten locales. wago.tools exposes those tables as CSV, one
 * request per table per locale, so the translations do not have to be written
 * by hand. The hand-written ones in this repo were both incomplete (most
 * locales still carried the English boss names) and occasionally wrong (zhCN
 * rendered "Chimaerus" as 奇美拉, the generic chimera, instead of the game's
 * 奇美鲁斯).
 *
 * Rows are joined across locales by DB2 row ID, never by name, so a translated
 * row can never be matched to the wrong English one.
 *
 * What this script does NOT touch:
 *   - `dungeons` — the short filter-button labels (PoS, NPX, PSF). The client
 *     carries no localized abbreviation: MapChallengeMode has a Name_lang and
 *     no ShortName_lang. Those stay hand-written.
 *   - Source keys with no DB2 row (Tier, Crafted, Catalyst, The Great Vault,
 *     Midnight Falls). They are UI concepts or project-local labels; the
 *     script reports them as unresolved and leaves the existing text alone.
 *
 * Usage:
 *   node scripts/generate-source-names.mjs                 # print the diff only
 *   node scripts/generate-source-names.mjs --write         # apply to src/i18n/*.json
 *   node scripts/generate-source-names.mjs --section sources
 *   node scripts/generate-source-names.mjs --locale de,fr
 *   node scripts/generate-source-names.mjs --refresh       # bypass the CSV cache
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const I18N_DIR = resolve(__dirname, "../src/i18n");
const CACHE_DIR = resolve(__dirname, ".wago-cache");

const WAGO_BASE = "https://wago.tools/db2";

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

// en.json is not a translation — its values are the deliberately trimmed badge
// labels the UI was laid out around ("Salhadaar", not "Fallen-King Salhadaar"),
// and they double as the yardstick the length warning measures against.
// Overwriting them with the client's full names would undo that choice
// silently. Pass `--locale en` to write it anyway.
const CURATED_LOCALES = new Set(["en"]);

// Rows where the shipped client string is not a translation of the encounter.
// esES JournalEncounter 2740 reads "L'ura" — an unrelated Argus entity — while
// every other locale carries a rendering of "Midnight Falls". Writing it would
// put a wrong boss name in front of Spanish users, so the row is left to the
// hand-written value. Drop the entry once Blizzard corrects the string.
const BAD_ROWS = { es: new Set(["Midnight Falls"]) };

// Dropped from the --resolve needle: too common to narrow anything down.
const STOPWORDS = new Set(["the", "and", "of", "great", "lost"]);

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
    : Object.keys(LOCALES).filter((l) => !CURATED_LOCALES.has(l));
for (const loc of targetLocales) {
    if (!LOCALES[loc]) {
        console.error(`Unknown locale ${loc} (expected one of ${Object.keys(LOCALES).join(", ")})`);
        process.exit(1);
    }
}

// ─── CSV ────────────────────────────────────────────────────
/**
 * RFC 4180 parser. Description_lang carries commas, doubled quotes and the
 * occasional embedded newline, so splitting on delimiters would desync the
 * columns and hand back a boss description as a name.
 */
function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    let dirty = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (quoted) {
            if (c !== '"') { field += c; continue; }
            if (text[i + 1] === '"') { field += '"'; i++; continue; }
            quoted = false;
        } else if (c === '"') {
            quoted = true;
            dirty = true;
        } else if (c === ",") {
            row.push(field);
            field = "";
            dirty = false;
        } else if (c === "\n") {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
            dirty = false;
        } else if (c !== "\r") {
            field += c;
            dirty = true;
        }
    }
    if (dirty || field || row.length) {
        row.push(field);
        rows.push(row);
    }
    return rows;
}

async function fetchTable(table, wagoLocale) {
    const cacheFile = resolve(CACHE_DIR, `${table}.${wagoLocale}.csv`);
    if (!doRefresh && existsSync(cacheFile)) return readFileSync(cacheFile, "utf8");

    const url = `${WAGO_BASE}/${table}/csv?locale=${wagoLocale}`;
    process.stdout.write(`  fetch ${table} ${wagoLocale} ... `);
    const res = await fetch(url, { headers: { "User-Agent": "bis-tracker/generate-source-names" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const text = await res.text();
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cacheFile, text, "utf8");
    console.log(`${(text.length / 1024).toFixed(0)} KB`);
    return text;
}

/** id -> Name_lang, for one table in one locale. */
async function nameIndex(table, wagoLocale) {
    const rows = parseCsv(await fetchTable(table, wagoLocale));
    const header = rows[0];
    const idCol = header.indexOf("ID");
    const nameCol = header.indexOf("Name_lang");
    if (idCol < 0 || nameCol < 0) {
        throw new Error(`${table} has no ID/Name_lang column (got ${header.join(", ")})`);
    }
    const index = new Map();
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (r.length <= Math.max(idCol, nameCol)) continue;
        index.set(Number(r[idCol]), r[nameCol]);
    }
    return index;
}

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

// ─── generate ───────────────────────────────────────────────
function readLocale(loc) {
    return JSON.parse(readFileSync(resolve(I18N_DIR, `${loc}.json`), "utf8"));
}

/** Visual width proxy: CJK glyphs occupy roughly two Latin columns. */
function displayWidth(s) {
    let w = 0;
    for (const ch of s) w += /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹯＀-｠￠-￦]/.test(ch) ? 2 : 1;
    return w;
}

async function generate() {
    const wagoLocales = [...new Set(targetLocales.map((l) => LOCALES[l]))];
    const tables = new Set();
    if (section !== "sources") tables.add("MapChallengeMode");
    if (section !== "dungeons") for (const s of Object.values(SOURCE_IDS)) tables.add(s.table);

    const skipped = [...CURATED_LOCALES].filter((l) => !targetLocales.includes(l));
    if (skipped.length) console.log(`Skipping curated locale(s): ${skipped.join(", ")}`);
    console.log(`Loading ${tables.size} table(s) x ${wagoLocales.length} locale(s)`);
    const indices = {}; // table -> wagoLocale -> Map
    for (const t of tables) {
        indices[t] = {};
        for (const wl of wagoLocales) indices[t][wl] = await nameIndex(t, wl);
    }

    const en = readLocale("en");
    const enWidths = {};
    for (const [k, v] of Object.entries({ ...(en.dungeonsFull || {}), ...(en.sources || {}) })) {
        enWidths[k] = displayWidth(v);
    }

    const missingRows = new Set();
    const skippedBadRows = [];
    const longer = [];
    let changed = 0;

    for (const loc of targetLocales) {
        const wl = LOCALES[loc];
        const data = readLocale(loc);
        const edits = [];

        const apply = (block, key, next) => {
            if (next == null || next === "") return;
            if (BAD_ROWS[loc]?.has(key)) {
                skippedBadRows.push(`${loc}  ${key}: client says "${next}"`);
                return;
            }
            const prev = (data[block] || {})[key];
            if (prev === next) return;
            data[block] = data[block] || {};
            data[block][key] = next;
            edits.push({ block, key, prev, next });
            // Only worth flagging where the English label is a trimmed nickname
            // ("Salhadaar" for "Fallen-King Salhadaar") and the localized row is
            // the untrimmed one. Those need a human to pick the short form.
            if (enWidths[key] && displayWidth(next) > enWidths[key] * 1.5 + 4) {
                longer.push(`${loc}  ${key}: "${next}" (en "${(en[block] || {})[key]}")`);
            }
        };

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
                apply("sources", key, found);
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
            writeFileSync(resolve(I18N_DIR, `${loc}.json`), JSON.stringify(data, null, 4) + "\n", "utf8");
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
    if (longer.length) {
        console.log(`\nLonger than the English label — trim by hand if the UI wraps:`);
        for (const l of longer) console.log(`  ${l}`);
    }

    console.log(`\n${changed} change(s) across ${targetLocales.length} locale(s).`);
    if (!doWrite && changed) console.log("Re-run with --write to apply.");
}

if (doResolve) await resolveMode();
else await generate();
