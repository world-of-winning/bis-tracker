import { describe, expect, it } from "vitest";
import { guideUrl } from "../scripts/wowhead-guide-cache.mjs";

describe("guideUrl", () => {
    it("hyphenates the two-word class slugs", () => {
        expect(guideUrl("deathknight", "blood")).toBe(
            "https://www.wowhead.com/guide/classes/death-knight/blood/bis-gear",
        );
        expect(guideUrl("demonhunter", "vengeance")).toBe(
            "https://www.wowhead.com/guide/classes/demon-hunter/vengeance/bis-gear",
        );
    });

    it("passes a one-word spec through and hyphenates the one that needs it", () => {
        expect(guideUrl("mage", "arcane")).toBe(
            "https://www.wowhead.com/guide/classes/mage/arcane/bis-gear",
        );
        expect(guideUrl("hunter", "beastmastery")).toBe(
            "https://www.wowhead.com/guide/classes/hunter/beast-mastery/bis-gear",
        );
    });

    it("keeps specs that share a name apart by their class", () => {
        // Comparing the two to each other only restates that the class is
        // interpolated. What can actually break is a slug fix aimed at one
        // spec landing on every spec of that name, so both are named.
        expect(guideUrl("druid", "restoration")).toBe(
            "https://www.wowhead.com/guide/classes/druid/restoration/bis-gear",
        );
        expect(guideUrl("shaman", "restoration")).toBe(
            "https://www.wowhead.com/guide/classes/shaman/restoration/bis-gear",
        );
    });
});
