import { describe, expect, it } from "vitest";
import {
    crossCheck,
    formatReport,
    outOfSeason,
    rowFaults,
    sourceNamesTheDrop,
} from "../scripts/cross-check.mjs";

// Both current-season raid drops: `inSeason` is what the caller marks against
// DUNGEONS and CURRENT_RAIDS, and without it a row reads as retired.
const HELM = {
    invSlot: "Head",
    drops: [{ instance: "Ula'tek", encounter: "Vashnik the Malignant", inSeason: true }],
};
const NECK = {
    invSlot: "Neck",
    drops: [{ instance: "Ula'tek", encounter: "Ula'tek", inSeason: true }],
};

describe("sourceNamesTheDrop", () => {
    it("accepts a source naming the dungeon", () => {
        expect(sourceNamesTheDrop("Ula'tek", HELM.drops)).toBe(true);
    });

    it("accepts a source naming the boss instead", () => {
        expect(sourceNamesTheDrop("Vashnik the Malignant", HELM.drops)).toBe(true);
    });

    it("accepts either half of a two-place source", () => {
        expect(sourceNamesTheDrop("Murder Row & Ula'tek", HELM.drops)).toBe(true);
    });

    it("rejects a source naming somewhere the item does not drop", () => {
        expect(sourceNamesTheDrop("Murder Row", HELM.drops)).toBe(false);
    });

    it("asks nothing of a source that names no place", () => {
        // A catalysed or crafted item has no drop to disagree with.
        expect(sourceNamesTheDrop("Tier", HELM.drops)).toBe(true);
        expect(sourceNamesTheDrop("Crafted", HELM.drops)).toBe(true);
    });

    it("accepts a source naming either of two places an item drops", () => {
        // Some trinkets drop from two bosses, and a guide names one of them.
        const drops = [
            { instance: "Kings' Rest", encounter: "The Golden Serpent", inSeason: true },
            { instance: "Murder Row", encounter: "Zaen Bladesorrow", inSeason: true },
        ];
        expect(sourceNamesTheDrop("Murder Row", drops)).toBe(true);
        expect(sourceNamesTheDrop("The Golden Serpent", drops)).toBe(true);
        expect(sourceNamesTheDrop("Pit of Saron", drops)).toBe(false);
    });

    it("treats a row that names nowhere as one to fill in", () => {
        // What a stripped [npc=259446] leaves behind. The loot table knows the
        // answer, so silence here is a gap rather than an exemption.
        expect(sourceNamesTheDrop("", HELM.drops)).toBe(false);
    });

    it("asks nothing about an item outside the season pool", () => {
        expect(sourceNamesTheDrop("Somewhere Retired", [])).toBe(true);
    });
});

describe("rowFaults", () => {
    it("reports a helm filed under the neck slot", () => {
        // The row that motivated all of this: Maxroll's Vengeance page put the
        // tier helm in the Neck row and the tracker carried it for a season.
        const faults = rowFaults(
            { slot: "neck", itemId: 271537, source: "Ula'tek" },
            HELM,
        );
        expect(faults).toHaveLength(1);
        expect(faults[0].kind).toBe("slot");
        expect(faults[0].says).toMatch(/Head item/);
    });

    it("says nothing about a row the game agrees with", () => {
        expect(rowFaults({ slot: "neck", itemId: 268265, source: "Ula'tek" }, NECK)).toEqual([]);
    });

    it("says nothing about an item it knows nothing about", () => {
        // Silence is the absence of a demonstrable contradiction, not a
        // guarantee the row is right.
        expect(rowFaults({ slot: "neck", itemId: 1, source: "Anywhere" }, null)).toEqual([]);
    });

    it("leaves weapons alone, whose tooltips name a type rather than a slot", () => {
        expect(
            rowFaults({ slot: "main_hand", itemId: 2, source: "Ula'tek" }, {
                invSlot: "Two-Hand",
                drops: NECK.drops,
            }),
        ).toEqual([]);
    });
});

describe("crossCheck", () => {
    const facts = new Map([
        [271537, HELM],
        [268265, NECK],
    ]);
    const faultsOf = (row) => rowFaults(row, facts.get(row.itemId) ?? null);

    it("takes the primary row wherever it stands up", () => {
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([268265]);
        expect(reports).toEqual([]);
    });

    it("says nothing when the two sources merely disagree", () => {
        // Two authors picking different items for one slot is judgement, and
        // the two lists do not even answer the same question.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 999, source: "Murder Row" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([268265]);
        expect(reports).toEqual([]);
    });

    it("hands a contradicted slot to the other publisher", () => {
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([268265]);
        expect(reports[0]).toMatchObject({ slot: "neck", rejected: 271537, took: "witness" });
    });

    it("keeps the data file's row when both publishers are contradicted", () => {
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 271537, source: "Murder Row" }],
            existing: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([268265]);
        expect(reports[0]).toMatchObject({ took: "file", itemId: 268265 });
    });

    it("corrects a row that only mislabels where its item drops", () => {
        // Maxroll sources a Voidscar Arena axe to Den of Nalorakk. The item is
        // right; the badge and the dungeon filter would be wrong.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 268265, source: "Murder Row" }],
            faultsOf,
            correctionOf: () => "Ula'tek",
        });
        expect(rows[0].source).toBe("Ula'tek");
        expect(rows[0].itemId).toBe(268265);
        expect(reports[0]).toMatchObject({ took: "correction", source: "Ula'tek" });
    });

    it("replaces rather than corrects when the item itself is wrong", () => {
        // A slot fault means the row names the wrong item, and no relabelling
        // fixes that — a corrected source on a helm in the neck row would be a
        // tidier way of being wrong.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            faultsOf,
            correctionOf: () => "Ula'tek",
        });
        expect(rows[0].itemId).toBe(268265);
        expect(reports[0].took).toBe("witness");
    });

    it("keeps a contradicted row with nowhere to fall back to, and reports it", () => {
        // A spec with fifteen slots is worse than a spec with a bad one, and
        // the report is what gets a human to look.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([271537]);
        expect(reports[0]).toMatchObject({ took: null, rejected: 271537 });
    });

    it("fills a slot the primary list never names", () => {
        // Wowhead's Beast Mastery page lists no helm. Nothing contradicts a
        // row that is not there, so the gap has to be looked for.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            secondary: [
                { slot: "neck", itemId: 268265, source: "Ula'tek" },
                { slot: "head", itemId: 271537, source: "Ula'tek" },
            ],
            faultsOf,
        });
        expect(rows.map((r) => r.slot)).toEqual(["neck", "head"]);
        expect(reports[0]).toMatchObject({ slot: "head", took: "witness", rejected: null });
        expect(reports[0].faults[0].kind).toBe("gap");
    });

    it("falls back to the data file for a slot neither publisher names", () => {
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 268265, source: "Ula'tek" }],
            existing: [
                { slot: "neck", itemId: 268265, source: "Ula'tek" },
                { slot: "head", itemId: 271537, source: "Ula'tek" },
            ],
            faultsOf,
        });
        expect(rows.map((r) => r.slot)).toEqual(["neck", "head"]);
        expect(reports[0]).toMatchObject({ slot: "head", took: "file" });
    });

    it("does not fill a gap with a row the game contradicts", () => {
        // A helm offered for the neck slot is not a neck.
        const { rows, reports } = crossCheck({
            primary: [{ slot: "head", itemId: 271537, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.slot)).toEqual(["head"]);
        expect(reports).toEqual([]);
    });

    it("does not offer a slot the same contradicted item back as its own fallback", () => {
        const { rows, reports } = crossCheck({
            primary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            secondary: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            existing: [{ slot: "neck", itemId: 271537, source: "Ula'tek" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([271537]);
        expect(reports[0].took).toBe(null);
    });
});

describe("formatReport", () => {
    it("names the list the second opinion came from", () => {
        // BIS is read against Maxroll; MYTHIC, itself Maxroll's, is read
        // against Wowhead. A fixed label credited Maxroll for both.
        const report = {
            slot: "neck",
            rejected: 271537,
            itemId: 268265,
            took: "witness",
            faults: [{ kind: "slot", says: "the item is a Head item" }],
        };
        expect(formatReport("veng-dh", report, "Maxroll")).toContain("took Maxroll's 268265");
        expect(formatReport("veng-dh MYTHIC", report, "Wowhead")).toContain(
            "took Wowhead's 268265",
        );
    });
});

describe("out of season", () => {
    const RETIRED = {
        invSlot: "Waist",
        drops: [{ instance: "Maisara Caverns", encounter: "Muro'jin and Nekraxx", inSeason: false }],
    };
    const CURRENT = {
        invSlot: "Waist",
        drops: [{ instance: "Murder Row", encounter: "Zaen Bladesorrow", inSeason: true }],
    };
    const facts = new Map([
        [251166, RETIRED],
        [251131, CURRENT],
    ]);
    const faultsOf = (row) => rowFaults(row, facts.get(row.itemId) ?? null);
    const stale = { slot: "waist", itemId: 251166, source: "Maisara Caverns" };

    it("reads an item that drops only outside the season as a fault", () => {
        expect(outOfSeason(RETIRED.drops)).toBe(true);
        expect(outOfSeason(CURRENT.drops)).toBe(false);
        // A crafted or catalysed item drops nowhere and says nothing either way.
        expect(outOfSeason([])).toBe(false);
    });

    it("does not fault a row whose item also drops in season", () => {
        expect(outOfSeason([...RETIRED.drops, ...CURRENT.drops])).toBe(false);
    });

    it("takes the sound row where one publisher is a season behind", () => {
        const { rows } = crossCheck({
            primary: [stale],
            secondary: [{ slot: "waist", itemId: 251131, source: "Murder Row" }],
            faultsOf,
        });
        expect(rows.map((r) => r.itemId)).toEqual([251131]);
    });

    it("drops a retired row rather than keeping it, when nothing sound replaces it", () => {
        // Every other contradiction is kept, because a spec short a slot reads
        // as finished. This one is not: keeping it sends a player to a dungeon
        // the season does not run.
        const { rows, reports } = crossCheck({ primary: [stale], faultsOf });
        expect(rows).toEqual([]);
        expect(reports[0]).toMatchObject({ took: "dropped", rejected: 251166 });
        expect(formatReport("resto-druid MYTHIC", reports[0])).toContain("dropped the row");
    });

    it("refuses the data file's row as a fallback when it is retired too", () => {
        // Otherwise the run writes it back and the next run offers it again,
        // and the bad row outlives every source of it.
        const { rows } = crossCheck({
            primary: [stale],
            existing: [{ slot: "waist", itemId: 251166, source: "Maisara Caverns" }],
            faultsOf,
        });
        expect(rows).toEqual([]);
    });
});
