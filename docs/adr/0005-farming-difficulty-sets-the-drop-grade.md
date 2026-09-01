# 5. The player picks a farming difficulty, not a target grade

Date: 2026-08-30

## Status

Accepted. Revises [ADR 0004](0004-expected-gain-from-the-drop-pool.md), which defines
slot gain against a single `targetIlvl`.

## Context

The tracker asks the player to pick a target grade — Veteran, Champion, Hero or Myth —
and picks one for them on import, from average equipped item level. Everything the
tracker reports keys off that one number: whether a slot reads done, whether an item
needs re-acquiring or only upgrading, and the expected gain that orders the dungeon row.

Three things are wrong with it.

**Nobody's target is anything but Myth.** Asked what grade they are aiming at, every
player of a tracker built for heavy players answers the same. A control whose honest
setting is a constant is not a control.

**Set to that honest answer, the tracker stops working.** A Mythic+ dungeon cannot drop
Myth. End-of-dungeon loot caps on the Hero track; Myth first appears in the Great Vault,
off a +10. Against a Myth target every dungeon slot reads `tierUp`, the
"needs only an upgrade, so no gain" rule in ADR 0004 never fires, and the dungeon row is
ordered by a number no dungeon can deliver.

**So the control was being used for something else.** The grades below Myth existed to
soften the display — a Mythic+ player who picked Hero saw progress instead of a column
of red. The control was a manual correction for a baseline that was wrong by default,
wearing the costume of a goal.

Underneath all three: the player never chose a grade. They chose what to run. The grade
followed.

## Decision

**Replace the target grade with a farming difficulty, and derive the grade from it.**

The player states two things, independently:

| Axis | Notches | Track |
|---|---|---|
| Mythic+ | +2–5 | Champion |
| Mythic+ | +6 and up | Hero |
| Raid | Normal / Heroic / Mythic | Champion / Hero / Myth |

**Two bands on the Mythic+ axis, not one per key level**, because the track is all
that separates them. Rewards start at +2 on Champion and the end-of-dungeon chest
turns Hero at +6; from there through +10 and beyond the chest stays Hero. What +10
adds is a Myth slot in the Great Vault — and `vaultVerdict` reads the top grade
directly and has never consulted a target, so a third notch would have been a button
that changed nothing. The vault's own grade is therefore not carried in this table:
it is not data anything reads, and the function that would read it already knows.

Each item's **acquisition path** decides which axis applies to it. A dungeon source
reads the Mythic+ notch, a raid source the raid notch. Crafted reads neither and is
capped at 331; the catalyst inherits the grade of whatever is fed to it.

The resulting **drop grade** is the baseline for that item, replacing the single
`targetIlvl` in `calcPriority` and `gainContext`. It resolves to an item level as the
**top of that track** rather than the level the chest happens to hand over: within a
track crests close the gap, and only a track boundary forces the item to be farmed
again. So a +6 player and a +10 player are measured against Hero 321 alike, and the
one thing separating them — a Myth vault slot a week — is the vault's business.

Published item-level tables were not used for this. One of them prints Hero 1/6 at
302 against a Hero floor of 305 in the game's own bonus data, so the table carries
track names and `TIERS` supplies every number.

**An import proposes a plan; the player corrects it.** The best grade in the equipped
gear names the opening notch on both axes — a Hero item anywhere in the set opens on the
Hero band and Heroic raid, otherwise Champion and Normal. The choice is then stored beside
the ✓ marks under a new `plan` field, and a stored `targetTier` from before this names a
goal rather than a plan and is discarded rather than migrated.

The earlier draft of this decision left both axes empty and asked the player to fill them
in, on the grounds that a plan is a statement about the future and gear is a record of the
past. That reasoning holds, and it is why the proposal is only a proposal — but it argued
for the wrong thing. A player who has just pasted an export and sees a screen of blank
rows has been handed a worse first impression than one shown a reasonable guess they can
change in a click, and the guess is right for most people: gear is the residue of exactly
the content they have been running.

It is a weaker claim than the old target grade made. That control asked what the player
was aiming at and defaulted from average item level — a different question resting on the
same evidence. This one asks what they run, and opens on what they have evidently been
running.

**The gate is per item, not per screen.** A player who clears an axis still gets verdicts
and a dungeon order for everything the other axis covers, and a bare row for the rest.
Withholding the whole screen would hide answers the player has already given enough to
compute.

**Veteran stops being named in the UI but stays in `TIERS`.** No notch on either axis
hands it over, so it joins Adventurer in `HIDDEN_TRACKS` — and stays in the table, for
the reason recorded there: delete the row and its bonus ids match nothing, the
item-level fallback grades a 295-capped Veteran item as Champion, and the tracker tells
the player to upgrade an item that cannot be upgraded.

**Progress is the aggregate that was already there, counting the right thing.** The
header bar already showed a count; it counted slots standing at the very top of their
track, so a player wearing exactly what their keys hand over read as barely started —
the manufactured-progress problem relocated rather than removed. It now counts slots
that need no run: at the drop grade, or a crest purchase away from it. The inner bar
keeps the stricter count. The computation moves out of the component into
`planProgress`, where it can be tested.

## Consequences

The dilemma that started this dissolves. Hero is not a grade a player aspires to; it is
what a dungeon hands over. Myth is not an aspiration either; it is what the vault and
the Mythic raid hand over. Neither needed a button, and neither is asking for one.

The dungeon ordering becomes answerable for the first time. "Which run is worth the
most" now means a specific run at a specific key level, not a run measured against a
grade it cannot produce.

`calcPriority` and `gainContext` take a per-item baseline rather than a scalar. That is
the cost, and it is the whole cost: the flow is unchanged, the dungeon filter row is
untouched, and the buttons stay where they were.

Three known gaps, none of them blocking:

- The last two Mythic bosses of The Venomous Abyss are reported to drop item level 344,
  above the top of every upgrade track — Raidbots' bonus data for season 37 has five
  tracks ending at Myth 334. Nobody has looted one yet, so no bonus id has been observed.
  `itemTierIdx` is guarded to grade anything above the top band as the top grade.
- `vaultVerdict` compares a vault offer against held gear by item level, so a held Hero
  321 beats an offered Myth 318 — which is backwards, since 318 upgrades to 334 and 321
  does not. Same root, different function; fixed separately in #25.
- A handful of `source` values name dungeons no longer in `DUNGEONS`. They are last
  season's residue and leave on their own when `find-alts.mjs` rebuilds the pool.
