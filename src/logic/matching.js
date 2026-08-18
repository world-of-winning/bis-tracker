export function sameStats(a, b) {
  if (!a || !b || !a.length || !b.length) return false;
  if (a.length !== b.length) return false;
  var x = a.slice().sort(), y = b.slice().sort();
  return x.every(function(v, i) { return v === y[i]; });
}

/**
 * A spec's stat priority as a list of equivalence groups.
 *
 * Two stats sit in one group when the spec values them closely enough that
 * swapping one for the other is not worth a re-farm. A flat array of four
 * stats is the older shape and means four groups of one, so both read.
 */
export function statGroups(priorityStats) {
  if (!priorityStats || !priorityStats.length) return null;
  if (Array.isArray(priorityStats[0])) return priorityStats;
  return priorityStats.map(function(s) { return [s]; });
}

/** Index of the group holding a stat, or -1. Stats outside the priority sort last. */
export function groupIndex(groups, stat) {
  if (!groups) return -1;
  for (var i = 0; i < groups.length; i++) {
    if (groups[i].indexOf(stat) >= 0) return i;
  }
  return -1;
}

/**
 * How well an item's secondary stats stand in for the BiS item's.
 *
 *   "exact"      — the same set of stats
 *   "equivalent" — a different set, but every stat maps onto the BiS item's
 *                  group-for-group
 *   null         — neither
 *
 * Equivalent fit is a real fit: the slot is done and the player may stop
 * farming it. It stays distinguishable from an exact fit because chasing the
 * exact item late in a season is a legitimate thing to want to do.
 *
 * Equal cardinality falls out of comparing multisets, so a one-stat item can
 * only stand in for a one-stat BiS item — a piece missing a whole stat is
 * never sold as equivalent.
 *
 * This is the only definition of the rule. The app and the alt-candidate
 * pipeline both call it: a looser rule in the pipeline would put items in the
 * alt list the app then refuses to recognise, and a stricter one would leave
 * the app accepting items the player is never told to farm.
 */
export function fitKind(itemStats, bisStats, priorityStats) {
  if (!itemStats || !bisStats || !itemStats.length || !bisStats.length) return null;
  if (sameStats(itemStats, bisStats)) return "exact";
  var groups = statGroups(priorityStats);
  if (!groups) return null;
  if (itemStats.length !== bisStats.length) return null;
  var a = itemStats.map(function(s) { return groupIndex(groups, s); }).sort();
  var b = bisStats.map(function(s) { return groupIndex(groups, s); }).sort();
  // A stat outside the priority has no group and cannot stand in for anything.
  if (a.indexOf(-1) >= 0 || b.indexOf(-1) >= 0) return null;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return null;
  return "equivalent";
}

/**
 * Exact fits ahead of equivalent ones. A player who has run out of other
 * things to do can still chase the exact item at the end of a season, so the
 * two are ordered rather than merged — in the alt list the app renders and in
 * the alt list the pipeline generates, which is why the rank lives here beside
 * fitKind rather than in either caller.
 */
export var FIT_RANK = { exact: 0, equivalent: 1 };

export function fitRank(fit) {
  return FIT_RANK[fit] != null ? FIT_RANK[fit] : 0;
}

export function matchBiS(BIS, gear, bag, stats, knownBisIds, priorityStats) {
  var BIS_IDS = new Set(BIS.map(function(i) { return i.id; }));
  // Detect weapon type mismatch (e.g. 1H+shield source vs 2H target or vice versa)
  var bisHasOffhand = BIS.some(function(b) { return b.slot === "off_hand"; });
  var bisHasMainhand = BIS.some(function(b) { return b.slot === "main_hand"; });
  var gearHasOffhand = !!gear["off_hand"];
  var gearHasMainhand = !!gear["main_hand"];
  // Weapon mismatch: only when both sides have weapons but different types (1H+shield vs 2H)
  var weaponMismatch = gearHasMainhand && bisHasMainhand && bisHasOffhand !== gearHasOffhand;
  var matched = {}, eqSlot = {}, bisInBag = {}, altItems = {}, weaponMismatchIds = {};
  BIS.forEach(function(bi) {
    var s = bi.slot, d = gear[s];
    // Weapon type mismatch (1H+shield vs 2H): show equipped but never match/alt
    if (weaponMismatch && (s === "main_hand" || s === "off_hand")) {
      if (d) eqSlot[bi.id] = d;
      weaponMismatchIds[bi.id] = true;
      return;
    }
    if (d && d.id === bi.id) { matched[bi.id] = true; eqSlot[bi.id] = d; return; }
    if (s.indexOf("finger") === 0 || s.indexOf("trinket") === 0) {
      var alt = s.endsWith("1") ? s.replace("1", "2") : s.replace("2", "1");
      if (gear[alt] && gear[alt].id === bi.id) { matched[bi.id] = true; eqSlot[bi.id] = gear[alt]; return; }
    }
    if (d) eqSlot[bi.id] = d;
  });
  // Fix ring/trinket eqSlot: if pointing to a matched BiS item, use the other slot
  BIS.forEach(function(bi) {
    if (matched[bi.id]) return;
    var s = bi.slot;
    if (s.indexOf("finger") !== 0 && s.indexOf("trinket") !== 0) return;
    var eq = eqSlot[bi.id];
    if (!eq || !BIS_IDS.has(eq.id)) return;
    var alt = s.endsWith("1") ? s.replace("1", "2") : s.replace("2", "1");
    if (gear[alt]) eqSlot[bi.id] = gear[alt];
  });
  bag.forEach(function(b) { if (BIS_IDS.has(b.id) && !matched[b.id]) bisInBag[b.id] = b; });
  BIS.forEach(function(bi) {
    if (matched[bi.id]) return;
    var eq = eqSlot[bi.id]; if (!eq || eq.id === bi.id) return;
    // stat-less items (trinkets etc): knownBisIds만 비교, stats 체크 불가
    if (!bi.stats.length) {
      if (knownBisIds && knownBisIds.has(eq.id)) altItems[bi.id] = "mythic";
      return;
    }
    // altItems carries fitKind's own words, so a reader does not have to
    // translate between two vocabularies for one concept.
    var fit = fitKind(stats[eq.id], bi.stats, priorityStats);
    if (fit) { altItems[bi.id] = fit; return; }
    // fallback: M+ BiS (stats 불일치인 경우만)
    if (knownBisIds && knownBisIds.has(eq.id)) altItems[bi.id] = "mythic";
  });
  return { matched: matched, eqSlot: eqSlot, bisInBag: bisInBag, altItems: altItems, weaponMismatch: weaponMismatchIds };
}
