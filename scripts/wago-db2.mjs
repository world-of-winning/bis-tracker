/**
 * The game client's own DB2 tables, served as per-locale CSV by wago.tools.
 *
 * Two callers read them for different reasons. `generate-source-names.mjs`
 * wants the names — every dungeon and boss the tracker shows as an item
 * source already exists in the client in all ten locales, so the translations
 * do not have to be written by hand. `find-alts.mjs` wants the loot table:
 * `JournalEncounterItem` says which item drops from which encounter, which is
 * the only authoritative answer to what a player can actually farm this
 * season. A BiS list is a recommendation, and an equipment snapshot is what
 * players have not replaced yet; neither is an inventory.
 *
 * Responses are cached verbatim in scripts/.wago-cache/, one file per table
 * per locale. They change only when Blizzard patches, so there is no expiry —
 * pass `refresh` to bypass.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = resolve(__dirname, ".wago-cache");
const WAGO_BASE = "https://wago.tools/db2";

/**
 * RFC 4180 parser. Description_lang carries commas, doubled quotes and the
 * occasional embedded newline, so splitting on delimiters would desync the
 * columns and hand back a boss description as a name.
 */
export function parseCsv(text) {
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

/** Raw CSV for one table in one locale, from the cache unless refreshing. */
export async function fetchTable(table, wagoLocale, { refresh = false, agent = "bis-tracker" } = {}) {
    const cacheFile = resolve(CACHE_DIR, `${table}.${wagoLocale}.csv`);
    if (!refresh && existsSync(cacheFile)) return readFileSync(cacheFile, "utf8");

    const url = `${WAGO_BASE}/${table}/csv?locale=${wagoLocale}`;
    process.stdout.write(`  fetch ${table} ${wagoLocale} ... `);
    const res = await fetch(url, { headers: { "User-Agent": agent } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const text = await res.text();
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cacheFile, text, "utf8");
    console.log(`${(text.length / 1024).toFixed(0)} KB`);
    return text;
}

/** Rows as objects keyed by column name. */
export async function tableRows(table, wagoLocale, opts) {
    const rows = parseCsv(await fetchTable(table, wagoLocale, opts));
    const header = rows[0];
    const out = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (r.length < header.length) continue;
        const o = {};
        for (let c = 0; c < header.length; c++) o[header[c]] = r[c];
        out.push(o);
    }
    return out;
}

/** id -> Name_lang, for one table in one locale. */
export async function nameIndex(table, wagoLocale, opts) {
    const rows = parseCsv(await fetchTable(table, wagoLocale, opts));
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

/**
 * The loot table, joined into instance -> items.
 *
 * `JournalEncounterItem` carries no names and `JournalInstance` carries no
 * items, so the join runs through `JournalEncounter` in the middle. Rows join
 * by DB2 row ID throughout — never by name, which is what lets the same
 * function answer in any locale.
 *
 * Returns Map(instanceName -> Map(itemId -> { encounterId, encounter })), plus
 * a flat `byItem` index for the common lookup of "where does this drop".
 */
export async function dropTable(wagoLocale = "enUS", opts) {
    const [items, encounters, instances] = await Promise.all([
        tableRows("JournalEncounterItem", wagoLocale, opts),
        tableRows("JournalEncounter", wagoLocale, opts),
        tableRows("JournalInstance", wagoLocale, opts),
    ]);

    const instanceName = new Map(instances.map((r) => [r.ID, r.Name_lang]));
    const encounter = new Map(
        encounters.map((r) => [
            r.ID,
            { name: r.Name_lang, instance: instanceName.get(r.JournalInstanceID) },
        ]),
    );

    const byInstance = new Map();
    const byItem = new Map();
    for (const row of items) {
        const enc = encounter.get(row.JournalEncounterID);
        if (!enc || !enc.instance) continue;
        const itemId = Number(row.ItemID);
        if (!Number.isFinite(itemId)) continue;

        const drop = {
            itemId,
            encounterId: Number(row.JournalEncounterID),
            encounter: enc.name,
            instance: enc.instance,
        };
        if (!byInstance.has(enc.instance)) byInstance.set(enc.instance, new Map());
        byInstance.get(enc.instance).set(itemId, drop);
        if (!byItem.has(itemId)) byItem.set(itemId, []);
        byItem.get(itemId).push(drop);
    }
    return { byInstance, byItem };
}
