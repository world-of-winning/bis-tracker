// Generate sample SimC texts to demo the tracker without the addon
// Shows: multiple characters, same name + different specs, all priority tiers

import { SPECS } from './specs.js';
import { TIERS } from './shared.js';
import enItems from '../i18n/items/en.json';

// Curated sample specs: diverse classes, some share names to demo multi-spec
// tierLevel: 2 = hero→myth progression (default), 1 = champion→hero progression
export var SAMPLE_CHARS = [
  // Evoker (mail, 2 specs) — hero gear
  { specKey: "dev-evoker", name: "Aetherion", tierLevel: 2 },
  { specKey: "aug-evoker", name: "Aetherion", tierLevel: 2 },
  // Mage (cloth) — hero gear
  { specKey: "fire-mage", name: "Elyndra", tierLevel: 2 },
  // Paladin (plate, 2 specs) — champion gear
  { specKey: "prot-paladin", name: "Kargath", tierLevel: 1 },
  { specKey: "ret-paladin", name: "Kargath", tierLevel: 1 },
  // Death Knight (plate, 2 specs) — hero gear
  { specKey: "frost-dk", name: "Morvaine", tierLevel: 2 },
  { specKey: "blood-dk", name: "Morvaine", tierLevel: 2 },
  // Rogue (leather) — champion gear
  { specKey: "sub-rogue", name: "Nyx", tierLevel: 1 },
  // Demon Hunter (leather, 2 specs) — hero gear
  { specKey: "havoc-dh", name: "Zul'khar", tierLevel: 2 },
  { specKey: "veng-dh", name: "Zul'khar", tierLevel: 1 },
  // Shaman (mail) — champion gear
  { specKey: "resto-shaman", name: "Tidecaller", tierLevel: 1 },
  // Priest (cloth, 2 specs) — hero gear
  { specKey: "shadow-priest", name: "Solace", tierLevel: 2 },
  { specKey: "disc-priest", name: "Solace", tierLevel: 1 },
  // Warrior (plate) — hero gear
  { specKey: "fury-warrior", name: "Grimjaw", tierLevel: 2 },
  // Hunter (mail) — champion gear
  { specKey: "bm-hunter", name: "Ashvane", tierLevel: 1 },
  // Druid (leather) — hero gear
  { specKey: "feral-druid", name: "Thornweald", tierLevel: 2 },
  // Warlock (cloth) — champion gear
  { specKey: "destro-lock", name: "Nethys", tierLevel: 1 },
  // Monk (leather) — hero gear
  { specKey: "ww-monk", name: "Zenjin", tierLevel: 2 },
];

function generateSampleSimC(spec, charName, tierLevel) {
  var BIS = spec.BIS;
  var ALTS = spec.ALTS;
  // tierLevel indexes into TIERS: done tier = tierLevel, upgrade tier = tierLevel - 1
  var doneTier = TIERS[tierLevel] || TIERS[2];
  var upgradeTier = TIERS[tierLevel - 1] || TIERS[0];

  // Weapon/off_hand slots are skipped for alt/wrong — too many compatibility issues
  var SKIP_SLOTS = new Set(["main_hand", "off_hand"]);

  // Build ALT lookup: slot -> first alt item
  var altBySlot = {};
  ALTS.forEach(function(a) {
    if (a.forSlot === "weapon") return;
    var slots = [];
    if (a.forSlot === "ring") slots = ["finger1", "finger2"];
    else slots = [a.forSlot];
    slots.forEach(function(s) {
      if (!altBySlot[s]) altBySlot[s] = a;
    });
  });

  // Assign tiers for a balanced demo
  var assignments = BIS.map(function(b, i) {
    if (SKIP_SLOTS.has(b.slot)) return "bis-done";
    var mod = i % 16;
    if (mod < 5) return "bis-done";      // tier 4
    if (mod < 8) return "bis-upgrade";    // tier 3
    if (mod < 12 && altBySlot[b.slot]) return "alt"; // tier 2
    return "wrong";                        // tier 1
  });

  // Build wrong-item pool per slot: alt items for the same slot
  var wrongBySlot = {};
  var bisIdSet = {};
  BIS.forEach(function(b) { bisIdSet[b.id] = true; });
  if (spec.MYTHIC) spec.MYTHIC.forEach(function(m) { bisIdSet[m.id] = true; });
  ALTS.forEach(function(a) {
    if (a.forSlot === "weapon") return;
    var slots = [];
    if (a.forSlot === "ring") slots = ["finger1", "finger2"];
    else if (a.forSlot === "trinket") slots = ["trinket1", "trinket2"];
    else slots = [a.forSlot];
    slots.forEach(function(s) {
      if (!wrongBySlot[s]) wrongBySlot[s] = [];
      if (!bisIdSet[a.id]) wrongBySlot[s].push(a);
    });
  });

  var lines = [];
  lines.push(spec.SIMC_CLASS + '="' + charName + '"');
  lines.push("level=90");
  lines.push("spec=" + spec.SIMC_SPEC);
  lines.push("");

  var wrongCounters = {};
  var usedIds = new Set();
  BIS.forEach(function(b, i) {
    var assign = assignments[i];
    var itemId, itemName, ilvl;

    // ilvl strategy:
    //   bis-done   → doneTier     → tier 4 ✓
    //   bis-upgrade → upgradeTier  → tier 3 ↑
    //   alt        → upgradeTier  → tier 2 ◆
    //   wrong      → upgradeTier  → tier 1 ▲
    var tierBonus;
    if (assign === "bis-done") {
      itemId = b.id;
      itemName = enItems[b.id] || String(b.id);
      ilvl = doneTier.max;
      tierBonus = doneTier.tooltipBonus;
    } else if (assign === "bis-upgrade") {
      itemId = b.id;
      itemName = enItems[b.id] || String(b.id);
      ilvl = upgradeTier.max;
      tierBonus = upgradeTier.tooltipBonus;
    } else if (assign === "alt") {
      var alt = altBySlot[b.slot];
      // Skip if already used (unique-equip), fall back to BiS
      if (usedIds.has(alt.id)) {
        itemId = b.id;
        itemName = enItems[b.id] || String(b.id);
      } else {
        itemId = alt.id;
        itemName = enItems[alt.id] || String(alt.id);
      }
      ilvl = upgradeTier.max;
      tierBonus = upgradeTier.tooltipBonus;
    } else {
      // Pick a wrong item from the same slot's alt pool, skip already used
      var pool = wrongBySlot[b.slot];
      itemId = null;
      if (pool && pool.length > 0) {
        if (!wrongCounters[b.slot]) wrongCounters[b.slot] = 0;
        for (var attempt = 0; attempt < pool.length; attempt++) {
          var candidate = pool[(wrongCounters[b.slot] + attempt) % pool.length];
          if (!usedIds.has(candidate.id)) {
            itemId = candidate.id;
            itemName = enItems[candidate.id] || String(candidate.id);
            wrongCounters[b.slot] += attempt + 1;
            break;
          }
        }
      }
      if (!itemId) {
        // Fallback: use own BiS item (will show as tier 3 instead of tier 1)
        itemId = b.id;
        itemName = enItems[b.id] || String(b.id);
      }
      ilvl = upgradeTier.max;
      tierBonus = upgradeTier.tooltipBonus;
    }
    usedIds.add(itemId);

    lines.push("# " + itemName + " (" + ilvl + ")");
    lines.push(b.slot + "=,id=" + itemId + ",bonus_id=13577/" + tierBonus);
  });

  return lines.join("\n");
}

export function getSampleChars() {
  return SAMPLE_CHARS.map(function(c) {
    var spec = SPECS.find(function(s) { return s.SPEC_KEY === c.specKey; });
    return { spec: spec, name: c.name, simcText: generateSampleSimC(spec, c.name, c.tierLevel || 2) };
  });
}
