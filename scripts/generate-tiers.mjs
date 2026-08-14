/**
 * Generate the TIERS table in src/data/shared.js from Raidbots bonus data.
 *
 * Item grade tracks (Veteran / Champion / Hero / Myth) change every season:
 * the ilvl bands move and the bonus_id blocks are reassigned. Raidbots
 * publishes the game's own ItemBonus data, so deriving TIERS from it removes
 * the guesswork — the Season 1 table in this repo was written by hand and
 * ended up off by one against the real bonus_id blocks.
 *
 * Usage:
 *   node scripts/generate-tiers.mjs                 # latest season, print only
 *   node scripts/generate-tiers.mjs --season 37     # pin a season
 *   node scripts/generate-tiers.mjs --write         # patch src/data/shared.js
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SHARED_JS = resolve(__dirname, "../src/data/shared.js");

const BONUSES_URL = "https://www.raidbots.com/static/data/live/bonuses.json";

// Tracks that get no target button. Adventurer sits below every BiS target,
// so offering it as a goal would be noise — but it still has to be in TIERS.
// Dropping it would leave its bonus_ids unmatched, and itemTierIdx() would
// fall through to the ilvl guess and grade an Adventurer item as Veteran,
// claiming a 282-capped item can be upgraded to 295.
const HIDDEN_TRACKS = new Set(["adventurer"]);

// Used only for tracks that have no color in the current shared.js.
const FALLBACK_COLORS = ["#6daa6d", "#4d8ecf", "#9b4dca", "#ca7a3d"];
const HIDDEN_COLOR = "#8a8a8a";

const args = process.argv.slice(2);
const seasonArg = args.indexOf("--season");
const wantSeason = seasonArg >= 0 ? parseInt(args[seasonArg + 1], 10) : null;
const doWrite = args.includes("--write");

async function fetchBonuses() {
    console.log(`Fetching ${BONUSES_URL}...`);
    const res = await fetch(BONUSES_URL, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; BiSTracker/1.0)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${BONUSES_URL}`);
    return res.json();
}

function ilvlOf(entry) {
    return entry && entry.itemLevel ? entry.itemLevel.amount : null;
}

/**
 * Each track occupies a contiguous bonus_id block. The ids carrying `upgrade`
 * metadata are the ranks reachable with crests; the block usually continues
 * with a few more ids that share the track's quality but have no upgrade
 * entry. Those still belong to the track — an item wearing one of them cannot
 * be upgraded into the next grade — so the range is extended over them to keep
 * the TIERS ranges contiguous and stop itemTierIdx() from returning -1.
 */
function extendBlock(bonuses, lastRankId, quality) {
    let last = lastRankId;
    for (let id = lastRankId + 1; ; id++) {
        const e = bonuses[String(id)];
        if (!e || e.upgrade || e.quality !== quality) break;
        if (ilvlOf(e) === null) break;
        last = id;
    }
    return last;
}

function buildTracks(bonuses, season) {
    const groups = new Map();
    for (const [id, entry] of Object.entries(bonuses)) {
        const u = entry.upgrade;
        if (!u || u.seasonId !== season) continue;
        if (!groups.has(u.group)) groups.set(u.group, { name: u.name, ranks: [] });
        groups.get(u.group).ranks.push({ id: parseInt(id, 10), level: u.level, ilvl: ilvlOf(entry), quality: entry.quality });
    }

    const tracks = [];
    for (const [group, g] of groups) {
        g.ranks.sort((a, b) => a.level - b.level);
        const first = g.ranks[0];
        const last = g.ranks[g.ranks.length - 1];
        tracks.push({
            group,
            key: g.name.toLowerCase(),
            name: g.name,
            ranks: g.ranks.length,
            min: first.ilvl,
            max: last.ilvl,
            bonusMin: first.id,
            bonusMax: extendBlock(bonuses, last.id, last.quality),
            tooltipBonus: last.id,
        });
    }
    // Ascending by item level — TIERS is indexed as a grade ladder.
    tracks.sort((a, b) => a.max - b.max);
    return tracks;
}

function latestSeason(bonuses) {
    let max = null;
    for (const entry of Object.values(bonuses)) {
        const s = entry.upgrade && entry.upgrade.seasonId;
        if (typeof s === "number" && (max === null || s > max)) max = s;
    }
    return max;
}

/** Existing colors are a UI choice, not game data — carry them over by key. */
function existingColors(src) {
    const colors = {};
    const block = src.match(/export var TIERS = \[[\s\S]*?\n\];/);
    if (!block) return colors;
    const re = /key:\s*"([^"]+)"[^}]*?color:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(block[0]))) colors[m[1]] = m[2];
    return colors;
}

function renderTiers(tracks, colors) {
    let visible = 0;
    const lines = tracks.map((t) => {
        const isHidden = HIDDEN_TRACKS.has(t.key);
        const color = colors[t.key] || (isHidden ? HIDDEN_COLOR : FALLBACK_COLORS[visible++ % FALLBACK_COLORS.length]);
        const hidden = isHidden ? ", hidden: true" : "";
        return `  { key: "${t.key}", min: ${t.min}, max: ${t.max}, color: "${color}", bonusMin: ${t.bonusMin}, bonusMax: ${t.bonusMax}, tooltipBonus: ${t.tooltipBonus}${hidden} },`;
    });
    return `// hidden: graded like any other track, but never offered as a target.\nexport var TIERS = [\n${lines.join("\n")}\n];`;
}

async function main() {
    const bonuses = await fetchBonuses();
    const season = wantSeason || latestSeason(bonuses);
    if (!season) throw new Error("No season found in bonus data");

    const tracks = buildTracks(bonuses, season);
    if (!tracks.length) throw new Error(`No upgrade tracks for season ${season}`);

    console.log(`\nSeason ${season} upgrade tracks:`);
    for (const t of tracks) {
        console.log(
            `  ${t.name.padEnd(11)} group ${t.group}  ${t.ranks} ranks  ` +
            `bonus ${t.bonusMin}-${t.bonusMax}  ilvl ${t.min}-${t.max}` +
            `${HIDDEN_TRACKS.has(t.key) ? "   (hidden — no target button)" : ""}`,
        );
    }

    const src = readFileSync(SHARED_JS, "utf8");
    const rendered = renderTiers(tracks, existingColors(src));

    console.log("");
    console.log(rendered);

    if (!doWrite) {
        console.log("\n(print only — pass --write to patch src/data/shared.js)");
        return;
    }

    // Swallow the generated comment line too, so re-runs don't stack copies of it
    const BLOCK = /(?:\/\/ hidden:[^\n]*\n)?export var TIERS = \[[\s\S]*?\n\];/;
    if (!BLOCK.test(src)) {
        throw new Error("Could not locate the TIERS block in src/data/shared.js");
    }
    writeFileSync(SHARED_JS, src.replace(BLOCK, rendered), "utf8");
    console.log("\nsrc/data/shared.js updated");
}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});
