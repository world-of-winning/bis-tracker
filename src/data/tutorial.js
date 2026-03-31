// Tutorial step definitions
// selector: data-tutorial attribute value or CSS selector
// position: preferred tooltip position relative to target
export var TUTORIAL_STEPS = [
  { selector: '[data-tutorial="char-bar"]', position: "bottom", titleKey: "tutorial.charBar.title", descKey: "tutorial.charBar.desc" },
  { selector: '[data-tutorial="simc-import"]', position: "bottom", titleKey: "tutorial.simc.title", descKey: "tutorial.simc.desc" },
  { selector: '[data-tutorial="tier-buttons"]', position: "bottom", titleKey: "tutorial.tier.title", descKey: "tutorial.tier.desc" },
  { selector: '[data-tutorial="progress-bar"]', position: "bottom", titleKey: "tutorial.progress.title", descKey: "tutorial.progress.desc" },
  { selector: '[data-tutorial="dungeon-filters"]', position: "bottom", titleKey: "tutorial.dungeon.title", descKey: "tutorial.dungeon.desc" },
  { selector: ".ic.t2", position: "bottom", titleKey: "tutorial.tier2.title", descKey: "tutorial.tier2.desc" },
  { selector: ".ic.t3", position: "bottom", titleKey: "tutorial.tier3.title", descKey: "tutorial.tier3.desc" },
  { selector: ".ic.t4", position: "bottom", titleKey: "tutorial.tier4.title", descKey: "tutorial.tier4.desc" },
];

// Catalog mode tutorial (no SimC data)
export var CATALOG_TUTORIAL_STEPS = [
  { selector: '[data-tutorial="dungeon-filters"]', position: "bottom", titleKey: "tutorial.catDungeon.title", descKey: "tutorial.catDungeon.desc" },
  { selector: ".ic.card-enter", position: "bottom", titleKey: "tutorial.catCard.title", descKey: "tutorial.catCard.desc" },
  { selector: '[data-tutorial="simc-import"]', position: "bottom", titleKey: "tutorial.catSimc.title", descKey: "tutorial.catSimc.desc" },
];
