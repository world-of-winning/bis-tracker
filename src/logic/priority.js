import { CRAFTED_ILVL, DUNGEONS, FARMING_DIFFICULTY, TIERS, resolveSlots } from '../data/shared.js';
import { scoreStats } from './matching.js';

export function getSource(item) { return item.source; }

// Which kind of content an item comes from, and so which axis of the farming
// difficulty applies to it. Derived from the source string rather than stored:
// the source already names the specific place, and this is the family it
// belongs to.
//
// Anything unrecognised is treated as raid loot. That is last season's residue
// mostly, and it leaves on its own when find-alts.mjs rebuilds the pool; until
// then, guessing dungeon would hand the item the lower ceiling and call a slot
// finished on it. Withholding a "done" is the cheaper error.
export function acquisitionPath(source) {
  if (Object.prototype.hasOwnProperty.call(DUNGEONS, source)) return "dungeon";
  if (source === "Crafted") return "crafted";
  if (source === "Catalyst") return "catalyst";
  return "raid";
}

// The item level a farming difficulty puts this item within reach of: the
// ceiling of the track its content hands over. Null until the player has set
// the axis it needs — there is nothing to infer it from, and every verdict in
// the tracker is measured against this.
//
// A source naming more than one place is worth its best part, which is why the
// parts are resolved rather than the string matched.
export function dropGrade(item, plan) {
  if (!plan) return null;
  var source = getSource(item) || "";
  if (source.indexOf(" & ") >= 0) {
    var best = null;
    source.split(" & ").forEach(function(part) {
      var t = pathGrade(acquisitionPath(part.trim()), plan);
      if (t && (!best || t.max > best.max)) best = t;
    });
    return best;
  }
  return pathGrade(acquisitionPath(source), plan);
}

// The item level that drop grade names: the top of the track. Everything below
// it is reachable with crests, everything above it needs the item farmed again.
export function dropIlvl(item, plan) {
  var tier = dropGrade(item, plan);
  return tier ? tier.max : null;
}

export function tierByKey(key) {
  for (var i = 0; i < TIERS.length; i++) { if (TIERS[i].key === key) return TIERS[i]; }
  return null;
}

function notchGrade(axis, key) {
  if (!key) return null;
  var notch = null;
  FARMING_DIFFICULTY[axis].forEach(function(n) { if (n.key === key) notch = n; });
  return notch ? tierByKey(notch.grade) : null;
}

function pathGrade(path, plan) {
  // Crafting answers to neither axis, and its cap sits inside the Myth band
  // rather than at the top of a track, so it is stated as an item level and
  // wears the track that band belongs to.
  if (path === "crafted") return { key: "crafted", max: CRAFTED_ILVL, tooltipBonus: TIERS[targetTierIdx(CRAFTED_ILVL)].tooltipBonus };
  if (path === "dungeon") return notchGrade("mplus", plan.mplus);
  if (path === "raid") return notchGrade("raid", plan.raid);
  // The catalyst converts an item the player already holds, so it is worth
  // whatever the best thing they can farm is worth.
  var m = notchGrade("mplus", plan.mplus), r = notchGrade("raid", plan.raid);
  if (!m) return r;
  if (!r) return m;
  return m.max >= r.max ? m : r;
}

// Higher score = better stats = lower farming priority. Reads group position,
// not position in a flat list: two stats the spec values the same score the
// same, so they stop breaking ties against each other and the sort falls
// through to something that means anything.
export function statScore(eqId, stats, priorityStats) {
  return scoreStats(stats[eqId], priorityStats);
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
    // Above every band. The last two Mythic bosses of the raid drop above the
    // top of the tracks, and Raidbots' bonus data has no sixth track for them
    // — it is a fixed item level, not a grade. Reading it as ungraded would
    // put the best item in the game beyond every comparison here.
    return TIERS.length - 1;
  }
  return -1;
}

// The track a drop item level names: the first whose ceiling reaches it. An
// equipped item at a lower track than this has to be farmed again; at this one
// or above it only needs crests.
export function targetTierIdx(targetIlvl) {
  for (var k = 0; k < TIERS.length; k++) { if (targetIlvl <= TIERS[k].max) return k; }
  return TIERS.length - 1;
}

// The plan an import opens on, read off the best grade in the equipped gear.
//
// A proposal, not a setting — gear records the content a player has been
// running, which is usually but not always the content they are about to run,
// and one click changes it. What it buys is a first screen with verdicts on it
// instead of sixteen blank rows (ADR 0005).
//
// Each axis takes the highest notch its own track ladder can justify, so gear
// above what an axis offers lands on that axis's top notch rather than nowhere:
// the key band stops at Hero, and Myth gear still says Mythic raider.
export function defaultPlan(gear) {
  var best = -1;
  Object.keys(gear || {}).forEach(function(slot) {
    var g = gear[slot];
    if (!g) return;
    var idx = itemTierIdx(g.bonus, g.ilvl);
    if (idx > best) best = idx;
  });
  var plan = {};
  ["mplus", "raid"].forEach(function(axis) {
    var notches = FARMING_DIFFICULTY[axis];
    var pick = notches[0];
    notches.forEach(function(n) {
      var tier = tierByKey(n.grade);
      if (tier && best >= TIERS.indexOf(tier) && TIERS.indexOf(tier) >= TIERS.indexOf(tierByKey(pick.grade))) pick = n;
    });
    plan[axis] = pick.key;
  });
  return plan;
}

var GREEN = "#4dca6b";

// upgradeStatus: null (no label), "enhance" (강화 필요, same grade), "tierUp" (등급↑ 필요, lower grade)
export function calcPriority(bisItem, sr, plan, stats, priorityStats) {
  var targetIlvl = dropIlvl(bisItem, plan);
  // No SimC import, or no farming difficulty set: either way there is nothing
  // to measure this slot against, and a verdict would be invented.
  if (!sr || targetIlvl === null) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014", color: "#665544", score: 0 };
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
  var targetIdx = targetTierIdx(targetIlvl);
  var eqTierIdx = eq ? itemTierIdx(eq.bonus, eqIlvl) : -1;
  if (isBis) {
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: GREEN, score: 0 };
    if (eqTierIdx >= targetIdx) return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: GREEN, score: 0, upgradeStatus: "enhance" };
    return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
  }
  if (isAlt) {
    if (isAlt === "mythic") {
      if (deficit <= 0) return { tier: 2, deficit: 0, ilvl: eqIlvl, labelKey: "mythicBisDone", color: GREEN, score: 0 };
      if (eqTierIdx < targetIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
      return { tier: 2, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#e8a84c", score: score };
    }
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: GREEN, score: 0 };
    if (eqTierIdx < targetIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: GREEN, score: score, upgradeStatus: "enhance" };
  }
  if (inBag) {
    var bI = inBag.ilvl || 0, bD = Math.max(0, targetIlvl - bI);
    if (bD <= 0) return { tier: 4, deficit: 0, ilvl: bI, labelKey: "bagDone", color: GREEN, score: 0 };
    var bagTierIdx = itemTierIdx(inBag.bonus, bI);
    if (bagTierIdx < targetIdx) return { tier: 1, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#caca3d", score: 0, upgradeStatus: "enhance" };
  }
  if (deficit <= 0 && eqIlvl > 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: GREEN, score: 0 };
  var fallbackUpgrade = null;
  if (eq && deficit > 0) { var fTierIdx = itemTierIdx(eq.bonus, eqIlvl); if (fTierIdx >= 0 && fTierIdx < targetIdx) fallbackUpgrade = "tierUp"; }
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl > 0 ? eqIlvl + "" : "\u2014", color: "#ff6b6b", score: score, upgradeStatus: fallbackUpgrade };
}

// An alt is one of a slot's other options, not a target. It carries no grade:
// which of eighty to chase is the player's call, and a tier piece gets worn for
// its set bonus whatever it rolls. So this answers one question — do I have
// this item — and leaves the rest of the list uncoloured.
//
// Only this item. Nothing is inferred from what else sits in the slot: an
// equipped item whose stats resemble the row's is still not the row's item, and
// treating it as one used to tick off every alt in a slot at once. The player's
// own checkbox is the other way a row goes green, and that one is a statement
// rather than a guess.
export function calcAltPriority(alt, sr, plan, acq) {
  if (acq && acq[alt.id]) return { tier: 4, deficit: 0, ilvl: 0, labelKey: "done", color: GREEN };
  var targetIlvl = dropIlvl(alt, plan);
  if (!sr || !sr.gear || targetIlvl === null) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014" };
  var bestIlvl = -1;
  resolveSlots(alt.forSlot).forEach(function(slot) {
    var g = sr.gear[slot];
    if (!g || g.id !== alt.id) return;
    if ((g.ilvl || 0) > bestIlvl) bestIlvl = g.ilvl || 0;
  });
  if (bestIlvl < 0) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014" };
  if (bestIlvl >= targetIlvl) return { tier: 4, deficit: 0, ilvl: bestIlvl, labelKey: "done", color: GREEN };
  return { tier: 0, deficit: Math.max(0, targetIlvl - bestIlvl), ilvl: bestIlvl, label: bestIlvl + "" };
}

// How much of the list the player has actually finished. Two counts, because
// two things are worth seeing: slots standing at their drop grade, and slots
// that read green — which includes the ones only crests are left to fix.
//
// The count exists because the season has to be visible somewhere. Row colour
// says what to do next and says it sixteen times; nothing said how far along
// the whole thing was, and the old target-grade buttons were being used to
// manufacture that feeling by lowering the bar (ADR 0005).
export function planProgress(bis, sr, plan, stats, priorityStats, acq) {
  var done = 0, green = 0;
  bis.forEach(function(item) {
    if (acq && acq[item.id]) { done++; green++; return; }
    if (!sr) return;
    var p = calcPriority(item, sr, plan, stats, priorityStats);
    if (p.tier === 4) done++;
    if (p.color === GREEN) green++;
  });
  return { done: done, green: green, total: bis.length };
}

function sortKey(p) { if (p.labelKey === "mythicBisDone") return 3.5; return p.tier; }

export function sortByPriority(items, sr, plan, stats, priorityStats) {
  return items.slice().sort(function(a, b) {
    var pa = calcPriority(a, sr, plan, stats, priorityStats), pb = calcPriority(b, sr, plan, stats, priorityStats);
    var sa = sortKey(pa), sb = sortKey(pb);
    if (sa !== sb) return sa - sb;
    if ((pa.upgradeStatus === "tierUp") !== (pb.upgradeStatus === "tierUp")) return pa.upgradeStatus === "tierUp" ? -1 : 1;
    if (pb.deficit !== pa.deficit) return pb.deficit - pa.deficit;
    return pa.score - pb.score;
  });
}

// Count items that need farming (tier 1 / red) per source
// Items still worth a run, per source. BiS only: alts are options rather than
// targets, and with eighty rows a spec an alt count would never reach zero, so
// the filter row's "done" would never light up.
export function calcSourceFarmCount(source, BIS, sr, plan, stats, priorityStats, acq) {
  var bisItems = BIS.filter(function(i) { return getSource(i) === source; });
  var bisNeed = sr ? bisItems.filter(function(i) {
    if (acq[i.id]) return false;
    return calcPriority(i, sr, plan, stats, priorityStats).tier === 1;
  }).length : bisItems.length;
  return { bis: bisNeed, alt: 0 };
}
