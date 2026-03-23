// Generate sample SimC texts to demo the tracker without the addon
// Shows: multiple characters, same name + different specs, all priority tiers

import { SPECS } from './specs.js';

// Curated sample specs: 3 characters, 2 share a name to demo multi-spec
export var SAMPLE_CHARS = [
  { specKey: "dev-evoker", name: "Aetherion" },
  { specKey: "aug-evoker", name: "Aetherion" },
  { specKey: "fire-mage", name: "Elyndra" },
  { specKey: "prot-paladin", name: "Kargath" },
  { specKey: "ret-paladin", name: "Kargath" },
];

function generateSampleSimC(spec, charName) {
  var BIS = spec.BIS;
  var ALTS = spec.ALTS;

  // Build ALT lookup: slot -> first alt item
  var altBySlot = {};
  ALTS.forEach(function(a) {
    var slots = [];
    if (a.forSlot === "ring") slots = ["finger1", "finger2"];
    else if (a.forSlot === "weapon") slots = ["main_hand", "off_hand"];
    else slots = [a.forSlot];
    slots.forEach(function(s) {
      if (!altBySlot[s]) altBySlot[s] = a;
    });
  });

  // Assign tiers for a balanced demo
  var assignments = BIS.map(function(b, i) {
    var mod = i % 16;
    if (mod < 5) return "bis-done";      // tier 4
    if (mod < 8) return "bis-upgrade";    // tier 3
    if (mod < 12 && altBySlot[b.slot]) return "alt"; // tier 2
    return "wrong";                        // tier 1
  });

  var wrongPool = BIS.filter(function(b, i) {
    return assignments[i] !== "wrong";
  });

  var lines = [];
  lines.push(spec.SIMC_CLASS + '="' + charName + '"');
  lines.push("level=90");
  lines.push("spec=" + spec.SIMC_SPEC);
  lines.push("");

  var wrongIdx = 0;
  BIS.forEach(function(b, i) {
    var assign = assignments[i];
    var itemId, itemName, ilvl;

    if (assign === "bis-done") {
      itemId = b.id;
      itemName = b.ko || b.en;
      ilvl = 276;
    } else if (assign === "bis-upgrade") {
      itemId = b.id;
      itemName = b.ko || b.en;
      ilvl = 259;
    } else if (assign === "alt") {
      var alt = altBySlot[b.slot];
      itemId = alt.id;
      itemName = alt.ko || alt.en;
      ilvl = 272;
    } else {
      var wrong = wrongPool[wrongIdx % wrongPool.length];
      wrongIdx++;
      if (wrong.id === b.id && wrongPool.length > 1) {
        wrongIdx++;
        wrong = wrongPool[wrongIdx % wrongPool.length];
      }
      itemId = wrong.id;
      itemName = wrong.ko || wrong.en;
      ilvl = 268;
    }

    lines.push("# " + itemName + " (" + ilvl + ")");
    lines.push(b.slot + "=,id=" + itemId + ",bonus_id=13577/12786");
  });

  return lines.join("\n");
}

export function getSampleChars() {
  return SAMPLE_CHARS.map(function(c) {
    var spec = SPECS.find(function(s) { return s.SPEC_KEY === c.specKey; });
    return { spec: spec, name: c.name, simcText: generateSampleSimC(spec, c.name) };
  });
}
