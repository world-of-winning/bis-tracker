# 4. Dungeon order is expected gain per run, averaged over the drop pool

Date: 2026-08-25

## Status

Accepted.

## Context

The filter row orders the season's dungeons, and that order is the tracker's
main recommendation: a player scans it and queues for whatever sits on the left.

Until now it sorted on `fc.bis * 10000 + priorityScore` — how many BiS items a
dungeon still owed, with lagging item levels breaking ties. That answers "where
is my list least complete", which is not the question a player has. A dungeon
whose last outstanding BiS sits in a slot already at target grade led the row.
A dungeon holding nothing but a helm for the one empty slot sat behind it.

Meanwhile `61c5ccc` rebuilt the alt lists from the client's loot table and, in
dropping the per-row grade, dropped the comparison against equipped gear
entirely: an alt row said only whether the player owned that exact item. Roughly
eighty rows a spec, ordered by how well each suits the spec and nothing else.

Both are the same missing calculation. What a player wants before queueing is
which single run is worth the most, given what they are standing in — and that
is genuinely hard by hand: fourteen slots, five grades, and a drop table of
thirty-odd items a dungeon, most of which are not upgrades.

## Decision

Rank dungeons by the **mean gain over what they can drop**, in item levels.

    dungeonExpectation(d) = Σ slotGain(c) over pool(d) / |pool(d)|

`pool(d)` is every item sourced to `d` across `BIS`, `MYTHIC` and `ALTS`,
deduplicated by id, minus anything the player marked acquired.

`slotGain(c)` is what candidate `c` would add over the item it displaces:

| condition | gain |
|---|---|
| empty slot | target ilvl |
| equipped item is the wrong armour class or primary stat | target ilvl |
| equipped item needs only an upgrade (`enhance`) | 0 |
| otherwise | `max(0, target − equipped ilvl)` |

then zeroed when the candidate is a step backwards, with two slots exempt:

- **weapons** are never disqualified on secondaries — a weapon's value is the
  weapon damage its item level sets
- **trinkets** score only when the id is in `knownBisIds`; a trinket's value is
  the effect it procs, and nothing here can read that

Alt rows sort by the same `slotGain`, and each names the item it would replace
and the item levels it would add.

## Consequences

**A zero says which zero it is.** `assessGain` returns the reason beside the
number — `atTarget`, `enhance`, `trinketUnrated`, `statsDown` — because three of
those land at the bottom of the same alt list and a player can act on only one of
them. A row worth nothing with nothing to say for itself reads as a bug in the
sort.

**A weapon can score and regress at once.** Secondaries never disqualify a
weapon, so a higher-item-level drop with worse secondaries shows both its gain
and the step-back marker. That is not a contradiction, it is the honest form of
"a weapon is worth its item level": the item level is the reason to take it and
the secondaries are the price. `statsRegress` is therefore a fact about the item,
reported whatever the slot rule then does with it, rather than a synonym for
disqualification.


**The mean, not the sum.** A single run yields well under one item, so gains
stay additive across the table and the per-run item count `k` cancels between
dungeons: ranking by `k · mean(gain)` is ranking by `mean(gain)`. Summing would
put the dungeon with the largest loot table on top regardless of what it holds —
which is the mistake a player already makes by eye, and the reason the feature
exists.

This is what makes dilution count. A dungeon burying one good helm under six
trinkets no guide picked is genuinely worse than a lean one holding the same
helm, because most chests will not be the helm. Trinkets therefore leave the
numerator but stay in the denominator. Removing them from both would have
rewarded exactly the dungeons that waste the player's runs.

**An `enhance` slot scores nothing.** A slot already at target grade but short
on item levels is fixed with upgrade currency, not a dungeon run. Counting it
would send a player somewhere they have no reason to go. A `tierUp` slot scores
in full, because a drop is precisely what fixes it — Champion maxed at 308 reads
as thirteen levels owed against a Hero target even though 308 clears Hero's
floor of 305.

**Uniform selection inside the eligible pool is an assumption, not a fact.**
Two things are certain: the end-of-run chest draws from the dungeon's whole
table rather than one boss, and personal loot filters it to what the player's
class and spec can wear — which is exactly how `find-alts` builds the pool. What
is **not** established is whether selection is uniform within that subset.
Blizzard has never published per-item weights and no primary source exists;
community estimates are second-hand and we do not use them.

The ranking survives this better than it might look: `k` cancels, so the
assumption sets the denominator rather than the shape of the answer. If real
weights ever surface, `dungeonExpectation` in `src/logic/expectation.js` is the
one function to change — which is why the probability model lives there alone
and `priority.js` was left out of it.

**Item levels are the unit because they are the only cardinal number we have.**
A stat priority is ordinal — it says which stat is better, never by how much
(ADR 0003) — so secondaries cannot be added to an item level. They gate instead.
Weighting them would have meant inventing constants, which is the thing ADR 0001
and 0003 both exist to refuse. The `means` in `priority-stats.json` are not a
substitute: they record how much of a stat top players *wear*, not what a point
of it is worth, and multiplying the two would count a popular stat twice.

**Only dungeons are ranked.** The raid runs on a weekly lockout with a per-boss
table, so its per-run item count is not the `k` that cancels above; tier,
crafted and vault are not drops at all. They keep their position in the row.

**Not modelled.** Set bonuses, slot contention across several runs (the additive
approximation holds for one run and degrades over many), the Great Vault, and
the key level that decides what grade actually drops — the tracker's target
button stands in for the last of these.
