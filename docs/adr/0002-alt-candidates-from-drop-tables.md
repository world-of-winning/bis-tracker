# 2. Alt candidates come from the client's drop tables, and are not graded

Date: 2026-08-25

## Status

Accepted

## Context

Every spec carries an `ALTS` array — the other items a player might put in a slot
while chasing its BiS. Two questions decide what goes in it: where the candidates
come from, and which of them qualify.

Both answers were wrong, and they were wrong in the same direction.

**Candidates came from other specs' BiS lists.** `find-alts` cross-referenced the
`BIS` and `MYTHIC` blocks of all forty spec files. But a BiS list is a
recommendation, not an inventory, and Maxroll recommends the same handful of items
to everyone: roughly 1200 rows collapsed to 283 distinct items across fourteen
slots, seven of them cloaks and seven necks. The pipeline had never known what a
dungeon actually drops.

**Candidates had to match the BiS item's secondary stats.** `fitKind` gated the
list, so an item whose stats were not the same set, or an equivalent one under the
spec's equivalence groups, was not offered at all.

Together these produced a list too thin to use. Blood Death Knight is the case that
surfaced it: of 27 candidates in the main-hand slot, six passed `fitKind`, two of
those were its own BiS and MYTHIC rows, and all four survivors failed on usability —
a staff a Death Knight cannot hold, three one-handers a two-handed build cannot use.
Zero weapon alternatives. Its back and wrist slots produced nothing either, for a
different reason: their BiS rows are crafted items with no fixed stats, and a
stat-less BiS row made `findAltsForSpec` skip the slot outright.

Two replacements for the candidate source were measured before this one.

**murlok rosters** — the equipment of up to fifty high-performing characters a spec,
already cached for stat priority. Rejected: of the 251 candidates they produced,
**152 were last season's items** — Seat of the Triumvirate, Pit of Saron, Skyreach,
Algeth'ar Academy, Magisters' Terrace, plus 36 Season 1 tier pieces. An equipment
snapshot shows what a player has not replaced yet, and nothing in it separates "best
available" from "not upgraded". Filtering afterwards did not rescue it: matching
Wowhead's source against the sources already in the data resolved **0 of 114**,
because Wowhead names the boss and Maxroll names the dungeon. Coverage was also
uneven by construction — rosters run from 14 characters to 50, so the least-played
specs, which need the most help, got the least.

**Keeping the cross-referenced index and loosening `fitKind`** — rejected because it
does not address the pool being 283 items of mostly unusable gear.

## Decision

**Candidates come from `JournalEncounterItem`**, the game client's own loot table,
served as CSV by wago.tools beside the two tables `generate-source-names` already
reads. Joined through `JournalEncounter` to `JournalInstance` and filtered to the
instances named in `DUNGEONS` plus `CURRENT_RAID`, it yields the season's pool
exactly — 306 pieces of gear, with `source` falling out of the join rather than
being inferred. Non-gear drops carry no inventory slot and fall out on their own.

The season gate is the pool itself. A retired dungeon is not in `DUNGEONS`, so its
loot cannot enter. It is not a sample, so a spec's popularity does not affect its
coverage.

`CURRENT_RAID` is maintained by hand in `shared.js`, beside `DUNGEONS`. The loot
table holds every raid ever shipped and marks no season — `DisplaySeasonID` is 0 on
23,902 of its 23,978 rows. Taking the instance with the highest item id gives the
right answer today but assumes Blizzard never adds an item to an older raid; that
runs as a cross-check that warns, not as the source of truth.

**`fitKind` no longer gates the list.** What gates is whether the item can go in the
slot at all: armour class, primary stat, class lock, weapon type, hand count. The
rosters are unambiguous that secondary stats do not decide this. Blood Death Knight's
pair is crit/mastery, and:

```
head    haste+mastery 42/50    crit+mastery  4
chest   crit+haste    43/50    crit+mastery  1
hands   haste+mastery 39/50    crit+mastery  2
```

Those are tier slots. A tier piece is worn for its set bonus whatever it rolls, and
secondaries get tuned with rings, neck, gems and enchants rather than by re-farming a
chest. A stat gate hid every one of those items from the list.

**Alt rows carry no grade.** With around eighty rows a spec, a per-row verdict is
noise: which to chase is the player's call, made on set bonuses and on what actually
dropped. `calcAltPriority` asks only whether the player already has the item.

**The list is still ordered.** No spec is indifferent between its secondaries, so
`scoreStats` sorts it, best first. Ordering is advice; gating was a claim.

## Consequences

Alt rows go from roughly 200 across all specs to 3403, none below 76 for any spec.
Blood Death Knight goes from 5 to 80, from no weapon alternatives to seven, and its
back slot opens for the first time.

`fitKind` keeps exactly one caller, `matchBiS`, grading the equipped item against the
slot's BiS. `scoreStats` moves into `matching.js` beside it and `statScore` delegates,
so "may I stop farming" and "which should I look at first" have one definition each.

Alts leave `calcSourceFarmCount` and `calcDungeonScore`. With eighty rows an alt count
never reaches zero, so keeping it would mean a dungeon's "done" never lights up.

Deleted: the cross-referenced index, the stale-guide detection by spec and by row, the
`CURRENT_SOURCES` set, the weapon-alt preservation, `SLOT_INV_EXPECT`, `fitRank`, and
the `fit` field on every ALTS row. Most existed to keep last season's items out of an
index that no longer exists; `SLOT_INV_EXPECT` guarded against Maxroll misfiling a
slot, and the slot now comes from the client.

Retained deliberately: `CLASS_WEAPONS` and the one-hand/two-hand rules. The drop table
answers where an item comes from, not who may hold it — the first measurement taken
without them offered a Death Knight two staves.

The pipeline gains a dependency on wago.tools for `find-alts`, not only for
`generate-source-names`. Its cache has no expiry: the tables change when Blizzard
patches, and `--refresh` bypasses it.

Not addressed here: crafted items are absent from `JournalEncounterItem` because they
have no encounter, so a crafted BiS row still carries no stats and the roster remains
the only evidence of what a spec picks for one.
