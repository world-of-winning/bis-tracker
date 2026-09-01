import { describe, expect, it } from "vitest";
import { fitKind, groupIndex, matchBiS, statGroups } from "../src/logic/matching.js";
import { calcPriority, planProgress, statScore } from "../src/logic/priority.js";

// Protection Paladin: haste 859, then mastery 664 and crit 658 in one group,
// then vers. The nine-tenths-of-a-percent gap this whole change exists for.
const PROT_PALADIN = [["haste"], ["mastery", "crit"], ["vers"]];
// Restoration Shaman: crit, then three stats inside a single percent.
const RESTO_SHAMAN = [["crit"], ["vers", "haste", "mastery"]];
// The older shape. Four groups of one.
const FLAT = ["haste", "crit", "mastery", "vers"];
// Both axes on Hero: ceiling 321 whichever path a source takes.
const HERO_PLAN = { mplus: "keys6", raid: "heroic" };

describe("fitKind", () => {
    it("calls identical stat sets exact, in any order", () => {
        expect(fitKind(["haste", "mastery"], ["haste", "mastery"], PROT_PALADIN)).toBe("exact");
        expect(fitKind(["mastery", "haste"], ["haste", "mastery"], PROT_PALADIN)).toBe("exact");
    });

    it("accepts a crit item where the BiS item has mastery", () => {
        // The defect this removes: today the player is sent back to a dungeon
        // to chase six rating points.
        expect(fitKind(["haste", "crit"], ["haste", "mastery"], PROT_PALADIN)).toBe("equivalent");
    });

    it("rejects a swap that shares a group but does not map onto it", () => {
        // crit+mastery against haste+mastery: both stats land in group 1, the
        // BiS item's land in groups 0 and 1. Sharing a group is not enough —
        // the multisets have to match.
        expect(fitKind(["crit", "mastery"], ["haste", "mastery"], PROT_PALADIN)).toBeNull();
    });

    it("never lets a one-stat item stand in for a two-stat one", () => {
        expect(fitKind(["haste"], ["haste", "mastery"], PROT_PALADIN)).toBeNull();
        expect(fitKind(["haste", "mastery"], ["haste"], PROT_PALADIN)).toBeNull();
    });

    it("lets a one-stat item satisfy a one-stat BiS item in the same group", () => {
        // The 133 one-stat items the old top-two rule could never accept.
        expect(fitKind(["crit"], ["mastery"], PROT_PALADIN)).toBe("equivalent");
        expect(fitKind(["crit"], ["crit"], PROT_PALADIN)).toBe("exact");
        expect(fitKind(["haste"], ["mastery"], PROT_PALADIN)).toBeNull();
    });

    it("handles a three-stat group", () => {
        expect(fitKind(["crit", "haste"], ["crit", "mastery"], RESTO_SHAMAN)).toBe("equivalent");
        expect(fitKind(["vers", "haste"], ["haste", "mastery"], RESTO_SHAMAN)).toBe("equivalent");
        expect(fitKind(["vers", "haste"], ["crit", "mastery"], RESTO_SHAMAN)).toBeNull();
    });

    it("reads a flat four-stat priority as four groups of one", () => {
        // Behaves exactly as a strict order does: nothing but an exact set fits.
        expect(fitKind(["haste", "crit"], ["haste", "crit"], FLAT)).toBe("exact");
        expect(fitKind(["haste", "crit"], ["haste", "mastery"], FLAT)).toBeNull();
        expect(fitKind(["crit"], ["mastery"], FLAT)).toBeNull();
    });

    it("returns nothing for empty or stat-less input", () => {
        // Stat-less items match by item ID alone; that decision is the
        // caller's, and this rule declines to answer.
        expect(fitKind([], ["haste", "mastery"], PROT_PALADIN)).toBeNull();
        expect(fitKind(["haste", "mastery"], [], PROT_PALADIN)).toBeNull();
        expect(fitKind(undefined, ["haste"], PROT_PALADIN)).toBeNull();
        expect(fitKind(["haste"], ["haste"], null)).toBe("exact");
        expect(fitKind(["crit"], ["mastery"], null)).toBeNull();
    });

    it("will not fit a stat the spec's priority does not name", () => {
        expect(fitKind(["speed"], ["crit"], PROT_PALADIN)).toBeNull();
    });
});

describe("statGroups", () => {
    it("passes grouped input through and lifts a flat list", () => {
        expect(statGroups(PROT_PALADIN)).toBe(PROT_PALADIN);
        expect(statGroups(FLAT)).toEqual([["haste"], ["crit"], ["mastery"], ["vers"]]);
        expect(statGroups([])).toBeNull();
        expect(statGroups(null)).toBeNull();
    });

    it("finds which group a stat sits in", () => {
        expect(groupIndex(PROT_PALADIN, "crit")).toBe(1);
        expect(groupIndex(PROT_PALADIN, "mastery")).toBe(1);
        expect(groupIndex(PROT_PALADIN, "speed")).toBe(-1);
    });
});

describe("statScore", () => {
    const stats = { 1: ["haste", "mastery"], 2: ["haste", "crit"], 3: ["mastery", "vers"] };

    it("scores stats in one group the same, so they stop breaking ties", () => {
        expect(statScore(1, stats, PROT_PALADIN)).toBe(statScore(2, stats, PROT_PALADIN));
    });

    it("still ranks a worse item below a better one", () => {
        expect(statScore(3, stats, PROT_PALADIN)).toBeLessThan(statScore(1, stats, PROT_PALADIN));
    });

    it("reads a flat priority as it always did", () => {
        // haste is 4, crit 3, mastery 2, vers 1 across four groups of one.
        expect(statScore(1, stats, FLAT)).toBe(6);
        expect(statScore(2, stats, FLAT)).toBe(7);
    });

    it("scores nothing without a priority or without stats", () => {
        expect(statScore(1, stats, null)).toBe(0);
        expect(statScore(9, stats, PROT_PALADIN)).toBe(0);
    });
});

describe("an equivalent fit, end to end", () => {
    // A Protection Paladin wearing a crit helm where the BiS helm has mastery.
    // Six rating points apart. Before this rule the tracker sent them back to
    // the dungeon in red.
    const BIS = [{ slot: "head", id: 100, stats: ["haste", "mastery"] }];
    const gear = { head: { id: 200, ilvl: 321, bonus: "12846" } };
    const stats = { 100: ["haste", "mastery"], 200: ["haste", "crit"] };

    const sr = (() => {
        const r = matchBiS(BIS, gear, [], stats, new Set(), PROT_PALADIN);
        return { gear, ...r };
    })();

    it("marks the equipped item as an equivalent fit, not as the wrong item", () => {
        expect(sr.altItems[100]).toBe("equivalent");
    });

    it("records fitKind's own words, so the marker needs no translating", () => {
        const exact = { head: { id: 400, ilvl: 321, bonus: "12846" } };
        const s2 = { ...stats, 400: ["mastery", "haste"] };
        const r = matchBiS(BIS, exact, [], s2, new Set(), PROT_PALADIN);
        expect(r.altItems[100]).toBe("exact");
    });

    it("grades the slot done once the item is at the target", () => {
        expect(calcPriority(BIS[0], sr, HERO_PLAN, stats, PROT_PALADIN).tier).toBe(4);
    });

    it("asks for an upgrade, not a re-farm, when it is below the target", () => {
        // Hero grade at 311 against a Hero target: green, upgrade in place.
        const below = { head: { id: 200, ilvl: 311, bonus: "12843" } };
        const r = matchBiS(BIS, below, [], stats, new Set(), PROT_PALADIN);
        const p = calcPriority(BIS[0], { gear: below, ...r }, HERO_PLAN, stats, PROT_PALADIN);
        expect(p.tier).toBe(3);
        expect(p.upgradeStatus).toBe("enhance");
    });

    it("still calls a genuine stat mismatch wrong", () => {
        // crit+vers against haste+mastery: groups 1,2 against 0,1. No fit.
        // (Below the target ilvl, because an item already at the target reads
        // as done whatever its stats — that is calcPriority's own rule and
        // this change does not touch it.)
        const wrong = { head: { id: 300, ilvl: 311, bonus: "12843" } };
        const s2 = { ...stats, 300: ["crit", "vers"] };
        const r = matchBiS(BIS, wrong, [], s2, new Set(), PROT_PALADIN);
        expect(r.altItems[100]).toBeUndefined();
        expect(calcPriority(BIS[0], { gear: wrong, ...r }, HERO_PLAN, s2, PROT_PALADIN).tier).toBe(1);
    });

    it("keeps a strict order strict for a spec with no equivalence", () => {
        // Deliberately narrower than the old matcher, which had a second
        // clause accepting any item carrying exactly the spec's two best
        // stats. That heuristic was guessing at equivalence without a number
        // behind it, and it guessed wrong: on Blood Death Knight the top two
        // sit at 0.88, far outside the 0.95 that makes a re-farm pointless.
        // Where two stats really are close the groups now say so, and where
        // they are not the tracker no longer pretends otherwise.
        const r = matchBiS(BIS, gear, [], stats, new Set(), FLAT);
        expect(r.altItems[100]).toBeUndefined();
    });
});

describe("calcPriority reads the content, not a chosen grade", () => {
    const KEYS = { mplus: "keys6", raid: null };
    const RAID = { mplus: null, raid: "mythic" };
    // A helm out of a dungeon, and the same slot's helm out of the raid.
    const DUNGEON_BIS = { slot: "head", id: 100, source: "Kings' Rest", stats: ["haste", "mastery"] };
    const RAID_BIS = { slot: "head", id: 100, source: "The Venomous Abyss", stats: ["haste", "mastery"] };
    const stats = { 100: ["haste", "mastery"] };

    function srFor(bis, gear) {
        const r = matchBiS([bis], gear, [], stats, new Set(), PROT_PALADIN);
        return { gear, ...r };
    }

    // Hero 6/6 is the top of what a key can hand over, so the slot is done for
    // a player pushing keys. Against a Mythic raid it is a re-farm.
    it("finishes a Hero 6/6 dungeon slot and keeps chasing the raid one", () => {
        const gear = { head: { id: 100, ilvl: 321, bonus: "12846" } };
        expect(calcPriority(DUNGEON_BIS, srFor(DUNGEON_BIS, gear), KEYS, stats, PROT_PALADIN).tier).toBe(4);
        const raid = calcPriority(RAID_BIS, srFor(RAID_BIS, gear), RAID, stats, PROT_PALADIN);
        expect(raid.tier).toBe(1);
        expect(raid.upgradeStatus).toBe("tierUp");
    });

    // The lower key band drops Champion, so a Champion 6/6 is finished there
    // and short a grade once the player moves up.
    it("moves the line when the player moves up a key band", () => {
        const gear = { head: { id: 100, ilvl: 308, bonus: "12838" } };
        const sr = srFor(DUNGEON_BIS, gear);
        expect(calcPriority(DUNGEON_BIS, sr, { mplus: "keys2", raid: null }, stats, PROT_PALADIN).tier).toBe(4);
        expect(calcPriority(DUNGEON_BIS, sr, KEYS, stats, PROT_PALADIN).upgradeStatus).toBe("tierUp");
    });

    it("refuses to grade a slot whose axis the player has not set", () => {
        const gear = { head: { id: 100, ilvl: 321, bonus: "12846" } };
        const p = calcPriority(DUNGEON_BIS, srFor(DUNGEON_BIS, gear), { mplus: null, raid: null }, stats, PROT_PALADIN);
        expect(p.tier).toBe(0);
        expect(p.upgradeStatus).toBeUndefined();
    });
});

describe("planProgress", () => {
    const PLAN = { mplus: "keys6", raid: null };
    const BIS_LIST = [
        { slot: "head", id: 100, source: "Kings' Rest", stats: ["haste", "mastery"] },
        { slot: "hands", id: 101, source: "Kings' Rest", stats: ["haste", "mastery"] },
        { slot: "feet", id: 102, source: "Kings' Rest", stats: ["haste", "mastery"] },
    ];
    const stats = { 100: ["haste", "mastery"], 101: ["haste", "mastery"], 102: ["haste", "mastery"] };

    function srFor(gear) {
        const r = matchBiS(BIS_LIST, gear, [], stats, new Set(), PROT_PALADIN);
        return { gear, ...r };
    }

    // Done, upgrade-with-crests, re-farm. Only the first stands at the drop
    // grade; the first two both read green, and only the third is a run.
    it("separates standing at the drop grade from reading green", () => {
        const gear = {
            head: { id: 100, ilvl: 321, bonus: "12846" },
            hands: { id: 101, ilvl: 311, bonus: "12843" },
            feet: { id: 102, ilvl: 308, bonus: "12838" },
        };
        expect(planProgress(BIS_LIST, srFor(gear), PLAN, stats, PROT_PALADIN, {}))
            .toEqual({ done: 1, green: 2, total: 3 });
    });

    it("counts a slot the player ticked off by hand under both", () => {
        expect(planProgress(BIS_LIST, srFor({}), PLAN, stats, PROT_PALADIN, { 102: true }))
            .toEqual({ done: 1, green: 1, total: 3 });
    });

    it("counts nothing before the player has said what they run", () => {
        const gear = { head: { id: 100, ilvl: 321, bonus: "12846" } };
        expect(planProgress(BIS_LIST, srFor(gear), { mplus: null, raid: null }, stats, PROT_PALADIN, {}))
            .toEqual({ done: 0, green: 0, total: 3 });
    });
});
