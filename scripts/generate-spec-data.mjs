#!/usr/bin/env node
/**
 * Generate spec data files from maxroll.gg + Wowhead APIs.
 *
 * Usage:
 *   node scripts/generate-spec-data.mjs                # all specs
 *   node scripts/generate-spec-data.mjs blood-dk       # single spec
 *   node scripts/generate-spec-data.mjs --list         # list all spec keys
 */

import { load } from 'cheerio';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../src/data');

// ─── Known dungeons ──────────────────────────────────────────
const VALID_DUNGEONS = [
  "Pit of Saron", "Nexus-Point Xenas", "Windrunner Spire",
  "Magisters' Terrace", "Skyreach", "Seat of the Triumvirate",
  "Algeth'ar Academy", "Maisara Caverns",
];

// ─── Slot mapping (maxroll → project) ────────────────────────
const SLOT_MAP = {
  'Head':      { slot: '머리',     simcSlot: 'head' },
  'Neck':      { slot: '목',       simcSlot: 'neck' },
  'Shoulder':  { slot: '어깨',     simcSlot: 'shoulder' },
  'Cloak':     { slot: '망토',     simcSlot: 'back' },
  'Chest':     { slot: '가슴',     simcSlot: 'chest' },
  'Wrist':     { slot: '손목',     simcSlot: 'wrist' },
  'Gloves':    { slot: '장갑',     simcSlot: 'hands' },
  'Belt':      { slot: '허리',     simcSlot: 'waist' },
  'Legs':      { slot: '다리',     simcSlot: 'legs' },
  'Boots':     { slot: '발',       simcSlot: 'feet' },
  'Ring 1':    { slot: '반지 1',   simcSlot: 'finger1' },
  'Ring 2':    { slot: '반지 2',   simcSlot: 'finger2' },
  'Trinket 1': { slot: '장신구 1', simcSlot: 'trinket1' },
  'Trinket 2': { slot: '장신구 2', simcSlot: 'trinket2' },
};

// Handle numbered Ring/Trinket slots (some maxroll pages use "Ring" without number)
let ringCount = 0;
let trinketCount = 0;
function resolveSlot(slotEn, weaponType) {
  // Standard armor slots
  if (SLOT_MAP[slotEn]) return SLOT_MAP[slotEn];

  // Numbered-less Ring/Trinket
  if (slotEn === 'Ring') {
    ringCount++;
    return ringCount <= 1
      ? { slot: '반지 1', simcSlot: 'finger1' }
      : { slot: '반지 2', simcSlot: 'finger2' };
  }
  if (slotEn === 'Trinket') {
    trinketCount++;
    return trinketCount <= 1
      ? { slot: '장신구 1', simcSlot: 'trinket1' }
      : { slot: '장신구 2', simcSlot: 'trinket2' };
  }

  // Weapon slots
  const weaponSlots = WEAPON_SLOTS[weaponType];
  const mainSlot = weaponSlots[0];
  const offSlot = weaponSlots.length > 1 ? weaponSlots[1] : null;

  // Handle Two-Hand / One-Hand weapon labels
  // _skipTwoHand is set externally when both 2H and 1H options exist for non-2H specs
  if (slotEn === 'Two-Hand Weapon' || slotEn === 'Two-Hand') {
    if (weaponType !== '2h' && resolveSlot._skipTwoHand) return null;
    return mainSlot;
  }
  if (slotEn === 'One-Hand Weapon') {
    if (weaponType === '2h' && resolveSlot._skipOneHand) return null;
    return mainSlot;
  }
  if (['Weapon', 'Main Hand', 'Main hand', 'Main-Hand', 'Mainhand', 'Weapon 1'].includes(slotEn)) {
    return mainSlot;
  }
  if (['Off Hand', 'Off-Hand', 'Off hand', 'Off-hand', 'Offhand', 'Shield', 'Weapon 2', 'Weapon Off-Hand'].includes(slotEn)) {
    return offSlot || mainSlot;
  }

  return null;
}

function resetSlotCounters() {
  ringCount = 0;
  trinketCount = 0;
}

// Weapon/off-hand slot names vary per spec
const WEAPON_SLOTS = {
  '1h+shield':  [
    { slot: '무기',   simcSlot: 'main_hand' },
    { slot: '방패',   simcSlot: 'off_hand' },
  ],
  '1h+oh':  [
    { slot: '무기',     simcSlot: 'main_hand' },
    { slot: '보조 무기', simcSlot: 'off_hand' },
  ],
  '2h':     [
    { slot: '무기',   simcSlot: 'main_hand' },
  ],
  'dual':   [
    { slot: '주 무기',   simcSlot: 'main_hand' },
    { slot: '보조 무기', simcSlot: 'off_hand' },
  ],
  'ranged': [
    { slot: '무기',   simcSlot: 'main_hand' },
  ],
};

// ─── Spec registry ───────────────────────────────────────────
const SPECS = [
  // Death Knight
  { key: 'blood-dk',      label: '혈기 죽음의 기사',   simcClass: 'deathknight', simcSpec: 'blood',        slug: 'blood-death-knight',        icon: 'spell_deathknight_bloodpresence',      weaponType: '2h', accent: '#C41E3A' },
  { key: 'frost-dk',      label: '냉기 죽음의 기사',   simcClass: 'deathknight', simcSpec: 'frost',        slug: 'frost-death-knight',        icon: 'spell_deathknight_frostpresence',      weaponType: 'dual', accent: '#4d9dca' },
  { key: 'unholy-dk',     label: '부정 죽음의 기사',   simcClass: 'deathknight', simcSpec: 'unholy',       slug: 'unholy-death-knight',       icon: 'spell_deathknight_unholypresence',     weaponType: '2h', accent: '#7a9b3a' },
  // Demon Hunter
  { key: 'havoc-dh',      label: '파멸 악마사냥꾼',    simcClass: 'demonhunter', simcSpec: 'havoc',        slug: 'havoc-demon-hunter',        icon: 'ability_demonhunter_spectral_sight',   weaponType: 'dual', accent: '#A330C9' },
  { key: 'devourer-dh',   label: '포식 악마사냥꾼',    simcClass: 'demonhunter', simcSpec: 'havoc',        slug: 'devourer-demon-hunter',     icon: 'ability_demonhunter_spectral_sight',   weaponType: 'dual', accent: '#ca30a3', urlSuffix: 'mythic-guide' },
  { key: 'veng-dh',       label: '복수 악마사냥꾼',    simcClass: 'demonhunter', simcSpec: 'vengeance',    slug: 'vengeance-demon-hunter',    icon: 'ability_demonhunter_metamorphosis_tank', weaponType: 'dual', accent: '#4dca4d' },
  // Druid
  { key: 'balance-druid', label: '조화 드루이드',      simcClass: 'druid',       simcSpec: 'balance',      slug: 'balance-druid',             icon: 'spell_nature_starfall',                weaponType: '1h+oh', accent: '#FF7C0A' },
  { key: 'feral-druid',   label: '야성 드루이드',      simcClass: 'druid',       simcSpec: 'feral',        slug: 'feral-druid',               icon: 'ability_druid_catform',                weaponType: '2h', accent: '#d4a017' },
  { key: 'guardian-druid', label: '수호 드루이드',     simcClass: 'druid',       simcSpec: 'guardian',     slug: 'guardian-druid',            icon: 'ability_racial_bearform',              weaponType: '2h', accent: '#ca7a3d' },
  { key: 'resto-druid',   label: '복원 드루이드',      simcClass: 'druid',       simcSpec: 'restoration',  slug: 'restoration-druid',         icon: 'spell_nature_healingtouch',            weaponType: '1h+oh', accent: '#60d060' },
  // Evoker
  { key: 'dev-evoker',    label: '황폐 기원사',        simcClass: 'evoker',      simcSpec: 'devastation',  slug: 'devastation-evoker',        icon: 'classicon_evoker_devastation',         weaponType: '1h+oh', accent: '#29a8d4' },
  { key: 'pres-evoker',   label: '보존 기원사',        simcClass: 'evoker',      simcSpec: 'preservation', slug: 'preservation-evoker',       icon: 'classicon_evoker_preservation',        weaponType: '1h+oh', accent: '#60ca8b' },
  { key: 'aug-evoker',    label: '증강 기원사',        simcClass: 'evoker',      simcSpec: 'augmentation', slug: 'augmentation-evoker',       icon: 'classicon_evoker_augmentation',        weaponType: '1h+oh', accent: '#6b4dca' },
  // Hunter
  { key: 'bm-hunter',     label: '야수 사냥꾼',        simcClass: 'hunter',      simcSpec: 'beastmastery', slug: 'beast-mastery-hunter',      icon: 'ability_hunter_bestialdiscipline',     weaponType: 'ranged', accent: '#AAD372' },
  { key: 'mm-hunter',     label: '사격 사냥꾼',        simcClass: 'hunter',      simcSpec: 'marksmanship', slug: 'marksmanship-hunter',       icon: 'ability_hunter_focusedaim',            weaponType: 'ranged', accent: '#71b040' },
  { key: 'surv-hunter',   label: '생존 사냥꾼',        simcClass: 'hunter',      simcSpec: 'survival',     slug: 'survival-hunter',           icon: 'ability_hunter_camouflage',            weaponType: '2h', accent: '#d4aa60' },
  // Mage
  { key: 'arcane-mage',   label: '비전 마법사',        simcClass: 'mage',        simcSpec: 'arcane',       slug: 'arcane-mage',               icon: 'spell_holy_magicalsentry',             weaponType: '1h+oh', accent: '#69CCF0' },
  { key: 'fire-mage',     label: '화염 마법사',        simcClass: 'mage',        simcSpec: 'fire',         slug: 'fire-mage',                 icon: 'spell_fire_firebolt02',                weaponType: '1h+oh', accent: '#ca5030' },
  { key: 'frost-mage',    label: '냉기 마법사',        simcClass: 'mage',        simcSpec: 'frost',        slug: 'frost-mage',                icon: 'spell_frost_frostbolt02',              weaponType: '1h+oh', accent: '#3FC7EB' },
  // Monk
  { key: 'brew-monk',     label: '양조 수도사',        simcClass: 'monk',        simcSpec: 'brewmaster',   slug: 'brewmaster-monk',           icon: 'spell_monk_brewmaster_spec',           weaponType: '2h', accent: '#00AA60' },
  { key: 'ww-monk',       label: '풍운 수도사',        simcClass: 'monk',        simcSpec: 'windwalker',   slug: 'windwalker-monk',           icon: 'spell_monk_windwalker_spec',           weaponType: 'dual', accent: '#00FF98' },
  { key: 'mw-monk',       label: '운무 수도사',        simcClass: 'monk',        simcSpec: 'mistweaver',   slug: 'mistweaver-monk',           icon: 'spell_monk_mistweaver_spec',           weaponType: '1h+oh', accent: '#60d0a0' },
  // Paladin
  { key: 'holy-paladin',  label: '신성 성기사',        simcClass: 'paladin',     simcSpec: 'holy',         slug: 'holy-paladin',              icon: 'spell_holy_holybolt',                  weaponType: '1h+shield', accent: '#F48CBA' },
  { key: 'prot-paladin',  label: '보호 성기사',        simcClass: 'paladin',     simcSpec: 'protection',   slug: 'protection-paladin',        icon: 'ability_paladin_shieldofthetemplar',   weaponType: '1h+shield', accent: '#c9a227' },
  { key: 'ret-paladin',   label: '징벌 성기사',        simcClass: 'paladin',     simcSpec: 'retribution',  slug: 'retribution-paladin',       icon: 'spell_holy_auraoflight',               weaponType: '2h', accent: '#e06060' },
  // Priest
  { key: 'disc-priest',   label: '수양 사제',          simcClass: 'priest',      simcSpec: 'discipline',   slug: 'discipline-priest',         icon: 'spell_holy_powerwordshield',           weaponType: '1h+oh', accent: '#b0b0b0' },
  { key: 'holy-priest',   label: '신성 사제',          simcClass: 'priest',      simcSpec: 'holy',         slug: 'holy-priest',               icon: 'spell_holy_guardianspirit',            weaponType: '1h+oh', accent: '#e0e0e0' },
  { key: 'shadow-priest', label: '암흑 사제',          simcClass: 'priest',      simcSpec: 'shadow',       slug: 'shadow-priest',             icon: 'spell_shadow_shadowwordpain',          weaponType: '1h+oh', accent: '#8080ca' },
  // Rogue
  { key: 'assa-rogue',    label: '암살 도적',          simcClass: 'rogue',       simcSpec: 'assassination',slug: 'assassination-rogue',       icon: 'ability_rogue_deadlybrew',             weaponType: 'dual', accent: '#d0c060' },
  { key: 'outlaw-rogue',  label: '무법 도적',          simcClass: 'rogue',       simcSpec: 'outlaw',       slug: 'outlaw-rogue',              icon: 'ability_rogue_waylay',                 weaponType: 'dual', accent: '#FFF468' },
  { key: 'sub-rogue',     label: '잠행 도적',          simcClass: 'rogue',       simcSpec: 'subtlety',     slug: 'subtlety-rogue',            icon: 'ability_stealth',                      weaponType: 'dual', accent: '#ca9060' },
  // Shaman
  { key: 'ele-shaman',    label: '정기 주술사',        simcClass: 'shaman',      simcSpec: 'elemental',    slug: 'elemental-shaman',          icon: 'spell_nature_lightning',                weaponType: '1h+shield', accent: '#0070DD' },
  { key: 'enh-shaman',    label: '고양 주술사',        simcClass: 'shaman',      simcSpec: 'enhancement',  slug: 'enhancement-shaman',        icon: 'spell_shaman_improvedstormstrike',      weaponType: 'dual', accent: '#2090dd' },
  { key: 'resto-shaman',  label: '복원 주술사',        simcClass: 'shaman',      simcSpec: 'restoration',  slug: 'restoration-shaman',        icon: 'spell_nature_magicimmunity',            weaponType: '1h+shield', accent: '#40a0e0' },
  // Warlock
  { key: 'aff-lock',      label: '고통 흑마법사',      simcClass: 'warlock',     simcSpec: 'affliction',   slug: 'affliction-warlock',        icon: 'spell_shadow_deathcoil',               weaponType: '1h+oh', accent: '#8788EE' },
  { key: 'demo-lock',     label: '악마 흑마법사',      simcClass: 'warlock',     simcSpec: 'demonology',   slug: 'demonology-warlock',        icon: 'spell_shadow_metamorphosis',           weaponType: '1h+oh', accent: '#6d6dca' },
  { key: 'destro-lock',   label: '파괴 흑마법사',      simcClass: 'warlock',     simcSpec: 'destruction',  slug: 'destruction-warlock',       icon: 'spell_shadow_rainoffire',              weaponType: '1h+oh', accent: '#ca4d4d' },
  // Warrior
  { key: 'arms-warrior',  label: '무기 전사',          simcClass: 'warrior',     simcSpec: 'arms',         slug: 'arms-warrior',              icon: 'ability_warrior_savageblow',            weaponType: '2h', accent: '#C69B6D' },
  { key: 'fury-warrior',  label: '분노 전사',          simcClass: 'warrior',     simcSpec: 'fury',         slug: 'fury-warrior',              icon: 'ability_warrior_innerrage',             weaponType: 'dual', accent: '#ca6040' },
  { key: 'prot-warrior',  label: '보호 전사',          simcClass: 'warrior',     simcSpec: 'protection',   slug: 'protection-warrior',        icon: 'ability_warrior_defensivestance',       weaponType: '1h+shield', accent: '#8b7040' },
];

// ─── Theme generation ────────────────────────────────────────
function makeTheme(accent) {
  // Derive colors from accent
  const hex = accent.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  const lighter = (v, f) => Math.min(255, Math.round(v + (255-v)*f));
  const darker  = (v, f) => Math.round(v * f);

  const lr = lighter(r, 0.4), lg = lighter(g, 0.4), lb = lighter(b, 0.4);
  const dr = darker(r, 0.15), dg = darker(g, 0.15), db = darker(b, 0.15);
  const br = darker(r, 0.35), bg2 = darker(g, 0.35), bb = darker(b, 0.35);
  const sr = darker(r, 0.6),  sg = darker(g, 0.6),  sb = darker(b, 0.6);

  const toHex = (rv, gv, bv) => '#' + [rv,gv,bv].map(v => v.toString(16).padStart(2,'0')).join('');

  return {
    accent,
    accentLight: toHex(lr, lg, lb),
    accentBg: toHex(dr, dg, db),
    accentBorder: toHex(br, bg2, bb),
    shimmer: `linear-gradient(90deg,${toHex(sr,sg,sb)},${accent},${toHex(lr,lg,lb)},${accent},${toHex(sr,sg,sb)})`,
    btnBg: `linear-gradient(135deg,${toHex(sr,sg,sb)},${accent})`,
  };
}

// ─── Storage/cache key generation ────────────────────────────
function storageKey(key) {
  const short = key.replace(/-/g, '-');
  return `bis-${short}-v1`;
}
function statCacheKey(key) {
  return `${key}-stat-cache-v1`;
}

// ─── Maxroll.gg scraper ──────────────────────────────────────
async function fetchMaxrollBis(slug, urlSuffix = 'mythic-plus-guide') {
  const url = `https://maxroll.gg/wow/class-guides/${slug}-${urlSuffix}`;
  console.log(`  Fetching ${url}...`);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BiSTracker/1.0)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();
  const $ = load(html);

  // Find all tables with Slot/Item/Location headers
  const gearTables = [];
  $('table').each((_, table) => {
    const headers = [];
    $(table).find('thead th, tr:first-child th').each((__, th) => {
      headers.push($(th).text().trim());
    });
    if (headers.includes('Slot') && headers.includes('Item') && headers.includes('Location')) {
      const rows = [];
      $(table).find('tbody tr, tr').each((ri, tr) => {
        const cells = [];
        $(tr).find('td').each((__, td) => {
          cells.push($(td).text().trim());
        });
        if (cells.length >= 3) rows.push(cells);
      });
      gearTables.push(rows);
    }
  });

  // The farmable alternatives is the table where all locations are dungeon names
  let farmable = null;
  for (const rows of gearTables) {
    const allDungeon = rows.every(r => VALID_DUNGEONS.some(d =>
      r[2].includes(d.replace(/'/g, '')) || d.includes(r[2]) || r[2] === d
    ));
    if (allDungeon && rows.length >= 14) {
      farmable = rows;
      break;
    }
  }

  // Fallback: if no all-dungeon table, use the second gear table (index 1)
  if (!farmable && gearTables.length >= 2) {
    farmable = gearTables[1];
  }
  if (!farmable && gearTables.length >= 1) {
    farmable = gearTables[0];
  }

  if (!farmable) throw new Error(`No farmable alternatives table found for ${slug}`);

  return farmable.map(r => ({
    slotEn: r[0],
    itemName: r[1],
    dungeon: normalizeDungeon(r[2]),
  }));
}

function normalizeDungeon(raw) {
  // Fix common typos from maxroll
  const fixes = {
    "Magister's Terrace": "Magisters' Terrace",
    "Magisters Terrace": "Magisters' Terrace",
    "Magisters' Terrace": "Magisters' Terrace",
    "Seat of Triumvirate": "Seat of the Triumvirate",
    "Algeth'ar Academy": "Algeth'ar Academy",
    "Algethar Academy": "Algeth'ar Academy",
  };
  return fixes[raw] || raw;
}

// ─── Item name fixes (maxroll typos) ─────────────────────────
const ITEM_NAME_FIXES = {
  "Occulsion of Void": "Occlusion of Void",
  "Deciever's Rotbow": "Deceiver's Rotbow",
};

// Items with "&" (dual wield) need to be split
function splitDualWeaponName(name) {
  if (name.includes(' & ')) return name.split(' & ').map(s => s.trim());
  return [name];
}

// ─── Wowhead APIs ────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, opts = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BiSTracker/1.0)' },
        ...opts,
      });
      if (!res.ok) {
        if (i < retries - 1) { await delay(2000 * (i + 1)); continue; }
        throw new Error(`HTTP ${res.status}`);
      }
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        // Got HTML instead of JSON (rate limited)
        if (i < retries - 1) {
          console.log(`      Rate limited, retrying in ${2 * (i + 1)}s...`);
          await delay(2000 * (i + 1));
          continue;
        }
        throw new Error(`Non-JSON response from ${url}`);
      }
    } catch (err) {
      if (i < retries - 1) { await delay(2000 * (i + 1)); continue; }
      throw err;
    }
  }
}

async function searchItemId(name) {
  // Apply name fixes
  const fixedName = ITEM_NAME_FIXES[name] || name;
  const url = `https://www.wowhead.com/search/suggestions-template?id=items&q=${encodeURIComponent(fixedName)}`;
  const data = await fetchWithRetry(url);
  if (!data.results || data.results.length === 0) {
    console.warn(`    WARNING: No results for "${fixedName}"`);
    return null;
  }
  // Prefer quality 4 (Epic) items
  const epic = data.results.find(r => r.quality === 4);
  return (epic || data.results[0]).id;
}

async function fetchItemTooltip(id) {
  // Korean name
  const koData = await fetchWithRetry(`https://nether.wowhead.com/tooltip/item/${id}?dataEnv=1&locale=1`);
  const ko = koData.name || '';

  await delay(150);

  // Stats
  const enData = await fetchWithRetry(`https://nether.wowhead.com/tooltip/item/${id}?dataEnv=1&locale=0`);
  const tooltip = enData.tooltip || '';
  const stats = [];
  if (tooltip.includes('<!--rtg32-->')) stats.push('crit');
  if (tooltip.includes('<!--rtg36-->')) stats.push('haste');
  if (tooltip.includes('<!--rtg49-->')) stats.push('mastery');
  if (tooltip.includes('<!--rtg40-->')) stats.push('vers');

  return { ko, stats };
}

// ─── Build BIS array ─────────────────────────────────────────
async function buildBisData(farmableRows, weaponType) {
  const bis = [];
  const knownStats = {};
  resetSlotCounters();

  // Pre-analyze: check if both 2H and 1H weapon slots exist
  const slotNames = farmableRows.map(r => r.slotEn);
  const has2H = slotNames.some(s => s === 'Two-Hand Weapon' || s === 'Two-Hand');
  const has1H = slotNames.some(s => s === 'One-Hand Weapon');
  // Skip 2H if both options exist and spec is not 2H
  resolveSlot._skipTwoHand = has2H && has1H && weaponType !== '2h';
  resolveSlot._skipOneHand = has2H && has1H && weaponType === '2h';

  for (const row of farmableRows) {
    const slotEn = row.slotEn;

    // Handle dual weapon entries like "Mystakria's Harvester & Soulblight Cleaver"
    const itemNames = splitDualWeaponName(row.itemName);

    if (itemNames.length === 2) {
      // Dual wield: first = main_hand, second = off_hand
      const weaponSlots = WEAPON_SLOTS[weaponType];
      for (let wi = 0; wi < 2; wi++) {
        const name = itemNames[wi];
        const slot = weaponSlots[wi] || weaponSlots[0];
        console.log(`    Looking up: ${name}...`);
        const id = await searchItemId(name);
        if (!id) continue;
        await delay(200);
        const { ko, stats } = await fetchItemTooltip(id);
        bis.push({ slot: slot.slot, simcSlot: slot.simcSlot, en: name, ko: ko || name, id, dungeon: row.dungeon, stats });
        knownStats[id] = stats;
        await delay(200);
      }
      continue;
    }

    const slotInfo = resolveSlot(slotEn, weaponType);
    if (!slotInfo) {
      console.warn(`    WARNING: Unknown slot "${slotEn}", skipping`);
      continue;
    }

    const itemName = ITEM_NAME_FIXES[row.itemName] || row.itemName;
    console.log(`    Looking up: ${itemName}...`);
    const id = await searchItemId(itemName);
    if (!id) continue;

    await delay(200);
    const { ko, stats } = await fetchItemTooltip(id);

    bis.push({
      slot: slotInfo.slot,
      simcSlot: slotInfo.simcSlot,
      en: itemName,
      ko: ko || itemName,
      id,
      dungeon: row.dungeon,
      stats,
    });
    knownStats[id] = stats;

    await delay(200);
  }

  // Post-process: for dual wield specs, if only main_hand exists, duplicate as off_hand
  if ((weaponType === 'dual') && bis.some(b => b.simcSlot === 'main_hand') && !bis.some(b => b.simcSlot === 'off_hand')) {
    const mainWeapon = bis.find(b => b.simcSlot === 'main_hand');
    const offSlots = WEAPON_SLOTS['dual'][1];
    bis.push({ ...mainWeapon, slot: offSlots.slot, simcSlot: 'off_hand' });
  }

  // Post-process: remove duplicate main_hand entries (keep first)
  const seenSlots = new Set();
  const deduped = [];
  for (const item of bis) {
    const key = item.simcSlot;
    if (seenSlots.has(key)) continue;
    seenSlots.add(key);
    deduped.push(item);
  }

  return { bis: deduped, knownStats };
}

// ─── Generate JS file content ────────────────────────────────
function generateJs(spec, bis, knownStats) {
  const theme = makeTheme(spec.accent);
  const dungeons = [...new Set(bis.map(b => b.dungeon))];
  // Sort: new (Midnight) dungeons first, then old
  const midnightDungeons = ["Nexus-Point Xenas", "Windrunner Spire", "Maisara Caverns"];
  dungeons.sort((a, b) => {
    const aNew = midnightDungeons.includes(a) ? 0 : 1;
    const bNew = midnightDungeons.includes(b) ? 0 : 1;
    if (aNew !== bNew) return aNew - bNew;
    return a.localeCompare(b);
  });

  let out = '';
  out += `export var SPEC_LABEL = ${JSON.stringify(spec.label)};\n`;
  out += `export var SPEC_KEY = ${JSON.stringify(spec.key)};\n`;
  out += `export var SIMC_CLASS = ${JSON.stringify(spec.simcClass)};\n`;
  out += `export var SIMC_SPEC = ${JSON.stringify(spec.simcSpec)};\n`;
  out += `export var SPEC_ICON = ${JSON.stringify(spec.icon)};\n`;
  out += `export var STORAGE_KEY = ${JSON.stringify(storageKey(spec.key))};\n`;
  out += '\n';
  out += `export var THEME = {\n`;
  out += `  accent: ${JSON.stringify(theme.accent)},\n`;
  out += `  accentLight: ${JSON.stringify(theme.accentLight)},\n`;
  out += `  accentBg: ${JSON.stringify(theme.accentBg)},\n`;
  out += `  accentBorder: ${JSON.stringify(theme.accentBorder)},\n`;
  out += `  shimmer: ${JSON.stringify(theme.shimmer)},\n`;
  out += `  btnBg: ${JSON.stringify(theme.btnBg)},\n`;
  out += `};\n`;
  out += '\n';

  // BIS
  out += `export var BIS = [\n`;
  for (const item of bis) {
    out += `  { slot: ${JSON.stringify(item.slot)}, simcSlot: ${JSON.stringify(item.simcSlot)}, en: ${JSON.stringify(item.en)}, ko: ${JSON.stringify(item.ko)}, id: ${item.id}, dungeon: ${JSON.stringify(item.dungeon)}, stats: ${JSON.stringify(item.stats)} },\n`;
  }
  out += `];\n`;
  out += '\n';

  // ALTS (empty for now)
  out += `export var ALTS = [];\n`;
  out += '\n';

  // WORST_STATS (empty by default, will need manual review)
  out += `export var WORST_STATS = [];\n`;
  out += '\n';

  out += `export var STAT_CACHE_KEY = ${JSON.stringify(statCacheKey(spec.key))};\n`;
  out += '\n';

  // KNOWN_STATS
  out += `export var KNOWN_STATS = {\n`;
  const entries = Object.entries(knownStats);
  const perLine = 4;
  for (let i = 0; i < entries.length; i += perLine) {
    const chunk = entries.slice(i, i + perLine);
    out += `  ${chunk.map(([id, stats]) => `${id}:${JSON.stringify(stats)}`).join(',')},\n`;
  }
  out += `};\n`;
  out += '\n';

  // DUNGEONS
  out += `export var DUNGEONS = [\n`;
  out += `  ${dungeons.map(d => JSON.stringify(d)).join(', ')},\n`;
  out += `];\n`;

  return out;
}

// ─── Main ────────────────────────────────────────────────────
async function processSpec(spec) {
  console.log(`\n=== Processing ${spec.key} (${spec.label}) ===`);

  try {
    const farmable = await fetchMaxrollBis(spec.slug, spec.urlSuffix);
    console.log(`  Found ${farmable.length} farmable items`);

    const { bis, knownStats } = await buildBisData(farmable, spec.weaponType);
    console.log(`  Resolved ${bis.length} items with IDs and stats`);

    const js = generateJs(spec, bis, knownStats);
    const outPath = resolve(DATA_DIR, `${spec.key}.js`);
    writeFileSync(outPath, js, 'utf8');
    console.log(`  Written: ${outPath}`);

    return true;
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    return false;
  }
}

// Entry point
const args = process.argv.slice(2);

if (args.includes('--list')) {
  console.log('Available specs:');
  SPECS.forEach(s => console.log(`  ${s.key.padEnd(18)} ${s.label}`));
  process.exit(0);
}

const onlyMissing = args.includes('--missing');
const targetKey = args.find(a => !a.startsWith('--'));
let targets = targetKey
  ? SPECS.filter(s => s.key === targetKey)
  : SPECS;

if (onlyMissing) {
  targets = targets.filter(s => {
    const path = resolve(DATA_DIR, `${s.key}.js`);
    if (!existsSync(path)) return true;
    // Also retry files with fewer than 14 BIS items (likely incomplete)
    const content = readFileSync(path, 'utf8');
    const bisMatch = content.match(/export var BIS = \[([^]*?)\];/);
    if (!bisMatch) return true;
    const itemCount = (bisMatch[1].match(/simcSlot:/g) || []).length;
    return itemCount < 14;
  });
  console.log(`Found ${targets.length} specs to (re-)generate`);
}

if (targets.length === 0) {
  console.error(`Unknown spec key: ${targetKey}`);
  console.error('Use --list to see available specs');
  process.exit(1);
}

let success = 0, fail = 0;
for (const spec of targets) {
  const ok = await processSpec(spec);
  if (ok) success++; else fail++;
  // Delay between specs to avoid rate limiting
  if (targets.length > 1) await delay(2000);
}

console.log(`\nDone: ${success} succeeded, ${fail} failed out of ${targets.length}`);
