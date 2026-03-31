# WoW BiS Tracker

> *Half the battle is knowing what to farm. The other half is RNG.*

BiS (Best in Slot) item tracker for WoW. Paste your SimC output to analyze gear, sort farming priorities, and view alt items per dungeon.

**Live:** [wowbis.gg](https://wowbis.gg)

## Features

- **SimC Import** — Paste `/simc` output to auto-analyze equipped gear
- **Farming Priority** — Stat mismatch > Alt equipped > BiS upgrade needed > Done
- **Target Tier** — Select Veteran/Champion/Hero/Mythic, sorted by ilvl gap
- **Dungeon View** — See all BiS + Alt drops per dungeon at a glance
- **Wowhead Tooltips** — In-game tooltips on item hover
- **localStorage** — Progress persists across sessions

## Local Development

```bash
bun install
bun run dev
```

## Deployment (Cloudflare Pages)

1. Push to GitHub
2. [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create project → Connect repo
3. Build command: `bun run build` / Output directory: `dist`

No extra config needed. Vite static build deploys as-is.

## Adding a Spec

Create a new file in `src/data/` and register it in `src/data/specs.js`.
Required data: BiS list (16 slots), Alt list, KNOWN_STATS, dungeon list.

## Feedback

Join the [Discord](https://discord.gg/GU2Rs6y3Fh) for feedback, bug reports, and feature requests.

## Data Sources

- Item ID / Korean names: Wowhead tooltip API (locale=1)
- Secondary stats: Wowhead tooltip HTML parsing (rtg32/36/49/40)
- Alt items: Wowhead zone drop table (WH.Gatherer.addData)
