export var RAIDBOTS_URL = "https://www.raidbots.com/simbot/topgear";

/**
 * Build a Raidbots Top Gear paste: the character's original SimC text with
 * every BiS item they do not already carry appended as commented candidate
 * lines, in the shape the SimC addon uses for its "Gear from Bags" section —
 * a "# Name (ilvl)" comment followed by "# slot=,id=...". Raidbots surfaces
 * such lines as selectable candidates, so the sim can compare current gear
 * against items the player has never looted.
 *
 * Candidates are pinned to the given grade tier (its max ilvl and its
 * upgrade-track bonus_id), not the tracker's target filter: every candidate
 * then sims at its ceiling, which matches the question the sim answers.
 *
 * An item is skipped only when the parsed gear or bags carry it at the
 * export ilvl already — a BiS equipped at a lower grade still gets a
 * candidate line, or the sim could never show what its ceiling is worth.
 * The acquired (✓) marks deliberately do not matter here: ✓ means "stop
 * farming", not "equipped", and a BiS sitting in the bank still deserves
 * a sim line.
 *
 * @param {string} rawSimc  the pasted SimC text, verbatim
 * @param {Array}  bis      BIS entries ({ slot, simcSlot?, id })
 * @param {Object} gear     parseSimC gear map (slot → { id })
 * @param {Array}  bag      parseSimC bag list ({ id })
 * @param {Object} tier     TIERS entry ({ max, tooltipBonus })
 * @param {Function} [itemName]  id → localized name, for the comment line
 * @returns {string|null}   the augmented text, or null without raw text
 */
// The header our candidate block is written under. parseSimC does not list it
// among the addon's own sections, so re-reading this text never counts the
// candidates as owned.
var CANDIDATE_HEADER = "### BiS candidates (bis-tracker)";

// Drop a candidate block this function wrote earlier. The SimC box is
// prefilled with the stored text and selects itself on focus, so the export
// sitting on the clipboard is one paste away from becoming the stored text —
// and appending a second block to it put every unowned BiS in the paste twice.
// Only our own block goes: the cut stops at the next '### ' header, so
// anything the addon wrote after it survives.
function stripCandidates(text) {
  var lines = text.split("\n");
  var start = lines.indexOf(CANDIDATE_HEADER);
  if (start < 0) return text;
  var end = start + 1;
  while (end < lines.length && lines[end].indexOf("### ") !== 0) end++;
  return lines.slice(0, start).concat(lines.slice(end)).join("\n");
}

export function buildRaidbotsExport(rawSimc, bis, gear, bag, tier, itemName) {
  if (!rawSimc || !rawSimc.trim()) return null;
  rawSimc = stripCandidates(rawSimc);
  var owned = {};
  Object.keys(gear || {}).forEach(function(slot) {
    var g = gear[slot];
    if (g && g.id && g.ilvl >= tier.max) owned[g.id] = true;
  });
  (bag || []).forEach(function(b) { if (b && b.id && b.ilvl >= tier.max) owned[b.id] = true; });
  var missing = (bis || []).filter(function(b) { return !owned[b.id]; });
  if (!missing.length) return rawSimc;
  var lines = ["", CANDIDATE_HEADER, "#"];
  missing.forEach(function(b) {
    var name = (itemName && itemName(b.id)) || "Item " + b.id;
    lines.push("# " + name + " (" + tier.max + ")");
    lines.push("# " + (b.simcSlot || b.slot) + "=,id=" + b.id + ",bonus_id=" + tier.tooltipBonus + ",ilevel=" + tier.max);
  });
  return rawSimc.replace(/\s+$/, "") + "\n" + lines.join("\n") + "\n";
}
