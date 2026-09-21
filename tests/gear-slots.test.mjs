import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
    assignSlots,
    detectWeaponType,
    resetSlotCounters,
    resolveSlot,
} from "../scripts/gear-slots.mjs";
import {
    bisItemsBlock,
    guideMarkup,
    parseGearRows,
    pickGearTab,
} from "../scripts/wowhead-guide.mjs";
import { GEAR_TABS } from "../scripts/wowhead-gear-tabs.mjs";

const FIXTURES = resolve(dirname(fileURLToPath(import.meta.url)), "fixtures");

function guideRows(key) {
    const html = readFileSync(resolve(FIXTURES, `wowhead-${key}.html`), "utf8");
    const tab = pickGearTab(bisItemsBlock(guideMarkup(html)), GEAR_TABS[key]);
    return parseGearRows(tab.body);
}

const row = (slotName, itemId = 1) => ({ slotName, itemId });

describe("resolveSlot", () => {
    it("reads Wowhead's plural armour labels as the same slots as Maxroll's singular ones", () => {
        // The two publishers disagree about this one word, and an unresolved
        // slot is dropped outright — the spec would come out with no shoulder.
        resetSlotCounters();
        expect(resolveSlot("Shoulders", "2h")).toBe("shoulder");
        expect(resolveSlot("Shoulder", "2h")).toBe("shoulder");
    });

    it("numbers unnumbered rings and trinkets in the order they appear", () => {
        resetSlotCounters();
        expect(resolveSlot("Ring", "2h")).toBe("finger1");
        expect(resolveSlot("Ring", "2h")).toBe("finger2");
        expect(resolveSlot("Trinket", "2h")).toBe("trinket1");
        expect(resolveSlot("Trinket (Raw Damage)", "2h")).toBe("trinket2");
    });

    it("gives back what it does not know rather than guessing at it", () => {
        resetSlotCounters();
        expect(resolveSlot("Tabard", "2h")).toBe(null);
    });
});

describe("detectWeaponType", () => {
    it("reads a lone Weapon row as a two-hander", () => {
        expect(detectWeaponType([row("Weapon"), row("Head")])).toBe("2h");
    });

    it("reads an off-hand row as one-hand plus off-hand", () => {
        expect(detectWeaponType([row("Weapon"), row("Offhand")])).toBe("1h+oh");
    });
});

describe("assignSlots", () => {
    it("drops a second row for a slot already filled", () => {
        // Vengeance's page lists three trinkets: two slots and a third
        // recommendation. Counting the third as a change would rebuild the
        // spec on every run.
        const { rows } = assignSlots(
            [row("Trinket", 1), row("Trinket", 2), row("Trinket (Raw Damage)", 3)],
            "2h",
        );
        expect(rows.map((r) => [r.slot, r.itemId])).toEqual([
            ["trinket1", 1],
            ["trinket2", 2],
        ]);
    });

    it("hands back the weapon for the build the spec is not running", () => {
        // A page offering both layouts gets read as the one this spec plays:
        // the one-hander is handed back for ALTS, and the off-hand that went
        // with it has nowhere to go on a two-hander.
        const { rows, skipped } = assignSlots(
            [row("Two-Hand", 1), row("One-Hand", 2), row("Off Hand", 3)],
            "2h",
        );
        expect(rows.map((r) => [r.slot, r.itemId])).toEqual([["main_hand", 1]]);
        expect(skipped.map((r) => r.itemId)).toEqual([2]);
    });

    it("keeps the one-hander and its off-hand where that is what the spec wields", () => {
        const { rows, skipped } = assignSlots(
            [row("Two-Hand", 1), row("One-Hand", 2), row("Off Hand", 3)],
            "1h+oh",
        );
        expect(rows.map((r) => [r.slot, r.itemId])).toEqual([
            ["main_hand", 2],
            ["off_hand", 3],
        ]);
        expect(skipped.map((r) => r.itemId)).toEqual([1]);
    });

    it("hands back an explicitly optional weapon row", () => {
        const { rows, skipped } = assignSlots(
            [row("Weapon", 1), row("Option for Dual Wielding", 2)],
            "2h",
        );
        expect(rows).toHaveLength(1);
        expect(skipped.map((r) => r.itemId)).toEqual([2]);
    });

    it("reports an unknown slot apart from the rows it resolved", () => {
        const { rows, unknown } = assignSlots([row("Head", 1), row("Tabard", 2)], "2h");
        expect(rows).toHaveLength(1);
        expect(unknown.map((r) => r.slotName)).toEqual(["Tabard"]);
    });

    it("resolves every row of a real guide page, with nothing unknown", () => {
        // Three specs, three page shapes: blood death knight names three
        // rings, enhancement shaman numbers its rings and trinkets, and
        // vengeance names neither. All sixteen slots come out either way.
        for (const [key, weaponType] of [
            ["blood-dk", undefined],
            ["enh-shaman", "dual"],
            ["veng-dh", undefined],
        ]) {
            const rowsIn = guideRows(key);
            const type = weaponType ?? detectWeaponType(rowsIn);
            const { rows, unknown } = assignSlots(rowsIn, type);
            expect(unknown, `${key} unknown slots`).toEqual([]);
            expect(new Set(rows.map((r) => r.slot)).size).toBe(rows.length);
            expect(rows.length, `${key} slot count`).toBeGreaterThanOrEqual(14);
        }
    });
});
