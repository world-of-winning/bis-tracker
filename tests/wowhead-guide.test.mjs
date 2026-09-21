import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
    bisItemsBlock,
    guideMarkup,
    parseGearRows,
    pickGearTab,
} from "../scripts/wowhead-guide.mjs";

const FIXTURES = resolve(dirname(fileURLToPath(import.meta.url)), "fixtures");
const block = (key) =>
    bisItemsBlock(guideMarkup(readFileSync(resolve(FIXTURES, `wowhead-${key}.html`), "utf8")));

describe("guideMarkup", () => {
    it("takes the call passed a string literal, not the one passed page data", () => {
        // A guide page carries two printHtml calls. The first is handed
        // WH.getPageData and renders something else; the guide body is the
        // one given its markup directly. Taking the first match would parse
        // the wrong thing and find no gear table at all.
        const html = `
<script>
    WH.markup.printHtml(
        WH.getPageData("wowhead-guid6ab1007c-745"),
        "target"
    );
</script>
<script>
    WH.markup.printHtml("[db=live]\\r\\n[tabs name=bis_items]\\r\\nbody\\r\\n[/tabs]");
</script>`;
        expect(guideMarkup(html)).toBe(
            "[db=live]\r\n[tabs name=bis_items]\r\nbody\r\n[/tabs]",
        );
    });

    it("answers with null when the page carries no guide body", () => {
        expect(guideMarkup("<html><body>nothing here</body></html>")).toBe(null);
    });
});

describe("bisItemsBlock", () => {
    const body = [
        "[tabs uniform=true name=bis_items]",
        '\t[tab name="Overall BiS"]',
        "\t\tgear",
        "[/tabs]",
        "",
        "[tabs uniform=true name=crafted_gear]",
        '\t[tab name="Early Crafts"]',
        "[/tabs]",
    ].join("\n");

    it("takes the gear block and stops at its own closing tag", () => {
        // Three tabs blocks sit on every page. Keying on a tab's name would
        // mean knowing all of them: the gear tab is called "Overall BiS" on
        // most specs, "Season 2 Best-in-Slot" on enhancement shaman and
        // neither on blood death knight. The block's name is the same on all
        // forty.
        const block = bisItemsBlock(body);
        expect(block).toContain('[tab name="Overall BiS"]');
        expect(block).not.toContain("crafted_gear");
        expect(block).not.toContain("Early Crafts");
    });

    it("finds the block when attributes follow the name", () => {
        // Enhancement shaman writes
        // [tabs uniform=true name=bis_items size=thin iconborder=...]
        // Anchoring the name to the closing bracket reads that page as having
        // no gear at all.
        const wide =
            "[tabs uniform=true name=bis_items size=thin iconborder=true]\n" +
            '\t[tab name="Season 2 Best-in-Slot"]\n[/tabs]';
        expect(bisItemsBlock(wide)).toContain("Season 2 Best-in-Slot");
    });

    it("answers with null when the page has no gear block", () => {
        expect(bisItemsBlock("[tabs name=crafted_gear]\n[/tabs]")).toBe(null);
    });
});

describe("pickGearTab", () => {
    it("takes the only tab when a spec publishes one gear table", () => {
        expect(pickGearTab(block("veng-dh"), null).name).toBe("Overall BiS");
        expect(pickGearTab(block("enh-shaman"), null).name).toBe(
            "Season 2 Best-in-Slot",
        );
    });

    it("needs to be told which tab when a spec publishes more than one", () => {
        // Blood death knight splits its gear by hero talent and has no
        // overall table. Which of the two is this spec's BiS is a judgement
        // about the game, so the parser refuses rather than taking the first.
        expect(() => pickGearTab(block("blood-dk"), null)).toThrow(
            /Deathbringer BiS.*San'layn BiS/,
        );
        expect(pickGearTab(block("blood-dk"), "San'layn BiS").name).toBe(
            "San'layn BiS",
        );
    });
});

const rows = (key, wanted = null) => parseGearRows(pickGearTab(block(key), wanted).body);

describe("parseGearRows", () => {
    it("reads slot, item id and source, and drops the header row", () => {
        const got = rows("veng-dh");
        expect(got[0]).toEqual({
            slotName: "Weapon",
            itemId: 268209,
            originalItemId: null,
            source: "The Coiled Altar",
        });
        expect(got.every((r) => r.slotName !== "Slot")).toBe(true);
    });

    it("keeps the catalyst base beside the item it becomes", () => {
        // [item=271537 original-item=271875]: 271537 is the piece worn,
        // 271875 the item farmed to get it. Maxroll states this in prose,
        // seven ways; Wowhead states it in a field.
        const head = rows("veng-dh").find((r) => r.slotName === "Head");
        expect(head.itemId).toBe(271537);
        expect(head.originalItemId).toBe(271875);
    });

    it("finds the columns by their headings, not by position", () => {
        // Enhancement shaman's table has four columns: Slot, an unlabelled
        // enchant column, Item, Source. Reading the second cell as the item
        // finds an enchant scroll on every row, and reading the third as the
        // source finds the item.
        const got = rows("enh-shaman");
        expect(got.length).toBeGreaterThan(10);
        expect(got[0]).toEqual({
            slotName: "Main Hand",
            itemId: 268209,
            originalItemId: null,
            source: "The Coiled Altar",
        });
    });

    it("reads a slot label that carries an item link as the slot alone", () => {
        // Blood death knight writes one row's slot as Ring ([item=251487]).
        // Stripping the link and keeping the brackets leaves "Ring ()", which
        // matches no slot the generator knows.
        const labels = rows("blood-dk", "San'layn BiS").map((r) => r.slotName);
        expect(labels).not.toContain("Ring ()");
        expect(labels.filter((l) => l === "Ring").length).toBe(3);
    });

    it("decodes the entities the markup writes into source text", () => {
        // Enhancement shaman writes "Catalyst &ndash; Voidscar Arena".
        // Handing that on raw puts an HTML entity in a data file and in
        // whatever the source normalizer makes of it.
        const head = rows("enh-shaman").find((r) => r.slotName === "Head");
        expect(head.source).toBe("Catalyst \u2013 Voidscar Arena");
    });

    it("keeps every trinket row rather than folding them together", () => {
        // Vengeance lists three: Trinket, Trinket, Trinket (Raw Damage).
        // Mapping each onto trinket1/trinket2 as it arrives loses the third.
        const trinkets = rows("veng-dh").filter((r) =>
            /trinket/i.test(r.slotName),
        );
        expect(trinkets.length).toBe(3);
    });
});
