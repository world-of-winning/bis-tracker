/**
 * Which slot a guide's row is about.
 *
 * Two publishers write the same sixteen slots sixteen different ways, and
 * neither is asked to be consistent: Wowhead writes "Shoulders" where Maxroll
 * writes "Shoulder", one page numbers its rings and the next does not, and a
 * Season 2 guide names its trinkets by how they work ("Passive Trinket")
 * rather than by position.
 *
 * Nothing here touches the network, which is what lets change detection use
 * it: deciding whether a spec changed means comparing what would be written,
 * not what the page listed, and a row the build always drops must not read as
 * a change on every run.
 */

const SLOT_MAP = {
    Head: "head",
    Neck: "neck",
    Shoulder: "shoulder",
    // Wowhead writes the armour slots plural where Maxroll writes them
    // singular. Both spellings name the same slot.
    Shoulders: "shoulder",
    Cloak: "back",
    Chest: "chest",
    Wrist: "wrist",
    Gloves: "hands",
    Belt: "waist",
    Legs: "legs",
    Boots: "feet",
    "Ring 1": "finger1",
    "Ring 2": "finger2",
    "Trinket 1": "trinket1",
    "Trinket 2": "trinket2",
};

// Weapon/off-hand slot names vary per spec
export const WEAPON_SLOTS = {
    "1h+shield": ["main_hand", "off_hand"],
    "1h+oh": ["main_hand", "off_hand"],
    "2h": ["main_hand"],
    dual: ["main_hand", "off_hand"],
    ranged: ["main_hand"],
};

// Handle numbered Ring/Trinket slots (some guide pages use "Ring" without number)
let ringCount = 0;
let trinketCount = 0;

export function resolveSlot(slotName, weaponType) {
    // Standard armor slots
    if (SLOT_MAP[slotName]) return SLOT_MAP[slotName];

    // Normalize: lowercase, strip spaces/hyphens/underscores for fuzzy matching
    const norm = slotName.toLowerCase().replace(/[\s\-_]+/g, "");

    // Numbered-less Ring/Trinket
    if (/^ring\d?$/.test(norm)) {
        ringCount++;
        return ringCount <= 1 ? "finger1" : "finger2";
    }
    // Any trinket label. Season 2 guides qualify them by how they work
    // ("Passive Trinket", "On-Use Trinket") rather than numbering them, and an
    // unrecognised slot is dropped outright — two empty trinket slots per spec.
    if (/trinket/.test(norm)) {
        trinketCount++;
        return trinketCount <= 1 ? "trinket1" : "trinket2";
    }

    // Weapon slots
    const weaponSlots = WEAPON_SLOTS[weaponType];
    const mainSlot = weaponSlots[0];
    const offSlot = weaponSlots.length > 1 ? weaponSlots[1] : null;

    // Two-Hand variants: "Two-Hand Weapon", "Two-Hand", "2h Weapon", "2H", etc.
    if (/twohand|^2h/.test(norm)) return mainSlot;
    // One-Hand variants: "One-Hand Weapon", "1h Weapon", "1H", etc.
    if (/onehand|^1h/.test(norm)) return mainSlot;
    // Off hand variants: "Off Hand", "Offhand", "Shield", "Weapon 2", "Weapon Off-Hand", etc.
    // (must check before main hand — "offhand" contains "hand")
    if (/offhand|shield|weapon2/.test(norm)) return offSlot || mainSlot;
    // Main hand variants: "Weapon", "Main Hand", "Mainhand", "Weapon 1", etc.
    if (/^weapon1?$|mainhand/.test(norm)) return mainSlot;

    return null;
}

export function resetSlotCounters() {
    ringCount = 0;
    trinketCount = 0;
}

/**
 * What the spec wields, read off the slot names its guide uses.
 *
 * Only specs whose weapons are fixed by class carry a weaponType of their own;
 * for the rest the guide's own labels are the evidence. A page that names one
 * "Weapon" and nothing else is describing a two-hander.
 */
export function detectWeaponType(gearRows) {
    for (const row of gearRows) {
        const norm = row.slotName.toLowerCase().replace(/[\s\-_]+/g, "");
        if (/shield/.test(norm)) return "1h+shield";
        if (/^(twohand|2h)(weapon)?$/.test(norm)) return "2h";
        if (/^(onehand|1h)(weapon)?$/.test(norm) || /offhand/.test(norm))
            return "1h+oh";
    }
    return "2h"; // single "Weapon"/"Main Hand" = 2H
}

/**
 * The slot each row lands in, with the rows that never reach the file gone.
 *
 * Three kinds of row are dropped: a weapon for the other build ("Option for
 * Dual Wielding"), a 2H where the spec wields 1H or the reverse, and the
 * second row for a slot already filled — a guide that lists three trinkets is
 * naming a third choice, not a third trinket slot.
 *
 * The dropped weapon rows are handed back rather than discarded. They are
 * real items for a build the spec is not running, and the Maxroll path merges
 * them into ALTS; the Wowhead path leaves them alone, since find-alts rebuilds
 * ALTS whole from the season's drop tables and already has them.
 */
export function assignSlots(gearRows, weaponType) {
    const norm = (s) => s.toLowerCase().replace(/[\s\-_]+/g, "");
    const normSlots = gearRows.map((r) => norm(r.slotName));
    const has2H = normSlots.some((s) => /^(twohand|2h)(weapon)?$/.test(s));
    const has1H = normSlots.some((s) => /^(onehand|1h)(weapon)?$/.test(s));
    const skipTwoHand = has2H && has1H && weaponType !== "2h";
    const skipOneHand = has2H && has1H && weaponType === "2h";

    resetSlotCounters();
    const rows = [];
    const skipped = [];
    const unknown = [];
    const seen = new Set();
    for (const row of gearRows) {
        const n = norm(row.slotName);
        if (/^option/.test(n)) {
            skipped.push(row);
            continue;
        }
        if (
            (/twohand|^2h/.test(n) && skipTwoHand) ||
            (/onehand|^1h/.test(n) && skipOneHand)
        ) {
            skipped.push(row);
            continue;
        }
        const slot = resolveSlot(row.slotName, weaponType);
        if (!slot) {
            unknown.push(row);
            continue;
        }
        if (seen.has(slot)) continue;
        seen.add(slot);
        rows.push({ ...row, slot });
    }
    return { rows, skipped, unknown };
}
