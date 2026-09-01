import { TIERS } from '../data/shared.js';
import { itemTierIdx } from './priority.js';

// Only the top grade is worth a vault pick. A grade boundary cannot be crossed
// by upgrading, so anything below it is a re-farm already scheduled — and the
// roll the pick would be spent instead of lands at vault item level regardless.
var TOP_GRADE = TIERS.length - 1;

/**
 * What to take out of the Great Vault this week.
 *
 * The vault hands over one specific item; a Nebulous Voidcore rolls a loot
 * table instead, at vault item level. Season 2 prices that roll low enough
 * that the roll wins in most weeks — the exception being a week where the
 * vault is offering an item the player actually wants. Deciding that needs
 * the spec's BiS list and the player's current gear together, which is why a
 * guide states the rule as "take it only if it is BiS on the Mythic+ tab":
 * the tab is a stand-in for a check the reader cannot make. We can make it.
 *
 * A candidate is worth taking when it is a BiS item at the top grade that the
 * player does not already hold at that grade or better. Grade decides and the
 * item level only breaks a tie inside one, so a Myth 1/6 at 318 beats a Hero
 * 6/6 at 321 in hand: the offer climbs to 334 and the copy held is finished.
 * An equivalent-stat fit, an ALTS entry and a BiS already owned at the offered
 * grade and level all lose to the Voidcore — the roll can reach items none of
 * them improve on.
 *
 * So does a BiS below the top grade, which is the one exclusion that reads
 * oddly beside the rest of the tracker: a player whose farming difficulty tops
 * out at Hero is told a Hero item on offer is not worth the pick. It is not,
 * and the farming difficulty has no say in it. Grades cannot be crossed by
 * upgrading, so that item is a re-farm already scheduled, and the roll it
 * would be spent instead of lands at vault item level regardless.
 *
 * Nothing here feeds the priority tiers. Three candidates are offered and at
 * most one is taken, so counting them as owned would say a slot is finished
 * on the strength of an item the player is about to decline.
 *
 * The ✓ marks count here, unlike in the Raidbots export. There ✓ means "stop
 * farming" and a BiS in the bank still deserves a sim line. Here the question
 * is whether one vault pick is worth spending, and the bank is not in the
 * addon's bag section — so ✓ is the only signal that the item is already had.
 *
 * Every item passed in carries its `bonus` as well as its `ilvl`, on the gear
 * and bag sides as much as the vault's: bonus id is what states a grade, and
 * ilvl is only the fallback when it is absent. Handing this function ilvl-only
 * objects does not fail, it quietly grades every copy by the fallback.
 *
 * `gain` here is not CONTEXT.md's slot gain, which measures a candidate against
 * the item it displaces in the farming list. This one ranks vault rows against
 * each other and nothing renders it.
 *
 * @param {Array}  vault  parseSimC vault list ({ slot, id, ilvl, bonus, name })
 * @param {Array}  bis    BIS entries ({ slot, id })
 * @param {Object} gear   parseSimC gear map (slot → { id, ilvl, bonus })
 * @param {Array}  bag    parseSimC bag list ({ id, ilvl, bonus })
 * @param {Object} [acquired]  the tracker's ✓ marks, id → true
 * @returns {{ candidates: Array, take: Object|null }}
 *   candidates carry `isBis`, `bisSlot`, `ownedIlvl`, `acquired`, `gradeUp`
 *   and `gain`. `ownedIlvl` names the copy that decided — the best held by
 *   grade, then by item level — which is what the screen wants: on a row that
 *   is not being taken, that copy is the reason it is not;
 *   `take` is the strongest of them, or null when the Voidcore wins. Every
 *   candidate worth putting forward carries its own `take` — the screen
 *   marks them all, and stops there. Which of two BiS items is worth more
 *   this week turns on sims, tier bonuses and what the player farms next,
 *   and this function is not the place that answer comes from.
 */
export function vaultVerdict(vault, bis, gear, bag, acquired) {
  var bisSlotById = {};
  (bis || []).forEach(function(b) { if (!(b.id in bisSlotById)) bisSlotById[b.id] = b.slot; });

  // Best copy the player already holds for each id, wherever it sits. Best
  // means grade first: a Hero 6/6 at 321 reads above a Myth 1/6 at 318 and is
  // still the worse of the two, because 318 upgrades to 334 and 321 is done.
  var held = {};
  function hold(item) {
    if (!item || !item.id) return;
    var lv = item.ilvl || 0;
    var g = itemTierIdx(item.bonus, item.ilvl);
    // Nothing to read the grade from is not evidence of a low one. On the
    // offered item that argues for putting it forward; here it argues the
    // other way, because the expensive error is spending a pick on a copy
    // already at the top of its track.
    if (g < 0) g = TOP_GRADE;
    var prev = held[item.id];
    if (!prev || g > prev.grade || (g === prev.grade && lv > prev.ilvl)) held[item.id] = { grade: g, ilvl: lv };
  }
  Object.keys(gear || {}).forEach(function(slot) { hold(gear[slot]); });
  (bag || []).forEach(hold);

  var candidates = (vault || []).map(function(v) {
    var isBis = v.id in bisSlotById;
    var ticked = !!(acquired && acquired[v.id]);
    var holding = v.id in held ? held[v.id] : null;
    var ownedIlvl = holding ? holding.ilvl : null;
    var lv = v.ilvl || 0;
    // The addon writes the "# Name (ilvl)" comment only when it knows both,
    // so an item the client has not cached arrives with no item level at all.
    // Ownership decides, not the number: an item never looted is worth taking
    // whether or not its level parsed, and a copy already held is beaten by an
    // offer on a higher track, or by one that reads higher on the same track.
    var owned = ticked || ownedIlvl !== null;
    // Nothing to read the grade from is not evidence the grade is low, so only
    // a grade we can see falling short excludes the item — the same call the
    // missing item level gets.
    var gradeIdx = itemTierIdx(v.bonus, v.ilvl);
    var belowTopGrade = gradeIdx >= 0 && gradeIdx < TOP_GRADE;
    // A grade the copy in hand cannot reach by upgrading. Measured to the
    // offer's ceiling rather than to the offer, because what the pick buys is
    // the track, not the item level it lands on — which can read lower than
    // what the player is already wearing.
    var gradeUp = holding !== null && gradeIdx >= 0 && gradeIdx > holding.grade;
    return {
      slot: v.slot,
      id: v.id,
      name: v.name,
      ilvl: v.ilvl,
      bonus: v.bonus,
      isBis: isBis,
      bisSlot: isBis ? bisSlotById[v.id] : null,
      ownedIlvl: ownedIlvl,
      acquired: ticked,
      gradeUp: gradeUp,
      gain: holding === null ? lv : Math.max(0, (gradeUp ? TIERS[gradeIdx].max : lv) - holding.ilvl),
      take: isBis && !belowTopGrade && (!owned || gradeUp || (holding !== null && lv > holding.ilvl)),
    };
  });

  // An item never looted beats one that only crosses a grade, which in turn
  // beats a copy being pushed a few item levels inside the grade it is in.
  // Between two of a kind the larger gain wins.
  var take = null;
  candidates.forEach(function(c) {
    if (!c.take) return;
    if (!take) { take = c; return; }
    if (c.ownedIlvl === null && take.ownedIlvl !== null) { take = c; return; }
    if (c.ownedIlvl !== null && take.ownedIlvl === null) return;
    if (c.gradeUp !== take.gradeUp) { if (c.gradeUp) take = c; return; }
    if (c.gain > take.gain) take = c;
  });
  return { candidates: candidates, take: take };
}

// A vault import goes stale the moment its week ends, and the week ends at a
// reset Blizzard holds at a fixed UTC instant per region — the local clock
// moves under it across daylight saving, the UTC one does not. The SimC
// export names the region (`region=kr`), so the boundary is computable rather
// than approximable, and computing it needs nothing but arithmetic.
//
// `day` is a UTC weekday as Date.getUTCDay() reports it, `hour` a UTC hour.
// Korea, Taiwan and China share one reset; Wednesday 23:00 UTC is Thursday
// 08:00 in Seoul.
var RESET = {
  us: { day: 2, hour: 15 },
  eu: { day: 3, hour: 4 },
  kr: { day: 3, hour: 23 },
  tw: { day: 3, hour: 23 },
  cn: { day: 3, hour: 23 },
};

// Exports from before the region was read, and any region not in the table,
// fall back to this. Seven days is coarse but never wrong in the other
// direction: whatever the region, an import a week old is from a vault that
// has since been replaced.
export var VAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * The instant the current vault week began for a region, or null when the
 * region is unknown and the caller has to fall back on elapsed time.
 */
export function lastVaultReset(now, region) {
  var r = RESET[String(region || "").toLowerCase()];
  if (!r) return null;
  var d = new Date(now);
  var back = (d.getUTCDay() - r.day + 7) % 7;
  var boundary = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - back, r.hour);
  // Same weekday but earlier in the day: the reset is still ahead, so the
  // week that is running began seven days before it.
  if (boundary > now) boundary -= 7 * 24 * 60 * 60 * 1000;
  return boundary;
}

/**
 * Whether a stored vault belongs to a week that has already turned over.
 *
 * @param {number} importedAt  when the SimC text was read, in epoch ms
 * @param {number} [now]       the instant to judge against
 * @param {string} [region]    the export's `region=` value
 */
export function isVaultStale(importedAt, now, region) {
  if (!importedAt) return true;
  var at = now || Date.now();
  var reset = lastVaultReset(at, region);
  if (reset === null) return at - importedAt > VAULT_MAX_AGE_MS;
  return importedAt < reset;
}
