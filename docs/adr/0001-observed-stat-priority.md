# 1. Stat priority comes from observed gear, not from a guide

Date: 2026-08-19

## Status

Accepted

## Context

Every spec carries a `PRIORITY_STATS` array — the four secondary stats in order,
best first. Two things read it. `matchBiS` takes the top two and accepts an equipped
item as an alternative only when its stats are exactly that pair; `statScore` turns
the order into 4/3/2/1 and uses it as the last tie-break in farming order. The first
of those decides what the tracker tells a player to re-farm, so the array is load-
bearing.

Until now the array came from Maxroll's stat-priority widget, scraped during spec
generation, with `scripts/priority-stats.json` as a hand-maintained override that
won any conflict. The override file was documented as never to be regenerated.

That arrangement has two faults.

An ordering cannot say that two stats are worth the same. Measured against the gear
that the top fifty Protection Paladins actually wear, mastery averages 664 rating and
crit averages 658 — a nine-tenths of one percent gap. A strict order has to put one
above the other, and `matchBiS` then reads that as licence to mark every crit item in
the slot as the wrong item and send the player back to the dungeon. Eight of the
forty specs have at least one such pair, and one — Restoration Shaman — has three
stats inside a single percent of each other.

The guide is also one author's editorial judgement, and it drifts. On twenty-six of
the forty specs the published order disagrees with what high-performing players
equip. The disagreements are not noise at the margins: Blood Death Knight's stored
order leads with versatility, which the observed gear puts dead last by a factor of
four. That reads like a tanking guide's reasoning about damage reduction outliving
the tuning that justified it.

murlok.io turns out to publish the underlying roster over a public, unauthenticated
JSON endpoint — fifty characters per spec with their full equipment and per-item stat
ratings. It does not publish a ranking. The ranking is ours to compute, which means
no third party's judgement sits between the game and the tracker.

## Decision

Stat priority is derived by aggregating observed gear, and `priority-stats.json`
becomes a generated file rather than a hand-curated one. The rule that manual entries
outrank everything is withdrawn.

The array of four stats gives way to a list of equivalence groups. Stats are sorted by
mean equipped rating and a boundary is cut wherever the ratio between neighbours falls
below the threshold; everything between two boundaries is one group.

The threshold is 0.95, dropping to 0.90 for specs whose sample is smaller than thirty
characters. Sample size ranges from fourteen to fifty across the forty specs, and a
thin sample moves the mean around enough to flip a boundary. The two errors are not
equally expensive: splitting two stats that are really equivalent orders a re-farm
over a rounding difference, which is the exact defect this work exists to remove,
while merging two that are really distinct only withholds a warning. Thin samples
therefore lean toward merging.

An item is an equivalent fit when replacing each of its secondary stats with the index
of that stat's group yields the same multiset as the BiS item's. Equal cardinality
follows from this, so a one-stat item stands in only for a one-stat BiS item.

Equivalent fit is a real fit — the player may stop farming the slot — but stays
distinguishable from an exact fit, because chasing the exact item late in a season is
a legitimate thing to want to do.

## Consequences

Twenty-six of forty specs change stat order on the first generation run. Blood Death
Knight, Brewmaster Monk and Holy Priest change enough that their users see a different
screen. This is intended: the stored values are stale. The generator logs every spec
whose order changed, so no rewrite passes silently.

Holy Priest's reversal rests on fourteen characters. The sample size is recorded per
spec alongside the numbers so that the thinness is visible rather than implied.

Aggregating equipped gear inherits that gear's availability bias. A stat is
over-represented when the season's dungeons happen to itemise toward it. This is not
corrected for. The question the groups answer is whether two stats are close enough
that re-farming between them is pointless, and bias of this kind moves rank without
closing or opening that gap.

The endpoint rate-limits under sustained sequential requests. Responses are cached on
disk and a failed fetch leaves the existing value in place with a warning rather than
blanking it — a rule about not destroying what cannot be replaced, which is narrower
than the manual-precedence rule it replaces.

The upstream endpoint is undocumented and was found by reading strings out of the
site's WebAssembly bundle. It can disappear without notice. When it does, the cache
holds the last good aggregate and the file stays where it is until someone looks.
