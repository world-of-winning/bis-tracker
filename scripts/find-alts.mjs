#!/usr/bin/env node
/**
 * Find ALTS (alternative items) from cross-referencing all specs' BiS lists.
 * For each BiS item, find items used in the same slot by other specs with matching stats.
 *
 * Usage:
 *   node scripts/find-alts.mjs                # all specs
 *   node scripts/find-alts.mjs prot-paladin   # single spec
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { fetchTooltip, saveCache } from './wowhead-cache.mjs';
import { DUNGEONS } from '../src/data/shared.js';
import { fitKind, fitRank } from '../src/logic/matching.js';

// ─── Wowhead class restriction check ────────────────────────
const CLASS_NAME_MAP = {
  deathknight: 'Death Knight', warrior: 'Warrior', paladin: 'Paladin',
  hunter: 'Hunter', shaman: 'Shaman', evoker: 'Evoker',
  druid: 'Druid', rogue: 'Rogue', monk: 'Monk', demonhunter: 'Demon Hunter',
  mage: 'Mage', warlock: 'Warlock', priest: 'Priest',
};

// Weapon types that are 2-handed
const TWO_HAND_TYPES = new Set(['2h_sword', '2h_mace', '2h_axe', 'polearm', 'staff']);
// Weapon types that are 1-handed (for dual wield / 1h+shield / 1h+oh)
const ONE_HAND_TYPES = new Set(['1h_sword', '1h_mace', '1h_axe', '1h_fist', 'dagger', 'warglaive']);

// ─── Allowed weapon types per class ──────────────────────────
const CLASS_WEAPONS = {
  warrior:     new Set(['1h_sword','1h_mace','1h_axe','1h_fist','dagger','2h_sword','2h_mace','2h_axe','polearm','staff','shield']),
  paladin:     new Set(['1h_sword','1h_mace','1h_axe','2h_sword','2h_mace','2h_axe','polearm','shield']),
  deathknight: new Set(['1h_sword','1h_mace','1h_axe','2h_sword','2h_mace','2h_axe','polearm']),
  hunter:      new Set(['bow','gun','crossbow','polearm','1h_sword','1h_axe','1h_fist','2h_sword','2h_axe']),
  rogue:       new Set(['1h_sword','1h_axe','1h_mace','1h_fist','dagger']),
  demonhunter: new Set(['warglaive','1h_sword','1h_axe','1h_fist','dagger']),
  monk:        new Set(['1h_sword','1h_axe','1h_mace','1h_fist','staff','polearm']),
  druid:       new Set(['1h_mace','2h_mace','dagger','1h_fist','staff','polearm','offhand']),
  shaman:      new Set(['1h_axe','1h_mace','2h_axe','2h_mace','1h_fist','dagger','staff','shield']),
  mage:        new Set(['1h_sword','dagger','staff','wand','offhand']),
  warlock:     new Set(['1h_sword','dagger','staff','wand','offhand']),
  priest:      new Set(['1h_mace','dagger','staff','wand','offhand']),
  evoker:      new Set(['dagger','1h_fist','1h_sword','1h_axe','1h_mace','staff','offhand']),
};

async function fetchTooltipInfo(itemId) {
  try {
    const data = await fetchTooltip(itemId, 0);
    const tooltip = data.tooltip || '';

    const classMatch = tooltip.match(/Classes:\s*<a[^>]*>([^<]+)<\/a>/);
    const classRestriction = classMatch ? classMatch[1] : null;

    let weaponType = null;
    const weapMatch = tooltip.match(/<td>(One-Hand|Two-Hand|Main Hand|Off Hand|Ranged|Held In Off-hand)<\/td>(?:<th><!--[^>]*--><span[^>]*>([^<]+)<\/span>)?/i);
    if (weapMatch) {
      const invType = weapMatch[1].toLowerCase();
      const subName = (weapMatch[2] || '').toLowerCase();
      weaponType = normalizeWeaponType(invType, subName);
    }
    if (!weaponType && tooltip.includes('>Shield<')) {
      weaponType = 'shield';
    }

    const slotMatch = tooltip.match(/<td>(Head|Neck|Shoulder|Back|Chest|Wrist|Hands|Waist|Legs|Feet|Finger|Trinket)<\/td>/);
    const invSlot = slotMatch ? slotMatch[1] : null;

    return { classRestriction, weaponType, invSlot };
  } catch {
    return { classRestriction: null, weaponType: null, invSlot: null };
  }
}

function normalizeWeaponType(invType, subName) {
  // invType: "one-hand", "two-hand", "main hand", "off hand", "ranged", "held in off-hand"
  // subName: "sword", "mace", "axe", "dagger", "fist weapon", "staff", "polearm", "bow", "gun", "crossbow", "wand", "shield", "warglaive"
  if (subName.includes('shield')) return 'shield';
  if (subName.includes('warglaive')) return 'warglaive';
  if (subName.includes('bow')) return 'bow';
  if (subName.includes('gun')) return 'gun';
  if (subName.includes('crossbow')) return 'crossbow';
  if (subName.includes('wand')) return 'wand';
  if (subName.includes('staff')) return 'staff';
  if (subName.includes('polearm')) return 'polearm';
  if (subName.includes('dagger')) return 'dagger';
  if (subName.includes('fist')) return invType.includes('two') ? '2h_fist' : '1h_fist';
  if (invType.includes('held in off')) return 'offhand';
  const is2h = invType.includes('two');
  if (subName.includes('sword')) return is2h ? '2h_sword' : '1h_sword';
  if (subName.includes('mace')) return is2h ? '2h_mace' : '1h_mace';
  if (subName.includes('axe')) return is2h ? '2h_axe' : '1h_axe';
  return null;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../src/data');

const ARMOR_TYPE = {
  deathknight: 'plate', warrior: 'plate', paladin: 'plate',
  hunter: 'mail', shaman: 'mail', evoker: 'mail',
  druid: 'leather', rogue: 'leather', monk: 'leather', demonhunter: 'leather',
  mage: 'cloth', warlock: 'cloth', priest: 'cloth',
};

// Slots that are armor-type specific
const ARMOR_SLOTS = new Set(['head', 'shoulder', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet']);
// Universal slots (any class can use)
const UNIVERSAL_SLOTS = new Set(['neck', 'back', 'finger1', 'finger2', 'trinket1', 'trinket2']);
// Weapon slots (complex compatibility, skip for now)
const WEAPON_SLOTS = new Set(['main_hand', 'off_hand']);

// What inventory slot an item must actually occupy to be offered for a gear
// slot. Maxroll occasionally files an item under the wrong one — a tier helm
// listed in a Neck row — and cross-referencing would then offer that helm as a
// neck alt to every spec sharing the stats. The guide's own spec keeps the bad
// row; other specs should not inherit it.
const SLOT_INV_EXPECT = {
  head: 'Head', neck: 'Neck', shoulder: 'Shoulder', back: 'Back',
  chest: 'Chest', wrist: 'Wrist', hands: 'Hands', waist: 'Waist',
  legs: 'Legs', feet: 'Feet',
  finger1: 'Finger', finger2: 'Finger',
  trinket1: 'Trinket', trinket2: 'Trinket',
};

// Slot groups for forSlot naming
function getForSlot(simcSlot) {
  const map = {
    finger1: 'ring', finger2: 'ring',
    trinket1: 'trinket', trinket2: 'trinket',
    main_hand: 'weapon', off_hand: 'weapon',
  };
  return map[simcSlot] || simcSlot;
}

// Normalize slot for matching (finger1/2 → finger, trinket1/2 → trinket)
function normalizeSlot(simcSlot) {
  if (simcSlot.startsWith('finger')) return 'finger';
  if (simcSlot.startsWith('trinket')) return 'trinket';
  return simcSlot;
}

// The spec's equivalence groups, which decide whether a candidate's stats can
// stand in for the BiS item's. A flat array of four is the older shape and
// reads as four groups of one.
function parsePriorityStats(content, specKey) {
  // Returning null here degrades fitKind to exact-only, which is the pipeline
  // and the app disagreeing about what fits — the one thing this shared rule
  // exists to prevent. Never let it happen quietly.
  const warn = (why) => {
    console.warn(`  ! ${specKey}: ${why} — alt candidates will be exact stat matches only`);
    return null;
  };
  const m = content.match(/export var PRIORITY_STATS = (\[[^;]*\]);/);
  if (!m) return warn('no PRIORITY_STATS');
  try {
    const parsed = JSON.parse(m[1]);
    return parsed.length ? parsed : warn('PRIORITY_STATS is empty');
  } catch (err) {
    return warn(`PRIORITY_STATS does not parse (${err.message})`);
  }
}

// ─── Parse all spec files ────────────────────────────────────
function parseSpecFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const classMatch = content.match(/SIMC_CLASS = "([^"]+)"/);
  const simcClass = classMatch ? classMatch[1] : '';

  const bisItems = [];
  const bisMatch = content.match(/export var BIS = \[([^]*?)\];/);
  if (bisMatch) {
    const re = /\{\s*slot:\s*"([^"]+)",\s*(?:simcSlot:\s*"([^"]+)",\s*)?id:\s*(\d+),\s*(?:dungeon|source):\s*"([^"]+)",\s*stats:\s*(\[[^\]]*\])/g;
    let m;
    while ((m = re.exec(bisMatch[1]))) {
      bisItems.push({
        slot: m[1], simcSlot: m[2] || m[1], from: 'BIS',
        id: parseInt(m[3]), source: m[4], stats: JSON.parse(m[5]),
      });
    }
  }

  // Also index MYTHIC items (farmable dungeon alternatives)
  const mythicMatch = content.match(/export var MYTHIC = \[([^]*?)\];/);
  if (mythicMatch) {
    const re = /\{\s*slot:\s*"([^"]+)",\s*id:\s*(\d+),\s*source:\s*"([^"]+)",\s*stats:\s*(\[[^\]]*\])/g;
    let m;
    while ((m = re.exec(mythicMatch[1]))) {
      bisItems.push({
        slot: m[1], simcSlot: m[1], from: 'MYTHIC',
        id: parseInt(m[2]), source: m[3], stats: JSON.parse(m[4]),
      });
    }
  }

  // Infer weapon style: dual (has off_hand) vs 2h (main_hand only)
  const hasOffHand = bisItems.some(b => b.simcSlot === 'off_hand');
  const isDual = hasOffHand;

  return {
    simcClass, armorType: ARMOR_TYPE[simcClass], bisItems, isDual, content,
    priorityStats: parsePriorityStats(content, basename(filePath, '.js')),
  };
}

// A spec whose items name no dungeon from the current pool is running on an
// outdated Maxroll guide. Raid-only sources are fine — MYTHIC always carries
// dungeon drops, so a current spec always matches at least one.
function isStaleSeason(items) {
  return items.length > 0 && !items.some(i => DUNGEONS[i.source]);
}

// MYTHIC is dungeon drops by definition, so a source outside the current pool
// is a retired dungeon — a guide Maxroll has updated only in part. Indexing it
// would offer every other spec an alt it can no longer farm.
function isRetiredDungeonDrop(item) {
  return item.from === 'MYTHIC' && !DUNGEONS[item.source];
}

// Every source the current crawl produced — dungeons, raid bosses, Tier,
// Crafted. Filled while the index is built and used to decide whether a
// preserved weapon alt still belongs to this season.
const CURRENT_SOURCES = new Set();

// ─── Build global item index ─────────────────────────────────
function buildItemIndex() {
  const SKIP_FILES = new Set(['shared.js', 'specs.js', 'sample.js', 'tutorial.js', 'changelog.js']);
  const files = readdirSync(DATA_DIR).filter(f =>
    f.endsWith('.js') && !SKIP_FILES.has(f)
  );

  // Map: normalizedSlot → Map(itemId → itemInfo)
  const slotItems = new Map();
  // Track which armor types use each item in each slot
  const itemSlotArmor = new Map(); // `${id}-${normalizedSlot}` → Set<armorType>
  // Track which classes use each item
  const itemClasses = new Map(); // itemId → Set<simcClass>

  for (const file of files) {
    const { simcClass, armorType, bisItems } = parseSpecFile(resolve(DATA_DIR, file));

    // Maxroll updates guides one at a time, so at a season boundary a few are
    // still on last season's dungeons. Indexing those would hand every other
    // spec alts pointing at dungeons that are no longer in rotation, which is
    // worse than the stale spec simply being stale on its own.
    if (isStaleSeason(bisItems)) {
      console.log(`  skip ${file}: no current-season dungeon in its data (Maxroll guide not updated yet)`);
      continue;
    }

    for (const item of bisItems) {
      if (isRetiredDungeonDrop(item)) continue;
      for (const part of item.source.split(' & ')) CURRENT_SOURCES.add(part.trim());
      const normSlot = normalizeSlot(item.simcSlot);

      if (!slotItems.has(normSlot)) slotItems.set(normSlot, new Map());
      const slotMap = slotItems.get(normSlot);

      if (!slotMap.has(item.id)) {
        slotMap.set(item.id, {
          id: item.id,
          source: item.source, stats: item.stats,
        });
      }

      const key = `${item.id}-${normSlot}`;
      if (!itemSlotArmor.has(key)) itemSlotArmor.set(key, new Set());
      itemSlotArmor.get(key).add(armorType);

      if (!itemClasses.has(item.id)) itemClasses.set(item.id, new Set());
      itemClasses.get(item.id).add(simcClass);
    }
  }

  return { slotItems, itemSlotArmor, itemClasses };
}

function sortAlts(alts) {
  alts.sort((a, b) =>
    a.forSlot.localeCompare(b.forSlot) ||
    fitRank(a.fit) - fitRank(b.fit) ||
    a.id - b.id);
}

// ─── Find alts for a spec ────────────────────────────────────
async function findAltsForSpec(specKey, index) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  const { simcClass, armorType, bisItems, isDual, priorityStats } = parseSpecFile(filePath);
  const { slotItems, itemSlotArmor, itemClasses } = index;
  const className = CLASS_NAME_MAP[simcClass];

  const bisIds = new Set(bisItems.map(b => b.id));
  const alts = [];
  const addedKeys = new Set();

  for (const bis of bisItems) {
    // Stat-less items (trinkets typically) match by ID alone, so there is
    // nothing here to find them an alternative for.
    if (!bis.stats.length) continue;

    const normSlot = normalizeSlot(bis.simcSlot);
    const forSlot = getForSlot(bis.simcSlot);

    const candidates = slotItems.get(normSlot);
    if (!candidates) continue;

    for (const [id, item] of candidates) {
      if (bisIds.has(id)) continue;
      // Same rule the app matches with — see fitKind in src/logic/matching.js.
      // The two drifting apart would put items in the alt list the app then
      // refuses to recognise.
      const fit = fitKind(item.stats, bis.stats, priorityStats);
      if (!fit) continue;

      const altKey = `${forSlot}-${id}`;
      if (addedKeys.has(altKey)) continue;

      // Check armor compatibility for armor slots
      if (ARMOR_SLOTS.has(bis.simcSlot)) {
        const armKey = `${id}-${normSlot}`;
        const armorTypes = itemSlotArmor.get(armKey);
        if (!armorTypes || !armorTypes.has(armorType)) continue;
      }
      const wantInv = SLOT_INV_EXPECT[bis.simcSlot];
      if (wantInv) {
        const { invSlot } = await fetchTooltipInfo(id);
        if (invSlot && invSlot !== wantInv) {
          console.log(`  skip ${id}: ${invSlot} item offered for ${bis.simcSlot}`);
          continue;
        }
      }

      // Check class restriction and weapon type via Wowhead tooltip
      const classes = itemClasses.get(id);
      const needsCheck = (classes && !classes.has(simcClass)) || WEAPON_SLOTS.has(bis.simcSlot);

      if (needsCheck) {
        const info = await fetchTooltipInfo(id);
        if (info.classRestriction && info.classRestriction !== className) {
          console.log(`  skip ${item.id} (${id}): class-locked to ${info.classRestriction}`);
          continue;
        }
        if (WEAPON_SLOTS.has(bis.simcSlot) && info.weaponType) {
          const allowed = CLASS_WEAPONS[simcClass];
          if (allowed && !allowed.has(info.weaponType)) {
            console.log(`  skip ${item.id} (${id}): weapon type ${info.weaponType} not usable by ${simcClass}`);
            continue;
          }
          // Filter by weapon style: dual wield specs need 1h, 2h specs need 2h
          if (isDual && TWO_HAND_TYPES.has(info.weaponType)) {
            console.log(`  skip ${item.id} (${id}): 2h weapon not usable in dual wield build`);
            continue;
          }
          if (!isDual && ONE_HAND_TYPES.has(info.weaponType)) {
            console.log(`  skip ${item.id} (${id}): 1h weapon not usable in 2h build`);
            continue;
          }
        }
      }

      addedKeys.add(altKey);
      alts.push({
        forSlot,
        id: item.id,
        source: item.source,
        stats: item.stats,
        fit,
      });
    }
  }

  sortAlts(alts);
  return alts;
}

// ─── Update spec file ────────────────────────────────────────
function updateSpecFile(specKey, alts) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  let content = readFileSync(filePath, 'utf8');

  // Preserve existing weapon alts added by generate-spec-data (skipped 2H/1H
  // options), which this script cannot derive from the index.
  //
  // Weapon alts ONLY, and only ones still sourced from somewhere in the current
  // season. Carrying over every unrecognised id would make ALTS append-only:
  // a retired season's items would never leave the file, because nothing else
  // ever deletes them.
  const existingAltsMatch = content.match(/export var ALTS = \[([^]*?)\];/);
  if (existingAltsMatch) {
    const altIds = new Set(alts.map(a => a.id));
    const existingRe = /\{\s*forSlot:\s*"([^"]+)",\s*id:\s*(\d+),\s*source:\s*"([^"]+)",\s*stats:\s*(\[[^\]]*\])(?:\s*,\s*fit:\s*"([^"]+)")?\s*,?\s*\}/g;
    let m;
    while ((m = existingRe.exec(existingAltsMatch[1]))) {
      const id = parseInt(m[2]);
      const stillCurrent = m[3]
        .split(' & ')
        .every(part => CURRENT_SOURCES.has(part.trim()));
      if (m[1] === 'weapon' && stillCurrent && !altIds.has(id)) {
        alts.push({
          forSlot: m[1], id,
          source: m[3], stats: JSON.parse(m[4]),
          // A weapon generate-spec-data picked for this spec. It was chosen on
          // the spec's own stats, so it is an exact fit unless it says so.
          fit: m[5] || 'exact',
        });
        altIds.add(id);
      }
    }
    sortAlts(alts);
  }

  let altsStr = 'export var ALTS = [\n';
  for (const alt of alts) {
    const fit = alt.fit === 'equivalent' ? `, fit: "equivalent"` : '';
    altsStr += `  { forSlot: ${JSON.stringify(alt.forSlot)}, id: ${alt.id}, source: ${JSON.stringify(alt.source)}, stats: ${JSON.stringify(alt.stats)}${fit} },\n`;
  }
  altsStr += '];';

  content = content.replace(/export var ALTS = \[.*?\];/s, altsStr);

  // Update KNOWN_STATS
  const ksMatch = content.match(/export var KNOWN_STATS = \{([^]*?)\};/);
  if (ksMatch) {
    const existing = {};
    const ksRegex = /(\d+):\s*(\[[^\]]*\])/g;
    let km;
    while ((km = ksRegex.exec(ksMatch[1]))) {
      existing[km[1]] = JSON.parse(km[2]);
    }
    for (const alt of alts) {
      if (!existing[alt.id]) existing[alt.id] = alt.stats;
    }
    const entries = Object.entries(existing);
    let ksStr = 'export var KNOWN_STATS = {\n';
    const perLine = 4;
    for (let i = 0; i < entries.length; i += perLine) {
      const chunk = entries.slice(i, i + perLine);
      ksStr += `  ${chunk.map(([id, stats]) => `${id}:${JSON.stringify(stats)}`).join(',')},\n`;
    }
    ksStr += '};';
    content = content.replace(/export var KNOWN_STATS = \{[^]*?\};/, ksStr);
  }

  writeFileSync(filePath, content, 'utf8');
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const targetKey = args[0];

  console.log('Building global item index...');
  const index = buildItemIndex();

  const SKIP_FILES_MAIN = new Set(['shared.js', 'specs.js', 'sample.js', 'tutorial.js', 'changelog.js']);
  const specFiles = readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.js') && !SKIP_FILES_MAIN.has(f))
    .map(f => f.replace('.js', ''));

  const targets = targetKey ? [targetKey] : specFiles;
  let total = 0;

  for (const specKey of targets) {
    const alts = await findAltsForSpec(specKey, index);
    if (alts.length > 0) {
      updateSpecFile(specKey, alts);
      console.log(`${specKey}: ${alts.length} alts`);
      total += alts.length;
    } else {
      console.log(`${specKey}: 0 alts`);
    }
  }
  console.log(`\nDone: ${total} total alts across ${targets.length} specs`);
  saveCache();
}

export { buildItemIndex, findAltsForSpec, updateSpecFile };

// Run as CLI
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__dirname, 'find-alts.mjs');
if (isMain) main();
