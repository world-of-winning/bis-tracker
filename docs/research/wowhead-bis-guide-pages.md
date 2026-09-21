# Wowhead BiS guide pages as a primary BiS source

**Research note.** Date: 2026-09-21. Not an ADR and not a decision — the findings a
decision would rest on.

**Question.** Can `generate-spec-data.mjs` take its BiS lists from Wowhead's class guide
pages instead of Maxroll's, keeping Maxroll as a fallback, without disturbing the
downstream normalization, the Wowhead tooltip stat lookup, the caches, or the
`BIS` / `ALTS` / `KNOWN_STATS` shape of `src/data/*.js`?

**Language.** The task asked for Korean "matching the repo's existing documentation
language". The repo's documentation is in English — `CONTEXT.md`, and every ADR from
`docs/adr/0001-observed-stat-priority.md` through `0005-farming-difficulty-sets-the-drop-grade.md`.
This note follows the repo. Translate it if the assumption behind the request was the
stronger one.

**Method.** Every claim below cites either a URL with what was observed in the response,
or a `file:line` in this repo. Raw bytes came from `curl` (the tool is named at each
observation); no WebFetch was used, because WebFetch converts HTML to Markdown and the
decisive evidence for question 2 is a JavaScript string literal that conversion destroys.
47 requests were made to `www.wowhead.com` over roughly 25 minutes, all logged.

One constraint on the whole exercise, stated up front because it colours everything:
`https://www.wowhead.com/robots.txt` (curl, 2026-09-21, 68,848 bytes) opens with a
29-agent block whose members include `anthropic-ai`, `Claude-Web`, `ClaudeBot` and
`Scrapy`, closed by `Disallow: /` at line 30. Requests in this investigation carried a
Chrome user-agent, which is not one of those names, and the `User-Agent: *` group at
line 649 permits `/guide/`. Whether the repo's scraper should present itself as a browser
is a policy question this note does not settle; see question 5.

---

## 1. URL pattern

`https://www.wowhead.com/guide/classes/{class}/{spec}/bis-gear` holds for all forty
specs in the repo's registry. This is measured, not inferred: all forty URLs were
fetched and all forty returned `200` with a spec-correct `<title>`.

Both named examples resolve:

- `https://www.wowhead.com/guide/classes/demon-hunter/vengeance/bis-gear` → `200`,
  `<title>Vengeance Demon Hunter Gear and Best in Slot - Midnight - Wowhead</title>` (curl)
- `https://www.wowhead.com/guide/classes/mage/arcane/bis-gear` → `200`,
  `<title>Arcane Mage Gear and Best in Slot - Midnight - Wowhead</title>` (curl)

The slug rules are mechanical, given the repo's `simcClass` / `simcSpec` pair in
`scripts/generate-spec-data.mjs:167`:

- **class** — the SimC class with a hyphen inserted at the word boundary:
  `deathknight` → `death-knight`, `demonhunter` → `demon-hunter`. Every other class
  is already one word and passes through.
- **spec** — the SimC spec verbatim, with exactly one exception: `beastmastery` →
  `beast-mastery`.

Both multi-word class slugs were verified directly:
`guide/classes/death-knight/blood/bis-gear` → `200`, title *Blood Death Knight Gear and
Best in Slot - Midnight*; `guide/classes/demon-hunter/devourer/bis-gear` → `200`, title
*Devourer Demon Hunter Gear and Best in Slot - Midnight* (curl).

**The colliding spec names do not collide**, because the class segment disambiguates:

- `guide/classes/druid/restoration/bis-gear` → `200`, *Restoration Druid …*, author Voulk
- `guide/classes/shaman/restoration/bis-gear` → `200`, *Restoration Shaman …*, author Harreks
- `guide/classes/paladin/protection/bis-gear` → `200`, *Protection Paladin …*, author Pumps
- `guide/classes/warrior/protection/bis-gear` → `200`, *Protection Warrior …*, author Pumps

**No spec deviates from the pattern.** The full verified map, with the freshness metadata
question 6 depends on, read from each page's `application/ld+json` block:

| spec key | path after `/guide/classes/` | `dateModified` | `author` | BiS tabs (rows) |
|---|---|---|---|---|
| blood-dk | `death-knight/blood/bis-gear` | 2026-08-20 | Mandl | Deathbringer BiS (16), San'layn BiS (16) |
| frost-dk | `death-knight/frost/bis-gear` | 2026-09-02 | khazakdk | Overall BiS (16) |
| unholy-dk | `death-knight/unholy/bis-gear` | 2026-09-08 | Taeznak | Overall BiS (15) |
| havoc-dh | `demon-hunter/havoc/bis-gear` | 2026-08-28 | Shadarek | Overall BiS (16) |
| devourer-dh | `demon-hunter/devourer/bis-gear` | 2026-08-17 | VooDooSaurus | Overall BiS (17) |
| veng-dh | `demon-hunter/vengeance/bis-gear` | 2026-09-05 | Itamae | Overall BiS (17) |
| balance-druid | `druid/balance/bis-gear` | 2026-09-14 | gamz | Overall BiS (16) |
| feral-druid | `druid/feral/bis-gear` | 2026-08-12 | Guiltyas | Overall BiS (15) |
| guardian-druid | `druid/guardian/bis-gear` | 2026-08-30 | Pumps | Overall BiS (15) |
| resto-druid | `druid/restoration/bis-gear` | 2026-09-08 | Voulk | Overall BiS (16), **Mythic+ Only (15)** |
| dev-evoker | `evoker/devastation/bis-gear` | 2026-08-31 | Preheat | Overall BiS (16) |
| pres-evoker | `evoker/preservation/bis-gear` | 2026-08-16 | Voulk | Overall BiS (16) |
| aug-evoker | `evoker/augmentation/bis-gear` | 2026-09-19 | Jereico | Overall BiS (16) |
| bm-hunter | `hunter/beast-mastery/bis-gear` | 2026-09-09 | Tarlo | Overall BiS (16) |
| mm-hunter | `hunter/marksmanship/bis-gear` | 2026-09-09 | TheAzortharion | Overall BiS (15) |
| surv-hunter | `hunter/survival/bis-gear` | 2026-08-21 | DoolB | Overall BiS (15) |
| arcane-mage | `mage/arcane/bis-gear` | 2026-08-18 | Porom | Overall BiS (16) |
| fire-mage | `mage/fire/bis-gear` | 2026-08-24 | Preheat | Overall BiS (18) |
| frost-mage | `mage/frost/bis-gear` | 2026-08-18 | Dorovon | Overall BiS (16) |
| brew-monk | `monk/brewmaster/bis-gear` | 2026-08-27 | Sinzhu | Overall BiS (18) |
| ww-monk | `monk/windwalker/bis-gear` | 2026-08-25 | Babylonius | Overall BiS (15) |
| mw-monk | `monk/mistweaver/bis-gear` | 2026-09-15 | Swirl | **Raid BiS (16), Mythic+ BiS (16)** |
| holy-paladin | `paladin/holy/bis-gear` | 2026-08-25 | HolyClarius | Overall BiS (16) |
| prot-paladin | `paladin/protection/bis-gear` | 2026-08-30 | Pumps | Overall BiS (16) |
| ret-paladin | `paladin/retribution/bis-gear` | 2026-08-25 | Bolas | Overall BiS (15) |
| disc-priest | `priest/discipline/bis-gear` | 2026-08-18 | AutomaticJak | Overall BiS (16) |
| holy-priest | `priest/holy/bis-gear` | 2026-08-24 | AutomaticJak | Overall BiS (16) |
| shadow-priest | `priest/shadow/bis-gear` | 2026-08-31 | EllipsisPriest | Overall BiS (16) |
| assa-rogue | `rogue/assassination/bis-gear` | 2026-09-06 | Whispyr | Overall BiS (16) |
| outlaw-rogue | `rogue/outlaw/bis-gear` | 2026-09-01 | JustGuy | Overall BiS (16) |
| sub-rogue | `rogue/subtlety/bis-gear` | 2026-09-02 | fuu1 | Overall BiS (16) |
| ele-shaman | `shaman/elemental/bis-gear` | 2026-08-17 | HawkCorrigan | Overall BiS (16) |
| enh-shaman | `shaman/enhancement/bis-gear` | 2026-08-24 | wordup | Season 2 Best-in-Slot (16, **4-column**) |
| resto-shaman | `shaman/restoration/bis-gear` | 2026-08-26 | Harreks | Overall BiS (16) |
| aff-lock | `warlock/affliction/bis-gear` | 2026-08-23 | Kalamazi | Overall BiS (16) |
| demo-lock | `warlock/demonology/bis-gear` | 2026-09-08 | NotWarlock | Overall BiS (16) |
| destro-lock | `warlock/destruction/bis-gear` | 2026-08-18 | Loozy | Overall BiS (16) |
| arms-warrior | `warrior/arms/bis-gear` | 2026-08-26 | Archimtiros | Overall BiS (15) |
| fury-warrior | `warrior/fury/bis-gear` | 2026-08-26 | Archimtiros | Overall BiS (16) |
| prot-warrior | `warrior/protection/bis-gear` | 2026-08-30 | Pumps | Overall BiS (16) |

Nothing in that table is inferred. Every row is a `200` whose HTML was saved and parsed.

### Locale prefixes

Locale-prefixed URLs work, and **the BiS content does not differ by locale.** Three
locale variants were fetched and their guide bodies extracted and hashed:

| URL | status | `dateModified` | body md5 (first 12) |
|---|---|---|---|
| `www.wowhead.com/guide/classes/demon-hunter/vengeance/bis-gear` | 200 | 2026-09-05T15:27:47-05:00 | `14d538995936` |
| `www.wowhead.com/ko/guide/classes/demon-hunter/vengeance/bis-gear` | 200 | 2026-09-05T15:27:47-05:00 | `14d538995936` |
| `www.wowhead.com/guide/classes/mage/arcane/bis-gear` | 200 | 2026-08-18T09:12:58-05:00 | `0b3bde33e0dc` |
| `www.wowhead.com/de/guide/classes/mage/arcane/bis-gear` | 200 | 2026-08-18T09:12:58-05:00 | `0b3bde33e0dc` |
| `www.wowhead.com/cn/guide/classes/mage/arcane/bis-gear` | 200 | 2026-08-18T09:12:58-05:00 | `0b3bde33e0dc` |

Byte-identical guide bodies across `en` / `ko` / `de` / `cn` (curl + local md5). Only the
site chrome is localized — the `ko` page's patch badge reads `12.1.0 패치` where `en`
reads `Patch 12.1.0`, and the `<title>` suffix changes from `- Wowhead` to `- 와우헤드`,
while the table markup is the same string. **There is no reason for this pipeline to
fetch a locale variant**, which also means the existing division of labour survives
untouched: guide pages give structure, and `src/i18n/items/*.json` keeps coming from
`generate-item-names.mjs` via the tooltip API.

---

## 2. Server-rendering: the data is in the first response, and it is better than HTML

**The BiS table is fully present in the initial HTML response.** No XHR, no hydration,
no separate JSON endpoint. But it is *not* present as a rendered `<table>` — and that
distinction is the single most useful thing in this note.

The rendered DOM is built client-side from Wowhead's own markup language, handed to the
page as a JSON-escaped JavaScript string literal. The call site, verbatim from the raw
bytes of `https://www.wowhead.com/guide/classes/demon-hunter/vengeance/bis-gear` (curl,
offset 54,066):

```
WH.markup.printHtml("[db=live]\r\nGear represents one of the most important avenues ...
```

The smallest decisive fragment containing an item id, exactly as it appears in the raw
response (curl; backslashes are the JSON string escaping, not part of the markup):

```
\n\t\t[tr][td]Neck[\/td][td][item=268265][\/td][td][url guide=34252]Ula'tek[\/url][\/td][\/tr]
```

Decoded through `JSON.parse` of the string literal, that one line is:

```
[tr][td]Neck[/td][td][item=268265][/td][td][url guide=34252]Ula'tek[/url][/td][/tr]
```

Slot name, item id and source text, in three cells, with no name-to-id lookup in between.

The whole guide body arrives this way: 31,354 characters for Vengeance DH, 30,918 for
Arcane Mage, one `WH.markup.printHtml(...)` call per page (verified: exactly one match
per page across all 40 pages).

**This is a better scraping target than rendered HTML.** Maxroll's table is scraped with
cheerio at `scripts/generate-spec-data.mjs:619` and yields *item names*, which
`buildGearData` then has to resolve to ids through Wowhead's search
(`generate-spec-data.mjs:1262`) — a step that needs `ITEM_NAME_FIXES`
(`generate-spec-data.mjs:947`) for upstream typos, `splitCommaWeaponName`
(`generate-spec-data.mjs:978`) for names containing commas, `stripQuantity`
(`generate-spec-data.mjs:963`) for `2x ` prefixes, and `resolveCatalystItemName`
(`generate-spec-data.mjs:692`) for a catalyst sentence that no search will ever match.
Wowhead's markup hands over the id. **The entire name-resolution layer becomes dead code
on the Wowhead path.**

### Embedded JSON blobs

The page carries several `WH.Gatherer.addData(type, subtype, {...})` islands. The one
that matters is `type=3` (items), which on the Vengeance DH page holds **51 items** with
full equip data:

```
WH.Gatherer.addData(3, 1, {"271875":{"name_enus":"Gaze of the Coiled Watcher","quality":4,
"icon":"inv_helm_leather_raiddruidulatek_d_01","screenshot":{},"jsonequip":{"agi":65,
"agiint":65,"appearances":{...},"armor":77,"displayid":747819,"dura":100,"hastertng":107,
"int":65,"itemSquishEraId":2,"reqlevel":90,"sellprice":413016,"slotbak":1,"sta":97}, ...
```

Parsed, the `jsonequip` union across those 51 items is:

```
agi agiint agistr agistrint appearances armor classes cooldown critstrkrtng displayid
dmgmax1 dmgmin1 dmgrange dmgtype1 dps dura hastertng int itemSquishEraId itemset mastrtng
mledmgmax mledmgmin mledps mlespeed nsockets reqlevel sellprice sheathtype slotbak socket1
speed sta str versatility
```

Everything `fetchItemTooltip` (`generate-spec-data.mjs:1151`) currently makes a network
round-trip for is in there:

- **secondary stats** — `critstrkrtng` / `hastertng` / `mastrtng` / `versatility`, in place
  of the `<!--rtg32-->` / `<!--rtg36-->` / `<!--rtg49-->` / `<!--rtg40-->` comment probes
  at `generate-spec-data.mjs:1159-1162`
- **inventory slot** — `slotbak` (1 = head, 2 = neck, 11 = finger, 12 = trinket, observed),
  in place of `tooltipInvSlot` (`generate-spec-data.mjs:1136`)
- **tier membership** — `itemset` (2056 on the DH tier helm), in place of `hasItemSet`'s
  regex pair (`generate-spec-data.mjs:1117`)
- **class lock** — `classes` (2048 on a Demon Hunter item)

Two concrete entries, parsed out of the page's own blob (curl + local `json.loads`):

```
268265  Aqirbane Reliquary   {"critstrkrtng":39,"hastertng":39,"mastrtng":39,"versatility":39,
                              "nsockets":1,"slotbak":2,"socket1":7,"sta":54,"reqlevel":90, ...}
271537  Abyssal Doomhound's  {"agi":65,"agiint":65,"armor":77,"classes":2048,"critstrkrtng":72,
        Relentless Stare      "int":65,"itemset":2056,"mastrtng":34,"slotbak":1,"sta":97, ...}
```

**Caveat worth stating before anyone builds on it.** The Gatherer blob is scoped to the
items the page mentions, it carries base (un-upgraded) ratings rather than the ilvl-scaled
values the tooltip shows, and it is not present for items the page does not link. It is a
*free confirmation source*, not a replacement for `.wowhead-cache.json` — `find-alts.mjs`
and `generate-item-names.mjs` still need the tooltip API for items no guide page names.
Using it as a cross-check against the tooltip, however, costs nothing and would have
caught the bug in question 4.

**No `__NEXT_DATA__`**, no React hydration payload, no separate guide API. The one thing
that *looks* like a deferred fetch, `WH.getPageData("wowhead-guid6ab0e5332cf458-80932072")`,
reads from an inline `<script type="application/json" id="data.wowhead-guid6ab0e5332cf458-80932072">`
element in the same response (curl), and it holds the sidebar, not the BiS table.

---

## 3. Slot and item markup

### Extraction

Two regexes over the decoded markup are the whole parser:

```
outer:  \[tr\](.*?)\[/tr\]               # DOTALL — several pages put newlines between cells
cells:  \[td[^\]]*\](.*?)\[/td\]         # DOTALL
item:   \[item=(\d+)(?:\s+bonus=([\d:]+))?(?:\s+original-item=(\d+))?
```

Cell 0 is the slot label, cell 1 the item, cell 2 the source — **except on
`shaman/enhancement`**, which uses a 4-column table with an enchant column at index 1.
Its header row names the columns, so the column indices must be read from the header
rather than assumed, exactly as `parseGearTables` already does for Maxroll
(`generate-spec-data.mjs:619-648`):

```
[tr]
[td background=c7][b]Slot[/b][/td]
[td background=c7 align=center width=50px][icon name=ui_profession_enchanting ...][/icon][/td]
[td background=c7][b]Item[/b][/td]
[td background=c7][b]Source[/b][/td]
[/tr]
```

With that, **39 of 40 pages parse on the first try and the 40th parses once the header
is read.** 669 gear rows total across the forty specs, 15–18 per spec.

### The two example pages, fully extracted

`demon-hunter/vengeance/bis-gear`, tab "Overall BiS", 17 rows:

| slot label | item | `original-item` | source |
|---|---|---|---|
| Weapon | 268209 | — | The Coiled Altar |
| Offhand | 237840 | — | Crafted |
| Head | 271537 | 271875 | Ula'tek |
| Neck | 268265 | — | Ula'tek |
| Shoulders | 271535 | 251223 | Voidscar Arena |
| Cloak | 268253 | — | The Coiled Altar |
| Chest | 271540 | — | Vashnik the Malignant |
| Wrist | 244576 | — | Crafted |
| Gloves | 271538 | 251124 | Murder Row |
| Belt | 268256 | — | The Coiled Altar |
| Legs | 271536 | 268225 | The Coiled Altar |
| Boots | 251153 | — | Den of Nalorakk |
| Ring | 268252 | — | Sszorak |
| Ring | 159459 | — | King's Rest |
| Trinket | 270164 | — | The Lost Explorers |
| Trinket | 270175 | — | Ula'tek |
| Trinket (Raw Damage) | 270173 | — | The Coiled Altar |

`mage/arcane/bis-gear`, tab "Overall BiS", 16 rows:

| slot label | item | `original-item` | source |
|---|---|---|---|
| Weapon | 271092 | — | Ula'tek |
| Offhand | 245769 | — | Crafting |
| Head | 271564 | 271874 | Ula'tek |
| Neck | 268265 | — | Ula'tek |
| Shoulders | 271562 | 268241 | The Twin Fangs |
| Cloak | 268253 | — | The Coiled Altar |
| Chest | 271567 | 273785 | Altar of Fangs |
| Wrist | 239648 | — | Crafting |
| Gloves | 271565 | 268243 | The Coiled Altar |
| Belt | 268257 | — | Sszorak |
| Legs | 271563 | 268236 | Nek'zali the Soulcoiler |
| Boots | 268255 | — | The Coiled Altar |
| Ring | 268266 | — | Nymrissa Wavecaller |
| Ring | 251148 | — | Den of Nalorakk |
| Trinket | 250215 | — | Murder Row |
| Trinket | 270164 | — | The Lost Explorers |

### How many items a slot carries, and how to pick one

**One, with a named exception rate of 1%.** Of 669 rows, **662 carry exactly one
`[item=]`**; 7 carry two. The seven, in full:

```
demon-hunter/devourer   Wrist        244576, 240166   orig []         source "Crafting/Misc"
demon-hunter/devourer   Boots        244569, 240166   orig []         source "Crafting/Misc"
monk/brewmaster         Weapons (1h) 268209, 268206   orig []         source "The Coiled Altar Sszorak"
hunter/survival         Head         271492, 251220   orig [251220]   source "Tier Set|Voidscar Arena"
hunter/survival         Shoulders    271490, 268231   orig [268231]   source "Tier Set|The Coiled Altar"
hunter/survival         Gloves       271493, 160213   orig [160213]   source "Tier Set|King's Rest"
hunter/survival         Legs         271491, 268237   orig [268237]   source "Tier Set|The Coiled Altar"
```

Three distinct shapes hide in there. Devourer's pairs are an item plus an *embellishment*
(240166, repeated in two slots, is a crafting reagent rather than a gear alternative).
Brewmaster's is a genuine dual-wield pair, and its source cell names two places for the
two weapons. Survival's four are the catalyst pattern, where the base item is *both* an
`original-item` attribute and a second `[item=]` link in the same cell — and note that
the source cell carries two sources too, `Tier Set` for the catalyzed piece and the
dungeon for the base.

**The rule that covers all seven: take the first `[item=]` in the cell.** It is the
recommendation on every one of them; the second is context. Where the source cell also
carries two values, the first aligns with the first item.

### `original-item` — the catalyst, solved

**127 of 669 rows (19%) carry `original-item=`.** This is Wowhead stating, in a machine
field, the thing the repo currently reverse-engineers from prose. Compare
`resolveCatalystItemName` (`generate-spec-data.mjs:692-714`), whose own comment lists
seven phrasings Maxroll uses for the same fact:

```
Convert <base> into <tier>            Catalyze <base> into <tier>
Catalyst <base>into <tier>            <base> Catalysed into <tier>
Convert<base>into <tier>              <base> Catalyst into <tier>
<base> (Catalyst to Tier)             Convert <base>
```

On Wowhead it is `[item=271537 original-item=271875]`: **271537 is the BiS piece, 271875
is what you catalyze to get it.** The repo has to decide which of the two goes in `BIS`,
and today it is inconsistent — `src/data/veng-dh.js:19` holds the base `271875` for head,
`src/data/veng-dh.js:21` holds the catalyzed `271535` for shoulder. That inconsistency is
inherited from Maxroll's prose and would be *resolvable* against Wowhead's attribute. It
is a decision, not a parse; see the open questions.

### `bonus=` — grade information the repo currently infers

Some authors write bonus ids into the markup:

```
druid/balance      [td][item=271875 bonus=13848:13847:13750][span class=tip tooltip=Bis_Cata_Helm_Tooltip]...
shaman/enhancement [td][color=q4][item=271483 bonus=12854 original-item=251220][/color] ...
```

`bonus=12854` is the Myth `TIERS` marker per CLAUDE.md § *Item Grade System*. This is
**not uniform** — the two example pages carry no `bonus=` at all — so it cannot be
depended on. It is worth capturing where present as a cross-check on `itemTierIdx`
(`src/logic/priority.js`), and worth nothing as a primary input.

### Irregularities the parser must survive

- **Slot label vocabulary is per-author and open.** 40 distinct labels across 669 rows.
  The common ones (`Ring` 81, `Trinket` 64, `Belt` 43, `Neck` 42, `Chest` 42, `Legs` 42,
  `Shoulders` 41, `Gloves` 41, `Boots` 41, `Cloak` 36, `Head` 34, `Wrist` 34, `Weapon` 31,
  `Offhand` 25) are close to Maxroll's, so `SLOT_MAP` (`generate-spec-data.mjs:92`) mostly
  transfers. The tail does not: `Helm` (8), `Bracers` (8), `Cape` (6), `Trinkets` (12),
  `1h Weapon` (5), `Shield` (4), `Mainhand` (2), `2h Weapon`, `Weapon (2h)`, `Weapons (1h)`,
  `2H Weapon`, `Main-Hand`, `Off-Hand`. `resolveSlot`'s fuzzy normalization
  (`generate-spec-data.mjs:121`) handles the ring/trinket family; `Helm`, `Bracers` and
  `Cape` are three new aliases for existing slots.
- **A slot label containing an item reference.** Two rows read `Ring ([item=251487])`.
  A label regex that assumes plain text mis-parses these.
- **Three trinket rows on one page.** Vengeance DH lists `Trinket`, `Trinket`,
  `Trinket (Raw Damage)`. `resolveSlot` maps any `/trinket/` label to `trinket1` then
  `trinket2` (`generate-spec-data.mjs:136-140`), so a third silently lands on `trinket2`
  and overwrites the second. Other qualifier styles observed: `Trinket (Damage)`,
  `Trinket (Defense)`, `Trinket (Raid)`, `Trinket (M+)`, `Trinket (Situationally)`.
- **Markup inside cells.** `[color=q4][item=...][/color]` (resto-druid, enh-shaman),
  `[b]Main Hand[/b]` (enh-shaman), `[icon name=...]` and `[i](Raid)[/i]` and
  `[skill=165]` inside source cells (resto-druid). Source text must be stripped of
  `[url ...]`, `[icon ...]`, `[color ...]`, `[i]`, `[b]`, `[symbol=...]` before it can be
  fed to `normalizeSource` (`generate-spec-data.mjs:814`).
- **`[skill=NNN]` as a source.** Resto Druid writes the crafting source as `[skill=165]`
  (Leatherworking) rather than the word "Crafting". A source normalizer that does not know
  this emits an empty source for those rows.
- **Compound sources.** `[url guide=34252]Ula'tek[/url] [i](Raid)[/i] & [icon ...][url guide=33219] Catalyst[/url]`
  — the `&`-joined form `normalizeSource` already splits (`generate-spec-data.mjs:836`).
- **`guide=NNNNN` ids sit beside the source text, and neither one alone is trustworthy.**
  Every dungeon and boss reference carries an id: `[url guide=33189]Murder Row[/url]`,
  `[url guide=34252]Ula'tek[/url]`. The ids do normalize real variance in the text — the
  same raid appears as `The Coiled Altar`, `The Coiled Alter` (a typo Maxroll shares) and
  `Coiled Altar (Mythic)`, all under `guide=34251`; `Kings' Rest` / `King's Rest` /
  `Kings Rest` all occur.

  **But the mapping is not one-to-one, and I measured how badly.** Across all forty pages
  there are 32 distinct `guide` ids inside BiS source cells, and **19 of the 32 carry more
  than one label.** Two reasons, and they are different:

  - *Generic hub ids used as a source.* `guide=33180` = Raids, `guide=33272` = Mythic+
    Dungeons, `guide=17592` = Vault System, `guide=15942` = Crafting, `guide=33219` =
    Catalyst. Here the id says nothing specific and the **text is the only signal**.
  - *Authors pasting the wrong id.* `guide=33272` — the generic Mythic+ hub — appears
    labelled `Temple of Sethraliss`, `King's Rest` and `Kings Rest` in
    `druid/restoration`'s M+ table, while `King's Rest` also appears correctly under
    `guide=34260` elsewhere. `guide=33183` (Voidscar Arena) appears once labelled just
    `Mythic+`; `guide=33190` (Den of Nalorakk) once labelled `Crafted`; `guide=15942`
    (Crafting) once labelled `Entombed Sentinels`.

  So: **treat the id and the text as two witnesses, not one key.** Where a known id
  agrees with recognizable text, confidence is high. Where the id is a hub id, fall back
  to the text. Where they disagree, that is a row to warn about — and that disagreement is
  itself a defect detector no single-source scrape can have.

### Mythic+ vs Raid

**This is where the Wowhead-primary plan has its real problem.** The repo needs two
lists: `BIS`, scraped from Maxroll's `-raid-guide`, and `MYTHIC`, scraped from Maxroll's
`-mythic-plus-guide` (`generate-spec-data.mjs:1538-1546`). Two URLs, two tables, per spec.

Wowhead has **one** URL per spec, and on **38 of 40** specs, one table. The tabs are:

- **36 specs** — a single `Overall BiS` tab (or `Season 2 Best-in-Slot` for enh-shaman).
  No M+/raid split at all. The `Overall BiS` table freely mixes raid, dungeon, crafted and
  catalyst sources: Vengeance DH's 17 rows include Ula'tek and The Coiled Altar (raid)
  alongside Murder Row and Den of Nalorakk (dungeon).
- **2 specs have an explicit M+ table.** `druid/restoration` carries
  `[tab name="Mythic+ Only" icon=achievement_dungeon_kingsrest]` with 15 rows and the
  sentence *"The following set includes no raid gear."*; `monk/mistweaver` splits the whole
  thing as `[tab name="Raid BiS"]` and `[tab name="Mythic+ BiS"]`, 16 rows each.
- **1 spec splits by hero talent instead.** `death-knight/blood` has
  `[tab name="Deathbringer BiS"]` and `[tab name="San'layn BiS"]`, 16 rows each, and no
  `Overall BiS` at all. A parser keying on the literal string `Overall BiS` returns nothing
  for Blood DK.
- **1 spec nests tabs.** `shaman/restoration` has `Overall BiS` plus
  `I will get AOTC early in the season` / `I won't get AOTC early`, each containing
  `Great Vault` / `Crafting` / `Crests` sub-tabs.

Selecting the M+ table from raw markup is therefore: find the `[tabs ... name=bis_items]`
block, enumerate `[tab name="..."]` inside it, prefer a tab whose name matches
`/mythic\+/i`, else fall back to the first tab that contains a 3-or-more-column table with
≥ 10 item rows. That works — but on 38 of 40 specs it yields **a mixed raid-and-dungeon
list, not an M+ list.**

The repo's `MYTHIC` array exists to answer "what can I farm in keys", and
`isDungeonTable` / `isDungeonSource` (`generate-spec-data.mjs:652-669`) exist to enforce
that against `VALID_DUNGEONS` (`generate-spec-data.mjs:78`). **Wowhead does not publish
the M+-only list that `MYTHIC` is built from.** Filtering `Overall BiS` down to dungeon
sources would produce a 6-to-9-row partial list, not the 15–16 rows `processSpec` requires
(`generate-spec-data.mjs:1604`, `bisRows.length >= 14`).

---

## 4. The Vengeance DH neck row — verified end to end

`src/data/veng-dh.js:20` currently reads:

```js
{ slot: "neck", id: 271537, source: "Tier", stats: ["crit","mastery"] },
```

**It is wrong, and the root cause is upstream at Maxroll, not in this repo's parser —
but the repo's `--fix` path made it look plausible enough to survive review.**

### What 271537 actually is

`https://nether.wowhead.com/tooltip/item/271537?dataEnv=1&locale=0` (curl):

```json
{"name":"Abyssal Doomhound's Relentless Stare","quality":4,
 "icon":"inv_helm_leather_raiddemonhunterulatek_d_01", "tooltip": "... Item Level 334 ...
 <table width=\"100%\"><tr><td>Head</td><th>...<span class=\"q1\">Leather</span>...
 +<!--rtg32-->135 Critical Strike ... +<!--rtg49-->66 Mastery ...
 <a href=\"/item-set=2056/abyssal-doomhounds-pursuit\" class=\"q\">Abyssal Doomhound's Pursuit</a> (0/5)
 ... Classes: <a href=\"/class=12/demon-hunter\">Demon Hunter</a> ..."}
```

`https://www.wowhead.com/item=271537` redirects (301,
`location: /item=271537/abyssal-doomhounds-relentless-stare`) to a page whose
`<title>` is *Abyssal Doomhound's Relentless Stare - Item - World of Warcraft* and whose
tooltip block contains `<td>Head</td>` (curl).

So: **271537 is a Head slot, Leather, Demon Hunter tier helm** (item-set 2056), crit +
mastery. Every field in the repo's row is right except the one that matters — it is filed
under `neck`, and WoW tier sets never include neck, which is what made the row suspicious
in the first place.

### What Wowhead names for the neck slot

From the Vengeance DH BiS page (curl, decoded markup):

```
[tr][td]Head[/td][td][item=271537 original-item=271875] ...[/td][td][url guide=34252]Ula'tek[/url][/td][/tr]
[tr][td]Neck[/td][td][item=268265][/td][td][url guide=34252]Ula'tek[/url][/td][/tr]
```

**Head = 271537, Neck = 268265.** `https://nether.wowhead.com/tooltip/item/268265?dataEnv=1&locale=0`
(curl) confirms 268265: name *Aqirbane Reliquary*, `<td>Neck</td>`, Item Level 344, a
Prismatic Socket, and

```
+<!--rtg32-->107 Critical Strike   +<!--rtg36-->107 Haste
+<!--rtg40-->107 Versatility       +<!--rtg49-->107 Mastery
```

`https://www.wowhead.com/item=268265/aqirbane-reliquary` (curl) gives
`<td>Neck</td>` and `Dropped by: Ula'tek`.

### What Maxroll names for the neck slot

Fetched `https://maxroll.gg/wow/class-guides/vengeance-demon-hunter-mythic-plus-guide`
(curl, 200) and parsed it with **the repo's own `parseGearTables` logic** — the same
cheerio selectors from `generate-spec-data.mjs:619`, run against the live page:

```
["Head","Gaze of the Coiled Watcher","Ula'tek"]
["Neck","Abyssal Doomhound's Relentless Stare","Ula'tek"]
["Shoulder","Abyssal Doomhound's Jaws","Tier"]
...
["Weapon","2x Grim Harvest Gloves","Den of Nalorakk"]
```

**Maxroll puts the tier helm in the Neck row.** The repo reproduced its source faithfully.
(The same table's last row calls a pair of gloves a weapon, which is a second, independent
Maxroll error on the same page.)

### How "Tier" got onto a neck row

The generation path guards this. `generate-spec-data.mjs:1279`:

```js
source: isTier && TIER_SLOTS.has(slot) ? "Tier" : row.source,
```

with `TIER_SLOTS = new Set(["head", "shoulder", "chest", "hands", "legs"])`
(`generate-spec-data.mjs:1103`). A neck can never take "Tier" through that line.

The `--fix` path does not guard it. `generate-spec-data.mjs:1886`:

```js
const normalized = isTier ? "Tier" : normalizeSource(value);
```

No `TIER_SLOTS` check. `--fix` saw a row whose item id belongs to a tier set, stamped its
source `"Tier"`, and turned `source: "Ula'tek"` on a neck into `source: "Tier"` on a neck —
a state the generator itself cannot produce. **The two code paths disagree about the same
rule, and the unguarded one wrote the file.** This is a live inconsistency independent of
which guide site the data comes from.

The repo already anticipated the underlying failure. `generate-spec-data.mjs:1124-1127`:

> The tooltip's inventory slot is the item's own truth. Maxroll occasionally files an item
> under the wrong slot — **a tier helm listed in the Neck row** — and nothing downstream
> would notice. Warn rather than drop.

`warnSlotMismatch` (`generate-spec-data.mjs:1143`) printed that warning and the row was
written anyway. The repo's own cache proves the truth was on disk the whole time:
`scripts/.wowhead-cache.json` key `271537-0` contains `<td>Head</td>`.

### Conclusion for `veng-dh`

**Wowhead is right; Maxroll is wrong.** The correct rows are:

```js
{ slot: "head", id: 271537, source: "Tier",     stats: ["crit","mastery"] },
{ slot: "neck", id: 268265, source: "Ula'tek",  stats: ["crit","haste","mastery","vers"] },
```

with the caveat that whether `head` should hold 271537 (the catalyzed tier helm) or
271875 (the base, which `src/data/veng-dh.js:19` currently holds) is the `original-item`
decision from question 3, not a correctness question. 268265 is already present in the
file as an alt at `src/data/veng-dh.js:88` with `forSlot: "neck"` — so the correct neck
item is in the spec file, just not in `BIS`.

### `arcane-mage:20` — the id is right, the stats are stale

`src/data/arcane-mage.js:20` reads
`{ slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] }`.

- **Wowhead** (`mage/arcane/bis-gear`, curl): `[tr][td]Neck[/td][td][item=268265][/td][td][url guide=34252]Ula'tek[/url][/td][/tr]` — id and source both match.
- **Maxroll** (`arcane-mage-mythic-plus-guide`, curl, parsed with the repo's selectors):
  `["Neck","Aqirbane Reliquary","Ula'tek"]` — also matches.

Both guides agree, and the repo's row is correct on id and source. **The `stats` field is
wrong**, and not because anyone mis-scraped it — because the item changed in game.

`scripts/.wowhead-cache.json` key `268265-0`, parsed locally, yields exactly one rating:

```
[('32', '428')]      # 428 Critical Strike, and nothing else
```

The live tooltip today yields four:

```
[('32','107'), ('36','107'), ('40','107'), ('49','107')]
```

428 = 4 × 107. Blizzard redistributed a single 428-point secondary into 107 of each of
the four. The enhancement shaman guide describes the same event in prose:

> A *significant* amount of gear changes happened going into Season 2, so a large amount
> of our initial recommendations have shifted due to the redesign of **Venomcursed** Mail
> items & `[item=268265 bonus=13848:13987:10835]`. The page has **now been updated** to
> reflect new gearing goals.

The page's own Gatherer blob agrees independently: `268265` carries
`critstrkrtng: 39, hastertng: 39, mastrtng: 39, versatility: 39`.

**Two consequences worth flagging beyond this one row.**

First, `CONTEXT.md` § *Stat priority* asserts *"(Three-stat items do not exist in this
game's itemisation.)"* A four-stat item now does. Whether `fitKind`
(`src/logic/matching.js`) does anything sane with a four-stat item against a two-stat BiS
target is untested and outside this note's scope, but the glossary's parenthesis is no
longer true.

Second, this is a failure mode **neither guide site can protect against**, because neither
is the authority: the item's stats changed under a correct id. The `.wowhead-cache.json`
entry never expires — CLAUDE.md and `docs/agents/pipeline.md` both say *"Never — persistent
across runs"* — so a cached tooltip can be arbitrarily stale and nothing notices. That is a
cache-policy problem, not a guide-source problem, and switching to Wowhead does not touch it.

*No repo file was modified by this investigation.*

---

## 5. Rate limiting and fetch etiquette

### robots.txt, exactly

`https://www.wowhead.com/robots.txt` (curl, 2026-09-21, 68,848 bytes, 2,249 lines,
`content-type: text/plain; charset=utf-8`).

**`/guide/` is not mentioned anywhere in the file.** `grep -c -i guide robots.txt` → `0`.

Three user-agent groups exist:

1. **Lines 1–30** — 29 named agents, terminated by `Disallow: /`. The list, verbatim:
   `AI2Bot`, `Ai2Bot-Dolma`, `anthropic-ai`, `Applebot-Extended`, `Bytespider`, `CCBot`,
   `Claude-Web`, `ClaudeBot`, `cohere-ai`, `Diffbot`, `FacebookBot`, `FriendlyCrawler`,
   `Google-Extended`, `GPTBot`, `iaskspider/2.0`, `ICC-Crawler`, `ImagesiftBot`,
   `img2dataset`, `ISSCyberRiskCrawler`, `Kangaroo Bot`, `Meta-ExternalAgent`,
   `Meta-ExternalFetcher`, `omgili`, `omgilibot`, `Scrapy`, `Sidetrade indexer bot`,
   `Timpibot`, `VelenPublicWebCrawler`, `Webzio-Extended`.
2. **Line 32** — `User-agent: Mediapartners-Google`, a long per-locale list of
   `/random`, `/list`, `/search` paths.
3. **Line 649** — `User-Agent: *`, disallowing only `/account`, `/error-static-cdn`,
   `/list`, `/random`, `/search`, `/site-achievement/*`, repeated per locale prefix
   (`/ko/`, `/fr/`, `/de/`, `/cn/`, `/es/`, `/it/`, `/pt/`, `/ru/`, `/tw/` and the
   Classic trees).

**No `Crawl-delay` directive anywhere in the file.** One `Sitemap:` line at the end.

So for a generic crawler, `/guide/classes/{class}/{spec}/bis-gear` is **explicitly
permitted** by the wildcard group. The named-agent block is an AI-training-crawler
blocklist. Whether a BiS-tracker generator counts as one of those is a judgement call
the file does not make for you — note that `Scrapy`, a general-purpose scraping library,
sits in that list too, which suggests the intent is broader than training data alone.

### What is actually enforced at the edge

The gate in front of `www.wowhead.com` is **CloudFront, and it fingerprints request
headers, not request rate.**

A `curl` with only `User-Agent: Mozilla/5.0 (X11; Linux x86_64) ... Chrome/130.0 Safari/537.36`
was refused:

```
HTTP/2 403
server: CloudFront
content-length: 919
...
<H1>403 ERROR</H1> <H2>The request could not be satisfied.</H2> Request blocked.
```

This was **the first request of the session**, so it is not a rate limit. A second batch
of 7 guide fetches, each the first request of its own batch, was also refused `403` with
`x-cache: Error from cloudfront`, under a `User-Agent` + `Accept` + `Accept-Language`
header set. Adding `sec-ch-ua`, `sec-ch-ua-mobile`, `sec-ch-ua-platform`,
`Sec-Fetch-Dest: document`, `Sec-Fetch-Mode: navigate`, `Sec-Fetch-Site: none`,
`Sec-Fetch-User: ?1` and `Upgrade-Insecure-Requests: 1` turned the **same 7 URLs** into
`200`s immediately. That is the whole difference. A request that does not look like a
Chrome navigation is blocked regardless of pacing.

**This matters more than the rate question.** It means the current
`fetchMaxrollGearTables` header, `"User-Agent": "Mozilla/5.0 (compatible; BiSTracker/1.0)"`
(`generate-spec-data.mjs:857`), would be **refused by Wowhead**, and it means using
Wowhead as a source requires the scraper to impersonate a browser — a more assertive
posture than the current `BiSTracker/1.0` self-identification. That is a policy decision
for the owner, and it is not a technical blocker in either direction.

### Measured rate behaviour

Two measurements, both with the full browser header set:

**Sustained.** 31 consecutive guide fetches at 4-second pacing:
**31/31 `200`, elapsed 147 seconds, zero errors.** Per-request `time_total` 0.21–1.57 s.

**Burst.** 12 requests to `warrior/fury/bis-gear?probe=N` at ~0.5-second intervals — the
query string deliberately busts the CDN cache, confirmed by `x-cache: Miss from cloudfront`
on both the first and last:

```
req1  200 1.322s    req5  200 0.997s    req9   200 1.005s
req2  200 1.250s    req6  200 0.740s    req10  200 0.754s
req3  200 0.812s    req7  200 0.974s    req11  200 0.809s
req4  200 0.957s    req8  200 1.244s    req12  200 1.358s
```

**No `429`, no `Retry-After`, no `X-RateLimit-*` header on any response** (grepped across
all 12 response header files; none present). No Cloudflare challenge — it is CloudFront,
not Cloudflare, and the only interstitial observed is the header-fingerprint `403`.

**Total for the session: 47 requests to `www.wowhead.com` over ~25 minutes, zero
throttling events.**

### Honest limits of this

47 requests over 25 minutes at 2 req/s peak establishes that **there is no low
rate limit** — nothing in the low-tens-per-minute range, which is where murlok.io's
roughly three-per-minute sits. It does **not** establish the absence of a limit at a
higher volume, over a longer window, or a per-IP daily budget that a repeated 40-spec
pass would find. It also does not tell you what happens on the hundredth consecutive
request from one IP, which is the regime a cold pass plus retries actually lives in.

### Feasibility of a 40-spec cold pass

**Yes, comfortably, in one run.** 40 requests at 4-second pacing is **about 3 minutes**.
At 2-second pacing it is 80 seconds, and the burst test shows 0.5-second pacing is
tolerated. There is no reason to go below 2 seconds — the whole pass is under two minutes
either way, and the margin buys goodwill.

Compare what the pipeline already tolerates: `docs/agents/pipeline.md` records murlok.io
at *"roughly three requests a minute"* with *"a cold forty-spec pass expects to be
interrupted"*, and `generate-priority-stats.mjs` paces at 40 s widening by half on every
401. **Wowhead is two orders of magnitude cheaper than the constraint this pipeline was
built around.**

The corollary is that the caching strategy can be much simpler than
`scripts/.murlok-cache/`. A cache is still worth having for reproducibility and for
`--fix`-style offline reruns, but it is not load-bearing the way the murlok cache is.

### Conditional refetch

**Not available.** Response headers on `demon-hunter/vengeance/bis-gear` (curl):

```
HTTP/2 200
content-type: text/html;charset=UTF-8
cache-control: max-age=0, s-maxage=600
expires: Tue, 23 Nov 2004 03:00:00 GMT
x-cache: Hit from cloudfront
x-origin-timestamp: 2026-09-21T03:05:07-05:00
```

**No `Last-Modified`. No `ETag`.** `If-Modified-Since` / `If-None-Match` have nothing to
match against, so every refresh is a full fetch. At ~150 KB uncompressed and ~35 KB on the
wire, forty of those is under 1.5 MB — the absence of conditional requests costs nothing
here.

The `s-maxage=600` means CloudFront serves a 10-minute-old copy, which is irrelevant for
guides that change weekly.

**What replaces conditional refetch is far better:** `dateModified` in the page's
`application/ld+json` is exact to the second and is *editorial* freshness, not HTTP
freshness. A cache keyed on it skips work for the right reason. See question 6.

---

## 6. Staleness signals

**A Wowhead BiS page exposes more machine-readable freshness than the fallback policy
needs.** Four independent signals, all in the initial HTML.

### 1. `application/ld+json` — the one to use

From `demon-hunter/vengeance/bis-gear` (curl, verbatim, unescaped):

```json
{"@context":"http://schema.org","@type":"Article",
 "mainEntityOfPage":{"@type":"WebPage","@id":"https://www.wowhead.com/guide/classes/demon-hunter/vengeance/bis-gear"},
 "headline":"Vengeance Demon Hunter Gear and Best in Slot - Midnight",
 "articleSection":"Retail",
 "keywords":"Category: Classes, Top Category: Classes, Game: World of Warcraft, Game Tree: Retail, Game Env: Live, Classes, Demon Hunter, Retail, Vengeance Demon Hunter",
 "datePublished":"2016-08-01T20:07:45-05:00",
 "dateModified":"2026-09-05T15:27:47-05:00",
 "author":{"@type":"Person","name":"Itamae"},
 "description":"Best in slot gear recommendations, including trinkets and weapons for your Vengeance Demon Hunter in Mythic+ Dungeons and Midnight Raids."}
```

`dateModified` + `author` were read successfully from **all 40 pages** — the table in
question 1 is that extraction. The spread as of 2026-09-21: newest 2026-09-19
(aug-evoker), oldest 2026-08-12 (feral-druid), median around 2026-08-27. **Every one of
the forty is within 40 days.** No spec is abandoned.

Parsing it is a two-line job — one regex for the `<script type="application/ld+json">`
block, one `JSON.parse` — and it is standard schema.org, so it is the least likely thing
on the page to change shape.

### 2. Patch badge

```html
<div class="interior-sidebar-header-text-subtitle">
    Patch 12.1.0                    </div>
```

All 40 pages read `Patch 12.1.0`. Localized in the chrome (`12.1.0 패치` on `/ko/`,
`补丁 12.1.0` on `/cn/`), so parse the `en` page.

### 3. Byline

```html
<div class="guide-content-byline">
    <a href="/author/Itamae">
        By Itamae                            </a>

    <span class="guide-content-byline-changed">
Updated:     <span class="date-tip" title="15 days ago">
    2026/09/05    </span>
```

Same information as the `ld+json`, day-granular, in brittler markup. Use it only as a
cross-check.

### 4. Per-guide changelog — the strongest signal, and the most work

Every page links `/guide/changelog?id=NNNN` in its sidebar. For Vengeance DH the id is
4520. `https://www.wowhead.com/guide/changelog?id=4520` (curl, 200) returns
`<title>Changelog For "Vengeance Demon Hunter Gear and Best in Slot - Midnight" - Guide - Wowhead</title>`
and a dated revision list with per-revision summaries and authors:

```
15 days ago:        update craft                          By Itamae
26 days ago:        updates                               By Itamae
2026/08/20 6:02 PM: updates                               By Itamae
2026/08/15 4:34 PM: update                                By Itamae
2026/08/15 1:50 PM: update                                By Itamae
2026/08/15 1:49 PM: update                                By Itamae
2026/08/12 10:54 PM: Reviewed for Patch 12.1 and Season 2 By Whispyr
2026/08/12 1:15 AM: fix mandate link                      By Itamae
2026/08/10 11:09 PM: Omnium Folio Runes Renamed           By Whispyr
2026/08/10 6:24 PM: Updated for Patch 12.1                By Whispyr
2026/06/13 2:07 PM: fix links                             By Itamae
```

Note `Reviewed for Patch 12.1 and Season 2` — an explicit **season-verification** record,
which is exactly the assertion a fallback policy wants and which no timestamp alone gives
you. A 2026-09-05 `dateModified` whose changelog entry reads *"update craft"* means
something different from one that reads *"Reviewed for Season 2"*.

The cost: one extra request per spec, plus scraping the guide id out of the page first,
plus the relative-date rendering (`15 days ago`) on recent rows. Worth it only if the
policy needs the distinction.

### What is *not* there

**No "not yet updated for Season 2" banner exists in machine-readable form on any of the
forty pages.** The season claim is prose inside the guide body — every page contains a
sentence of the shape *"This guide explains how to obtain the best gear for your
{Spec} in [b]Midnight Season 2[/b]"*, and the section headings read
*"Recommended Gear for {Spec} in Midnight Season 2"*. A regex over `Midnight Season 2`
in the decoded markup would catch a page that still said Season 1, but that is a
convention, not a contract, and it would not catch a page whose prose was updated while
its table was not.

### Can the wowhead-primary / maxroll-fallback policy be automatic?

**Partly, and the honest answer distinguishes two failure modes.**

- **Abandoned spec** — a guide nobody has touched. `dateModified` catches this exactly.
  A rule of the shape *"prefer Wowhead unless its `dateModified` is older than N days,
  else fall back to Maxroll"* is trivially implementable and needs no per-spec
  configuration. **As of 2026-09-21 it would never fire**: all forty pages are within
  40 days.
- **Maintained but wrong** — a fresh page with a bad row. `dateModified` says nothing.
  The Vengeance DH neck error is precisely this: Maxroll's page is actively maintained
  and the row is still wrong. **No timestamp on either site catches it.**

What *does* catch the second class is not a freshness signal at all — it is the
cross-check the repo already half-implements. `warnSlotMismatch`
(`generate-spec-data.mjs:1143`) compares the guide's slot against the item's own inventory
type and would have caught this exact row. It warns. **Promoting that warning to a hard
failure, on either source, catches a whole family of errors that no amount of
timestamp-reading will.** And with two sources rather than one, the stronger version is
available: a row where Wowhead and Maxroll disagree on the item id for a slot is a row
worth a human look, and a row where they agree is worth more confidence than either alone.

---

## What this means for the implementation

### The seam

`fetchMaxrollGearTables(slug, urlSuffix)` at `scripts/generate-spec-data.mjs:851`. It is
already a clean boundary: it takes a slug, does all the network and all the parsing, and
returns

```js
{ bis: [...], farmable: [...], statPriority: [...] | null }
```

where each row is the three-field shape `toGearRows` produces at
`generate-spec-data.mjs:716`:

```js
{ slotName: "Neck", itemName: "Aqirbane Reliquary", source: "Ula'tek" }
```

Everything downstream — `buildGearData` (1186), `resolveSlot` (121), `normalizeSource`
(814), `resolveDuplicateIds` (1442), `generateFullJs` (1349), the in-process `find-alts`
call — consumes that shape and nothing else. **A Wowhead fetcher that returns the same
shape plugs in with no downstream change.**

One small extension makes the switch pay for itself. A Wowhead row already knows the item
id, so let the row carry it:

```js
{ slotName, itemName: null, itemId: 268265, source, originalItemId: 271875 }
```

and short-circuit `generate-spec-data.mjs:1262`:

```js
const id = row.itemId ?? await searchItemId(ITEM_NAME_FIXES[row.itemName] || row.itemName);
```

That one line makes the entire name-resolution layer — `searchItemId` (1057),
`ITEM_NAME_FIXES` (947), `splitCommaWeaponName` (978), `stripQuantity` (963),
`resolveCatalystItemName` (692), `splitDualWeaponName` (967) — **dead on the Wowhead path
while staying alive for the Maxroll fallback**. It also deletes the per-item 200 ms delays
at 1265 and 1284 for those rows.

A Wowhead parser is roughly: fetch with browser headers → regex the
`WH.markup.printHtml("...")` string literal → `JSON.parse` it → locate the
`[tabs ... name=bis_items]` block → pick a tab → read the header row for column indices →
two DOTALL regexes for rows and cells → strip markup from the source cell. Call it 120
lines, against the 200-odd lines of Maxroll-specific repair it would let the Wowhead path
skip.

### Two things that do not fit, and must be decided before any code

**`MYTHIC` has no Wowhead source.** `processSpec` (`generate-spec-data.mjs:1538-1546`)
fetches two Maxroll URLs per spec and needs ≥ 14 rows from each (1604). Wowhead publishes
one table for 38 of 40 specs, mixing raid and dungeon loot. This is not a parsing gap —
the data is not on the page. Any plan that calls itself "minimal change" has to say what
happens to `MYTHIC`.

**Change detection is name-keyed.** `extractExistingNames` (1507) and `rowNames` (1519)
compare *item names* to decide whether a spec changed, and the Wowhead path has ids
instead of names. `arraysEqual` (1526) over ids would work and is a smaller change than it
sounds, but it is a change.

### Open questions this research could not settle

1. **What becomes of `MYTHIC` when the primary source publishes one mixed table?**
   Three candidates and none is obviously right: keep scraping Maxroll's
   `-mythic-plus-guide` for `MYTHIC` while taking `BIS` from Wowhead — which means two
   scrapers permanently and defeats "swap the fetch layer"; derive `MYTHIC` by filtering
   Wowhead's `Overall BiS` down to `VALID_DUNGEONS` sources — which yields 6–9 rows against
   a hard `>= 14` floor at `generate-spec-data.mjs:1604`; or reconceive `MYTHIC` as
   something `find-alts.mjs` already computes from the drop pool, which is a domain change
   and wants an ADR, not a patch.

2. **Does `BIS` take the catalyzed item or the catalyst base?** Wowhead states both
   (`[item=271537 original-item=271875]`) and the repo is currently inconsistent between
   them (`src/data/veng-dh.js:19` base for head, `:21` catalyzed for shoulder). The two have
   different ids, different sources — the base drops, the catalyzed one does not — and
   different implications for `calcSourceFarmCount` and `calcDungeonScore`. Which one does
   the tracker's farming model want?

3. **Is impersonating a Chrome navigation acceptable here?** Wowhead's CloudFront refuses
   the repo's current honest `BiSTracker/1.0` user-agent, and `robots.txt` names
   `ClaudeBot`, `anthropic-ai` and `Scrapy` under `Disallow: /` while permitting `/guide/`
   to `*`. The technical answer is settled — full Chrome headers work, 40 requests in
   3 minutes, no throttling. The question is whether the owner wants the pipeline making
   that request.

4. **Should `warnSlotMismatch` become fatal?** It caught the Vengeance DH neck error and
   was ignored (`generate-spec-data.mjs:1143`, warn-only by explicit design per the comment
   at 1124). No freshness signal on either site would have caught that row. If the answer
   is yes, does it fail the row, the spec, or the run?

5. **Which of `--fix`'s unguarded rewrites are wrong?** `generate-spec-data.mjs:1886`
   stamps `"Tier"` with no `TIER_SLOTS` check where the generator at 1279 has one — that is
   how a neck row came to say `"Tier"`. Is that the only place the two paths disagree about
   a rule, or is it one instance of a pattern?

6. **Should the permanent `.wowhead-cache.json` expire?** `268265`'s cached tooltip says
   one 428-point crit stat; the item today has four 107-point stats. The cache is documented
   as *"Never — persistent across runs"* (`docs/agents/pipeline.md`, CLAUDE.md), and no
   guide-source change touches this. What is the right expiry for a tooltip, given that
   Blizzard re-itemizes mid-season?

7. **Is the `guide=NNNNN` id worth a source table, given that 19 of 32 ids carry more
   than one label?** It would collapse the `The Coiled Altar` / `The Coiled Alter` /
   `Coiled Altar (Mythic)` family that `normalizeDungeon` (`generate-spec-data.mjs:924`)
   and `PART_FIXES` (`757`) currently handle by string coercion. It would not help on the
   hub ids (`33180` Raids, `33272` Mythic+ Dungeons, `15942` Crafting), and it would
   actively mislead on the rows where an author pasted `guide=33272` onto Temple of
   Sethraliss. Is the right build a *lookup* (id wins), or a *cross-check* (id and text
   must agree, else warn)? The second is more work and catches more.

8. **What does `fitKind` do with a four-stat item?** 268265 carries all four secondaries,
   and `CONTEXT.md` § *Stat priority* still says three-stat items do not exist. Untested
   and out of scope here, but it is now reachable from real data.
