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
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

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

// Slot groups for forSlot naming
function getForSlot(simcSlot) {
  const map = {
    head: '머리', neck: '목', shoulder: '어깨', back: '망토',
    chest: '가슴', wrist: '손목', hands: '장갑', waist: '허리',
    legs: '다리', feet: '발',
    finger1: '반지', finger2: '반지',
    trinket1: '장신구', trinket2: '장신구',
    main_hand: '무기', off_hand: '무기',
  };
  return map[simcSlot] || simcSlot;
}

// Normalize slot for matching (finger1/2 → finger, trinket1/2 → trinket)
function normalizeSlot(simcSlot) {
  if (simcSlot.startsWith('finger')) return 'finger';
  if (simcSlot.startsWith('trinket')) return 'trinket';
  return simcSlot;
}

function statsKey(stats) {
  return [...stats].sort().join('+');
}

// ─── Parse all spec files ────────────────────────────────────
function parseSpecFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const classMatch = content.match(/SIMC_CLASS = "([^"]+)"/);
  const simcClass = classMatch ? classMatch[1] : '';

  const bisItems = [];
  const bisMatch = content.match(/export var BIS = \[([^]*?)\];/);
  if (bisMatch) {
    const re = /\{\s*slot:\s*"([^"]+)",\s*(?:simcSlot:\s*"([^"]+)",\s*)?en:\s*"([^"]+)",\s*ko:\s*"([^"]+)",\s*id:\s*(\d+),\s*(?:dungeon|source):\s*"([^"]+)",\s*stats:\s*(\[[^\]]*\])/g;
    let m;
    while ((m = re.exec(bisMatch[1]))) {
      bisItems.push({
        slot: m[1], simcSlot: m[2] || m[1], en: m[3], ko: m[4],
        id: parseInt(m[5]), dungeon: m[6], stats: JSON.parse(m[7]),
      });
    }
  }

  // Also index MYTHIC items (farmable dungeon alternatives)
  const mythicMatch = content.match(/export var MYTHIC = \[([^]*?)\];/);
  if (mythicMatch) {
    const re = /\{\s*slot:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*ko:\s*"([^"]+)",\s*id:\s*(\d+),\s*source:\s*"([^"]+)",\s*stats:\s*(\[[^\]]*\])/g;
    let m;
    while ((m = re.exec(mythicMatch[1]))) {
      bisItems.push({
        slot: m[1], simcSlot: m[1], en: m[2], ko: m[3],
        id: parseInt(m[4]), dungeon: m[5], stats: JSON.parse(m[6]),
      });
    }
  }

  return { simcClass, armorType: ARMOR_TYPE[simcClass], bisItems, content };
}

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

  for (const file of files) {
    const { simcClass, armorType, bisItems } = parseSpecFile(resolve(DATA_DIR, file));

    for (const item of bisItems) {
      const normSlot = normalizeSlot(item.simcSlot);

      if (!slotItems.has(normSlot)) slotItems.set(normSlot, new Map());
      const slotMap = slotItems.get(normSlot);

      if (!slotMap.has(item.id)) {
        slotMap.set(item.id, {
          id: item.id, en: item.en, ko: item.ko,
          dungeon: item.dungeon, stats: item.stats,
        });
      }

      const key = `${item.id}-${normSlot}`;
      if (!itemSlotArmor.has(key)) itemSlotArmor.set(key, new Set());
      itemSlotArmor.get(key).add(armorType);
    }
  }

  return { slotItems, itemSlotArmor };
}

// ─── Find alts for a spec ────────────────────────────────────
function findAltsForSpec(specKey, index) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  const { simcClass, armorType, bisItems } = parseSpecFile(filePath);
  const { slotItems, itemSlotArmor } = index;

  const bisIds = new Set(bisItems.map(b => b.id));
  const alts = [];
  const addedKeys = new Set();

  for (const bis of bisItems) {
    // Skip items without stats (trinkets typically)
    if (bis.stats.length < 2) continue;

    const normSlot = normalizeSlot(bis.simcSlot);
    const bisStats = statsKey(bis.stats);
    const forSlot = getForSlot(bis.simcSlot);

    const candidates = slotItems.get(normSlot);
    if (!candidates) continue;

    for (const [id, item] of candidates) {
      if (bisIds.has(id)) continue;
      if (item.stats.length < 2) continue;
      if (statsKey(item.stats) !== bisStats) continue;

      const altKey = `${forSlot}-${id}`;
      if (addedKeys.has(altKey)) continue;

      // Check armor compatibility for armor slots
      if (ARMOR_SLOTS.has(bis.simcSlot)) {
        const armKey = `${id}-${normSlot}`;
        const armorTypes = itemSlotArmor.get(armKey);
        if (!armorTypes || !armorTypes.has(armorType)) continue;
      }
      // For weapons, allow any weapon used in main_hand/off_hand by any spec
      // (weapon type compatibility is complex, accept all for now)

      addedKeys.add(altKey);
      alts.push({
        forSlot,
        id: item.id,
        en: item.en,
        ko: item.ko,
        dungeon: item.dungeon,
        stats: item.stats,
      });
    }
  }

  alts.sort((a, b) => a.forSlot.localeCompare(b.forSlot) || a.id - b.id);
  return alts;
}

// ─── Update spec file ────────────────────────────────────────
function updateSpecFile(specKey, alts) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  let content = readFileSync(filePath, 'utf8');

  let altsStr = 'export var ALTS = [\n';
  for (const alt of alts) {
    altsStr += `  { forSlot: ${JSON.stringify(alt.forSlot)}, id: ${alt.id}, en: ${JSON.stringify(alt.en)}, ko: ${JSON.stringify(alt.ko)}, dungeon: ${JSON.stringify(alt.dungeon)}, stats: ${JSON.stringify(alt.stats)} },\n`;
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
  const alts = findAltsForSpec(specKey, index);
  if (alts.length > 0) {
    updateSpecFile(specKey, alts);
    console.log(`${specKey}: ${alts.length} alts`);
    total += alts.length;
  } else {
    console.log(`${specKey}: 0 alts`);
  }
}
console.log(`\nDone: ${total} total alts across ${targets.length} specs`);
