#!/usr/bin/env node
/**
 * Generate spec data files from maxroll.gg + Wowhead APIs.
 *
 * Usage:
 *   node scripts/generate-spec-data.mjs                # all specs
 *   node scripts/generate-spec-data.mjs blood-dk       # single spec
 *   node scripts/generate-spec-data.mjs --list         # list all spec keys
 *   node scripts/generate-spec-data.mjs --skip-done    # skip specs already in new BIS+MYTHIC format
 *   node scripts/generate-spec-data.mjs --missing      # only specs with missing/incomplete files
 *   node scripts/generate-spec-data.mjs --force        # force regenerate (ignore unchanged check)
 *   node scripts/generate-spec-data.mjs --fix          # rebuild from cache + normalize (no network)
 *   node scripts/generate-spec-data.mjs --regenerate   # purge cache & re-fetch everything from network
 */

import { load } from "cheerio";
import { writeFileSync, readFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import {
    fetchTooltip,
    saveCache,
    cacheGet,
    cacheSet,
    cacheDelete,
} from "./wowhead-cache.mjs";
import {
    buildItemIndex,
    findAltsForSpec,
    updateSpecFile,
} from "./find-alts.mjs";

// ─── Priority stats (priority-stats.json: manual overrides + auto-fetched from Maxroll) ─
const PRIORITY_STATS_FILE = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "priority-stats.json",
);
let _priorityData = null;
function loadPriorityData() {
    if (_priorityData) return _priorityData;
    try {
        _priorityData = JSON.parse(readFileSync(PRIORITY_STATS_FILE, "utf8"));
    } catch {
        _priorityData = {};
    }
    return _priorityData;
}
function savePriorityData() {
    writeFileSync(
        PRIORITY_STATS_FILE,
        JSON.stringify(_priorityData, null, 2) + "\n",
        "utf8",
    );
}
function getPriority(specKey) {
    return loadPriorityData()[specKey] || null;
}
function setPriority(specKey, priority) {
    loadPriorityData()[specKey] = priority;
    savePriorityData();
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../src/data");

// ─── Known dungeons ──────────────────────────────────────────
// Midnight Season 2 Mythic+ pool. Keep in sync with DUNGEONS in
// src/data/shared.js. Only what appears in Maxroll's farmable tables belongs
// here — the Ula'tek raid and its bosses (The Coiled Altar, The Twin Fangs,
// Nymrissa Wavecaller, The Lost Explorers, Entombed Sentinels) show up in BiS
// tables and stay non-dungeon sources, the same way Season 1 handled raids.
const VALID_DUNGEONS = [
    "The Blinding Vale",
    "Altar of Fangs",
    "Murder Row",
    "Voidscar Arena",
    "Kings' Rest",
    "Den of Nalorakk",
    "Temple of Sethraliss",
    "Ruby Life Pools",
];

// ─── Slot mapping (maxroll → project) ────────────────────────
const SLOT_MAP = {
    Head: "head",
    Neck: "neck",
    Shoulder: "shoulder",
    Cloak: "back",
    Chest: "chest",
    Wrist: "wrist",
    Gloves: "hands",
    Belt: "waist",
    Legs: "legs",
    Boots: "feet",
    "Ring 1": "finger1",
    "Ring 2": "finger2",
    "Trinket 1": "trinket1",
    "Trinket 2": "trinket2",
};

// Weapon/off-hand slot names vary per spec
const WEAPON_SLOTS = {
    "1h+shield": ["main_hand", "off_hand"],
    "1h+oh": ["main_hand", "off_hand"],
    "2h": ["main_hand"],
    dual: ["main_hand", "off_hand"],
    ranged: ["main_hand"],
};

// Handle numbered Ring/Trinket slots (some maxroll pages use "Ring" without number)
let ringCount = 0;
let trinketCount = 0;
function resolveSlot(slotName, weaponType) {
    // Standard armor slots
    if (SLOT_MAP[slotName]) return SLOT_MAP[slotName];

    // Normalize: lowercase, strip spaces/hyphens/underscores for fuzzy matching
    const norm = slotName.toLowerCase().replace(/[\s\-_]+/g, "");

    // Numbered-less Ring/Trinket
    if (/^ring\d?$/.test(norm)) {
        ringCount++;
        return ringCount <= 1 ? "finger1" : "finger2";
    }
    if (/^trinket\d?$/.test(norm)) {
        trinketCount++;
        return trinketCount <= 1 ? "trinket1" : "trinket2";
    }

    // Weapon slots
    const weaponSlots = WEAPON_SLOTS[weaponType];
    const mainSlot = weaponSlots[0];
    const offSlot = weaponSlots.length > 1 ? weaponSlots[1] : null;

    // Two-Hand variants: "Two-Hand Weapon", "Two-Hand", "2h Weapon", "2H", etc.
    if (/twohand|^2h/.test(norm)) return mainSlot;
    // One-Hand variants: "One-Hand Weapon", "1h Weapon", "1H", etc.
    if (/onehand|^1h/.test(norm)) return mainSlot;
    // Off hand variants: "Off Hand", "Offhand", "Shield", "Weapon 2", "Weapon Off-Hand", etc.
    // (must check before main hand — "offhand" contains "hand")
    if (/offhand|shield|weapon2/.test(norm)) return offSlot || mainSlot;
    // Main hand variants: "Weapon", "Main Hand", "Mainhand", "Weapon 1", etc.
    if (/^weapon1?$|mainhand/.test(norm)) return mainSlot;

    return null;
}

function resetSlotCounters() {
    ringCount = 0;
    trinketCount = 0;
}

// ─── Spec registry ───────────────────────────────────────────
// weaponType is only set for specs with class-fixed weapon mechanics (dual wield, ranged).
// All other specs auto-detect from Maxroll data via detectWeaponType().
const SPECS = [
    // Death Knight
    {
        key: "blood-dk",
        label: "Blood Death Knight",
        simcClass: "deathknight",
        simcSpec: "blood",
        slug: "blood-death-knight",
        icon: "spell_deathknight_bloodpresence",
        accent: "#C41E3A",
    },
    {
        key: "frost-dk",
        label: "Frost Death Knight",
        simcClass: "deathknight",
        simcSpec: "frost",
        slug: "frost-death-knight",
        icon: "spell_deathknight_frostpresence",
        accent: "#4d9dca",
    },
    {
        key: "unholy-dk",
        label: "Unholy Death Knight",
        simcClass: "deathknight",
        simcSpec: "unholy",
        slug: "unholy-death-knight",
        icon: "spell_deathknight_unholypresence",
        accent: "#7a9b3a",
    },
    // Demon Hunter
    {
        key: "havoc-dh",
        label: "Havoc Demon Hunter",
        simcClass: "demonhunter",
        simcSpec: "havoc",
        slug: "havoc-demon-hunter",
        icon: "ability_demonhunter_specdps",
        weaponType: "dual",
        accent: "#A330C9",
    },
    {
        key: "devourer-dh",
        label: "Devourer Demon Hunter",
        simcClass: "demonhunter",
        simcSpec: "devourer",
        slug: "devourer-demon-hunter",
        icon: "classicon_demonhunter_void",
        weaponType: "dual",
        accent: "#ca30a3",
        mythicSuffix: "mythic-guide",
    },
    {
        key: "veng-dh",
        label: "Vengeance Demon Hunter",
        simcClass: "demonhunter",
        simcSpec: "vengeance",
        slug: "vengeance-demon-hunter",
        icon: "ability_demonhunter_spectank",
        weaponType: "dual",
        accent: "#4dca4d",
    },
    // Druid
    {
        key: "balance-druid",
        label: "Balance Druid",
        simcClass: "druid",
        simcSpec: "balance",
        slug: "balance-druid",
        icon: "spell_nature_starfall",
        accent: "#FF7C0A",
    },
    {
        key: "feral-druid",
        label: "Feral Druid",
        simcClass: "druid",
        simcSpec: "feral",
        slug: "feral-druid",
        icon: "ability_druid_catform",
        accent: "#d4a017",
    },
    {
        key: "guardian-druid",
        label: "Guardian Druid",
        simcClass: "druid",
        simcSpec: "guardian",
        slug: "guardian-druid",
        icon: "ability_racial_bearform",
        accent: "#ca7a3d",
    },
    {
        key: "resto-druid",
        label: "Restoration Druid",
        simcClass: "druid",
        simcSpec: "restoration",
        slug: "restoration-druid",
        icon: "spell_nature_healingtouch",
        accent: "#60d060",
    },
    // Evoker
    {
        key: "dev-evoker",
        label: "Devastation Evoker",
        simcClass: "evoker",
        simcSpec: "devastation",
        slug: "devastation-evoker",
        icon: "classicon_evoker_devastation",
        accent: "#29a8d4",
    },
    {
        key: "pres-evoker",
        label: "Preservation Evoker",
        simcClass: "evoker",
        simcSpec: "preservation",
        slug: "preservation-evoker",
        icon: "classicon_evoker_preservation",
        accent: "#60ca8b",
    },
    {
        key: "aug-evoker",
        label: "Augmentation Evoker",
        simcClass: "evoker",
        simcSpec: "augmentation",
        slug: "augmentation-evoker",
        icon: "classicon_evoker_augmentation",
        accent: "#6b4dca",
    },
    // Hunter
    {
        key: "bm-hunter",
        label: "Beast Mastery Hunter",
        simcClass: "hunter",
        simcSpec: "beastmastery",
        slug: "beast-mastery-hunter",
        icon: "ability_hunter_bestialdiscipline",
        weaponType: "ranged",
        accent: "#AAD372",
    },
    {
        key: "mm-hunter",
        label: "Marksmanship Hunter",
        simcClass: "hunter",
        simcSpec: "marksmanship",
        slug: "marksmanship-hunter",
        icon: "ability_hunter_focusedaim",
        weaponType: "ranged",
        accent: "#71b040",
    },
    {
        key: "surv-hunter",
        label: "Survival Hunter",
        simcClass: "hunter",
        simcSpec: "survival",
        slug: "survival-hunter",
        icon: "ability_hunter_camouflage",
        accent: "#d4aa60",
    },
    // Mage
    {
        key: "arcane-mage",
        label: "Arcane Mage",
        simcClass: "mage",
        simcSpec: "arcane",
        slug: "arcane-mage",
        icon: "spell_holy_magicalsentry",
        accent: "#69CCF0",
    },
    {
        key: "fire-mage",
        label: "Fire Mage",
        simcClass: "mage",
        simcSpec: "fire",
        slug: "fire-mage",
        icon: "spell_fire_firebolt02",
        accent: "#ca5030",
    },
    {
        key: "frost-mage",
        label: "Frost Mage",
        simcClass: "mage",
        simcSpec: "frost",
        slug: "frost-mage",
        icon: "spell_frost_frostbolt02",
        accent: "#3FC7EB",
    },
    // Monk
    {
        key: "brew-monk",
        label: "Brewmaster Monk",
        simcClass: "monk",
        simcSpec: "brewmaster",
        slug: "brewmaster-monk",
        icon: "spell_monk_brewmaster_spec",
        accent: "#00AA60",
    },
    {
        key: "ww-monk",
        label: "Windwalker Monk",
        simcClass: "monk",
        simcSpec: "windwalker",
        slug: "windwalker-monk",
        icon: "spell_monk_windwalker_spec",
        weaponType: "dual",
        accent: "#00FF98",
    },
    {
        key: "mw-monk",
        label: "Mistweaver Monk",
        simcClass: "monk",
        simcSpec: "mistweaver",
        slug: "mistweaver-monk",
        icon: "spell_monk_mistweaver_spec",
        accent: "#60d0a0",
    },
    // Paladin
    {
        key: "holy-paladin",
        label: "Holy Paladin",
        simcClass: "paladin",
        simcSpec: "holy",
        slug: "holy-paladin",
        icon: "spell_holy_holybolt",
        accent: "#F48CBA",
    },
    {
        key: "prot-paladin",
        label: "Protection Paladin",
        simcClass: "paladin",
        simcSpec: "protection",
        slug: "protection-paladin",
        icon: "ability_paladin_shieldofthetemplar",
        accent: "#c9a227",
    },
    {
        key: "ret-paladin",
        label: "Retribution Paladin",
        simcClass: "paladin",
        simcSpec: "retribution",
        slug: "retribution-paladin",
        icon: "spell_holy_auraoflight",
        accent: "#e06060",
    },
    // Priest
    {
        key: "disc-priest",
        label: "Discipline Priest",
        simcClass: "priest",
        simcSpec: "discipline",
        slug: "discipline-priest",
        icon: "spell_holy_powerwordshield",
        accent: "#b0b0b0",
    },
    {
        key: "holy-priest",
        label: "Holy Priest",
        simcClass: "priest",
        simcSpec: "holy",
        slug: "holy-priest",
        icon: "spell_holy_guardianspirit",
        accent: "#e0e0e0",
    },
    {
        key: "shadow-priest",
        label: "Shadow Priest",
        simcClass: "priest",
        simcSpec: "shadow",
        slug: "shadow-priest",
        icon: "spell_shadow_shadowwordpain",
        accent: "#8080ca",
    },
    // Rogue
    {
        key: "assa-rogue",
        label: "Assassination Rogue",
        simcClass: "rogue",
        simcSpec: "assassination",
        slug: "assassination-rogue",
        icon: "ability_rogue_deadlybrew",
        weaponType: "dual",
        accent: "#d0c060",
    },
    {
        key: "outlaw-rogue",
        label: "Outlaw Rogue",
        simcClass: "rogue",
        simcSpec: "outlaw",
        slug: "outlaw-rogue",
        icon: "ability_rogue_waylay",
        weaponType: "dual",
        accent: "#FFF468",
    },
    {
        key: "sub-rogue",
        label: "Subtlety Rogue",
        simcClass: "rogue",
        simcSpec: "subtlety",
        slug: "subtlety-rogue",
        icon: "ability_stealth",
        weaponType: "dual",
        accent: "#ca9060",
    },
    // Shaman
    {
        key: "ele-shaman",
        label: "Elemental Shaman",
        simcClass: "shaman",
        simcSpec: "elemental",
        slug: "elemental-shaman",
        icon: "spell_nature_lightning",
        accent: "#0070DD",
    },
    {
        key: "enh-shaman",
        label: "Enhancement Shaman",
        simcClass: "shaman",
        simcSpec: "enhancement",
        slug: "enhancement-shaman",
        icon: "spell_shaman_improvedstormstrike",
        weaponType: "dual",
        accent: "#2090dd",
    },
    {
        key: "resto-shaman",
        label: "Restoration Shaman",
        simcClass: "shaman",
        simcSpec: "restoration",
        slug: "restoration-shaman",
        icon: "spell_nature_magicimmunity",
        accent: "#40a0e0",
    },
    // Warlock
    {
        key: "aff-lock",
        label: "Affliction Warlock",
        simcClass: "warlock",
        simcSpec: "affliction",
        slug: "affliction-warlock",
        icon: "spell_shadow_deathcoil",
        accent: "#8788EE",
    },
    {
        key: "demo-lock",
        label: "Demonology Warlock",
        simcClass: "warlock",
        simcSpec: "demonology",
        slug: "demonology-warlock",
        icon: "spell_shadow_metamorphosis",
        accent: "#6d6dca",
    },
    {
        key: "destro-lock",
        label: "Destruction Warlock",
        simcClass: "warlock",
        simcSpec: "destruction",
        slug: "destruction-warlock",
        icon: "spell_shadow_rainoffire",
        accent: "#ca4d4d",
    },
    // Warrior
    {
        key: "arms-warrior",
        label: "Arms Warrior",
        simcClass: "warrior",
        simcSpec: "arms",
        slug: "arms-warrior",
        icon: "ability_warrior_savageblow",
        accent: "#C69B6D",
    },
    {
        key: "fury-warrior",
        label: "Fury Warrior",
        simcClass: "warrior",
        simcSpec: "fury",
        slug: "fury-warrior",
        icon: "ability_warrior_innerrage",
        weaponType: "dual",
        accent: "#ca6040",
    },
    {
        key: "prot-warrior",
        label: "Protection Warrior",
        simcClass: "warrior",
        simcSpec: "protection",
        slug: "protection-warrior",
        icon: "ability_warrior_defensivestance",
        accent: "#8b7040",
    },
];

// ─── Theme generation ────────────────────────────────────────
function makeTheme(accent) {
    // Derive colors from accent
    const hex = accent.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const lighter = (v, f) => Math.min(255, Math.round(v + (255 - v) * f));
    const darker = (v, f) => Math.round(v * f);

    const lr = lighter(r, 0.4),
        lg = lighter(g, 0.4),
        lb = lighter(b, 0.4);
    const dr = darker(r, 0.15),
        dg = darker(g, 0.15),
        db = darker(b, 0.15);
    const br = darker(r, 0.35),
        bg2 = darker(g, 0.35),
        bb = darker(b, 0.35);
    const sr = darker(r, 0.6),
        sg = darker(g, 0.6),
        sb = darker(b, 0.6);

    const toHex = (rv, gv, bv) =>
        "#" + [rv, gv, bv].map((v) => v.toString(16).padStart(2, "0")).join("");

    return {
        accent,
        accentLight: toHex(lr, lg, lb),
        accentBg: toHex(dr, dg, db),
        accentBorder: toHex(br, bg2, bb),
        shimmer: `linear-gradient(90deg,${toHex(sr, sg, sb)},${accent},${toHex(lr, lg, lb)},${accent},${toHex(sr, sg, sb)})`,
        btnBg: `linear-gradient(135deg,${toHex(sr, sg, sb)},${accent})`,
    };
}

// ─── Storage/cache key generation ────────────────────────────
function storageKey(key) {
    const short = key.replace(/-/g, "-");
    return `bis-${short}-v1`;
}
function statCacheKey(key) {
    return `${key}-stat-cache-v1`;
}

// ─── Maxroll.gg scraper ──────────────────────────────────────
// mxt-stat-{id} class → stat key (WoW rating IDs)
var MXT_STAT_MAP = { 32: "crit", 36: "haste", 49: "mastery", 40: "vers" };
function parseStatPriority(html) {
    const $ = load(html);
    const embed = $(".mxt-StatPriorityEmbed");
    if (!embed.length) return null;
    const priority = [];
    embed.find('[class*="mxt-stat-"]').each((_, el) => {
        const cls = $(el).attr("class") || "";
        const m = cls.match(/mxt-stat-(\d+)/);
        if (!m) return;
        const key = MXT_STAT_MAP[parseInt(m[1])];
        if (key && !priority.includes(key)) priority.push(key);
    });
    return priority.length === 4 ? priority : null;
}

function parseGearTables(html) {
    const $ = load(html);
    const gearTables = [];
    $("table").each((_, table) => {
        const headers = [];
        $(table)
            .find("thead th, tr:first-child th")
            .each((__, th) => {
                headers.push($(th).text().trim());
            });
        if (
            headers.includes("Slot") &&
            headers.includes("Item") &&
            headers.includes("Location")
        ) {
            const rows = [];
            $(table)
                .find("tbody tr, tr")
                .each((ri, tr) => {
                    const cells = [];
                    $(tr)
                        .find("td")
                        .each((__, td) => {
                            cells.push($(td).text().trim());
                        });
                    if (cells.length >= 3) rows.push(cells);
                });
            gearTables.push(rows);
        }
    });
    return gearTables;
}

function isDungeonSource(raw) {
    // Normalize fully (handles PART_FIXES, Vault stripping, & splitting, etc.)
    const normalized = normalizeSource(raw);
    // Check if result is a known dungeon or all & parts are dungeons
    if (VALID_DUNGEONS.includes(normalized)) return true;
    if (normalized.includes(" & ")) {
        return normalized
            .split(" & ")
            .every((p) => VALID_DUNGEONS.includes(p.trim()));
    }
    return false;
}

function isDungeonTable(rows) {
    // Allow up to 2 non-dungeon sources (maxroll data errors)
    const nonDungeon = rows.filter((r) => !isDungeonSource(r[2]));
    return nonDungeon.length <= 2;
}

// Season 2 writes catalyst rows as "Convert <base item> into <tier item>".
// Wowhead's search returns nothing for that whole sentence, and buildGearData
// drops rows it cannot resolve — silently, so a spec just comes out short a
// few slots. The tier item on the right is the BiS one; the base item on the
// left shows up on its own in the farmable table, so nothing is lost.
//
// The separator is not reliably spaced: Maxroll's markup glues it to the
// preceding word ("...Pauldronsinto Pauldrons of..."), hence \s* not \s+.
function resolveCatalystItemName(name) {
    const m = name.match(/^Convert\s+(.+?)\s*into\s+(.+)$/i);
    if (!m) return name;
    console.log(`    Catalyst row: "${m[1].trim()}" → "${m[2].trim()}"`);
    return m[2].trim();
}

function toGearRows(rows) {
    return rows.map((r) => ({
        slotName: r[0],
        itemName: resolveCatalystItemName(r[1]),
        source: normalizeSource(r[2]),
    }));
}

// ─── Source normalization (shared by generation + --fix) ─────
// NOTE: bare "Catalyst" is deliberately absent — Catalyst also produces
// non-tier embellishment items (e.g. waist/feet slots with no set bonus),
// so it cannot be assumed to mean "Tier" from text alone. Real Tier-set
// detection happens via the item's Wowhead "item-set=" marker (see
// hasItemSet/TIER_SLOTS) at generation time and in normalizeDataFiles.
const SOURCE_FIXES = {
    "Tier Set": "Tier",
    "Tier/Catalyst": "Tier",
    "Tier / Catalyst": "Tier",
    Craft: "Crafted",
    Crafting: "Crafted",
    Blacksmithing: "Crafted",
    Leatherworking: "Crafted",
    Tailoring: "Crafted",
    Jewelcrafting: "Crafted",
};

// Aliases and typos seen in Maxroll's own tables. Season-specific: every
// entry here names something in the CURRENT pool, so this map has to be
// rebuilt on a season swap. Leaving stale entries is actively dangerous —
// Season 1 mapped "Murder Row" and "Den of Nalorakk" onto Magisters' Terrace,
// and both are standalone dungeons in Season 2.
//
// Raid boss names are deliberately absent: they pass through untouched and
// become non-dungeon sources, which is how Season 1 surfaced raid drops too.
// Empty for Season 2 so far: normalizeDungeon already absorbs the casing slip
// Maxroll makes ("Den Of Nalorakk" alongside "Den of Nalorakk", in one table),
// the curly-apostrophe variants, and missing articles. Add entries here only
// for inconsistencies the regeneration run actually surfaces.
const PART_FIXES = {};

// Season 2 labels catalyst conversions "Catalyst of <source>", where the
// source is where the base item drops — a dungeon, or a raid boss such as
// "Catalyst of The Coiled Altar". Either way that is the farm location worth
// showing. Tier pieces get overridden to "Tier" later, via the item-set marker.
function stripCatalystOf(s) {
    const m = s.match(/^Catalyst of\s+(.+)$/i);
    return m ? normalizeDungeon(m[1].trim()) : s;
}

function normalizeSourcePart(part) {
    const trimmed = stripCatalystOf(part.trim());
    if (PART_FIXES[trimmed]) return PART_FIXES[trimmed];
    const noTier = trimmed.replace(/\s+Tier$/i, "");
    if (noTier !== trimmed) {
        if (PART_FIXES[noTier]) return PART_FIXES[noTier];
        return noTier;
    }
    const d = normalizeDungeon(trimmed);
    if (VALID_DUNGEONS.includes(d)) return d;
    return trimmed;
}

function normalizeSource(rawInput) {
    const raw = stripCatalystOf(rawInput.trim());
    if (SOURCE_FIXES[raw]) return SOURCE_FIXES[raw];
    if (PART_FIXES[raw]) return PART_FIXES[raw];
    const whole = normalizeDungeon(raw);
    if (VALID_DUNGEONS.includes(whole)) return whole;

    if (raw.includes("/")) {
        const parts = raw.split(/\s*\/\s*/);
        const normalized = parts
            .map((p) => normalizeSourcePart(p))
            .filter(
                (p) =>
                    !/^(The )?Great Vault$/i.test(p) &&
                    !/^Vault$/i.test(p) &&
                    !/^Catalyst$/i.test(p) &&
                    !/^Tier$/i.test(p) &&
                    !/^Raid$/i.test(p),
            );
        const unique = [...new Set(normalized)];
        const result = unique.join(" / ");
        if (result && result !== raw) return result;
    }

    if (raw.includes(" & ")) {
        const parts = raw.split(" & ");
        const normalized = parts.map((p) => normalizeSourcePart(p));
        const result = normalized.join(" & ");
        if (result !== raw) return result;
    }

    const single = normalizeSourcePart(raw);
    if (single !== raw) return single;

    return raw;
}

async function fetchMaxrollGearTables(slug, urlSuffix = "mythic-plus-guide") {
    const url = `https://maxroll.gg/wow/class-guides/${slug}-${urlSuffix}`;
    console.log(`  Fetching ${url}...`);
    let res;
    for (let i = 0; i < 4; i++) {
        res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; BiSTracker/1.0)",
            },
        });
        if (res.status === 403 || res.status === 429) {
            const wait = Math.min(60000 * Math.pow(2, i), 300000);
            console.log(
                `  ${res.status} rate limited, retrying in ${(wait / 1000).toFixed(0)}s... (${i + 1}/4)`,
            );
            await delay(wait);
            continue;
        }
        break;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const html = await res.text();
    const gearTables = parseGearTables(html);

    // Identify the BiS table (may contain raid, crafted and catalyst sources)
    // and the Farmable table (dungeon drops only).
    let bisTable = null;
    let farmableTable = null;

    // Maxroll lays both guides out as BiS first, Farmable Alternatives second.
    // Trust that when there are exactly two: the source-based guess misfires
    // on a dungeon-heavy BiS table, and its failure mode is a spec file
    // written with no BIS array at all, which is silent across 40 specs.
    const sized = gearTables.filter((rows) => rows.length >= 14);
    if (sized.length === 2) {
        console.log("  Tables: by position (BiS, Farmable)");
        bisTable = sized[0];
        farmableTable = sized[1];
    } else {
        console.log(`  Tables: by source (${sized.length} sized tables found)`);
        for (const rows of sized) {
            if (isDungeonTable(rows)) {
                if (!farmableTable) farmableTable = rows;
            } else {
                if (!bisTable) bisTable = rows;
            }
        }
    }

    // Fallback: if only one table found, it's farmable
    if (!farmableTable && !bisTable && gearTables.length >= 1) {
        farmableTable = gearTables[0];
    }
    if (!farmableTable && bisTable) {
        // No separate farmable table — extract dungeon-only items from BiS
        farmableTable = null;
    }

    return {
        bis: bisTable ? toGearRows(bisTable) : null,
        farmable: farmableTable ? toGearRows(farmableTable) : null,
        statPriority: parseStatPriority(html),
    };
}

// Legacy wrapper for backward compatibility
async function fetchMaxrollBis(slug, urlSuffix = "mythic-plus-guide") {
    const { farmable, bis } = await fetchMaxrollGearTables(slug, urlSuffix);
    const rows = farmable || bis;
    if (!rows) throw new Error(`No gear table found for ${slug}`);
    return rows;
}

function normalizeDungeon(raw) {
    // Strip suffixes: "(Vault)", "/ Vault", etc.
    const stripped = raw.replace(/\s*[(/]\s*Vault\s*\)?$/i, "").trim();
    // Normalize: strip apostrophes, collapse a/e variants, lowercase.
    // The a/e collapse also turns "the" into "tha", which dropArticle below
    // depends on — the two are coupled, so do not remove one without the other.
    const normalize = (s) =>
        s.replace(/['’]/g, "").toLowerCase().replace(/[ae]/g, "a");
    const norm = normalize(stripped);
    for (const d of VALID_DUNGEONS) {
        if (normalize(d) === norm) return d;
    }
    // Handle missing articles, leading ("Blinding Vale" for "The Blinding Vale")
    // and internal ("Seat of Triumvirate"). Matches on the collapsed form, so
    // the article reads as "tha" here, not "the".
    const dropArticle = (s) => s.replace(/^tha /, "").replace(/ tha /g, " ");
    for (const d of VALID_DUNGEONS) {
        if (dropArticle(normalize(d)) === dropArticle(norm)) return d;
    }
    return raw;
}

// ─── Item name fixes (maxroll typos) ─────────────────────────
const ITEM_NAME_FIXES = {
    "Occulsion of Void": "Occlusion of Void",
    "Deciever's Rotbow": "Deceiver's Rotbow",
};

// Items with "&" (dual wield) need to be split
function splitDualWeaponName(name) {
    if (name.includes(" & ")) return name.split(" & ").map((s) => s.trim());
    return [name];
}

// ─── Wowhead APIs ────────────────────────────────────────────
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, opts = {}, retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible; BiSTracker/1.0)",
                },
                ...opts,
            });
            if (res.status === 403 || res.status === 429) {
                const wait = Math.min(60000 * Math.pow(2, i), 300000);
                console.log(
                    `      ${res.status} rate limited, retrying in ${(wait / 1000).toFixed(0)}s... (${i + 1}/${retries})`,
                );
                await delay(wait);
                continue;
            }
            if (!res.ok) {
                if (i < retries - 1) {
                    await delay(3000 * (i + 1));
                    continue;
                }
                throw new Error(`HTTP ${res.status}`);
            }
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch {
                const wait = Math.min(60000 * Math.pow(2, i), 300000);
                if (i < retries - 1) {
                    console.log(
                        `      Non-JSON response, retrying in ${(wait / 1000).toFixed(0)}s... (${i + 1}/${retries})`,
                    );
                    await delay(wait);
                    continue;
                }
                throw new Error(`Non-JSON response from ${url}`);
            }
        } catch (err) {
            if (
                err.message.includes("rate limited") ||
                err.message.includes("Non-JSON")
            )
                throw err;
            if (i < retries - 1) {
                await delay(3000 * (i + 1));
                continue;
            }
            throw err;
        }
    }
}

// Track whether the last call made a network request
let lastSearchWasNetwork = false;

async function searchItemId(name) {
    // Apply name fixes
    const fixedName = ITEM_NAME_FIXES[name] || name;
    const cacheKey = `search:${fixedName}`;
    const cached = cacheGet(cacheKey);
    if (cached !== null) {
        lastSearchWasNetwork = false;
        return cached;
    }

    lastSearchWasNetwork = true;
    const url = `https://www.wowhead.com/search/suggestions-template?id=items&q=${encodeURIComponent(fixedName)}`;
    const data = await fetchWithRetry(url);
    if (!data.results || data.results.length === 0) {
        console.warn(`    WARNING: No results for "${fixedName}"`);
        return null;
    }
    // Prefer an exact name match. Wowhead's search is fuzzy, so a query it
    // does not really know still comes back with a plausible-looking wrong
    // item — and with a whole season of unfamiliar names, nothing downstream
    // would catch that. Warn rather than reject: some names legitimately
    // differ, and a logged line is reviewable where a silent swap is not.
    const norm = (s) => s.toLowerCase().replace(/['’]/g, "").trim();
    const exact = data.results.filter((r) => norm(r.name) === norm(fixedName));
    const pool = exact.length ? exact : data.results;
    if (!exact.length) {
        console.warn(
            `    WARNING: no exact match for "${fixedName}" — using "${data.results[0].name}"`,
        );
    }
    // Season 2 revives legacy dungeons, and Wowhead's search index still
    // reports some of those items at their original rare quality, so a
    // missing quality-4 hit is not by itself a problem.
    const epic = pool.find((r) => r.quality === 4);
    const id = (epic || pool[0]).id;
    cacheSet(cacheKey, id);
    return id;
}

// Tier-set armor always occupies these 5 slots. Combined with the
// per-spec set-bonus marker below, this gives a per-item ground truth
// instead of guessing from Maxroll's free-text source label
// ("Catalyst", "Tier / Catalyst", etc).
const TIER_SLOTS = new Set(["head", "shoulder", "chest", "hands", "legs"]);

// A bare "/item-set=" link isn't enough — Wowhead uses it for any item
// set, including old legacy dungeon sets and crafted embellishment sets
// that have nothing to do with the current class tier system (verified:
// a legacy 2pc ring set and a 3pc crafted embellishment set both carry
// "/item-set=" but neither is Tier). Two things are true of every real
// class tier set and only real class tier sets:
//   1. Per-spec set bonus text ("(2) Set Holy:" / "(2) Set Protection:"),
//      rendered as "itemeffectspecNN:" HTML comments.
//   2. Always exactly a 5-piece set (head/shoulder/chest/hands/legs),
//      shown as "(0/5)" next to the set link.
// Require both so a hypothetical non-5-piece item with spec-conditional
// text (or vice versa) can't slip through on either signal alone.
function hasItemSet(tooltipHtml) {
    return (
        /itemeffectspec\d+:/.test(tooltipHtml) &&
        /\(\d+\/5\)/.test(tooltipHtml)
    );
}

async function fetchItemTooltip(id) {
    // Fetch both locales to populate cache (used by generate-item-names)
    await fetchTooltip(id, 1); // Korean — cached for item name generation

    // Stats from English tooltip
    const enData = await fetchTooltip(id, 0);
    const tooltip = enData.tooltip || "";
    const stats = [];
    if (tooltip.includes("<!--rtg32-->")) stats.push("crit");
    if (tooltip.includes("<!--rtg36-->")) stats.push("haste");
    if (tooltip.includes("<!--rtg49-->")) stats.push("mastery");
    if (tooltip.includes("<!--rtg40-->")) stats.push("vers");

    return { stats, isTier: hasItemSet(tooltip) };
}

// Detect weapon type from Maxroll gear table slot names.
// First weapon-related slot encountered determines the type.
function detectWeaponType(gearRows) {
    for (const row of gearRows) {
        const norm = row.slotName.toLowerCase().replace(/[\s\-_]+/g, "");
        if (/shield/.test(norm)) return "1h+shield";
        if (/^(twohand|2h)(weapon)?$/.test(norm)) return "2h";
        if (/^(onehand|1h)(weapon)?$/.test(norm) || /offhand/.test(norm))
            return "1h+oh";
    }
    return "2h"; // single "Weapon"/"Main Hand" = 2H
}

// ─── Build gear array from parsed rows ──────────────────────
async function buildGearData(gearRows, weaponType) {
    if (!weaponType) weaponType = detectWeaponType(gearRows);
    const items = [];
    const skippedWeapons = []; // 2H/1H alternatives skipped due to weapon type mismatch
    const knownStats = {};
    resetSlotCounters();

    // Pre-analyze: check if both 2H and 1H weapon slots exist
    const slotNames = gearRows.map((r) => r.slotName);
    const normSlots = slotNames.map((s) =>
        s.toLowerCase().replace(/[\s\-_]+/g, ""),
    );
    const has2H = normSlots.some((s) => /^(twohand|2h)(weapon)?$/.test(s));
    const has1H = normSlots.some((s) => /^(onehand|1h)(weapon)?$/.test(s));
    // Skip 2H if both options exist and spec is not 2H (and vice versa)
    const skipTwoHand = has2H && has1H && weaponType !== "2h";
    const skipOneHand = has2H && has1H && weaponType === "2h";

    for (const row of gearRows) {
        const slotName = row.slotName;

        // Handle dual weapon entries like "Mystakria's Harvester & Soulblight Cleaver"
        const itemNames = splitDualWeaponName(row.itemName);

        if (itemNames.length === 2) {
            // Dual wield: first = main_hand, second = off_hand
            const weaponSlots = WEAPON_SLOTS[weaponType];
            for (let wi = 0; wi < 2; wi++) {
                const name = itemNames[wi];
                const slot = weaponSlots[wi] || weaponSlots[0];
                const id = await searchItemId(name);
                if (lastSearchWasNetwork)
                    console.log(`    Looking up: ${name}...`);
                if (!id) continue;
                if (lastSearchWasNetwork) await delay(200);
                const { stats } = await fetchItemTooltip(id);
                items.push({
                    slot,
                    id,
                    source: row.source,
                    stats,
                });
                knownStats[id] = stats;
                if (lastSearchWasNetwork) await delay(200);
            }
            continue;
        }

        // Collect skipped weapon alternatives for ALTS
        const normSlotName = slotName.toLowerCase().replace(/[\s\-_]+/g, "");
        const isSkipped2H = /twohand|^2h/.test(normSlotName) && skipTwoHand;
        const isSkipped1H = /onehand|^1h/.test(normSlotName) && skipOneHand;
        if (isSkipped2H || isSkipped1H) {
            skippedWeapons.push(row);
            continue;
        }

        const itemName = ITEM_NAME_FIXES[row.itemName] || row.itemName;
        const id = await searchItemId(itemName);
        if (lastSearchWasNetwork) console.log(`    Looking up: ${itemName}...`);
        if (!id) continue;

        if (lastSearchWasNetwork) await delay(200);
        const { stats, isTier } = await fetchItemTooltip(id);

        const slot = resolveSlot(slotName, weaponType);
        if (!slot) {
            console.warn(`    WARNING: Unknown slot "${slotName}", skipping`);
            continue;
        }

        items.push({
            slot,
            id,
            source: isTier && TIER_SLOTS.has(slot) ? "Tier" : row.source,
            stats,
        });
        knownStats[id] = stats;

        if (lastSearchWasNetwork) await delay(200);
    }

    // Post-process: for dual wield specs, if only main_hand exists, duplicate as off_hand
    if (
        weaponType === "dual" &&
        items.some((b) => b.slot === "main_hand") &&
        !items.some((b) => b.slot === "off_hand")
    ) {
        const mainWeapon = items.find((b) => b.slot === "main_hand");
        items.push({ ...mainWeapon, slot: "off_hand" });
    }

    // Post-process: remove duplicate slot entries (keep first)
    const seenSlots = new Set();
    const deduped = [];
    for (const item of items) {
        if (seenSlots.has(item.slot)) continue;
        seenSlots.add(item.slot);
        deduped.push(item);
    }

    // Resolve skipped weapon alternatives (for ALTS)
    const skippedItems = [];
    for (const row of skippedWeapons) {
        const itemName = ITEM_NAME_FIXES[row.itemName] || row.itemName;
        const id = await searchItemId(itemName);
        if (lastSearchWasNetwork)
            console.log(`    Looking up (alt weapon): ${itemName}...`);
        if (!id) continue;
        if (lastSearchWasNetwork) await delay(200);
        const { stats } = await fetchItemTooltip(id);
        skippedItems.push({
            forSlot: "weapon",
            id,
            source: row.source,
            stats,
        });
        knownStats[id] = stats;
        if (lastSearchWasNetwork) await delay(200);
    }

    return { items: deduped, knownStats, skippedWeapons: skippedItems };
}

// Legacy wrapper
async function buildBisData(farmableRows, weaponType) {
    // Convert legacy format (dungeon field) to new format (source field)
    const rows = farmableRows.map((r) => ({
        slotName: r.slotName,
        itemName: r.itemName,
        source: r.source || r.dungeon,
    }));
    const { items, knownStats } = await buildGearData(rows, weaponType);
    // Map back to legacy format with dungeon field
    const bis = items.map((i) => ({ ...i, dungeon: i.source }));
    return { bis, knownStats };
}

// ─── Generate JS file content ────────────────────────────────
function generateItemLine(item) {
    return `  { slot: ${JSON.stringify(item.slot)}, id: ${item.id}, source: ${JSON.stringify(item.source)}, stats: ${JSON.stringify(item.stats)} },\n`;
}


function generateFullJs(
    spec,
    bisItems,
    mythicItems,
    knownStats,
    altsStr,
    priorityStatsOverride,
) {
    const theme = makeTheme(spec.accent);
    const allItems = [...(bisItems || []), ...(mythicItems || [])];
    const nonDungeonSources = [
        ...new Set(
            (bisItems || [])
                .map((b) => b.source)
                .filter((s) => !isDungeonSource(s)),
        ),
    ];

    const specLabel = spec.label;

    let out = "";
    out += `export var SPEC_LABEL = ${JSON.stringify(specLabel)};\n`;
    out += `export var SPEC_KEY = ${JSON.stringify(spec.key)};\n`;
    const guideUrl = `https://maxroll.gg/wow/class-guides/${spec.slug}-raid-guide`;
    out += `export var GUIDE_URL = ${JSON.stringify(guideUrl)};\n`;
    out += `export var SIMC_CLASS = ${JSON.stringify(spec.simcClass)};\n`;
    out += `export var SIMC_SPEC = ${JSON.stringify(spec.simcSpec)};\n`;
    out += `export var SPEC_ICON = ${JSON.stringify(spec.icon)};\n`;
    out += `export var STORAGE_KEY = ${JSON.stringify(storageKey(spec.key))};\n`;
    out += "\n";
    out += `export var THEME = {\n`;
    out += `  accent: ${JSON.stringify(theme.accent)},\n`;
    out += `  accentLight: ${JSON.stringify(theme.accentLight)},\n`;
    out += `  accentBg: ${JSON.stringify(theme.accentBg)},\n`;
    out += `  accentBorder: ${JSON.stringify(theme.accentBorder)},\n`;
    out += `  shimmer: ${JSON.stringify(theme.shimmer)},\n`;
    out += `  btnBg: ${JSON.stringify(theme.btnBg)},\n`;
    out += `};\n`;
    out += "\n";

    // BIS (true best in slot — may include raid, crafting, catalyst sources)
    if (bisItems && bisItems.length > 0) {
        out += `export var BIS = [\n`;
        for (const item of bisItems) out += generateItemLine(item);
        out += `];\n`;
    } else {
        out += `export var BIS = [];\n`;
    }
    out += "\n";

    // MYTHIC (farmable dungeon alternatives)
    if (mythicItems && mythicItems.length > 0) {
        out += `export var MYTHIC = [\n`;
        for (const item of mythicItems) out += generateItemLine(item);
        out += `];\n`;
    } else {
        out += `export var MYTHIC = [];\n`;
    }
    out += "\n";

    // ALTS (preserved from existing file, populated by find-alts)
    if (altsStr) {
        out += altsStr + "\n";
    } else {
        out += `export var ALTS = [];\n`;
    }
    out += "\n";

    // PRIORITY_STATS — from Maxroll guide; preserved if widget not found; [] if unknown
    out += `export var PRIORITY_STATS = ${priorityStatsOverride && priorityStatsOverride.length ? JSON.stringify(priorityStatsOverride) : "[]"};\n`;
    out += "\n";

    out += `export var STAT_CACHE_KEY = ${JSON.stringify(statCacheKey(spec.key))};\n`;
    out += "\n";

    // KNOWN_STATS
    out += `export var KNOWN_STATS = {\n`;
    const entries = Object.entries(knownStats);
    const perLine = 4;
    for (let i = 0; i < entries.length; i += perLine) {
        const chunk = entries.slice(i, i + perLine);
        out += `  ${chunk.map(([id, stats]) => `${id}:${JSON.stringify(stats)}`).join(",")},\n`;
    }
    out += `};\n`;
    out += "\n";

    return out;
}

// ─── Resolve duplicate IDs using existing file data ─────────
// When Maxroll has the same item ID in multiple slots (data error),
// prefer the existing file's item for the duplicate slot.
function resolveDuplicateIds(items, existingItems, label) {
    const seenIds = new Map();
    const dupSlots = new Set();
    for (const item of items) {
        if (seenIds.has(item.id)) {
            const prev = seenIds.get(item.id);
            const isWeaponPair =
                (prev.slot === "main_hand" && item.slot === "off_hand") ||
                (prev.slot === "off_hand" && item.slot === "main_hand");
            if (!isWeaponPair) {
                console.warn(
                    `    ⚠ ${label} DUPLICATE ID ${item.id}: (${prev.slot}) and (${item.slot})`,
                );
                dupSlots.add(item.slot);
            }
        } else {
            seenIds.set(item.id, item);
        }
    }
    if (dupSlots.size === 0) return items;

    // Replace duplicate-slot items with existing file's version
    const existingBySlot = new Map(existingItems.map((i) => [i.slot, i]));
    return items.map((item) => {
        if (!dupSlots.has(item.slot)) return item;
        const existing = existingBySlot.get(item.slot);
        if (existing && existing.id !== item.id) {
            console.log(
                `    → Using existing ${item.slot}: ${existing.id} instead of duplicate`,
            );
            return existing;
        }
        console.warn(
            `    → No existing override for ${item.slot}, keeping duplicate`,
        );
        return item;
    });
}

// ─── Preserve sections from existing file ─────────────────
function readPreservedSection(specKey, varName) {
    const path = resolve(DATA_DIR, `${specKey}.js`);
    if (!existsSync(path)) return null;
    const content = readFileSync(path, "utf8");
    if (varName === "PRIORITY_STATS") {
        const match = content.match(
            new RegExp(`export var ${varName} = \\[([^\\]]*)\\];`),
        );
        if (match && match[1].trim().length > 0) {
            return `export var ${varName} = [${match[1]}];`;
        }
        return null;
    }
    const match = content.match(
        new RegExp(`export var ${varName} = \\[([^]*?)\\];`),
    );
    if (match && match[1].trim().length > 0) {
        return `export var ${varName} = [${match[1]}];`;
    }
    return null;
}

// ─── Compare crawled data with existing file ─────────────────
function extractExistingNames(content, varName) {
    const m = content.match(
        new RegExp(`export var ${varName} = \\[([^]*?)\\];`),
    );
    if (!m) return [];
    const names = new Set();
    const re = /en:\s*"([^"]+)"/g;
    let match;
    while ((match = re.exec(m[1]))) names.add(match[1]);
    return [...names].sort();
}

function rowNames(rows) {
    if (!rows) return [];
    return [
        ...new Set(rows.flatMap((r) => splitDualWeaponName(r.itemName))),
    ].sort();
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
}

// ─── Main ────────────────────────────────────────────────────
async function processSpec(spec, { force = false } = {}) {
    console.log(`\n=== Processing ${spec.key} (${spec.label}) ===`);

    try {
        // Fetch BIS from raid-guide, MYTHIC from mythic-plus-guide (separate sources)
        const bisSuffix = "raid-guide";
        const mythicSuffix = spec.mythicSuffix || "mythic-plus-guide";

        const { bis: bisRows, statPriority: fetchedPriority } =
            await fetchMaxrollGearTables(spec.slug, bisSuffix);
        const { farmable: farmableRows } = await fetchMaxrollGearTables(
            spec.slug,
            mythicSuffix,
        );

        // Fail loudly rather than writing a spec file with a missing array.
        // Downstream this only shows up as a length check quietly going false.
        if (!bisRows) throw new Error(`No BiS table found on ${bisSuffix}`);
        if (!farmableRows)
            throw new Error(`No farmable table found on ${mythicSuffix}`);

        // Compare crawled data with existing file — skip Wowhead lookups if unchanged
        const existingPath = resolve(DATA_DIR, `${spec.key}.js`);
        if (existsSync(existingPath)) {
            const existing = readFileSync(existingPath, "utf8");
            const existingBis = extractExistingNames(existing, "BIS");
            const existingMythic = extractExistingNames(existing, "MYTHIC");
            const crawledBis = rowNames(bisRows);
            const crawledMythic = rowNames(farmableRows);

            const bisMatch = arraysEqual(existingBis, crawledBis);
            const mythicMatch = arraysEqual(existingMythic, crawledMythic);

            if (
                !force &&
                bisMatch &&
                mythicMatch &&
                existingBis.length >= 14 &&
                existingMythic.length >= 14
            ) {
                console.log(
                    `  No changes from maxroll — skipping Wowhead lookups`,
                );
                return "unchanged";
            }
            if (!bisMatch)
                console.log(
                    `  BIS changed (raid-guide): ${existingBis.length} → ${crawledBis.length} items`,
                );
            if (!mythicMatch)
                console.log(
                    `  MYTHIC changed (mythic-plus-guide): ${existingMythic.length} → ${crawledMythic.length} items`,
                );
        }

        const allKnownStats = {};
        let bisItems = null;
        let mythicItems = null;

        // Load existing items for duplicate-ID resolution
        const existingBisItems = existsSync(existingPath)
            ? parseItemsFromContent(readFileSync(existingPath, "utf8"), "BIS")
            : [];
        const existingMythicItems = existsSync(existingPath)
            ? parseItemsFromContent(
                  readFileSync(existingPath, "utf8"),
                  "MYTHIC",
              )
            : [];

        // Build BiS data from raid-guide (true best in slot — raid/catalyst/crafting included)
        const altWeapons = [];
        if (bisRows && bisRows.length >= 14) {
            console.log(`  Found ${bisRows.length} BiS items (raid-guide)`);
            const { items, knownStats, skippedWeapons } = await buildGearData(
                bisRows,
                spec.weaponType,
            );
            bisItems = resolveDuplicateIds(items, existingBisItems, "BIS");
            altWeapons.push(...skippedWeapons);
            Object.assign(allKnownStats, knownStats);
            console.log(
                `  Resolved ${items.length} BiS items with IDs and stats`,
            );
        }

        // Build Mythic data from mythic-plus-guide (farmable dungeon alternatives)
        if (farmableRows && farmableRows.length >= 14) {
            console.log(
                `  Found ${farmableRows.length} farmable items (mythic-plus-guide)`,
            );
            const { items, knownStats, skippedWeapons } = await buildGearData(
                farmableRows,
                spec.weaponType,
            );
            mythicItems = resolveDuplicateIds(
                items,
                existingMythicItems,
                "MYTHIC",
            );
            altWeapons.push(...skippedWeapons);
            Object.assign(allKnownStats, knownStats);
            console.log(
                `  Resolved ${items.length} mythic items with IDs and stats`,
            );
        }

        if (!bisItems && !mythicItems) {
            throw new Error(`No gear tables found for ${spec.slug}`);
        }

        // Merge skipped weapon alternatives into existing ALTS
        let altsStr = readPreservedSection(spec.key, "ALTS");
        if (altWeapons.length > 0) {
            // Deduplicate by ID against existing ALTS
            const existingIds = new Set();
            if (altsStr) {
                const idRe = /id:\s*(\d+)/g;
                let m;
                while ((m = idRe.exec(altsStr)))
                    existingIds.add(parseInt(m[1]));
            }
            const newAlts = altWeapons.filter((a) => !existingIds.has(a.id));
            if (newAlts.length > 0) {
                // Build ALTS string: existing + new weapon alts
                let inner = "";
                if (altsStr) {
                    const match = altsStr.match(/\[([^]*)\]/);
                    if (match) inner = match[1].trimEnd();
                }
                for (const alt of newAlts) {
                    inner += `\n  { forSlot: ${JSON.stringify(alt.forSlot)}, id: ${alt.id}, source: ${JSON.stringify(alt.source)}, stats: ${JSON.stringify(alt.stats)} },`;
                    allKnownStats[alt.id] = alt.stats;
                }
                altsStr = `export var ALTS = [${inner}\n];`;
                console.log(
                    `  Added ${newAlts.length} weapon alts from skipped slots`,
                );
            }
        }
        // PRIORITY_STATS: manual (priority-stats.json) takes precedence over Maxroll
        let priorityOverride = getPriority(spec.key);
        if (priorityOverride) {
            console.log(
                `  PRIORITY_STATS: ${JSON.stringify(priorityOverride)} (manual)`,
            );
        } else if (fetchedPriority) {
            priorityOverride = fetchedPriority;
            setPriority(spec.key, priorityOverride);
            console.log(
                `  PRIORITY_STATS: ${JSON.stringify(priorityOverride)} (from Maxroll, saved)`,
            );
        } else {
            console.log(`  PRIORITY_STATS: not found, using []`);
        }
        const js = generateFullJs(
            spec,
            bisItems,
            mythicItems,
            allKnownStats,
            altsStr,
            priorityOverride,
        );
        const outPath = resolve(DATA_DIR, `${spec.key}.js`);
        writeFileSync(outPath, js, "utf8");
        saveCache();
        console.log(`  Written: ${outPath}`);

        return true;
    } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        return false;
    }
}

// ─── Parse item objects from existing spec file content ─────
function parseItemsFromContent(content, varName) {
    const m = content.match(
        new RegExp(`export var ${varName} = \\[([^]*?)\\];`),
    );
    if (!m || !m[1].trim()) return [];
    const items = [];
    const re = /\{[^}]+\}/g;
    let match;
    while ((match = re.exec(m[1]))) {
        const s = match[0];
        const slotM = s.match(/slot:\s*"([^"]+)"/);
        const idM = s.match(/id:\s*(\d+)/);
        const sourceM = s.match(/source:\s*"([^"]+)"/);
        const statsM = s.match(/stats:\s*(\[[^\]]*\])/);
        const item = {};
        if (slotM) item.slot = slotM[1];
        if (idM) item.id = parseInt(idM[1]);
        if (sourceM) item.source = sourceM[1];
        item.stats = statsM ? JSON.parse(statsM[1]) : [];
        if (item.id) items.push(item);
    }
    return items;
}

// ─── Rebuild spec from cache only (no network) ───────────────
async function rebuildSpec(spec) {
    console.log(`\n=== Rebuilding ${spec.key} (cache only) ===`);
    const specPath = resolve(DATA_DIR, `${spec.key}.js`);
    if (!existsSync(specPath)) {
        console.log(`  No existing file — skipping`);
        return false;
    }

    const content = readFileSync(specPath, "utf8");
    const bisItems = parseItemsFromContent(content, "BIS");
    const mythicItems = parseItemsFromContent(content, "MYTHIC");
    const altsStr = readPreservedSection(spec.key, "ALTS");

    // Collect all item IDs (BIS + MYTHIC + ALTS)
    const altIds = [];
    if (altsStr) {
        const re = /id:\s*(\d+)/g;
        let m;
        while ((m = re.exec(altsStr))) altIds.push(parseInt(m[1]));
    }
    const allIds = new Set([
        ...bisItems.map((i) => i.id),
        ...mythicItems.map((i) => i.id),
        ...altIds,
    ]);

    // Rebuild KNOWN_STATS from Wowhead cache
    const knownStats = {};
    let missing = 0;
    for (const id of allIds) {
        const cached = cacheGet(`${id}-0`);
        if (cached) {
            const tooltip = cached.tooltip || "";
            const stats = [];
            if (tooltip.includes("<!--rtg32-->")) stats.push("crit");
            if (tooltip.includes("<!--rtg36-->")) stats.push("haste");
            if (tooltip.includes("<!--rtg49-->")) stats.push("mastery");
            if (tooltip.includes("<!--rtg40-->")) stats.push("vers");
            knownStats[id] = stats;
        } else {
            // Not in cache — use existing stats from file
            const existing = [...bisItems, ...mythicItems].find(
                (i) => i.id === id,
            );
            knownStats[id] = existing ? existing.stats || [] : [];
            missing++;
        }
    }
    if (missing > 0)
        console.log(
            `  ${missing} items not in Wowhead cache, using existing stats`,
        );

    // PRIORITY_STATS from priority-stats.json
    const priorityStats = getPriority(spec.key) || null;
    if (priorityStats) {
        console.log(`  PRIORITY_STATS: ${JSON.stringify(priorityStats)}`);
    } else {
        console.log(`  PRIORITY_STATS: not in priority-stats.json, using []`);
    }

    const js = generateFullJs(
        spec,
        bisItems,
        mythicItems,
        knownStats,
        altsStr,
        priorityStats,
    );
    writeFileSync(specPath, js, "utf8");
    console.log(`  Written: ${specPath}`);
    return true;
}

// Entry point
const args = process.argv.slice(2);

if (args.includes("--list")) {
    console.log("Available specs:");
    SPECS.forEach((s) => console.log(`  ${s.key.padEnd(18)} ${s.label}`));
    process.exit(0);
}

// ─── Validate PRIORITY_STATS (warn if empty) ──────────
function fixPriorityStats(targetKey) {
    const SKIP_FILES = new Set([
        "shared.js",
        "specs.js",
        "sample.js",
        "tutorial.js",
        "changelog.js",
    ]);
    const files = readdirSync(DATA_DIR)
        .filter((f) => f.endsWith(".js") && !SKIP_FILES.has(f))
        .filter((f) => !targetKey || f === `${targetKey}.js`);
    const empty = [];
    for (const file of files) {
        const content = readFileSync(resolve(DATA_DIR, file), "utf8");
        if (/export var PRIORITY_STATS = \[\];/.test(content)) empty.push(file);
    }
    if (empty.length > 0)
        console.log(`  Warning: PRIORITY_STATS = [] in: ${empty.join(", ")}`);
}

// ─── Normalize data files (labels, sources, dungeons, worst stats) ───
function normalizeDataFiles(targetKey) {
    const SKIP_FILES = new Set([
        "shared.js",
        "specs.js",
        "sample.js",
        "tutorial.js",
        "changelog.js",
    ]);
    const files = readdirSync(DATA_DIR)
        .filter((f) => f.endsWith(".js") && !SKIP_FILES.has(f))
        .filter((f) => !targetKey || f === `${targetKey}.js`);

    let totalChanges = 0;
    for (const file of files) {
        const filePath = resolve(DATA_DIR, file);
        const original = readFileSync(filePath, "utf8");
        const changes = [];
        let content = original;

        // Fix Korean SPEC_LABEL → English
        const specKey = file.replace(".js", "");
        const spec = SPECS.find((s) => s.key === specKey);
        const expectedLabel = spec?.label;
        if (expectedLabel) {
            content = content.replace(
                /(SPEC_LABEL = )"([^"]+)"/,
                (match, prefix, current) => {
                    if (current !== expectedLabel) {
                        changes.push(
                            `SPEC_LABEL: ${current} → ${expectedLabel}`,
                        );
                        return `${prefix}"${expectedLabel}"`;
                    }
                    return match;
                },
            );
        }

        // Normalize source/dungeon field values. Item id (always present
        // earlier on the same line) lets us check the real Wowhead
        // "item-set=" marker instead of guessing "Tier" from free text.
        content = content.replace(
            /(id:\s*(\d+),\s*(?:source|dungeon):\s*)"([^"]+)"/g,
            (match, prefix, id, value) => {
                const cached = cacheGet(`${id}-0`);
                const isTier =
                    cached && hasItemSet(cached.tooltip || "");
                const normalized = isTier ? "Tier" : normalizeSource(value);
                if (normalized !== value) {
                    changes.push(`${value} → ${normalized}`);
                    return `${prefix}"${normalized}"`;
                }
                return match;
            },
        );

        if (changes.length > 0) {
            totalChanges += changes.length;
            console.log(`${file}: ${changes.length} changes`);
            for (const c of changes) console.log(`  ${c}`);
            writeFileSync(filePath, content, "utf8");
        }
    }

    if (totalChanges === 0) console.log("All data files are normalized.");
    else
        console.log(
            `\nFixed ${totalChanges} values across ${files.length} files.`,
        );
    fixPriorityStats(targetKey);
}

// --fix: rebuild from cache + normalize (no network)
if (args.includes("--fix")) {
    const fixTarget = args.find((a) => !a.startsWith("--"));
    const fixTargets = fixTarget
        ? SPECS.filter((s) => s.key === fixTarget)
        : SPECS;
    if (fixTarget && fixTargets.length === 0) {
        console.error(`Unknown spec key: ${fixTarget}`);
        process.exit(1);
    }
    let ok = 0,
        skip = 0;
    for (const spec of fixTargets) {
        const result = await rebuildSpec(spec);
        if (result) ok++;
        else skip++;
    }
    if (ok > 0) console.log(`\nRebuilt ${ok} spec files from cache`);
    if (skip > 0) console.log(`Skipped ${skip} (no existing file)`);
    normalizeDataFiles(fixTarget || null);
    process.exit(0);
}

// --regenerate: purge Wowhead cache for target spec(s) and re-fetch everything from network
if (args.includes("--regenerate")) {
    const regenTarget = args.find((a) => !a.startsWith("--"));
    const regenTargets = regenTarget
        ? SPECS.filter((s) => s.key === regenTarget)
        : SPECS;
    if (regenTargets.length === 0) {
        console.error(`Unknown spec key: ${regenTarget}`);
        process.exit(1);
    }

    // Purge Wowhead cache for target specs
    for (const spec of regenTargets) {
        const specPath = resolve(DATA_DIR, `${spec.key}.js`);
        if (!existsSync(specPath)) continue;
        const content = readFileSync(specPath, "utf8");
        const ids = new Set();
        const re = /id:\s*(\d+)/g;
        let m;
        while ((m = re.exec(content))) ids.add(parseInt(m[1]));
        let purged = 0;
        for (const id of ids) {
            for (const locale of [0, 1]) {
                const key = `${id}-${locale}`;
                if (cacheGet(key)) {
                    cacheDelete(key);
                    purged++;
                }
            }
        }
        console.log(
            `Purged ${purged} Wowhead cache entries for ${spec.key} (${ids.size} items)`,
        );
    }
    saveCache();

    // Re-generate from network with force
    let success = 0,
        fail = 0;
    const writtenKeys = [];
    for (const spec of regenTargets) {
        console.log(`\n=== Regenerating ${spec.key} (full network fetch) ===`);
        const result = await processSpec(spec, { force: true });
        if (result === true) {
            success++;
            writtenKeys.push(spec.key);
        } else if (result === "unchanged") {
            success++;
        } else {
            fail++;
        }
        if (regenTargets.length > 1) await delay(1000);
    }
    console.log(
        `\nDone: ${success} succeeded (${writtenKeys.length} written), ${fail} failed`,
    );

    // Run find-alts
    if (writtenKeys.length > 0) {
        console.log(
            `\n=== Running find-alts for ${writtenKeys.length} specs ===`,
        );
        const index = buildItemIndex();
        for (const key of writtenKeys) {
            try {
                const alts = await findAltsForSpec(key, index);
                if (alts.length > 0) updateSpecFile(key, alts);
                console.log(`  ${key}: ${alts.length} alts`);
            } catch (err) {
                console.error(`  ${key}: FAILED - ${err.message}`);
            }
        }
    }

    normalizeDataFiles(regenTarget || null);
    saveCache();
    process.exit(0);
}

const onlyMissing = args.includes("--missing");
const skipDone = args.includes("--skip-done");
const forceRegen = args.includes("--force");
const targetKey = args.find((a) => !a.startsWith("--"));
let targets = targetKey ? SPECS.filter((s) => s.key === targetKey) : SPECS;

if (onlyMissing) {
    targets = targets.filter((s) => {
        const path = resolve(DATA_DIR, `${s.key}.js`);
        if (!existsSync(path)) return true;
        // Also retry files with fewer than 14 BIS items (likely incomplete)
        const content = readFileSync(path, "utf8");
        const bisMatch = content.match(/export var BIS = \[([^]*?)\];/);
        if (!bisMatch) return true;
        const itemCount = (bisMatch[1].match(/simcSlot:/g) || []).length;
        return itemCount < 14;
    });
    console.log(`Found ${targets.length} specs to (re-)generate`);
}

const needsAlts = [];
if (skipDone) {
    const before = targets.length;
    targets = targets.filter((s) => {
        const path = resolve(DATA_DIR, `${s.key}.js`);
        if (!existsSync(path)) return true;
        const content = readFileSync(path, "utf8");
        const countSlots = (varName) => {
            const m = content.match(
                new RegExp(`export var ${varName} = \\[([^]*?)\\];`),
            );
            return m ? (m[1].match(/slot:/g) || []).length : 0;
        };
        const bisCount = countSlots("BIS");
        const mythicCount = countSlots("MYTHIC");
        if (bisCount >= 14 && mythicCount >= 14) {
            // BIS+MYTHIC done, but check if ALTS is empty
            const altsMatch = content.match(/export var ALTS = \[([^]*?)\];/);
            const altsCount = altsMatch
                ? (altsMatch[1].match(/forSlot:/g) || []).length
                : 0;
            if (altsCount < 1) needsAlts.push(s.key);
            return false; // skip generation
        }
        return true;
    });
    console.log(
        `Skipping ${before - targets.length} already done, ${targets.length} remaining`,
    );
    if (needsAlts.length > 0) {
        console.log(`${needsAlts.length} specs need ALTS populated`);
    }
}

if (targets.length === 0 && needsAlts.length === 0) {
    if (skipDone || onlyMissing) {
        console.log("All specs are already up to date.");
        process.exit(0);
    }
    console.error(`Unknown spec key: ${targetKey}`);
    console.error("Use --list to see available specs");
    process.exit(1);
}

let success = 0,
    fail = 0;
const writtenKeys = [];
const failed = [];
for (const spec of targets) {
    const result = await processSpec(spec, { force: forceRegen });
    if (result === true) {
        success++;
        writtenKeys.push(spec.key);
    } else if (result === "unchanged") {
        success++;
    } else {
        fail++;
        failed.push(spec);
    }
    // Delay between specs only when file was written (network calls were made)
    if (result === true && targets.length > 1) await delay(1000);
}

// Retry failed specs once after a longer cooldown
if (failed.length > 0) {
    console.log(
        `\nRetrying ${failed.length} failed specs after 60s cooldown...`,
    );
    await delay(60000);
    for (const spec of failed) {
        const result = await processSpec(spec, { force: forceRegen });
        if (result === true) {
            success++;
            fail--;
            writtenKeys.push(spec.key);
        } else if (result === "unchanged") {
            success++;
            fail--;
        }
        if (failed.length > 1) await delay(5000);
    }
}

console.log(
    `\nDone: ${success} succeeded (${writtenKeys.length} written), ${fail} failed out of ${targets.length}`,
);

// Run find-alts for all processed specs + specs with empty ALTS
const allNeedAlts = [...new Set([...targets.map((s) => s.key), ...needsAlts])];

if (allNeedAlts.length > 0) {
    console.log(`\n=== Running find-alts for ${allNeedAlts.length} specs ===`);
    console.log("Building global item index...");
    const index = buildItemIndex();
    let totalAlts = 0;
    for (const key of allNeedAlts) {
        try {
            const alts = await findAltsForSpec(key, index);
            if (alts.length > 0) {
                updateSpecFile(key, alts);
            }
            console.log(`  ${key}: ${alts.length} alts`);
            totalAlts += alts.length;
        } catch (err) {
            console.error(`  ${key}: FAILED - ${err.message}`);
        }
    }
    console.log(
        `\nDone: ${totalAlts} total alts across ${allNeedAlts.length} specs`,
    );
}

normalizeDataFiles(targetKey);
saveCache();
