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
 * A candidate is worth taking when it is a BiS item the player does not
 * already hold at that item level or better. An equivalent-stat fit, an ALTS
 * entry and a BiS already owned at the offered level all lose to the Voidcore
 * — the roll can reach items none of them improve on.
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
 * @param {Array}  vault  parseSimC vault list ({ slot, id, ilvl, name })
 * @param {Array}  bis    BIS entries ({ slot, id })
 * @param {Object} gear   parseSimC gear map (slot → { id, ilvl })
 * @param {Array}  bag    parseSimC bag list ({ id, ilvl })
 * @param {Object} [acquired]  the tracker's ✓ marks, id → true
 * @returns {{ candidates: Array, take: Object|null }}
 *   candidates carry `isBis`, `bisSlot`, `ownedIlvl`, `acquired` and `gain`;
 *   `take` is the one to pick, or null when the Voidcore wins.
 */
export function vaultVerdict(vault, bis, gear, bag, acquired) {
  var bisSlotById = {};
  (bis || []).forEach(function(b) { if (!(b.id in bisSlotById)) bisSlotById[b.id] = b.slot; });

  // Best item level the player already holds for each id, wherever it sits.
  var heldIlvl = {};
  function hold(item) {
    if (!item || !item.id) return;
    var lv = item.ilvl || 0;
    if (!(item.id in heldIlvl) || lv > heldIlvl[item.id]) heldIlvl[item.id] = lv;
  }
  Object.keys(gear || {}).forEach(function(slot) { hold(gear[slot]); });
  (bag || []).forEach(hold);

  var candidates = (vault || []).map(function(v) {
    var isBis = v.id in bisSlotById;
    var ticked = !!(acquired && acquired[v.id]);
    var ownedIlvl = v.id in heldIlvl ? heldIlvl[v.id] : null;
    var lv = v.ilvl || 0;
    // The addon writes the "# Name (ilvl)" comment only when it knows both,
    // so an item the client has not cached arrives with no item level at all.
    // Ownership decides, not the number: an item never looted is worth taking
    // whether or not its level parsed, and a copy already held is only beaten
    // by an offer that reads higher than it.
    var owned = ticked || ownedIlvl !== null;
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
      gain: ownedIlvl !== null ? lv - ownedIlvl : lv,
      take: isBis && (!owned || (ownedIlvl !== null && lv > ownedIlvl)),
    };
  });

  // An item never looted beats a copy being pushed a few item levels, and
  // between two of a kind the larger gain wins.
  var take = null;
  candidates.forEach(function(c) {
    if (!c.take) return;
    if (!take) { take = c; return; }
    if (c.ownedIlvl === null && take.ownedIlvl !== null) { take = c; return; }
    if (c.ownedIlvl !== null && take.ownedIlvl === null) return;
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
