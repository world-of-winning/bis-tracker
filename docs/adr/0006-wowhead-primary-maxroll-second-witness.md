# 6. Wowhead is the primary BiS source, and Maxroll stays as a second witness

Date: 2026-09-21

## Status

Accepted.

## Context

`BIS` and `MYTHIC` are scraped from two Maxroll guide pages per spec — the raid guide
and the Mythic+ guide. One publisher, forty specs, no way to tell a good row from a bad
one.

Bad rows exist. Maxroll's Vengeance Demon Hunter page files the tier helm
(`271537`, "Abyssal Doomhound's Relentless Stare") under the **Neck** row. The generator
scraped it faithfully, and `src/data/veng-dh.js` has carried a helm in its neck slot ever
since. Nothing in the pipeline could catch it, because catching it requires knowing
something the page does not say.

Freshness does not catch it either. Every Wowhead BiS guide carries a machine-readable
`dateModified`, and all forty sit within forty days of each other — the Vengeance page is
actively maintained and still wrong. A staleness threshold would never fire on the exact
row that motivated this work.

What does catch it is a second account of the same fact. The item's own tooltip says
**Head**; the table says **Neck**; those cannot both be true. That check does not need
two publishers — `warnSlotMismatch` already performs it and already fired on this row,
warn-only by design, and was not read. But a second publisher turns the check from a
complaint into a decision: when one source's row contradicts the game and the other's
does not, there is no longer a judgement call about which to keep.

Wowhead publishes what Maxroll does not. Its guide pages arrive fully server-rendered as
BBCode inside a `WH.markup.printHtml` string, and every gear cell names the item by **id**
(`[item=268265]`) rather than by name. Catalyst relationships come as a machine field
(`original-item=271875`) where Maxroll writes seven different prose phrasings of the same
fact. Forty spec URLs follow one pattern with a single slug exception, and a cold pass
over all forty costs about three minutes.

Wowhead also publishes less. Thirty-six of forty specs have a single `Overall BiS` tab
mixing raid and dungeon loot; only two split Mythic+ out, and Blood Death Knight splits by
hero talent instead and has no `Overall BiS` tab at all. **The Mythic+-only list that
`MYTHIC` is built from does not exist on Wowhead.** Filtering `Overall BiS` down to dungeon
sources yields six to nine rows against a list that needs fifteen.

## Decision

**Both sources are fetched on every run.** Wowhead supplies `BIS`; Maxroll's Mythic+ guide
continues to supply `MYTHIC`. Maxroll's raid guide is still fetched, and its rows are read
only as a second witness against Wowhead's.

**Disagreement between publishers is not an error and is not reported.** Two authors
picking different items for one slot is judgement, and the two lists now answer different
questions besides — Maxroll's raid guide states the best raid gear, Wowhead's `Overall BiS`
states the best gear over all content. Reporting every difference would bury the signal
under forty specs of noise.

**Structural contradiction is reported, and decides.** A row whose slot label disagrees
with the item's own tooltip slot, or whose source names a place the item does not drop, is
a contradiction. Where the two sources disagree about a slot and only one of them passes
that check, the passing row is taken. This is what makes "Wowhead first" a reasoned choice
rather than an arbitrary default.

**A failed row falls back rather than blanking.** It takes the other source's row; if both
fail, the slot keeps whatever the existing data file holds. The run never dies — a single
bad row must not cost three minutes of work across forty specs — and every failure is
summarised at the end.

**`BIS` changes meaning, from raid BiS to overall BiS.** The tracker's audience runs keys.
Grading them against a raid list was the stranger of the two positions.

**Source ids are cross-checked, not trusted.** Wowhead tags every dungeon and boss
reference with a `guide=NNNNN` id, which would collapse the `The Coiled Altar` /
`The Coiled Alter` / `Coiled Altar (Mythic)` family into one key. Nineteen of the
thirty-two ids in use carry more than one label, partly because some are generic hub ids
and partly because authors paste the wrong one. The id and the text are two witnesses; they
must agree, and where they do not, that is a row to warn about.

**Four specs whose tabs do not follow the common shape are named in a hand-written table**
rather than resolved by a fallback rule. Choosing between Blood Death Knight's two hero
talent tabs is a judgement about the game, and it should be legible as one. Blood Death
Knight takes `San'layn BiS`, because the murlok page this repo already reads for stat
priority reports its whole top-fifty sample as San'layn. That is one measurement from one
season, which is the reason the choice sits in a table a human edits rather than in a rule.

**Requests carry browser headers.** Wowhead's edge refuses the pipeline's honest
`BiSTracker/1.0` user-agent with `403` on the first request of a session, and accepts the
same URLs once `sec-ch-ua*` and `Sec-Fetch-*` are present. `robots.txt` permits `/guide/`
to `*` and names no crawl delay; measured throughput is forty pages in three minutes with
no throttling observed.

## Consequences

**There are now two scrapers, permanently.** The research that motivated this change
projected that Wowhead's item ids would make roughly two hundred lines of Maxroll-specific
name-to-id repair dead code. Cross-checking requires resolving Maxroll's item names to ids
to compare them, and `MYTHIC` still comes from Maxroll, so that layer stays alive in full.
Net code volume goes up, not down. Accuracy was bought with code, deliberately.

**The pipeline depends on two publishers staying up.** Previously one site going dark
stopped a regeneration; now either one does, unless the fallback is exercised.

**Cross-check coverage is unmeasured.** When a Maxroll item name does not resolve to an id,
that row is simply not cross-checked, and nothing counts it. If Maxroll changes its markup
such that no name resolves, the pipeline quietly reverts to a single source with no visible
change. This was chosen over a tally, for simplicity.

**`MYTHIC` is cross-checked only where it overlaps.** Filtering Wowhead's `Overall BiS` to
dungeon sources gives six to nine rows — too few to be a list, enough to check that many of
`MYTHIC`'s sixteen slots. The rest of `MYTHIC` rests on one publisher, as all of `BIS` did
before.

**`original-item` is recorded and read by nothing.** The catalyst base is stored beside the
catalyzed item because Wowhead hands it over for free and reconstructing it later means
returning to prose. A field with no reader is a field nobody validates, so generation checks
that the id is a real item in the matching slot and warns when it is not.

**Every spec data file is regenerated under a new meaning of `BIS`.** Any row a reader
remembers may legitimately change.

**The source check reads the client's loot table, not the `guide=NNNNN` ids.** The decision
above says the id and the text are two witnesses that must agree. On implementation a third
was available and better: `find-alts` already builds the season's drop table out of the
client's own DB2 tables, so a row's source can be checked against where the item actually
drops rather than against Wowhead's tag for it. That subsumes the id check — a wrong text is
caught by the game, and a wrong id behind a right text is read by nothing. The ids are
therefore not parsed at all, which is the strongest form of "not trusted as a lookup".

**A mislabelled source is corrected, not replaced.** The decision above treats every
contradiction alike: fall back to the other source, then to the file. Implementation
separated the two kinds. A slot fault says the row names the wrong item, and only another
row can fix that. A source fault says the row names the right item and mislabels where it
drops — and the loot table that caught it holds the answer, so the label is rewritten and
the item kept. Swapping the item out over a wrong dungeon name would be the larger error.
On the first three specs regenerated this fired three times, all on Maxroll `MYTHIC` rows
sourcing Voidscar Arena drops to other dungeons.

**A slot the primary omits is filled, not left blank.** The decision speaks only of rows
that fail a check. A row that is absent fails nothing — Wowhead's Beast Mastery page lists
no helm — and the harm is the same, so the fallback order applies there too: the second
witness, then the data file. Five slots across forty specs were filled this way on the
first pass that looked.

**Gear the season does not hand out is dropped, not kept.** The fallback rule above ends
in "keep it and report", on the reasoning that a spec short a slot reads as finished. One
fault inverts that. A row whose item drops only in instances outside `DUNGEONS` and
`CURRENT_RAIDS` — Maxroll's Restoration Druid Mythic+ page named an ilvl-289 waist from
Maisara Caverns, a Season 1 dungeon — would have the tracker send a player somewhere the
season does not run. Kept, it is a farming order that cannot be filled; dropped, the slot
simply has no Mythic+ recommendation, which is what a lagging guide actually offers. The
same check disqualifies the data file as a fallback for such a row, or the run writes the
item back and the next run offers it as its own justification.
