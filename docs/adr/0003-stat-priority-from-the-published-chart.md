# 3. Stat priority is read from murlok's chart, not computed from its rosters

Date: 2026-08-25

## Status

Accepted. Supersedes [ADR 0001](0001-observed-stat-priority.md).

## Context

ADR 0001 replaced Maxroll's stat-priority widget with a figure derived from
observed gear, and it got two things right that still hold. A published order
cannot say that two stats are worth the same, so the tracker needs equivalence
groups rather than a ranking. And the order Maxroll published had drifted from
what high-performing players wear.

It got the third thing wrong. It said:

> Source is murlok.io's public JSON. It returns the roster (up to fifty
> characters with full equipment and per-item stat ratings), **not** a ranking —
> the aggregation and the grouping are ours.

The first half is true; the conclusion drawn from it is not. Summing per-item
ratings off that roster cannot reproduce what a character actually has, and the
resulting priorities were wrong on specs where it mattered.

**The roster carries no enchants and no gems.** Each item object holds `Stats`
and nothing else — no `Enchant` field, no `Gems`. murlok's own page says its
figure covers "gear, consumables, enchantments, and gems". Enchants and gems go
disproportionately into haste and versatility, so our sums understated exactly
those two.

**Retained gear from a retired season distorts the rest.** Blood Death Knight's
mastery total was 906 per character. 225 of that came from one neck, Rotmire's
Sporeheart, which drops in Sporefall — last season's raid — and which 41 of the
50 sampled characters were still wearing. Across all forty rosters, 11,729 of
23,798 stat-bearing equipped items sit in retired instances. Item level cannot
filter them: their median is 298 against the current pool's 292, because a
season is long enough to upgrade last season's gear to its cap while this
season's drops are still being farmed up.

Side by side, for Blood Death Knight:

```
              ours    murlok
crit           662       668     agrees — crit is rare on enchants and gems
haste          582       918     enchants and gems missing
mastery        906       663     a retired raid neck on 41 of 50 characters
vers           233       494     enchants and gems missing
```

Protection Paladin makes the point differently, and worse. It is the spec ADR
0001 opens with: mastery 664 against crit 658, "a nine-tenths of one percent
gap", offered as proof that an ordering cannot express equivalence. The chart
says crit 908 and mastery 488 — not a percent apart but nearly double. The pair
was never equivalent; our missing enchants and gems made it look that way, and
the tracker has been telling Protection Paladins that a mastery item stands in
for a crit one. The conclusion ADR 0001 drew from that number is still right for
other reasons. The number was not evidence for it.

Only crit matched, and it matched because it was the one stat neither error
touched. The two errors pushed the same way, and the shipped priority read
`mastery > crit > haste > vers` where the observable answer is
`haste > crit ≈ mastery > vers`.

## Decision

**Read the chart murlok publishes.** Each guide page server-renders the ratings
its sample carries, as a bar per stat:

```html
<li class="guide-stats-chart-item legendary">
  <span>26% Haste</span>
  <span class="h3">+918</span>
  <span style="height:100.000%"></span>
</li>
```

`parseStatChart` reads both numbers, for different jobs. The heights decide the
groups — they carry three decimals where the total is rounded to a whole number,
and every ratio the grouping cuts on is a ratio between two bars, which is what
a height already is. The totals go into `priority-stats.json`, because `+918`
tells a human reading the file something `100.000` does not.

Bars are matched by **label**, never by position. The page draws a second chart
for tertiary stats whose own tallest bar is also 100%; read positionally, leech
would outrank haste. A page that yields fewer than four secondary bars is
treated as a page that changed shape — the spec keeps the priority it had.

**The grouping stays ours.** The page also prints a flat order,
`HASTE > CRITICAL STRIKE > MASTERY > VERSATILITY`, and for Blood Death Knight
crit and mastery sit at a ratio of 0.992 — within a percent, but printed as a
strict ordering. That is precisely the failure ADR 0001 identified in Maxroll's
widget, and the reason the equivalence groups exist. We keep cutting boundaries
at 0.95.

**One threshold, not two.** ADR 0001 loosened the boundary to 0.90 for samples
under thirty characters, because our own mean over fourteen characters moved
enough to flip a boundary. We no longer compute the mean, and the page does not
publish its sample size. Conditioning on a number we cannot see would be
pretending to know something.

## Consequences

Most specs change. That is the point, but it means every run must report what
moved — and, as ADR 0001 already required, must report order changes and
group-boundary changes apart, since a spec can keep its order and still change
what the matcher does.

The cache holds the guide page (~300KB) instead of the roster JSON (~1.1MB), one
file per spec, whole rather than trimmed. Expiry is unchanged: `fetchedAt` in
`index.json`, fourteen days by default. The upstream's `UpdatedAt` is no longer
recorded, having been a field of the JSON payload.

`meanRatings` and `trimRoster` are gone from `priority-groups.mjs`, and with them
the idea that this repo aggregates anything. `groupsFromMeans` survives unchanged
— it never cared where the numbers came from.

Test fixtures become chart markup rather than trimmed rosters, and keep both
charts so that picking the right one stays under test.

**What this gives up:** the roster carried per-item, per-character detail that
the chart does not — which spec picks which secondary stats for a crafted item,
for instance, where the stats are chosen at craft time and the item ships with
none. That question now needs its own fetch of the roster endpoint, which is
still there. It is not needed for stat priority.
