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
import { dropTable } from './wago-db2.mjs';
import { scoreStats } from '../src/logic/matching.js';
import { DUNGEONS, CURRENT_RAID } from '../src/data/shared.js';

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

/**
 * Everything the season pool needs to know about one item, from its tooltip.
 *
 * The drop table says where an item comes from and nothing else, so slot,
 * armour class, primary stat and weapon type all have to be read here. Primary
 * stat arrives as a bracketed choice — "+141 [Strength or Intellect]" — which
 * is the item offering itself to more than one class, not three separate stats.
 */
async function fetchTooltipInfo(itemId) {
  try {
    const data = await fetchTooltip(itemId, 0);
    const tooltip = data.tooltip || '';
    const text = tooltip.replace(/<[^>]*>/g, ' ');

    const classMatch = tooltip.match(/Classes:\s*<a[^>]*>([^<]+)<\/a>/);
    const classRestriction = classMatch ? classMatch[1] : null;

    let weaponType = null;
    const weapMatch = tooltip.match(/<td>(One-Hand|Two-Hand|Main Hand|Off Hand|Ranged|Held In Off-hand)<\/td>(?:<th><!--[^>]*--><span[^>]*>([^<]+)<\/span>)?/i);
    const hand = weapMatch ? weapMatch[1] : null;
    if (weapMatch) {
      weaponType = normalizeWeaponType(weapMatch[1].toLowerCase(), (weapMatch[2] || '').toLowerCase());
    }
    if (!weaponType && tooltip.includes('>Shield<')) weaponType = 'shield';

    const slotMatch = tooltip.match(/<td>(Head|Neck|Shoulder|Back|Chest|Wrist|Hands|Waist|Legs|Feet|Finger|Trinket)<\/td>/);
    const invSlot = slotMatch ? slotMatch[1] : null;

    const armorMatch = tooltip.match(/>(Plate|Mail|Leather|Cloth)</);
    const armorClass = armorMatch ? armorMatch[1].toLowerCase() : null;

    // "+141 [Strength or Intellect]" on anything a second class could wear;
    // a bare "+124 Strength" when only one can. Accessories carry neither,
    // which is why an empty list means "no restriction", not "unusable".
    const primary = [];
    const bracket = text.match(/\+[\d,]+ \[([^\]]+)\]/);
    if (bracket) {
      for (const word of bracket[1].split(/\s+or\s+/)) {
        const key = PRIMARY_NAMES[word.trim().toLowerCase()];
        if (key) primary.push(key);
      }
    } else {
      for (const [word, key] of Object.entries(PRIMARY_NAMES)) {
        if (new RegExp(`\\+[\\d,]+ ${word}`, 'i').test(text)) primary.push(key);
      }
    }

    // Only ever one encounter line, and only on things that drop.
    const dropMatch = text.match(/Dropped by:\s*(.+?)\s*(?:Sell Price|$)/);

    return {
      name: data.name || null,
      classRestriction, weaponType, invSlot, armorClass, hand,
      primary,
      stats: parseSecondaryStats(tooltip),
      droppedBy: dropMatch ? dropMatch[1].trim() : null,
    };
  } catch {
    return { name: null, classRestriction: null, weaponType: null, invSlot: null, armorClass: null, hand: null, primary: [], stats: [], droppedBy: null };
  }
}

const PRIMARY_NAMES = { strength: 'str', agility: 'agi', intellect: 'int' };

/** The four secondary stats, read off the tooltip's rating markers. */
function parseSecondaryStats(tooltip) {
  const stats = [];
  if (tooltip.includes('<!--rtg32-->')) stats.push('crit');
  if (tooltip.includes('<!--rtg36-->')) stats.push('haste');
  if (tooltip.includes('<!--rtg49-->')) stats.push('mastery');
  if (tooltip.includes('<!--rtg40-->')) stats.push('vers');
  return stats;
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
  if (WEAPON_SLOTS.has(simcSlot)) return 'weapon';
  return simcSlot;
}

// Primary stat per class. Armour class implies it for the eight armour slots,
// so this only decides weapons and trinkets — the slots where a plate class and
// a cloth one can be offered the same item.
const CLASS_PRIMARY = {
  warrior: 'str', paladin: 'str', deathknight: 'str',
  hunter: 'agi', shaman: 'agi', druid: 'agi', rogue: 'agi', monk: 'agi', demonhunter: 'agi',
  evoker: 'int', mage: 'int', warlock: 'int', priest: 'int',
};

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

/**
 * Every item a player can farm this season, from the client's own loot table.
 *
 * The pool used to be built by cross-referencing what the other 39 specs had
 * been recommended, which is a list of opinions rather than an inventory: it
 * collapsed to 283 items, most unusable by any given spec, and left Blood DK
 * with no weapon alternatives at all. JournalEncounterItem knows what actually
 * drops. Filtering it to the season's dungeons and raid is the whole season
 * gate — a retired dungeon is simply not in DUNGEONS, so its loot cannot enter.
 *
 * Returns Map(normalizedSlot -> item[]), each item carrying what
 * findAltsForSpec needs to decide whether this spec can wear it.
 */
async function buildSeasonPool() {
  const { byInstance } = await dropTable();
  const instances = [...Object.keys(DUNGEONS), CURRENT_RAID];

  for (const name of instances) {
    if (!byInstance.has(name)) {
      console.warn(`  ! ${name} is not in the client's loot table — check the name against JournalInstance`);
    }
  }
  warnIfRaidLooksWrong(byInstance);

  const drops = new Map();
  for (const name of instances) {
    for (const [itemId, drop] of byInstance.get(name) || []) {
      if (!drops.has(itemId)) drops.set(itemId, drop);
    }
  }

  const bySlot = new Map();
  let skipped = 0;
  for (const [itemId, drop] of drops) {
    const info = await fetchTooltipInfo(itemId);
    const slot = poolSlot(info);
    // Recipes, consumables and furnishings drop alongside gear and have no
    // inventory slot. Nothing else needs excluding here.
    if (!slot) { skipped++; continue; }
    if (!bySlot.has(slot)) bySlot.set(slot, []);
    // The dungeon, not the boss. DUNGEONS keys the badge colour and the filter
    // row, and a player queues for an instance rather than an encounter. The
    // boss is kept beside it for anything that wants it.
    bySlot.get(slot).push({ id: itemId, source: drop.instance, encounter: drop.encounter, ...info });
  }

  for (const [slot, items] of bySlot) bySlot.set(slot, dropReissuedOriginals(items));
  console.log(`  season pool: ${drops.size - skipped} items across ${bySlot.size} slots (${skipped} non-gear drops ignored)`);
  return bySlot;
}

/**
 * The legacy dungeons in the pool carry both the original item and the Midnight
 * re-issue of it, under one name — Kings' Rest and Temple of Sethraliss account
 * for all fourteen. Both drop from the same encounter, so the join returns both
 * and the alt list showed each helm twice.
 *
 * The re-issue is the one that rolls secondary stats; the original has none, its
 * budget having been spent when the item level meant something else. That is the
 * whole test. Item id order would give the same answer today, but only because
 * Blizzard happened to assign the new ids later, which is not a rule.
 *
 * Genuinely stat-less gear exists — proc weapons, most trinkets — and is kept:
 * this only ever discards the loser of a same-name pair.
 */
function dropReissuedOriginals(items) {
  const byName = new Map();
  for (const item of items) {
    if (!item.name) continue;
    const key = `${item.source}|${item.name}`;
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(item);
  }
  const discard = new Set();
  for (const [key, group] of byName) {
    if (group.length < 2) continue;
    const withStats = group.filter((i) => i.stats.length);
    if (withStats.length !== 1) {
      console.warn(`  ! ${key}: ${group.length} items share a name and ${withStats.length} carry stats — keeping all`);
      continue;
    }
    for (const item of group) if (item !== withStats[0]) discard.add(item.id);
  }
  return items.filter((i) => !discard.has(i.id));
}

/**
 * CURRENT_RAID is maintained by hand because the loot table marks no season.
 * The instance holding the highest ItemID is the right answer today, so it is
 * worth cross-checking — but it assumes Blizzard never adds an item to an older
 * raid, which is too weak a thing to decide on.
 */
function warnIfRaidLooksWrong(byInstance) {
  let newest = null, newestId = -1;
  for (const [name, items] of byInstance) {
    for (const id of items.keys()) if (id > newestId) { newestId = id; newest = name; }
  }
  if (newest && newest !== CURRENT_RAID) {
    console.warn(`  ! CURRENT_RAID is ${CURRENT_RAID}, but ${newest} holds the highest item id (${newestId}). Check shared.js against the season.`);
  }
}

/** Which of our slots a pool item belongs to, or null if it is not gear. */
function poolSlot(info) {
  if (info.invSlot) return INV_SLOT_TO_SLOT[info.invSlot] || null;
  if (info.weaponType || info.hand) return 'weapon';
  return null;
}

const INV_SLOT_TO_SLOT = {
  Head: 'head', Neck: 'neck', Shoulder: 'shoulder', Back: 'back', Chest: 'chest',
  Wrist: 'wrist', Hands: 'hands', Waist: 'waist', Legs: 'legs', Feet: 'feet',
  Finger: 'finger', Trinket: 'trinket',
};

/**
 * Alt rows carry no grade — which one to chase is the player's call, and
 * secondary stats get tuned with rings, neck, gems and enchants rather than by
 * re-farming a tier chest. But no spec is indifferent between its secondaries,
 * so the list is ordered by how well each item suits this one. Best first.
 */
function sortAlts(alts, priorityStats) {
  alts.sort((a, b) =>
    a.forSlot.localeCompare(b.forSlot) ||
    scoreStats(b.stats, priorityStats) - scoreStats(a.stats, priorityStats) ||
    a.source.localeCompare(b.source) ||
    a.id - b.id);
}

// ─── Find alts for a spec ────────────────────────────────────
/**
 * Every item in the season pool this spec can wear, in the slots it uses.
 *
 * There is no secondary-stat gate. An alt is a slot's other options, and a
 * player picks among them on more than stats — a tier piece is worn for its set
 * bonus whatever it rolls, and secondaries get tuned with rings, neck, gems and
 * enchants. The rosters say so plainly: 42 of 50 Blood DKs wear a haste/mastery
 * helm although the spec's pair is crit/mastery. Gating on stats hid every one
 * of those from the list.
 *
 * What does gate is whether the item can go in the slot at all: armour class,
 * primary stat, class lock, weapon type and hand count.
 */
async function findAltsForSpec(specKey, pool) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  const { simcClass, armorType, bisItems, isDual, priorityStats } = parseSpecFile(filePath);
  const className = CLASS_NAME_MAP[simcClass];
  const primary = CLASS_PRIMARY[simcClass];
  const allowedWeapons = CLASS_WEAPONS[simcClass];

  const bisIds = new Set(bisItems.map(b => b.id));
  const slots = new Set(bisItems.map(b => normalizeSlot(b.simcSlot)));
  const alts = [];

  for (const slot of slots) {
    const forSlot = getForSlot(slot === 'finger' ? 'finger1' : slot === 'trinket' ? 'trinket1' : slot);
    for (const item of pool.get(slot) || []) {
      if (bisIds.has(item.id)) continue;
      if (item.classRestriction && item.classRestriction !== className) continue;

      // An accessory carries no primary stat, so an empty list is "anyone",
      // not "no one". Armour slots are decided by armour class instead, which
      // already implies the primary — every plate class is Strength.
      if (item.primary.length && !item.primary.includes(primary)) continue;
      if (ARMOR_SLOTS.has(slot) && item.armorClass && item.armorClass !== armorType) continue;

      if (slot === 'weapon') {
        if (!item.weaponType || !allowedWeapons || !allowedWeapons.has(item.weaponType)) continue;
        if (isDual && TWO_HAND_TYPES.has(item.weaponType)) continue;
        if (!isDual && ONE_HAND_TYPES.has(item.weaponType)) continue;
      }

      alts.push({ forSlot, id: item.id, source: item.source, stats: item.stats });
    }
  }

  sortAlts(alts, priorityStats);
  return alts;
}

// ─── Update spec file ────────────────────────────────────────
function updateSpecFile(specKey, alts) {
  const filePath = resolve(DATA_DIR, `${specKey}.js`);
  let content = readFileSync(filePath, 'utf8');

  // Nothing is preserved from the previous run. Weapons used to be, because
  // the cross-referenced index could not derive them; the drop table can, so
  // carrying rows over would only keep a retired season's items alive — nothing
  // else ever deletes them.

  let altsStr = 'export var ALTS = [\n';
  for (const alt of alts) {
    altsStr += `  { forSlot: ${JSON.stringify(alt.forSlot)}, id: ${alt.id}, source: ${JSON.stringify(alt.source)}, stats: ${JSON.stringify(alt.stats)} },\n`;
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

  console.log('Building the season pool from the client loot table...');
  const pool = await buildSeasonPool();

  const SKIP_FILES_MAIN = new Set(['shared.js', 'specs.js', 'sample.js', 'tutorial.js', 'changelog.js']);
  const specFiles = readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.js') && !SKIP_FILES_MAIN.has(f))
    .map(f => f.replace('.js', ''));

  const targets = targetKey ? [targetKey] : specFiles;
  let total = 0;

  for (const specKey of targets) {
    const alts = await findAltsForSpec(specKey, pool);
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

export { buildSeasonPool, findAltsForSpec, updateSpecFile };

// Run as CLI
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__dirname, 'find-alts.mjs');
if (isMain) main();
