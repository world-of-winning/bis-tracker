# CONTEXT

Glossary for the BiS tracker's domain. Terms only — no implementation detail.

## Stat priority

**Secondary stat** — one of crit, haste, mastery, versatility. A gear item carries
zero to four of them. Two is the ordinary case, but items spreading their budget across
all four exist — Aqirbane Reliquary, a neck, carries an equal share of each — so no rule
here may assume a count of two.

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

**BiS list (BiS 목록)** — the one item per slot a spec would end up wearing, taken over
every kind of content at once: dungeon, raid, crafted, catalyst. It is the thing a
player's equipped gear is graded against, so it states a destination, not a week's plan.

**Mythic+ list (M+ 목록)** — the best item per slot reachable by a player who runs only
keys. It matches the BiS list wherever that item drops in a dungeon and falls short of it
wherever the BiS item drops in a raid. A list of its own rather than the BiS list with
the unreachable rows removed, because removing a row leaves a slot unanswered rather than
answering it more modestly.

**Structural contradiction (구조적 모순)** — a published row that disagrees with the game
itself: a table naming a slot the item cannot occupy, or a source naming a place the item
does not drop. Not the same thing as two publishers naming different items for one slot,
which is judgement rather than error. Only a contradiction is worth reporting; disagreement
is the reason for reading two publishers at all.

**Sample** — the characters an observed priority was computed from. Not a constant:
it runs from fourteen to fifty depending on how many people play the spec at the top.
A thin sample moves the mean enough to move a group boundary, so it is recorded
alongside the numbers rather than left implicit.

**Equivalent fit, stated exactly** — replace each of an item's secondary stats with
the index of its equivalence group. The item is an equivalent fit when that multiset
equals the BiS item's. Equal size is therefore required, and a one-stat item can only
stand in for a one-stat BiS item.

## Farming plan

**Farming difficulty (파밍 난이도)** — the content the player intends to run, stated as
a key level for Mythic+ and a difficulty for the raid. Two independent choices, because
a player who pushes keys and a player who clears Mythic raid are not the same player and
either may be neither.

It is not a goal. Every player's goal is Myth; saying so orders nothing. What the player
actually decides is where they are going to spend the week, and every number this tracker
reports follows from that.

The player states it, and an import proposes it. Nothing in the SimC export carries a key
level or a raid lockout, so the proposal reads the best grade in the equipped gear — the
residue of the content they have been running — and the player corrects it in a click.
A proposal, never a blank: both axes always carry a notch, the buttons do not toggle off,
and a save with no plan in it falls back to the same proposal rather than opening on bare
rows.

**Drop grade (드랍 등급)** — the grade a farming difficulty actually hands over. One
difficulty yields two of them: the end-of-dungeon chest and the Great Vault sit a grade
apart, so a +10 gives Hero 311 from the chest and Myth 318 from the vault.

Not the same as how far a player can get. A +10 runner reaches Myth by way of the vault;
their drop grade is Hero, which is what a run puts in their hands. Naming the two alike
is what makes the vault impossible to explain.

A drop grade is a **grade**. Where a single item level is wanted of it, it resolves to
the top of that track — crests close the gap inside a track, and only a track boundary
forces the item to be farmed again.

**Acquisition path (획득 방식)** — the kind of content an item comes from: dungeon, raid,
crafted, or catalyst. It decides which farming difficulty applies to that item, and
crafted has none — it is capped where it is capped whatever the player runs.

Distinct from **source (출처)**, which names the specific place (`"Kings' Rest"`). The
path is the family the source belongs to.

**Catalyst base (촉매 기반)** and **catalyzed item (촉매화 아이템)** — the catalyst turns
one item into another, and the two are different items. The base drops; the catalyzed one
never does. A slot whose BiS is a catalyzed piece therefore names two items at once: the
one the player ends up wearing, and the one they have to farm to get it.

The base is what a chest can contain; the catalyzed item is what the player ends up
wearing. A catalyzed slot names no place to farm — the catalyst is currency spent, not a
destination run — so its source is the tier set it yields rather than a dungeon.

## Expected gain

**Slot gain (슬롯 이득)** — how many item levels a candidate item would add over the
one it displaces, at the candidate's drop grade. Item levels are the unit because they
are the only cardinal number in this domain; secondary stats are ordinal and gate the
gain rather than adding to it. A slot that needs only an upgrade has no gain: upgrade
currency is not a dungeon run.

**Eligible pool (착용 가능 풀)** — every item a source can drop that this spec can
wear. Personal loot filters a chest to exactly this set, so it is the population an
expectation is taken over. Items with no gain still belong to it: they drop, and each
one is a chest that was not the item the player wanted.

**Replaced item (교체 대상)** — the equipped item a candidate would displace. For a
paired slot (rings, trinkets) it is the half the player has not already finished
chasing — neither a BiS item nor an equivalent fit — taking the lower item level when
both are open.

**Expected gain (기대 이득)** — the mean slot gain over a source's eligible pool: what
one run is worth. A mean rather than a total, because a run yields well under one item
and the per-run item count is the same everywhere, so a total would only measure how
large a loot table is.
