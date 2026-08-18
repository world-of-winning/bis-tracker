# Fixtures

Rosters from `https://murlok.io/api/guides/{class}/{spec}/m+`, trimmed to what
`deriveGroups` reads: each character's equipped items, each item's secondary
stat ratings. Nothing else survives the trim — a full payload is ~1.1MB per
spec and most of it is talents, avatars and character identity the derivation
never touches.

Each spec here is present for a reason:

| Fixture | Why |
|---|---|
| `prot-paladin` | Mastery 664 and crit 658 — the nine-tenths-of-a-percent gap that started this work. Three groups. |
| `unholy-dk` | No near pairs anywhere. Four groups of one, so a genuine stat preference still gets enforced. |
| `aug-evoker` | Sample under thirty, and a borderline pair at 0.937 that the thin-sample threshold merges and the full one would split. |
| `demo-lock` | Neighbour ratios that chain crit→haste→mastery at 0.90 while the ends sit at 0.873. The reason the full-sample threshold is 0.95. |

Regenerate one from the roster cache:

    node scripts/make-fixture.mjs <key>

Or fetch a new roster first, then trim it:

    node scripts/generate-priority-stats.mjs --spec <key> --max-age 0
    node scripts/make-fixture.mjs <key>

Doing so re-dates the numbers the tests assert. Update the assertions with
them — the tests state what the rule does to a given measurement, not what the
upstream happens to say this week.
