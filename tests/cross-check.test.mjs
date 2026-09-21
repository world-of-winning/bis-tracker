import { describe, expect, it } from "vitest";
import {
    crossCheck,
    rowFaults,
    sourceNamesTheDrop,
} from "../scripts/cross-check.mjs";

const HELM = { invSlot: "Head", drop: { instance: "Ula'tek", encounter: "Vashnik the Malignant" } };
const NECK = { invSlot: "Neck", drop: { instance: "Ula'tek", encounter: "Ula'tek" } };

describe("sourceNamesTheDrop", () => {
    it("accepts a source naming the dungeon", () => {
        expect(sourceNamesTheDrop("Ula'tek", HELM.drop)).toBe(true);
    });

    it("accepts a source naming the boss instead", () => {
        expect(sourceNamesTheDrop("Vashnik the Malignant", HELM.drop)).toBe(true);
    });

    it("accepts either half of a two-place source", () => {
        expect(sourceNamesTheDrop("Murder Row & Ula'tek", HELM.drop)).toBe(true);
    });

    it("rejects a source naming somewhere the item does not drop", () => {
        expect(sourceNamesTheDrop("Murder Row", HELM.drop)).toBe(false);
    });

    it("asks nothing of a source that names no place", () => {
        // A catalysed or crafted item has no drop to disagree with.
        expect(sourceNamesTheDrop("Tier", HELM.drop)).toBe(true);
        expect(sourceNamesTheDrop("Crafted", HELM.drop)).toBe(true);
    });

    it("asks nothing about an item outside the season pool", () => {
        expect(sourceNamesTheDrop("Somewhere Retired", null)).toBe(true);
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
                drop: NECK.drop,
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
        expect(reports[0]).toMatchObject({ slot: "neck", rejected: 271537, took: "maxroll" });
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
        expect(reports[0].took).toBe("maxroll");
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
