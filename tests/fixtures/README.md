# Fixtures

## murlok stat charts — `{spec}.html`

The stat charts from `https://murlok.io/{class}/{spec}/m+`, cut out of the guide
page. A whole page is ~300KB, nearly all of it talent trees and markup the parser
never looks at.

**Both charts are kept**, tertiary included. Picking the secondary one is part of
what `parseStatChart` does — the tertiary chart's own tallest bar is also 100%,
so a parser reading by position rather than by label would put leech above haste.
A fixture that had already done the picking would not test that.

Each spec here is present for a reason:

| Fixture | Why |
|---|---|
| `blood-dk` | Crit and mastery eight tenths of one percent apart — the gap that used to send a player back to a dungeon for nothing, and which the flat order printed beside the chart flattens away. Three groups. |
| `unholy-dk` | No near pairs anywhere. Four groups of one, so a genuine stat preference still gets enforced. |

Regenerate one from the page cache:

    node scripts/make-fixture.mjs <key>

Or fetch a fresh page first, then cut it:

    node scripts/generate-priority-stats.mjs --spec <key> --max-age 0
    node scripts/make-fixture.mjs <key>

Doing so re-dates the numbers the tests assert. Update the assertions with them —
the tests state what the rule does to a given measurement, not what the upstream
happens to say this week.

## Wowhead BiS pages — `wowhead-{spec}.html`

The `[tabs name=bis_items]` block of `https://www.wowhead.com/guide/classes/{class}/{spec}/bis-gear`,
with enough of its call site to parse: the `WH.markup.printHtml` wrapper and the
decoy call beside it. A whole page is ~1MB of talent trees and furniture.

| Fixture | Why |
|---|---|
| `blood-dk` | Two tabs named after hero talents and no overall one, so `pickGearTab` has to be told which build the spec is played as. Names its rings three times and numbers none of them. |
| `enh-shaman` | An unlabelled enchant column second, which a parser reading columns by position reads as the item — an enchanting scroll on every row. Its tab is "Season 2 Best-in-Slot", not "Overall BiS". |
| `veng-dh` | The common shape, plus a third trinket row and a catalysed helm whose `original-item` is the base to farm. |

Regenerate one from the page cache:

    node scripts/make-wowhead-fixture.mjs <key>

The wrapper and the closing `[/tabs]` are **synthesised** by that script rather
than cut from the page. `guideMarkup` and `bisItemsBlock` are therefore tested
partly against a shape built to suit them; what the fixtures do test honestly is
everything downstream of the block — tab choice, column location, row shape.
