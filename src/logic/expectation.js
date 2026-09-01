import { ARMOR_SLOTS, resolveSlots } from '../data/shared.js';
import { scoreStats } from './matching.js';
import { dropIlvl, getSource, itemTierIdx, targetTierIdx } from './priority.js';

/**
 * What one run of a dungeon is worth, given the gear the player is standing in.
 *
 * The filter row used to sort on how many BiS items a dungeon still owed, which
 * answers a different question: a dungeon whose last BiS sits in a slot already
 * at target grade still came first. What a player actually wants to know before
 * queueing is which run, made once, is worth the most — and that is a mean over
 * the dungeon's drop table, not a count.
 *
 * The whole probability model lives in this file. See
 * docs/adr/0004-expected-gain-from-the-drop-pool.md for what it assumes and
 * where a real weight would go if one ever surfaces.
 */

var WEAPON_SLOTS = { weapon: true, main_hand: true, off_hand: true };
var TRINKET_SLOTS = { trinket: true, trinket1: true, trinket2: true };

function slotNameOf(item) { return item.forSlot || item.slot; }

/**
 * Items the player has finished chasing in the slot they sit in: a BiS item
 * worn, or one fitKind already accepted as standing in for one.
 *
 * Rings and trinkets come in pairs, and a new drop displaces whichever of the
 * two is not already settled. Without this, a player wearing their BiS ring
 * alongside a leftover would be told the slot is worth nothing, because the
 * BiS ring is the higher of the two and the naive pick is the higher one.
 */
export function settledIds(sr, knownBisIds) {
  var ids = new Set();
  if (knownBisIds) knownBisIds.forEach(function(id) { ids.add(id); });
  if (sr && sr.altItems && sr.eqSlot) {
    Object.keys(sr.altItems).forEach(function(bisId) {
      var fit = sr.altItems[bisId];
      if (fit !== "exact" && fit !== "equivalent") return;
      var eq = sr.eqSlot[bisId];
      if (eq) ids.add(eq.id);
    });
  }
  return ids;
}

/**
 * The equipped item a candidate would displace, or null for an empty slot.
 *
 * Owning the candidate already is its own answer — that copy is what a second
 * one would replace, and the ilvl arithmetic below then reads as "how much
 * better a copy". Otherwise the slot's unsettled item goes, lowest ilvl first;
 * when everything in the slot is settled there is still something to compare
 * against, so the same pick runs over the full pair.
 */
export function replacedItem(item, sr, settled) {
  if (!sr || !sr.gear) return null;
  var slots = resolveSlots(slotNameOf(item));
  var worn = [];
  for (var i = 0; i < slots.length; i++) {
    var g = sr.gear[slots[i]];
    if (!g) continue;
    if (g.id === item.id) return g;
    worn.push(g);
  }
  if (!worn.length) return null;
  var open = worn.filter(function(g) { return !settled || !settled.has(g.id); });
  var pick = open.length ? open : worn;
  return pick.slice().sort(function(a, b) { return (a.ilvl || 0) - (b.ilvl || 0); })[0];
}

// An item in the wrong armour class or carrying the wrong primary stat is not
// gear the player is wearing by choice — the slot is effectively empty, whatever
// its item level says. ItemCard draws the same conclusion in red.
function wrongEquipped(eq, slotName, ctx) {
  if (ctx.expectedArmor && ctx.armorTypes && ARMOR_SLOTS.has(slotName)) {
    var armor = ctx.armorTypes[eq.id];
    if (armor && armor !== ctx.expectedArmor) return true;
  }
  if (ctx.expectedPrimary && ctx.primaryStats) {
    var primary = ctx.primaryStats[eq.id];
    if (primary && primary.length > 0 && primary.indexOf(ctx.expectedPrimary) < 0) return true;
  }
  return false;
}

/**
 * Everything slotGain needs, resolved once. Building it per item would recompute
 * settledIds for every row of a forty-item grid.
 */
export function gainContext(opts) {
  return {
    sr: opts.sr,
    // The baseline is per candidate now, not per screen: a dungeon item and a
    // raid item are measured against different content (ADR 0005).
    plan: opts.plan,
    stats: opts.stats || {},
    priorityStats: opts.priorityStats,
    knownBisIds: opts.knownBisIds,
    settled: settledIds(opts.sr, opts.knownBisIds),
    armorTypes: opts.armorTypes,
    expectedArmor: opts.expectedArmor,
    primaryStats: opts.primaryStats,
    expectedPrimary: opts.expectedPrimary,
    acq: opts.acq || {},
  };
}

/**
 * Item levels this candidate would add to the player's gear, or 0 for a drop
 * that changes nothing worth a run.
 *
 * The unit is item levels because that is the only cardinal number this project
 * has. Secondary stats are ordinal here — a stat priority says which stat is
 * better, never by how much (CONTEXT.md, ADR 0003) — so they cannot be added to
 * an item level. They gate instead: a candidate that would make the slot's
 * secondaries worse is worth nothing, whatever it rolls.
 *
 * Zero is returned for three quite different reasons, and each one matters:
 *
 *   - the slot is already at target, so there is nothing to gain
 *   - the slot needs only an upgrade (`enhance`) — that is upgrade currency, not
 *     a dungeon run, and counting it would send the player somewhere they have
 *     no reason to go. A slot that needs re-acquiring (`tierUp`) scores in full,
 *     because a run is exactly what fixes it
 *   - the candidate is a step backwards
 *
 * `assessGain` is the whole answer — the number, which of those reasons drove a
 * zero, and whether the secondaries regressed. A row sitting at the bottom of an
 * alt list with nothing to say for itself is a row the player cannot act on, so
 * the reason travels with the number rather than being re-derived by the caller.
 */
export function assessGain(item, ctx) {
  var T = dropIlvl(item, ctx.plan);
  var slotName = slotNameOf(item);
  var eq = replacedItem(item, ctx.sr, ctx.settled);
  var replaceable = !!eq && !wrongEquipped(eq, slotName, ctx);
  // Whether the candidate's secondaries are a step back is a fact about the
  // item, true or false regardless of what the slot then does with it. A weapon
  // reports it and still scores; the marker is the honest half of "item level
  // is what a weapon is worth".
  var regress = !!(replaceable && item.stats && item.stats.length && ctx.stats[eq.id]
    && scoreStats(item.stats, ctx.priorityStats) < scoreStats(ctx.stats[eq.id], ctx.priorityStats));
  var out = function(gain, reason) { return { gain: gain, reason: reason, statsRegress: regress }; };

  // The player has not set the axis this item answers to, so there is no
  // baseline to measure it against. A zero has to say which zero it is
  // (ADR 0004), and this one is not a judgement about the item.
  if (T === null) return out(0, "noPlan");
  if (replaceable) {
    if (T - (eq.ilvl || 0) <= 0) return out(0, "atTarget");
    if (itemTierIdx(eq.bonus, eq.ilvl || 0) >= targetTierIdx(T)) return out(0, "enhance");
  }
  var base = replaceable ? T - (eq.ilvl || 0) : T;
  // A weapon's value is its item level; its secondaries are a rounding error
  // beside the weapon damage the item level sets. Never disqualified on stats.
  if (WEAPON_SLOTS[slotName]) return out(base, null);
  // A trinket's value is the effect it procs, which nothing here can read. Only
  // the ones a guide already picked out score. The rest stay in the denominator
  // — they really do drop, and every one of them is a chest that was not the
  // item the player wanted.
  if (TRINKET_SLOTS[slotName]) {
    if (ctx.knownBisIds && ctx.knownBisIds.has(item.id)) return out(base, null);
    return out(0, "trinketUnrated");
  }
  if (regress) return out(0, "statsDown");
  return out(base, null);
}

export function slotGain(item, ctx) { return assessGain(item, ctx).gain; }

/**
 * What one run of this source is worth: the mean gain over what it can drop.
 *
 * The mean, not the sum. A single run yields well under one item, so gains stay
 * additive across the table and the per-run item count cancels between
 * dungeons: ranking by `k · mean(gain)` is ranking by `mean(gain)`. Summing
 * would put the dungeon with the biggest loot table on top no matter what it
 * holds, which is the mistake a player already makes by eye.
 *
 * The denominator is every item the spec can wear that the source can drop,
 * because personal loot filters the chest to exactly that. Items the player has
 * marked acquired leave both halves — a drop that has already happened is not
 * one to expect again.
 *
 * Dungeons only. The raid runs on a weekly lockout and a per-boss table, so its
 * per-run item count is not the one that cancels above; tier, crafted and vault
 * are not drops at all.
 */
export function dungeonExpectation(source, items, ctx) {
  if (!ctx || !ctx.sr) return 0;
  var seen = {};
  var total = 0, n = 0;
  items.forEach(function(item) {
    if (getSource(item) !== source) return;
    if (seen[item.id]) return;
    seen[item.id] = true;
    if (ctx.acq[item.id]) return;
    n++;
    total += slotGain(item, ctx);
  });
  return n ? total / n : 0;
}
