import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import {
    deriveGroups,
    flattenGroups,
    groupsFromMeans,
    priorityGroups,
    priorityList,
    renderPriorityFile,
    trimRoster,
} from "../scripts/priority-groups.mjs";

const FIXTURES = resolve(dirname(fileURLToPath(import.meta.url)), "fixtures");

function roster(name) {
    return JSON.parse(readFileSync(resolve(FIXTURES, `${name}.json`), "utf8"));
}

/** One character wearing one item that carries the given ratings. */
function character(ratings) {
    const NAMES = { crit: "critical-strike", haste: "haste", mastery: "mastery", vers: "versatility" };
    return {
        Equipment: {
            Items: [
                {
                    Stats: Object.entries(ratings).map(([stat, Value]) => ({
                        Name: NAMES[stat],
                        Value,
                    })),
                },
            ],
        },
    };
}

describe("deriveGroups", () => {
    it("puts stats within a percent of each other in one group", () => {
        // Protection Paladin: haste 859, mastery 664, crit 658, vers 178.
        // Mastery and crit are nine tenths of one percent apart, which is the
        // gap that used to send a player back to a dungeon for nothing.
        const { groups, means, n } = deriveGroups(roster("prot-paladin"));
        expect(n).toBe(50);
        expect(groups).toEqual([["haste"], ["mastery", "crit"], ["vers"]]);
        expect(Math.round(means.haste)).toBe(859);
        expect(Math.round(means.mastery)).toBe(664);
        expect(Math.round(means.crit)).toBe(658);
        expect(Math.round(means.vers)).toBe(178);
    });

    it("leaves a spec with no near pairs as four groups of one", () => {
        // Unholy Death Knight: mastery 1123, crit 899, haste 357, vers 17.
        // Every neighbouring ratio is far below the threshold, so nothing merges
        // and the spec keeps a strict preference the tracker should enforce.
        const { groups } = deriveGroups(roster("unholy-dk"));
        expect(groups).toEqual([["mastery"], ["crit"], ["haste"], ["vers"]]);
    });

    it("merges a thin sample's borderline pair that a full sample would split", () => {
        // Augmentation Evoker's borderline pair sits at 0.937 — below 0.95 and
        // above 0.90. Its sample is under thirty characters, so the threshold
        // drops and the pair merges. A false merge only withholds a warning; a
        // false split orders a re-farm over a rounding difference.
        const chars = roster("aug-evoker");
        expect(chars.length).toBeLessThan(30);

        const auto = deriveGroups(chars);
        expect(auto.threshold).toBe(0.9);

        const strict = deriveGroups(chars, { threshold: 0.95 });
        expect(strict.groups.length).toBeGreaterThan(auto.groups.length);
    });

    it("does not chain a group across members that are not equivalent", () => {
        // Demonology Warlock: at 0.90 crit chains to haste and haste to mastery,
        // making one group whose ends sit at 0.873 — members that are not
        // equivalent to each other. 0.95 cuts it. This is why the full-sample
        // threshold is not 0.90.
        const chars = roster("demo-lock");
        const loose = deriveGroups(chars, { threshold: 0.9 });
        const chained = loose.groups.find((g) => g.length >= 3);
        expect(chained).toBeDefined();

        const { means } = loose;
        expect(means[chained.at(-1)] / means[chained[0]]).toBeLessThan(0.9);

        const cut = deriveGroups(chars, { threshold: 0.95 });
        expect(cut.groups.every((g) => g.length < 3)).toBe(true);
    });

    it("derives from a roster of one character", () => {
        const { groups, means, n, threshold } = deriveGroups([
            character({ haste: 900, mastery: 660, crit: 655, vers: 100 }),
        ]);
        expect(n).toBe(1);
        expect(threshold).toBe(0.9);
        expect(means).toEqual({ crit: 655, haste: 900, mastery: 660, vers: 100 });
        expect(groups).toEqual([["haste"], ["mastery", "crit"], ["vers"]]);
    });

    it("derives nothing from an empty roster", () => {
        // Nothing to derive. The caller keeps whatever it already had rather
        // than blanking the spec.
        const { groups, n } = deriveGroups([]);
        expect(groups).toBeNull();
        expect(n).toBe(0);
    });

    it("sums a character's items rather than reading one of them", () => {
        const split = character({ haste: 300 });
        split.Equipment.Items.push(character({ haste: 300 }).Equipment.Items[0]);
        const { means } = deriveGroups([split]);
        expect(means.haste).toBe(600);
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
        const entry = { groups: [["haste"], ["mastery", "crit"], ["vers"]], n: 50 };
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
            means: { crit: 658.3, haste: 858.9, mastery: 663.6, vers: 178.4 },
            n: 50,
            collected: "2026-08-19",
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

describe("trimRoster", () => {
    // What separates a fixture from the 1.1MB response it came out of. It runs
    // on the way out of the cache, so getting it wrong silently changes every
    // derived number.
    it("keeps secondary stat ratings and drops everything else", () => {
        const payload = {
            Season: "mid-1",
            Characters: [
                {
                    Slug: "someone",
                    AvatarURL: "https://example.invalid/a.png",
                    Equipment: {
                        Items: [
                            {
                                ItemID: 249961,
                                Name: "Some Helm",
                                Stats: [
                                    { Value: 244, Name: "armor" },
                                    { Value: 2326, Name: "stamina" },
                                    { Value: 112, Name: "haste" },
                                    { Value: 53, Name: "mastery" },
                                ],
                            },
                        ],
                    },
                },
            ],
        };
        expect(trimRoster(payload)).toEqual([
            {
                Equipment: {
                    Items: [
                        {
                            Stats: [
                                { Name: "haste", Value: 112 },
                                { Name: "mastery", Value: 53 },
                            ],
                        },
                    ],
                },
            },
        ]);
    });

    it("survives a character with no equipment and a payload with no characters", () => {
        expect(trimRoster({ Characters: [{}] })).toEqual([{ Equipment: { Items: [] } }]);
        expect(trimRoster({})).toEqual([]);
    });
});
