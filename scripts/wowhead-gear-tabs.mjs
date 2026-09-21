/**
 * Which tab holds a spec's BiS table, where the page publishes more than one.
 *
 * Almost every spec has a single tab inside [tabs name=bis_items], whatever
 * it happens to be called — "Overall BiS" on most, "Season 2 Best-in-Slot" on
 * enhancement shaman — and pickGearTab takes it without being told.
 *
 * A few publish two or more, and no rule can choose between them. Blood death
 * knight splits its gear by hero talent and has no overall table at all;
 * taking the first tab would commit the tracker to Deathbringer silently.
 * Mistweaver splits raid from Mythic+. Those are judgements about how a spec
 * is played, so they are written here, by hand, where a reader can see who
 * decided what.
 *
 * A spec missing from this map whose page has several tabs stops the run with
 * the tab names listed, which is how the rest of this table gets filled in.
 *
 * Season-specific: a spec that re-shapes its page needs revisiting.
 */
export const GEAR_TABS = {
    // murlok's top-fifty sample for blood death knight is reported as fifty
    // San'layn, in the same page the stat priorities are read from. One
    // measurement, one season — which is why this is a table and not a rule.
    "blood-dk": "San'layn BiS",
};
