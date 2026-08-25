/**
 * Observed stat priority: the pure core.
 *
 * Turns the secondary-stat ratings murlok publishes for a spec into a list of
 * equivalence groups — sets of stats a spec values so closely that swapping one
 * for another is not worth a re-farm. See
 * docs/adr/0003-stat-priority-from-the-published-chart.md.
 *
 * The ratings are read rather than computed. We used to sum them off the roster
 * JSON, which cannot work: that payload carries no enchants and no gems, and
 * those are where haste and versatility mostly live. Blood Death Knight came
 * out mastery-first because a retired raid neck sat on 41 of 50 characters and
 * because the haste on their gear was invisible to us.
 *
 * Nothing here touches the network or the disk, so it is testable against
 * stored chart fixtures. Fetching and caching live in
 * generate-priority-stats.mjs.
 */

import { statGroups } from "../src/logic/matching.js";

/** The four secondary stats, in the tracker's own vocabulary. */
export const SECONDARY_STATS = ["crit", "haste", "mastery", "vers"];

/** Chart labels → our vocabulary. Tertiary stats have no entry and are ignored. */
export const UPSTREAM_STAT_NAMES = {
    "critical strike": "crit",
    haste: "haste",
    mastery: "mastery",
    versatility: "vers",
};

/**
 * A boundary is cut where the ratio between neighbouring ratings falls below
 * this.
 *
 * One threshold, not two. The old thin-sample variant existed because our own
 * mean over fourteen characters moved around enough to flip a boundary. We no
 * longer compute the mean, and the page does not say how many characters are
 * behind its figure — conditioning on a sample size we cannot see would be
 * pretending to know something.
 */
export const THRESHOLD = 0.95;

/**
 * The four secondary-stat ratings, read off a murlok guide page.
 *
 * The markup is a list of bars, each carrying a label, a rounded total, and the
 * bar's height as a percentage of the tallest:
 *
 *     <li class="guide-stats-chart-item legendary">
 *       <span>26% Haste</span>
 *       <span class="h3">+918</span>
 *       <span style="height:100.000%"></span>
 *     </li>
 *
 * Both are read, for different jobs. The heights decide the groups: they carry
 * three decimals where the total is rounded to a whole number, and every ratio
 * this module cuts on is a ratio between two bars, which is exactly what a
 * height already is. The totals go into the record, because "+918" tells a
 * human reading priority-stats.json something that "100.000" does not.
 *
 * The page draws a second chart for tertiary stats, whose own tallest bar is
 * also 100%. Bars are therefore matched by label, and the tertiary ones simply
 * have no entry in UPSTREAM_STAT_NAMES. Reading the tertiary chart as though it
 * were the secondary one would put leech above haste.
 *
 * Returns null unless all four secondary stats were found. A partial chart is a
 * page that changed shape, and guessing at it would silently reorder a spec.
 */
export function parseStatChart(html) {
    const shares = { crit: 0, haste: 0, mastery: 0, vers: 0 };
    const totals = { crit: 0, haste: 0, mastery: 0, vers: 0 };
    let found = 0;
    const item = /<li class="guide-stats-chart-item[^"]*">([\s\S]*?)<\/li>/g;
    let m;
    while ((m = item.exec(html))) {
        const label = /<span>(?:[\d.]+%\s*)?([^<]+?)\s*<\/span>/.exec(m[1]);
        const height = /height:\s*([\d.]+)%/.exec(m[1]);
        if (!label || !height) continue;
        const stat = UPSTREAM_STAT_NAMES[label[1].trim().toLowerCase()];
        if (!stat) continue;
        const total = /class="h3">\+?([\d,]+)</.exec(m[1]);
        shares[stat] = Number(height[1]);
        totals[stat] = total ? Number(total[1].replace(/,/g, "")) : 0;
        found++;
    }
    return found === SECONDARY_STATS.length ? { shares, totals } : null;
}

/**
 * Sort stats by rating descending, then cut a group boundary wherever the ratio
 * between neighbours falls below the threshold. Everything between two
 * boundaries is one group.
 *
 * Grouping is neighbour-chained, not all-pairs: at 0.95 that produces no
 * transitivity break across the forty specs, and the one three-stat group
 * (Restoration Shaman's) holds at 0.959 end to end. At 0.90 it would break —
 * which is why the threshold is 0.95 and not looser.
 */
export function groupsFromMeans(ratings, threshold) {
    const ordered = SECONDARY_STATS.slice().sort((a, b) => ratings[b] - ratings[a]);
    const groups = [[ordered[0]]];
    for (let i = 1; i < ordered.length; i++) {
        const prev = ratings[ordered[i - 1]];
        const cur = ratings[ordered[i]];
        // Both zero is a tie, not a cut. One zero below a non-zero is a cut.
        const ratio = prev === 0 ? (cur === 0 ? 1 : 0) : cur / prev;
        if (ratio < threshold) groups.push([ordered[i]]);
        else groups[groups.length - 1].push(ordered[i]);
    }
    return groups;
}

/**
 * A spec's equivalence groups, from its parsed chart.
 *
 * Returns null groups when the chart could not be read — a caller must keep
 * whatever it already had rather than blank the spec.
 */
export function deriveGroups(chart, options = {}) {
    if (!chart) return { groups: null, chart: null, threshold: null };
    const threshold = options.threshold != null ? options.threshold : THRESHOLD;
    return { groups: groupsFromMeans(chart.shares, threshold), chart, threshold };
}

/**
 * Groups → a flat ordered list, best stat first.
 *
 * Nothing reads priority this way any more. It is how a run reports an order
 * that changed: "vers,crit,mastery,haste -> mastery,crit,haste,vers" is
 * readable in a way that two lists of lists are not.
 */
export function flattenGroups(groups) {
    return groups.flat();
}

/**
 * Read either shape out of priority-stats.json: an entry is a flat array of
 * four stats (four groups of one, the older data) or a generated record with
 * a `groups` field.
 *
 * The array case defers to statGroups, which is the app's own reader — one
 * definition of what a flat array means, not two that could disagree.
 */
export function priorityGroups(entry) {
    if (!entry) return null;
    if (Array.isArray(entry)) return statGroups(entry);
    return entry.groups && entry.groups.length ? entry.groups : null;
}

/** Read either shape as the flat ordered list. */
export function priorityList(entry) {
    const groups = priorityGroups(entry);
    return groups ? flattenGroups(groups) : null;
}

/**
 * One spec per block, groups and ratings each on a single line. JSON.stringify's
 * own indentation puts every stat name on its own line, which turns a
 * forty-spec file into a thousand and makes a diff unreadable.
 */
export function renderPriorityFile(data) {
    const blocks = Object.entries(data).map(([key, entry]) => {
        if (Array.isArray(entry)) {
            // A spec Maxroll backfilled, still a flat array.
            return `  ${JSON.stringify(key)}: ${JSON.stringify(entry)}`;
        }
        // A spec the run could not reach keeps the record it already had, and
        // that record may predate this shape. Render whatever fields it
        // carries rather than assuming the current ones — the alternative is a
        // run that fails to write at all because one spec was unreachable.
        const lines = [`    "groups": [${entry.groups.map((g) => JSON.stringify(g)).join(", ")}]`];
        for (const field of ["ratings", "means"]) {
            if (!entry[field]) continue;
            const body = Object.entries(entry[field])
                .map(([stat, v]) => `${JSON.stringify(stat)}: ${v}`)
                .join(", ");
            lines.push(`    ${JSON.stringify(field)}: { ${body} }`);
        }
        if (entry.n != null) lines.push(`    "n": ${entry.n}`);
        lines.push(`    "collected": ${JSON.stringify(entry.collected)}`);
        return `  ${JSON.stringify(key)}: {\n${lines.join(",\n")}\n  }`;
    });
    return `{\n${blocks.join(",\n")}\n}\n`;
}
