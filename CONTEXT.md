# CONTEXT

Glossary for the BiS tracker's domain. Terms only — no implementation detail.

## Stat priority

**Secondary stat** — one of crit, haste, mastery, versatility. Every gear item carries
zero, one, or two of them. (Three-stat items do not exist in this game's itemisation.)

**Stat priority** — a per-spec ordering of the four secondary stats, best first.
Historically stored as a flat array of four. It is an *ordinal* statement: it says
which stat is better, never by how much.

**Equivalence group (등가군)** — a set of secondary stats a spec values so closely that
substituting one for another is not worth re-farming an item over. A spec's stat
priority is therefore a list of groups, not a list of stats:

    prot-paladin: [["haste"], ["mastery", "crit"], ["vers"]]

A group of one is the ordinary case. A flat four-stat array means four groups of one,
which is how the older data reads.

Two stats sitting in the same group is a claim about *this season's tuning for this
spec*, not a permanent property of the game.

**Top stat** — the sole member of a spec's first equivalence group. No separate rule
forces an item to carry it; being alone at the head of the order already does that
work. If a spec ever puts two stats in its first group, that reasoning no longer
holds and the model needs revisiting.

## Item fit

**Exact fit** — an item whose secondary stats are the same set as the BiS item's.

**Equivalent fit** — an item that is not an exact fit but whose stats map onto the BiS
item's stats group-for-group. Equivalent fit is a real fit: the player may stop
farming that slot. It is not, however, the same as an exact fit — chasing the exact
item late in a season is legitimate, so the two stay distinguishable.

## Sources of truth

**Guide priority** — a stat priority read off a published guide. Ordinal, editorial,
one author's judgement. What the tracker used before, and what it drifted away from.

**Observed priority** — a stat priority derived by aggregating the gear that
high-performing players actually wear. Carries real numbers, so it can express
equivalence that a guide cannot. Biased by what dropped this season: a stat is
over-represented when the season's dungeons happen to itemise toward it.

The upstream source publishes the raw roster, not a ranking — characters with their
full equipment and per-item stat ratings. The ranking, and the grouping, are ours to
compute. Nobody else's judgement sits in between.

**Sample** — the characters an observed priority was computed from. Not a constant:
it runs from fourteen to fifty depending on how many people play the spec at the top.
A thin sample moves the mean enough to move a group boundary, so it is recorded
alongside the numbers rather than left implicit.

**Equivalent fit, stated exactly** — replace each of an item's secondary stats with
the index of its equivalence group. The item is an equivalent fit when that multiset
equals the BiS item's. Equal size is therefore required, and a one-stat item can only
stand in for a one-stat BiS item.
