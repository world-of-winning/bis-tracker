/**
 * Reading a Wowhead BiS guide page.
 *
 * Everything here is a pure function over text. Fetching, caching and the
 * browser headers the edge insists on live outside, the way priority-groups
 * keeps its derivation clear of the network.
 *
 * The page arrives fully rendered: the guide body is a JSON-escaped JS string
 * literal holding Wowhead's own BBCode, and every gear cell names its item by
 * id rather than by name.
 */

/**
 * The guide body, decoded from the printHtml call that carries it.
 *
 * A page has two such calls. One is handed WH.getPageData and renders other
 * furniture; the body is the one passed its markup directly, so the literal
 * is what identifies it.
 */
export function guideMarkup(html) {
    const at = html.search(/WH\.markup\.printHtml\(\s*"/);
    if (at < 0) return null;
    const open = html.indexOf('"', at);
    let i = open + 1;
    while (i < html.length) {
        if (html[i] === "\\") {
            i += 2;
            continue;
        }
        if (html[i] === '"') break;
        i++;
    }
    if (i >= html.length) return null;
    try {
        return JSON.parse(html.slice(open, i + 1));
    } catch {
        return null;
    }
}

/**
 * The [tabs name=bis_items] block, from its opening tag to its closing one.
 *
 * Three tabs blocks sit on a page — gear, crafting, upgrade systems — and only
 * the block's name is stable across specs. The tab inside it is called
 * "Overall BiS" on most, "Season 2 Best-in-Slot" on enhancement shaman, and
 * on blood death knight neither: that page names its two tabs after hero
 * talents and has no overall tab at all.
 */
export function bisItemsBlock(body) {
    const open = body.search(/\[tabs[^\]]*\bname=bis_items\b[^\]]*\]/);
    if (open < 0) return null;

    // Tabs blocks nest: restoration shaman asks whether the player will get
    // AOTC early and puts a whole gear layout under each answer. Taking the
    // first [/tabs] cuts the block off inside that nest, and everything
    // downstream then reads sub-tabs as siblings of the gear tab.
    const MARKER = /\[tabs[^\]]*\]|\[\/tabs\]/g;
    MARKER.lastIndex = open;
    let depth = 0;
    let m;
    while ((m = MARKER.exec(body))) {
        depth += m[0] === "[/tabs]" ? -1 : 1;
        if (depth === 0) return body.slice(open, m.index + m[0].length);
    }
    return null;
}

/**
 * The tab inside the gear block that holds this spec's BiS table.
 *
 * Almost every spec publishes one, whatever it is called, and the only tab
 * there is the answer. Four do not, and for those `wanted` names the tab —
 * a hand-written choice, because picking between blood death knight's
 * Deathbringer and San'layn tables is a judgement about which build the spec
 * is played as, not something the markup can settle.
 *
 * Refusing beats guessing: taking the first tab would quietly commit to one
 * hero talent and read as though the page had said so.
 */
export function pickGearTab(block, wanted) {
    if (!block) return null;
    const tabs = [];
    const re = /\[tab name="([^"]+)"[^\]]*\]/g;
    let m;
    while ((m = re.exec(block))) {
        tabs.push({ name: m[1], start: m.index + m[0].length });
    }
    if (!tabs.length) return null;
    for (let i = 0; i < tabs.length; i++) {
        const end = i + 1 < tabs.length ? tabs[i + 1].start : block.length;
        tabs[i].body = block.slice(tabs[i].start, end);
    }
    if (wanted) {
        const hit = tabs.find((t) => t.name === wanted);
        if (hit) return hit;
        throw new Error(
            `No tab named "${wanted}". This page has: ${tabs.map((t) => t.name).join(", ")}`,
        );
    }
    if (tabs.length === 1) return tabs[0];
    throw new Error(
        `This page publishes more than one gear table and none is named ` +
            `as this spec's: ${tabs.map((t) => t.name).join(", ")}`,
    );
}

// A table row and its cells. Both run to the next opening tag rather than
// looking for a matching close, because the markup nests item links, colour
// spans and urls inside cells and a naive pair match would end early.
const ROW = /\[tr\]([^]*?)\[\/tr\]/g;
const CELL = /\[td[^\]]*\]([^]*?)\[\/td\]/g;

// Markup that can wrap or follow the text of a source cell. [skill=165] is
// how one author writes "Leatherworking", so a stripper that drops it without
// trace leaves the row with no source at all.
const SKILL = /\[skill=\d+\]/g;
const ITEM_LINK = /\[item=\d+[^\]]*\]/g;
// Everything else in square brackets goes, named or not. A closed list of tags
// to strip was the earlier shape, and it leaked twice: [npc=259446] and
// [zone=16425] are how some authors name a boss and a dungeon, and both
// reached the data files as literal markup. A tag carrying no text is a source
// this parser cannot read, and saying nothing is better than saying "[npc=…]"
// — the cross-check has the loot table and fills such a row in.
const TAGS = /\[[^\]]*\]/g;

/**
 * The gear rows of one tab: slot name, item id, catalyst base, source.
 *
 * A cell can hold two item links. On every row in the season's forty pages
 * the first is the recommendation and the second is context — an
 * embellishment, the base of a catalyzed piece, or the off-hand of a
 * dual-wield pair — so the first is what the row means.
 *
 * Slot names are passed through as written. Forty spellings are in use and
 * resolving them is the generator's job, which already owns that map.
 *
 * Columns are located by their headings. Most tables run Slot, Item, Source,
 * but enhancement shaman's carries an unlabelled enchant column second, and
 * reading by position there finds an enchanting scroll on every row.
 */
export function parseGearRows(tabBody) {
    const rows = [];
    let columns = null;
    ROW.lastIndex = 0;
    let row;
    while ((row = ROW.exec(tabBody))) {
        const cells = [];
        CELL.lastIndex = 0;
        let cell;
        while ((cell = CELL.exec(row[1]))) cells.push(cell[1]);
        if (cells.length < 3) continue;

        if (!columns) {
            const headings = cells.map((c) => stripMarkup(c).toLowerCase());
            const at = (name) => headings.indexOf(name);
            if (at("slot") >= 0 && at("item") >= 0 && at("source") >= 0) {
                columns = { slot: at("slot"), item: at("item"), source: at("source") };
                continue;
            }
            // A table with no heading row we recognise reads as the common
            // shape rather than not at all.
            columns = { slot: 0, item: 1, source: 2 };
        }

        const item = cells[columns.item]?.match(
            /\[item=(\d+)((?:\s+[a-z-]+=[^\s\]]+)*)\]/,
        );
        if (!item) continue; // a row with no item in it

        const original = item[2].match(/original-item=(\d+)/);
        rows.push({
            slotName: stripMarkup(cells[columns.slot]),
            itemId: Number(item[1]),
            originalItemId: original ? Number(original[1]) : null,
            source: stripMarkup(cells[columns.source] ?? ""),
        });
    }
    return rows;
}

// The markup carries HTML entities in its prose — "Catalyst &ndash; Voidscar
// Arena" is how one author writes a compound source. Numeric forms appear too.
const ENTITIES = {
    ndash: "\u2013", mdash: "\u2014", amp: "&", quot: '"', apos: "'",
    lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201c", rdquo: "\u201d",
    nbsp: " ", lt: "<", gt: ">",
};

function decodeEntities(text) {
    return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, body) => {
        if (body[0] === "#") {
            const code =
                body[1] === "x" || body[1] === "X"
                    ? parseInt(body.slice(2), 16)
                    : parseInt(body.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : match;
        }
        return ENTITIES[body.toLowerCase()] ?? match;
    });
}

function stripMarkup(text) {
    return decodeEntities(text)
        .replace(SKILL, "Crafted")
        .replace(ITEM_LINK, "")
        .replace(TAGS, "")
        // An item link inside a slot label leaves its brackets behind:
        // "Ring ([item=251487])" would read as "Ring ()".
        .replace(/\(\s*\)/g, "")
        .replace(/\s+/g, " ")
        .trim();
}
