# Fixtures

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
