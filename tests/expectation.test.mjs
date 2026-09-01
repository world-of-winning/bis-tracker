import { describe, expect, it } from "vitest";
import { assessGain, dungeonExpectation, gainContext, replacedItem, settledIds, slotGain } from "../src/logic/expectation.js";

// Protection Paladin's groups: haste alone, then mastery and crit together.
const PRIORITY = [["haste"], ["mastery", "crit"], ["vers"]];

// Grades below Hero, by bonus id:
const CHAMPION = "12833";  // ilvl 292–308
const HERO = "12841";      // ilvl 305–321
// Both axes on Hero, so every candidate here has the same ceiling whichever
// path its source takes, and these cases test gain rather than the baseline.
const PLAN = { mplus: "keys6", raid: "heroic" };
const T = 321;

function ctxFor(gear, extra) {
    return gainContext(Object.assign({
        sr: { gear: gear, altItems: {}, eqSlot: {} },
        plan: PLAN,
        stats: {},
        priorityStats: PRIORITY,
        knownBisIds: new Set(),
    }, extra));
}

describe("slotGain", () => {
    it("counts a whole target's worth for an empty slot", () => {
        const ctx = ctxFor({});
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx)).toBe(T);
    });

    it("counts nothing for a slot already at target", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 321, bonus: HERO } });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx)).toBe(0);
    });

    it("counts nothing for a slot that needs only an upgrade", () => {
        // Hero grade at 311: upgrade currency reaches 321. A dungeon run does
        // not, so the dungeon must not be credited for it.
        const ctx = ctxFor({ head: { id: 9, ilvl: 311, bonus: HERO } });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx)).toBe(0);
    });

    it("counts a slot that needs re-acquiring in full", () => {
        // Champion maxed at 308 cannot be upgraded across the grade boundary.
        // Only a drop fixes it, and 308 beats Hero's floor of 305 — this is the
        // case that reads backwards if grade is ignored.
        const ctx = ctxFor({ head: { id: 9, ilvl: 308, bonus: CHAMPION } });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx)).toBe(13);
    });

    it("treats a wrong-armour slot as empty however high its item level", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 321, bonus: HERO } }, {
            armorTypes: { 9: "Cloth" },
            expectedArmor: "Plate",
        });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx)).toBe(T);
    });

    it("treats a wrong-primary slot as empty", () => {
        const ctx = ctxFor({ neck: { id: 9, ilvl: 321, bonus: HERO } }, {
            primaryStats: { 9: ["int"] },
            expectedPrimary: "str",
        });
        expect(slotGain({ forSlot: "neck", id: 1, stats: ["haste"] }, ctx)).toBe(T);
    });

    it("counts nothing for a candidate whose secondaries are a step back", () => {
        // Equipped haste+mastery scores 3+2; the candidate's mastery+vers scores
        // 2+1. Trading down is not worth a run.
        const ctx = ctxFor({ head: { id: 9, ilvl: 308, bonus: CHAMPION } }, {
            stats: { 9: ["haste", "mastery"] },
        });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["mastery", "vers"] }, ctx)).toBe(0);
    });

    it("counts a sideways move within an equivalence group", () => {
        // crit for mastery, same group. Not a step back, so the item level
        // stands.
        const ctx = ctxFor({ head: { id: 9, ilvl: 308, bonus: CHAMPION } }, {
            stats: { 9: ["haste", "mastery"] },
        });
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste", "crit"] }, ctx)).toBe(13);
    });

    it("never disqualifies a weapon on its secondaries", () => {
        // A weapon's value is the weapon damage its item level sets.
        const ctx = ctxFor({ main_hand: { id: 9, ilvl: 308, bonus: CHAMPION } }, {
            stats: { 9: ["haste", "mastery"] },
        });
        expect(slotGain({ forSlot: "weapon", id: 1, stats: ["vers"] }, ctx)).toBe(13);
    });

    it("scores a trinket only when a guide picked it", () => {
        const gear = { trinket1: { id: 9, ilvl: 308, bonus: CHAMPION }, trinket2: { id: 8, ilvl: 308, bonus: CHAMPION } };
        const anonymous = ctxFor(gear);
        expect(slotGain({ forSlot: "trinket", id: 1, stats: ["crit"] }, anonymous)).toBe(0);

        const known = ctxFor(gear, { knownBisIds: new Set([1]) });
        expect(slotGain({ forSlot: "trinket", id: 1, stats: ["crit"] }, known)).toBe(13);
    });
});

describe("assessGain reasons", () => {
    // A row worth nothing has to say which nothing it is. Three of these end at
    // the bottom of the same alt list, and a player can act on only one of them.
    it("names a slot already at target", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 321, bonus: HERO } });
        expect(assessGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx).reason).toBe("atTarget");
    });

    it("names a slot that upgrade currency fixes", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 311, bonus: HERO } });
        expect(assessGain({ forSlot: "head", id: 1, stats: ["haste"] }, ctx).reason).toBe("enhance");
    });

    it("names a trinket no guide picked", () => {
        const ctx = ctxFor({ trinket1: { id: 9, ilvl: 308, bonus: CHAMPION }, trinket2: { id: 8, ilvl: 308, bonus: CHAMPION } });
        expect(assessGain({ forSlot: "trinket", id: 1, stats: ["crit"] }, ctx).reason).toBe("trinketUnrated");
    });

    it("names a step back in secondaries", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 308, bonus: CHAMPION } }, { stats: { 9: ["haste", "mastery"] } });
        const a = assessGain({ forSlot: "head", id: 1, stats: ["mastery", "vers"] }, ctx);
        expect(a.reason).toBe("statsDown");
        expect(a.statsRegress).toBe(true);
    });

    it("gives a scoring row no reason at all", () => {
        const ctx = ctxFor({ head: { id: 9, ilvl: 308, bonus: CHAMPION } }, { stats: { 9: ["haste", "mastery"] } });
        expect(assessGain({ forSlot: "head", id: 1, stats: ["haste", "crit"] }, ctx).reason).toBeNull();
    });

    it("reports a weapon's step back while still scoring it", () => {
        // The honest half of "a weapon is worth its item level": the drop is an
        // upgrade and its secondaries are worse, and the card says both.
        const ctx = ctxFor({ main_hand: { id: 9, ilvl: 308, bonus: CHAMPION } }, { stats: { 9: ["haste", "mastery"] } });
        const a = assessGain({ forSlot: "weapon", id: 1, stats: ["vers"] }, ctx);
        expect(a.gain).toBe(13);
        expect(a.reason).toBeNull();
        expect(a.statsRegress).toBe(true);
    });

    it("claims no regression when the slot is empty", () => {
        // Nothing to be worse than.
        expect(assessGain({ forSlot: "head", id: 1, stats: ["vers"] }, ctxFor({})).statsRegress).toBe(false);
    });
});

describe("replacedItem", () => {
    it("displaces the unsettled half of a ring pair, not the higher one", () => {
        // BiS ring at 321 beside a leftover at 295. Picking the higher would
        // report the slot as finished and hide a 26-level hole.
        const sr = {
            gear: { finger1: { id: 100, ilvl: 321, bonus: HERO }, finger2: { id: 200, ilvl: 295, bonus: CHAMPION } },
            altItems: {}, eqSlot: {},
        };
        const settled = settledIds(sr, new Set([100]));
        expect(replacedItem({ forSlot: "ring", id: 300 }, sr, settled).id).toBe(200);
    });

    it("counts an equivalent fit as settled", () => {
        // The equipped ring is not the BiS item but fitKind accepted it, so it
        // is not what a new drop displaces.
        const sr = {
            gear: { finger1: { id: 100, ilvl: 321, bonus: HERO }, finger2: { id: 200, ilvl: 295, bonus: CHAMPION } },
            altItems: { 55: "equivalent" },
            eqSlot: { 55: { id: 100, ilvl: 321, bonus: HERO } },
        };
        expect(replacedItem({ forSlot: "ring", id: 300 }, sr, settledIds(sr, new Set())).id).toBe(200);
    });

    it("falls back to the pair when both halves are settled", () => {
        const sr = {
            gear: { finger1: { id: 100, ilvl: 321, bonus: HERO }, finger2: { id: 200, ilvl: 305, bonus: HERO } },
            altItems: {}, eqSlot: {},
        };
        const settled = settledIds(sr, new Set([100, 200]));
        expect(replacedItem({ forSlot: "ring", id: 300 }, sr, settled).id).toBe(200);
    });

    it("answers with the player's own copy when they already wear the item", () => {
        const sr = { gear: { head: { id: 300, ilvl: 305, bonus: HERO } }, altItems: {}, eqSlot: {} };
        expect(replacedItem({ forSlot: "head", id: 300 }, sr, new Set()).id).toBe(300);
    });
});

describe("dungeonExpectation", () => {
    const GEAR = {
        head: { id: 9, ilvl: 308, bonus: CHAMPION },   // 13 to gain
        chest: { id: 8, ilvl: 321, bonus: HERO },      // nothing to gain
    };

    it("averages over the pool rather than summing it", () => {
        const ctx = ctxFor(GEAR);
        const items = [
            { forSlot: "head", id: 1, source: "A", stats: ["haste"] },
            { forSlot: "chest", id: 2, source: "A", stats: ["haste"] },
        ];
        expect(dungeonExpectation("A", items, ctx)).toBe(6.5);
    });

    it("ranks a lean table above a diluted one holding the same prize", () => {
        // Both dungeons drop the one helm worth 13. The second buries it under
        // trinkets no guide picked — chests that will not be the helm.
        const ctx = ctxFor(GEAR);
        const lean = [{ forSlot: "head", id: 1, source: "A", stats: ["haste"] }];
        const diluted = lean.concat([2, 3, 4, 5].map((id) => ({ forSlot: "trinket", id: id, source: "A", stats: ["crit"] })));
        expect(dungeonExpectation("A", lean, ctx)).toBeGreaterThan(dungeonExpectation("A", diluted, ctx));
    });

    it("drops an acquired item from both halves of the mean", () => {
        const ctx = ctxFor(GEAR, { acq: { 2: true } });
        const items = [
            { forSlot: "head", id: 1, source: "A", stats: ["haste"] },
            { forSlot: "chest", id: 2, source: "A", stats: ["haste"] },
        ];
        // Without the acquired chest piece the helm is the whole table.
        expect(dungeonExpectation("A", items, ctx)).toBe(13);
    });

    it("counts an item once when it sits in two lists", () => {
        const ctx = ctxFor(GEAR);
        const items = [
            { slot: "head", id: 1, source: "A", stats: ["haste"] },
            { forSlot: "head", id: 1, source: "A", stats: ["haste"] },
        ];
        expect(dungeonExpectation("A", items, ctx)).toBe(13);
    });

    it("ignores items from other sources", () => {
        const ctx = ctxFor(GEAR);
        const items = [
            { forSlot: "head", id: 1, source: "A", stats: ["haste"] },
            { forSlot: "head", id: 2, source: "B", stats: ["haste"] },
        ];
        expect(dungeonExpectation("B", items, ctx)).toBe(13);
    });

    it("is zero with no imported gear", () => {
        const ctx = gainContext({ sr: null, targetIlvl: T, priorityStats: PRIORITY });
        expect(dungeonExpectation("A", [{ forSlot: "head", id: 1, source: "A", stats: ["haste"] }], ctx)).toBe(0);
    });
});

describe("a baseline per candidate", () => {
    // The whole point of ADR 0005: one screen, two kinds of content, and a
    // dungeon drop is not measured against what a Mythic raid hands over.
    const SPLIT = { mplus: "keys6", raid: "mythic" };   // Hero 321 / Myth 334

    function splitCtx(gear) {
        return gainContext({
            sr: { gear: gear, altItems: {}, eqSlot: {} },
            plan: SPLIT,
            stats: {},
            priorityStats: PRIORITY,
            knownBisIds: new Set(),
        });
    }

    it("measures a dungeon candidate and a raid candidate against their own content", () => {
        const ctx = splitCtx({});
        const dungeon = { forSlot: "head", id: 1, stats: ["haste"], source: "Kings' Rest" };
        const raid = { forSlot: "head", id: 2, stats: ["haste"], source: "The Venomous Abyss" };
        expect(slotGain(dungeon, ctx)).toBe(321);
        expect(slotGain(raid, ctx)).toBe(334);
    });

    it("calls a slot finished for the dungeon that the raid can still improve", () => {
        // Hero 6/6. Nothing a key can do for it; a Mythic raid boss can.
        const gear = { head: { id: 9, ilvl: 321, bonus: HERO } };
        const ctx = splitCtx(gear);
        expect(slotGain({ forSlot: "head", id: 1, stats: ["haste"], source: "Kings' Rest" }, ctx)).toBe(0);
        expect(slotGain({ forSlot: "head", id: 2, stats: ["haste"], source: "The Venomous Abyss" }, ctx)).toBe(13);
    });

    it("reports nothing at all until the player has said what they run", () => {
        const ctx = gainContext({
            sr: { gear: {}, altItems: {}, eqSlot: {} },
            plan: { mplus: null, raid: null },
            stats: {},
            priorityStats: PRIORITY,
            knownBisIds: new Set(),
        });
        const r = assessGain({ forSlot: "head", id: 1, stats: ["haste"], source: "Kings' Rest" }, ctx);
        expect(r.gain).toBe(0);
        expect(r.reason).toBe("noPlan");
    });
});
