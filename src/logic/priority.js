import { TIERS, resolveSlots } from '../data/shared.js';
import { fitKind, groupIndex, statGroups } from './matching.js';

export function getSource(item) { return item.source; }

// Higher score = better stats = lower farming priority. Reads group position,
// not position in a flat list: two stats the spec values the same score the
// same, so they stop breaking ties against each other and the sort falls
// through to something that means anything.
export function statScore(eqId, stats, priorityStats) {
  var groups = statGroups(priorityStats);
  if (!groups) return 0;
  var es = stats[eqId];
  if (!es || !es.length) return 0;
  var n = groups.length;
  var score = 0;
  es.forEach(function(s) { var idx = groupIndex(groups, s); if (idx >= 0) score += (n - idx); });
  return score;
}

// Determine item grade tier index from bonus_id string, fallback to ilvl.
// SimC emits bonus_id for equipped gear, so the ilvl path only runs on
// hand-edited or truncated imports.
//
// The ilvl path is genuinely ambiguous: grade ilvl bands overlap heavily
// (a Season 2 item at 305 is both Champion 5/6 and Hero 1/6), so it picks the
// HIGHEST grade containing the ilvl. Guessing too low would claim the item
// cannot be upgraded and must be re-farmed — a false "재획득 필요" alarm.
// Guessing too high only withholds a warning. Silence is the cheaper error.
export function itemTierIdx(bonus, ilvl) {
  if (bonus) {
    var parts = bonus.split(":");
    for (var p = 0; p < parts.length; p++) {
      var b = parseInt(parts[p], 10);
      for (var i = 0; i < TIERS.length; i++) { if (b >= TIERS[i].bonusMin && b <= TIERS[i].bonusMax) return i; }
    }
  }
  if (ilvl) {
    for (var i = TIERS.length - 1; i >= 0; i--) { if (ilvl >= TIERS[i].min && ilvl <= TIERS[i].max) return i; }
    // Below every band (or in a gap between them): lowest grade that can hold it
    for (var i = 0; i < TIERS.length; i++) { if (ilvl <= TIERS[i].max) return i; }
  }
  return -1;
}

// upgradeStatus: null (no label), "enhance" (강화 필요, same grade), "tierUp" (등급↑ 필요, lower grade)
export function calcPriority(bisItem, sr, targetIlvl, stats, priorityStats) {
  if (!sr) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014", color: "#665544", score: 0 };
  var eq = sr.eqSlot ? sr.eqSlot[bisItem.id] : null;
  var isBis = sr.matched ? sr.matched[bisItem.id] : false;
  var isAlt = sr.altItems ? sr.altItems[bisItem.id] : false;
  var inBag = sr.bisInBag ? sr.bisInBag[bisItem.id] : null;
  var eqIlvl = (eq && eq.ilvl) ? eq.ilvl : 0;
  var deficit = Math.max(0, targetIlvl - eqIlvl);
  var score = eq ? statScore(eq.id, stats, priorityStats) : 0;
  // Weapon type mismatch: incompatible weapon (1H+shield vs 2H) — no bag search, everything is wrong type
  if (sr.weaponMismatch && sr.weaponMismatch[bisItem.id]) {
    return { tier: 1, deficit: targetIlvl, ilvl: eqIlvl, label: eqIlvl > 0 ? eqIlvl + "" : "\u2014", color: "#ff6b6b", score: 0, weaponMismatch: true };
  }
  var targetTierIdx = -1; for (var k = 0; k < TIERS.length; k++) { if (targetIlvl <= TIERS[k].max) { targetTierIdx = k; break; } }
  var eqTierIdx = eq ? itemTierIdx(eq.bonus, eqIlvl) : -1;
  if (isBis) {
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
    if (eqTierIdx >= targetTierIdx) return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", score: 0, upgradeStatus: "enhance" };
    return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
  }
  if (isAlt) {
    if (isAlt === "mythic") {
      if (deficit <= 0) return { tier: 2, deficit: 0, ilvl: eqIlvl, labelKey: "mythicBisDone", color: "#4dca6b", score: 0 };
      if (eqTierIdx < targetTierIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
      return { tier: 2, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#e8a84c", score: score };
    }
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
    if (eqTierIdx < targetTierIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", score: score, upgradeStatus: "enhance" };
  }
  if (inBag) {
    var bI = inBag.ilvl || 0, bD = Math.max(0, targetIlvl - bI);
    if (bD <= 0) return { tier: 4, deficit: 0, ilvl: bI, labelKey: "bagDone", color: "#4dca6b", score: 0 };
    var bagTierIdx = itemTierIdx(inBag.bonus, bI);
    if (bagTierIdx < targetTierIdx) return { tier: 1, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#caca3d", score: 0, upgradeStatus: "enhance" };
  }
  if (deficit <= 0 && eqIlvl > 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
  var fallbackUpgrade = null;
  if (eq && deficit > 0) { var fTierIdx = itemTierIdx(eq.bonus, eqIlvl); if (fTierIdx >= 0 && fTierIdx < targetTierIdx) fallbackUpgrade = "tierUp"; }
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl > 0 ? eqIlvl + "" : "\u2014", color: "#ff6b6b", score: score, upgradeStatus: fallbackUpgrade };
}

export function calcAltPriority(alt, sr, allStats, priorityStats, targetIlvl, acq) {
  if (acq && acq[alt.id]) return { tier: 4, deficit: 0, ilvl: 0, labelKey: "done", color: "#4dca6b" };
  if (!sr || !sr.gear) return { tier: 1, deficit: targetIlvl || 0, ilvl: 0, label: "\u2014", color: "#ff6b6b" };
  var slots = resolveSlots(alt.forSlot);
  var bestEq = null, bestIlvl = -1;
  slots.forEach(function(slot) {
    var g = sr.gear[slot]; if (!g) return;
    var ilvl = g.ilvl || 0;
    // BiS item in this slot covers the alt requirement unconditionally
    if (sr.matched && sr.matched[g.id]) {
      if (ilvl > bestIlvl) { bestIlvl = ilvl; bestEq = g; }
      return;
    }
    if (!fitKind(allStats[g.id], alt.stats, priorityStats)) return;
    if (ilvl > bestIlvl) { bestIlvl = ilvl; bestEq = g; }
  });
  if (!bestEq) return { tier: 1, deficit: targetIlvl || 0, ilvl: 0, label: "\u2014", color: "#ff6b6b" };
  var eqIlvl = bestEq.ilvl || 0;
  var deficit = Math.max(0, targetIlvl - eqIlvl);
  if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b" };
  var targetTierIdx = -1; for (var k = 0; k < TIERS.length; k++) { if (targetIlvl <= TIERS[k].max) { targetTierIdx = k; break; } }
  var eqTierIdx = itemTierIdx(bestEq.bonus, eqIlvl);
  if (eqTierIdx >= targetTierIdx) return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", upgradeStatus: "enhance" };
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", upgradeStatus: "tierUp" };
}

// Pick the next target tier based on average equipped ilvl.
// Hidden tracks are graded but never offered as a goal, so skip them here.
export function autoSelectTier(avgIlvl) {
  var pick = TIERS.filter(function(t) { return !t.hidden; });
  for (var i = 0; i < pick.length; i++) {
    var gap = i < pick.length - 1 ? (pick[i + 1].max - pick[i].max) / 2 : 0;
    if (avgIlvl < pick[i].max - gap) return pick[i].key;
  }
  return pick[pick.length - 1].key;
}

function sortKey(p) { if (p.labelKey === "mythicBisDone") return 3.5; return p.tier; }

export function sortByPriority(items, sr, targetIlvl, stats, priorityStats) {
  return items.slice().sort(function(a, b) {
    var pa = calcPriority(a, sr, targetIlvl, stats, priorityStats), pb = calcPriority(b, sr, targetIlvl, stats, priorityStats);
    var sa = sortKey(pa), sb = sortKey(pb);
    if (sa !== sb) return sa - sb;
    if ((pa.upgradeStatus === "tierUp") !== (pb.upgradeStatus === "tierUp")) return pa.upgradeStatus === "tierUp" ? -1 : 1;
    if (pb.deficit !== pa.deficit) return pb.deficit - pa.deficit;
    return pa.score - pb.score;
  });
}

export function calcDungeonScore(dungeon, fc, BIS, sr, targetIlvl, stats, priorityStats, acq) {
  if (!sr || !fc) return 0;
  var priorityScore = 0;
  BIS.forEach(function(bi) {
    if (getSource(bi) !== dungeon) return;
    var p = calcPriority(bi, sr, targetIlvl, stats, priorityStats);
    if (acq[bi.id] && p.tier !== 4) p = { tier: 4 };
    if (p.tier === 4) return;
    priorityScore += Math.round((4 - p.tier) * 10) + (p.deficit || 0);
  });
  // 1순위: 파밍 필요 BiS 개수, 2순위: 파밍 필요 Alt 개수, 3순위: 우선순위 점수
  return fc.bis * 10000 + fc.alt * 100 + priorityScore;
}

// Count items that need farming (tier 1 / red) per source
export function calcSourceFarmCount(source, BIS, ALTS, sr, targetIlvl, stats, priorityStats, acq) {
  var bisItems = BIS.filter(function(i) { return getSource(i) === source; });
  var bisNeed = sr ? bisItems.filter(function(i) {
    if (acq[i.id]) return false;
    return calcPriority(i, sr, targetIlvl, stats, priorityStats).tier === 1;
  }).length : bisItems.length;
  var altItems = ALTS.filter(function(a) { return getSource(a) === source; });
  var altNeed = sr ? altItems.filter(function(a) {
    return calcAltPriority(a, sr, stats, priorityStats, targetIlvl, acq).tier === 1;
  }).length : altItems.length;
  return { bis: bisNeed, alt: altNeed };
}
