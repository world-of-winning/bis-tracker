// Generate sample SimC texts to demo the tracker without the addon
// Shows: multiple characters, same name + different specs, all priority tiers

import { SPECS } from './specs.js';
import { TIERS } from './shared.js';

import enItems from '../i18n/items/en.json';

// The track a sample character's gear sits on when the demo does not say. Not
// a target — the tracker has no target grade any more (ADR 0005) — just where
// the made-up gear is, so the demo shows a list with something left to do.
var SAMPLE_TIER = "hero";

// Curated sample specs: diverse classes, some share names to demo multi-spec
// tier: the grade the character has finished. Items one grade below it show as
// still-upgrading. Named by key, not index, so adding a grade cannot silently
// re-point every sample character at a different one.
export var SAMPLE_CHARS = [
  // Evoker (mail, 2 specs) — hero gear
  { specKey: "dev-evoker", name: "Aetherion", tier: "hero" },
  { specKey: "aug-evoker", name: "Aetherion", tier: "hero" },
  // Mage (cloth) — hero gear
  { specKey: "fire-mage", name: "Elyndra", tier: "hero" },
  // Paladin (plate, 2 specs) — champion gear
  { specKey: "prot-paladin", name: "Kargath", tier: "champion" },
  { specKey: "ret-paladin", name: "Kargath", tier: "champion" },
  // Death Knight (plate, 2 specs) — hero gear
  { specKey: "frost-dk", name: "Morvaine", tier: "hero" },
  { specKey: "blood-dk", name: "Morvaine", tier: "hero" },
  // Rogue (leather) — champion gear
  { specKey: "sub-rogue", name: "Nyx", tier: "champion" },
  // Demon Hunter (leather, 2 specs) — hero gear
  { specKey: "havoc-dh", name: "Zul'khar", tier: "hero" },
  { specKey: "veng-dh", name: "Zul'khar", tier: "champion" },
  // Shaman (mail) — champion gear
  { specKey: "resto-shaman", name: "Tidecaller", tier: "champion" },
  // Priest (cloth, 2 specs) — hero gear
  { specKey: "shadow-priest", name: "Solace", tier: "hero" },
  { specKey: "disc-priest", name: "Solace", tier: "champion" },
  // Warrior (plate) — hero gear
  { specKey: "fury-warrior", name: "Grimjaw", tier: "hero" },
  // Hunter (mail) — champion gear
  { specKey: "bm-hunter", name: "Ashvane", tier: "champion" },
  // Druid (leather) — hero gear
  { specKey: "feral-druid", name: "Thornweald", tier: "hero" },
  // Warlock (cloth) — champion gear
  { specKey: "destro-lock", name: "Nethys", tier: "champion" },
  // Monk (leather) — hero gear
  { specKey: "ww-monk", name: "Zenjin", tier: "hero" },
];

function generateSampleSimC(spec, charName, tierKey) {
  var BIS = spec.BIS;
  var ALTS = spec.ALTS;
  var doneIdx = TIERS.findIndex(function(t) { return t.key === tierKey; });
  if (doneIdx < 0) doneIdx = TIERS.findIndex(function(t) { return t.key === SAMPLE_TIER; });
  var doneTier = TIERS[doneIdx];
  var upgradeTier = TIERS[doneIdx - 1] || TIERS[0];

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

  // The addon's Great Vault section, so the demo shows the week's verdict
  // rather than asking a sample character to go open a vault. A character
  // still on Champion gear is offered a BiS they have not got — the week the
  // vault beats a bonus roll — while one already in Hero gear is offered
  // three items that do nothing for them, which is the ordinary week.
  var vaultOffer = [];
  if (doneTier.key === "champion") {
    for (var vi = 0; vi < BIS.length && vaultOffer.length < 1; vi++) {
      if (assignments[vi] !== "bis-done" && !SKIP_SLOTS.has(BIS[vi].slot)) {
        vaultOffer.push({ slot: BIS[vi].slot, id: BIS[vi].id });
      }
    }
  }
  Object.keys(wrongBySlot).forEach(function(slot) {
    if (vaultOffer.length >= 3) return;
    var pool = wrongBySlot[slot];
    for (var wi = 0; wi < pool.length; wi++) {
      if (!usedIds.has(pool[wi].id) && !vaultOffer.some(function(v) { return v.id === pool[wi].id; })) {
        vaultOffer.push({ slot: slot, id: pool[wi].id });
        return;
      }
    }
  });
  if (vaultOffer.length > 0) {
    // The vault's Mythic+ row hands out the bottom of the Myth track, not the
    // top of it — only a Mythic raid kill fills that row at the ceiling. A
    // demo offering 6/6 gear would be showing a drop the game cannot make.
    var mythTier = TIERS[TIERS.length - 1];
    var vaultTier = { max: mythTier.min, tooltipBonus: mythTier.tooltipBonus };
    lines.push("");
    lines.push("### Weekly Reward Choices");
    lines.push("");
    vaultOffer.forEach(function(v) {
      lines.push("#");
      lines.push("# " + (enItems[v.id] || String(v.id)) + " (" + vaultTier.max + ")");
      lines.push("# " + v.slot + "=,id=" + v.id + ",bonus_id=13577/" + vaultTier.tooltipBonus);
    });
    lines.push("### End of Weekly Reward Choices");
  }

  return lines.join("\n");
}

export function getSampleChars() {
  return SAMPLE_CHARS.map(function(c) {
    var spec = SPECS.find(function(s) { return s.SPEC_KEY === c.specKey; });
    return { spec: spec, name: c.name, simcText: generateSampleSimC(spec, c.name, c.tier || SAMPLE_TIER) };
  });
}
