/**
 * Observed stat priority: the pure core.
 *
 * Aggregates the gear high-performing players wear into a list of equivalence
 * groups — sets of secondary stats a spec values so closely that swapping one
 * for another is not worth a re-farm. See docs/adr/0001-observed-stat-priority.md.
 *
 * Nothing here touches the network or the disk, so it is testable against
 * stored roster fixtures. Fetching and caching live in
 * generate-priority-stats.mjs.
 */

import { statGroups } from "../src/logic/matching.js";

/** The four secondary stats, in the tracker's own vocabulary. */
export const SECONDARY_STATS = ["crit", "haste", "mastery", "vers"];

/** Upstream stat names → ours. Anything else on an item is ignored. */
export const UPSTREAM_STAT_NAMES = {
    "critical-strike": "crit",
    haste: "haste",
    mastery: "mastery",
    versatility: "vers",
};

/**
 * A boundary is cut where the ratio between neighbouring means falls below
 * this. Thin samples move a mean around enough to flip a boundary, so they
 * lean toward merging: splitting two stats that are really equivalent orders
 * a re-farm over a rounding difference, while merging two that are really
 * distinct only withholds a warning.
 */
export const THRESHOLD = 0.95;
export const THIN_THRESHOLD = 0.9;
export const THIN_SAMPLE = 30;

/** Mean equipped rating per secondary stat across a roster. */
export function meanRatings(characters) {
    const total = { crit: 0, haste: 0, mastery: 0, vers: 0 };
    const n = characters.length;
    for (const c of characters) {
        const items = (c.Equipment && c.Equipment.Items) || [];
        for (const item of items) {
            for (const s of item.Stats || []) {
                const key = UPSTREAM_STAT_NAMES[s.Name];
                if (key) total[key] += s.Value || 0;
            }
        }
    }
    const means = {};
    for (const stat of SECONDARY_STATS) means[stat] = n ? total[stat] / n : 0;
    return means;
}

/**
 * Sort stats by mean descending, then cut a group boundary wherever the ratio
 * between neighbours falls below the threshold. Everything between two
 * boundaries is one group.
 *
 * Grouping is neighbour-chained, not all-pairs: at 0.95 that produces no
 * transitivity break across the forty specs, and the one three-stat group
 * (Restoration Shaman's) holds at 0.959 end to end. At 0.90 it would — that
 * is the reason the threshold is not 0.90 for full samples.
 */
export function groupsFromMeans(means, threshold) {
    const ordered = SECONDARY_STATS.slice().sort((a, b) => means[b] - means[a]);
    const groups = [[ordered[0]]];
    for (let i = 1; i < ordered.length; i++) {
        const prev = means[ordered[i - 1]];
        const cur = means[ordered[i]];
        // Both zero is a tie, not a cut. One zero below a non-zero is a cut.
        const ratio = prev === 0 ? (cur === 0 ? 1 : 0) : cur / prev;
        if (ratio < threshold) groups.push([ordered[i]]);
        else groups[groups.length - 1].push(ordered[i]);
    }
    return groups;
}

/**
 * Derive a spec's equivalence groups from its roster.
 *
 * Returns null groups for an empty roster — there is nothing to derive, and a
 * caller must keep whatever it already had rather than blank the spec.
 */
export function deriveGroups(characters, options = {}) {
    const list = characters || [];
    const n = list.length;
    const means = meanRatings(list);
    if (!n) return { groups: null, means, n: 0, threshold: null };
    const threshold =
        options.threshold != null
            ? options.threshold
            : n < (options.thinSample ?? THIN_SAMPLE)
              ? THIN_THRESHOLD
              : THRESHOLD;
    return { groups: groupsFromMeans(means, threshold), means, n, threshold };
}

/**
 * Keep only what the derivation reads: each character's equipped items, each
 * item's secondary stat ratings. Applied on the way out of the cache, not on
 * the way in — the cache holds the response as it arrived, so a later change
 * to what the derivation reads does not mean refetching forty specs through a
 * rate limit that escalates.
 */
export function trimRoster(payload) {
    const characters = payload.Characters || [];
    return characters.map((c) => ({
        Equipment: {
            Items: ((c.Equipment && c.Equipment.Items) || []).map((item) => ({
                Stats: (item.Stats || [])
                    .filter((s) => UPSTREAM_STAT_NAMES[s.Name])
                    .map((s) => ({ Name: s.Name, Value: s.Value })),
            })),
        },
    }));
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
 * One spec per block, groups and means each on a single line. JSON.stringify's
 * own indentation puts every stat name on its own line, which turns a
 * forty-spec file into a thousand and makes a diff unreadable.
 */
export function renderPriorityFile(data) {
    const blocks = Object.entries(data).map(([key, entry]) => {
        if (Array.isArray(entry)) {
            // A spec Maxroll backfilled, still a flat array.
            return `  ${JSON.stringify(key)}: ${JSON.stringify(entry)}`;
        }
        const groups = entry.groups.map((g) => JSON.stringify(g)).join(", ");
        const means = Object.entries(entry.means)
            .map(([stat, v]) => `${JSON.stringify(stat)}: ${v}`)
            .join(", ");
        return (
            `  ${JSON.stringify(key)}: {\n` +
            `    "groups": [${groups}],\n` +
            `    "means": { ${means} },\n` +
            `    "n": ${entry.n},\n` +
            `    "collected": ${JSON.stringify(entry.collected)}\n` +
            `  }`
        );
    });
    return `{\n${blocks.join(",\n")}\n}\n`;
}
