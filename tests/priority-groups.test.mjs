import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import {
    deriveGroups,
    flattenGroups,
    groupsFromMeans,
    parseStatChart,
    priorityGroups,
    priorityList,
    renderPriorityFile,
} from "../scripts/priority-groups.mjs";

const FIXTURES = resolve(dirname(fileURLToPath(import.meta.url)), "fixtures");

/** The stat charts from a spec's guide page, as the page rendered them. */
function page(name) {
    return readFileSync(resolve(FIXTURES, `${name}.html`), "utf8");
}

/** A chart the page could have drawn, for cases no fixture happens to contain. */
function chart(totals) {
    const LABELS = { crit: "Critical Strike", haste: "Haste", mastery: "Mastery", vers: "Versatility" };
    const max = Math.max(...Object.values(totals));
    const bars = Object.entries(totals).map(([stat, total]) =>
        `<li class="guide-stats-chart-item epic">` +
        `<span>0% ${LABELS[stat]}</span>` +
        `<span class="h3">+${total}</span>` +
        `<span style="height:${((total / max) * 100).toFixed(3)}%"></span>` +
        `</li>`,
    );
    return `<ul class="guide-stats-size-4">${bars.join("")}</ul>`;
}

describe("parseStatChart", () => {
    it("reads the secondary chart and not the tertiary one", () => {
        // Both charts are in the fixture, and the tertiary chart's own tallest
        // bar is also 100%. Read positionally, leech would outrank haste.
        const { shares, totals } = parseStatChart(page("blood-dk"));
        expect(totals).toEqual({ crit: 668, haste: 918, mastery: 663, vers: 494 });
        expect(shares.haste).toBe(100);
        expect(shares.crit).toBeCloseTo(72.805, 3);
    });

    it("declines a chart that is missing a stat", () => {
        // A page that changed shape. Guessing at it would silently reorder a
        // spec, so the caller keeps what it had.
        const partial = chart({ crit: 668, haste: 918, mastery: 663 });
        expect(parseStatChart(partial)).toBeNull();
    });

    it("declines markup with no chart at all", () => {
        expect(parseStatChart("<p>nothing here</p>")).toBeNull();
    });
});

describe("deriveGroups", () => {
    it("puts stats within a percent of each other in one group", () => {
        // Blood Death Knight: haste 918, crit 668, mastery 663, vers 494.
        // Crit and mastery are eight tenths of one percent apart, which is the
        // gap that used to send a player back to a dungeon for nothing — and
        // which the order murlok prints beside the chart flattens away.
        const { groups, chart: c } = deriveGroups(parseStatChart(page("blood-dk")));
        expect(groups).toEqual([["haste"], ["crit", "mastery"], ["vers"]]);
        expect(c.totals.haste).toBe(918);
    });

    it("leaves a spec with no near pairs as four groups of one", () => {
        // Unholy Death Knight: every neighbouring ratio is far below the
        // threshold, so nothing merges and a real preference stays enforced.
        const { groups } = deriveGroups(parseStatChart(page("unholy-dk")));
        expect(groups.every((g) => g.length === 1)).toBe(true);
    });

    it("uses one threshold, whatever the spec", () => {
        // The thin-sample variant is gone: the page does not publish a sample
        // size, so there is nothing to condition on.
        const a = deriveGroups(parseStatChart(page("blood-dk")));
        const b = deriveGroups(parseStatChart(page("unholy-dk")));
        expect(a.threshold).toBe(0.95);
        expect(b.threshold).toBe(0.95);
    });

    it("does not chain a group across members that are not equivalent", () => {
        // At 0.90 crit chains to haste and haste to mastery, making one group
        // whose ends sit below 0.90 — members not equivalent to each other.
        // 0.95 cuts it. This is why the threshold is not looser.
        const c = parseStatChart(chart({ crit: 1000, haste: 910, mastery: 828, vers: 100 }));
        const loose = deriveGroups(c, { threshold: 0.9 });
        const chained = loose.groups.find((g) => g.length >= 3);
        expect(chained).toBeDefined();
        expect(c.shares[chained.at(-1)] / c.shares[chained[0]]).toBeLessThan(0.9);

        const cut = deriveGroups(c, { threshold: 0.95 });
        expect(cut.groups.every((g) => g.length < 3)).toBe(true);
    });

    it("derives nothing from a chart it could not read", () => {
        // The caller keeps whatever it already had rather than blanking the spec.
        const { groups } = deriveGroups(null);
        expect(groups).toBeNull();
    });
});

describe("groupsFromMeans", () => {
    it("cuts a boundary exactly at the threshold, not one step early", () => {
        // 950/1000 is 0.95 — the threshold is a floor, so this merges.
        expect(groupsFromMeans({ haste: 1000, mastery: 950, crit: 500, vers: 100 }, 0.95))
            .toEqual([["haste", "mastery"], ["crit"], ["vers"]]);
        expect(groupsFromMeans({ haste: 1000, mastery: 949, crit: 500, vers: 100 }, 0.95))
            .toEqual([["haste"], ["mastery"], ["crit"], ["vers"]]);
    });

    it("keeps a stat nobody wears out of the group above it", () => {
        expect(groupsFromMeans({ haste: 800, mastery: 780, crit: 0, vers: 0 }, 0.95))
            .toEqual([["haste", "mastery"], ["crit", "vers"]]);
    });
});

describe("priority file shapes", () => {
    it("reads a flat array of four as four groups of one", () => {
        expect(priorityGroups(["haste", "crit", "mastery", "vers"])).toEqual([
            ["haste"], ["crit"], ["mastery"], ["vers"],
        ]);
    });

    it("reads a generated record as its groups", () => {
        const entry = { groups: [["haste"], ["mastery", "crit"], ["vers"]] };
        expect(priorityGroups(entry)).toEqual(entry.groups);
        expect(priorityList(entry)).toEqual(["haste", "mastery", "crit", "vers"]);
    });

    it("reads a missing or empty entry as nothing", () => {
        expect(priorityGroups(null)).toBeNull();
        expect(priorityGroups([])).toBeNull();
        expect(priorityGroups({ groups: [] })).toBeNull();
        expect(priorityList(null)).toBeNull();
    });

    it("flattens groups to the ordered list the data files carry", () => {
        expect(flattenGroups([["haste"], ["mastery", "crit"], ["vers"]])).toEqual([
            "haste", "mastery", "crit", "vers",
        ]);
    });
});

describe("renderPriorityFile", () => {
    // The renderer is hand-rolled because JSON.stringify puts every stat name
    // on its own line, and a forty-spec file rendered that way is unreadable
    // in a diff. Hand-rolled means it can emit something that does not parse.
    const data = {
        "prot-paladin": {
            groups: [["haste"], ["mastery", "crit"], ["vers"]],
            ratings: { crit: 668, haste: 918, mastery: 663, vers: 494 },
            collected: "2026-08-25",
        },
        "backfilled-spec": ["haste", "crit", "mastery", "vers"],
    };

    it("round-trips both entry shapes", () => {
        expect(JSON.parse(renderPriorityFile(data))).toEqual(data);
    });

    it("keeps a spec to one block, not one line per stat", () => {
        const out = renderPriorityFile(data);
        expect(out.split("\n").filter((l) => l.includes("groups"))).toHaveLength(1);
        expect(out.endsWith("\n")).toBe(true);
    });
});
