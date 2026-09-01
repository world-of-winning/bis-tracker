import { describe, expect, it } from "vitest";
import { acquisitionPath, defaultPlan, dropIlvl } from "../src/logic/priority.js";
import { CRAFTED_ILVL } from "../src/data/shared.js";

// A drop grade is stated as the top of the track the content hands over,
// because everything below it is reachable with crests and everything above it
// needs the item farmed again. Spelled out here rather than read off TIERS: a
// test that recomputes its own expectation checks nothing.
const CHAMPION = 308, HERO = 321, MYTH = 334;

const KEYS_LOW = { mplus: "keys2", raid: null };
const KEYS_HIGH = { mplus: "keys6", raid: null };
const HEROIC = { mplus: null, raid: "heroic" };
const MYTHIC = { mplus: null, raid: "mythic" };
const BOTH = { mplus: "keys6", raid: "mythic" };

function item(source) { return { id: 1, source: source }; }

describe("acquisitionPath", () => {
    it("reads a season dungeon off the DUNGEONS list", () => {
        expect(acquisitionPath("Kings' Rest")).toBe("dungeon");
        expect(acquisitionPath("The Blinding Vale")).toBe("dungeon");
    });

    it("reads the season's raid by name", () => {
        expect(acquisitionPath("The Venomous Abyss")).toBe("raid");
    });

    it("names crafting and the catalyst as their own paths", () => {
        expect(acquisitionPath("Crafted")).toBe("crafted");
        expect(acquisitionPath("Catalyst")).toBe("catalyst");
    });

    // Raid drops are filed under the boss that drops them, and a tier piece
    // under the set it belongs to. Both come out of the raid.
    it("sends a raid boss and a tier token down the raid path", () => {
        expect(acquisitionPath("Ula'tek")).toBe("raid");
        expect(acquisitionPath("Tier")).toBe("raid");
    });

    // Last season's residue, until find-alts.mjs rebuilds the pool. Guessing
    // dungeon would hand the item a lower ceiling and call a slot finished;
    // guessing raid only withholds that, which is the cheaper error.
    it("sends a source it does not recognise down the raid path", () => {
        expect(acquisitionPath("Algeth'ar Academy")).toBe("raid");
    });
});

describe("dropIlvl", () => {
    it("gives a dungeon item the ceiling of the track its key band drops", () => {
        expect(dropIlvl(item("Kings' Rest"), KEYS_LOW)).toBe(CHAMPION);
        expect(dropIlvl(item("Kings' Rest"), KEYS_HIGH)).toBe(HERO);
    });

    it("gives a raid item the ceiling of its difficulty's track", () => {
        expect(dropIlvl(item("The Venomous Abyss"), HEROIC)).toBe(HERO);
        expect(dropIlvl(item("The Venomous Abyss"), MYTHIC)).toBe(MYTH);
        expect(dropIlvl(item("Ula'tek"), MYTHIC)).toBe(MYTH);
    });

    it("reads each axis only for the items that come from it", () => {
        // Pushing keys says nothing about what the raid drops, and vice versa.
        expect(dropIlvl(item("Kings' Rest"), MYTHIC)).toBe(null);
        expect(dropIlvl(item("The Venomous Abyss"), KEYS_HIGH)).toBe(null);
    });

    it("caps a crafted item where crafting caps, whatever the player runs", () => {
        expect(dropIlvl(item("Crafted"), KEYS_LOW)).toBe(CRAFTED_ILVL);
        expect(dropIlvl(item("Crafted"), BOTH)).toBe(CRAFTED_ILVL);
        expect(CRAFTED_ILVL).toBe(331);
    });

    // The catalyst converts an item the player already has, so it is worth
    // whatever the best thing they can farm is worth.
    it("gives a catalyst item the better of the two axes", () => {
        expect(dropIlvl(item("Catalyst"), BOTH)).toBe(MYTH);
        expect(dropIlvl(item("Catalyst"), KEYS_HIGH)).toBe(HERO);
        expect(dropIlvl(item("Catalyst"), { mplus: null, raid: null })).toBe(null);
    });

    it("takes the best part of a source that names more than one", () => {
        expect(dropIlvl(item("The Coiled Altar & Crafted"), MYTHIC)).toBe(MYTH);
        expect(dropIlvl(item("The Blinding Vale & Voidscar Arena"), KEYS_HIGH)).toBe(HERO);
        // One part unreachable, the other not: the reachable one answers.
        expect(dropIlvl(item("The Coiled Altar & Crafted"), KEYS_HIGH)).toBe(CRAFTED_ILVL);
    });

    it("says nothing at all until the axis it needs is set", () => {
        expect(dropIlvl(item("Kings' Rest"), { mplus: null, raid: null })).toBe(null);
        expect(dropIlvl(item("Kings' Rest"), null)).toBe(null);
    });
});

describe("itemTierIdx above the top of every track", () => {
    it("grades an item level above Myth as Myth", async () => {
        const { itemTierIdx } = await import("../src/logic/priority.js");
        const { TIERS } = await import("../src/data/shared.js");
        // The last two Mythic bosses of The Venomous Abyss drop at 344, above
        // the 334 the Myth track ends at. Nobody has looted one, so there is
        // no bonus id to match on yet.
        expect(itemTierIdx(null, 344)).toBe(TIERS.length - 1);
    });
});

describe("defaultPlan", () => {
    const MYTH = "12849", HERO = "12841", CHAMPION = "12833", VETERAN = "12825";

    it("opens on the Hero band when anything equipped is Hero", () => {
        const gear = { head: { id: 1, ilvl: 305, bonus: HERO }, hands: { id: 2, ilvl: 295, bonus: VETERAN } };
        expect(defaultPlan(gear)).toEqual({ mplus: "keys6", raid: "heroic" });
    });

    it("opens on Champion when nothing has reached Hero", () => {
        const gear = { head: { id: 1, ilvl: 300, bonus: CHAMPION } };
        expect(defaultPlan(gear)).toEqual({ mplus: "keys2", raid: "normal" });
    });

    // Neither axis offers a Veteran notch, so gear below Champion opens on the
    // lowest one there is rather than on nothing.
    it("opens on Champion for gear below every notch", () => {
        expect(defaultPlan({ head: { id: 1, ilvl: 290, bonus: VETERAN } }))
            .toEqual({ mplus: "keys2", raid: "normal" });
    });

    // The key band tops out at Hero, so Myth gear says nothing new about keys —
    // but it does say the player has been in a Mythic raid.
    it("reads Myth gear as a Mythic raider still on the Hero key band", () => {
        expect(defaultPlan({ head: { id: 1, ilvl: 330, bonus: MYTH } }))
            .toEqual({ mplus: "keys6", raid: "mythic" });
    });

    it("opens on Champion when there is no gear to read", () => {
        expect(defaultPlan({})).toEqual({ mplus: "keys2", raid: "normal" });
        expect(defaultPlan(null)).toEqual({ mplus: "keys2", raid: "normal" });
    });
});
