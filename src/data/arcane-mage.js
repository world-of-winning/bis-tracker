export var SPEC_LABEL = "Arcane Mage";
export var SPEC_KEY = "arcane-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/arcane-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "arcane";
export var SPEC_ICON = "spell_holy_magicalsentry";
export var STORAGE_KEY = "bis-arcane-mage-v1";

export var THEME = {
  accent: "#69CCF0",
  accentLight: "#a5e0f6",
  accentBg: "#101f24",
  accentBorder: "#254754",
  shimmer: "linear-gradient(90deg,#3f7a90,#69CCF0,#a5e0f6,#69CCF0,#3f7a90)",
  btnBg: "linear-gradient(135deg,#3f7a90,#69CCF0)",
};

export var BIS = [
  { slot: "head", id: 250060, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 250058, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 239661, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "chest", id: 250063, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 239660, source: "Crafted", stats: ["haste","vers"] },
  { slot: "hands", id: 250061, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 249376, source: "Belo'ren Child of Al'ar", stats: ["haste","mastery"] },
  { slot: "legs", id: 251090, source: "Windrunner Spire", stats: ["mastery","vers"] },
  { slot: "feet", id: 268282, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249919, source: "Belo'ren Child of Al'ar", stats: ["crit","mastery"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 251094, source: "Windrunner Spire", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 258580, source: "Skyreach", stats: ["mastery","vers"] },
  { slot: "hands", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", id: 151302, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", id: 251090, source: "Windrunner Spire", stats: ["mastery","vers"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251206, source: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { forSlot: "chest", id: 151303, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "feet", id: 250062, source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251108, source: "Magisters' Terrace", stats: ["mastery","vers"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "arcane-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],151300:["crit","mastery"],
  151302:["mastery","vers"],151303:["crit","haste"],151337:["crit","mastery"],193708:["crit","mastery"],
  239660:["haste","vers"],239661:["mastery","vers"],249284:["crit","mastery"],249328:["haste","mastery"],
  249337:["crit","haste"],249343:["mastery"],249346:[],249368:["haste","mastery"],
  249369:["haste","mastery"],249376:["haste","mastery"],249919:["crit","mastery"],250058:["haste","vers"],
  250060:["haste","mastery"],250061:["haste","mastery"],250062:["haste","mastery"],250063:["crit","haste"],
  250144:[],250256:[],251077:["crit","mastery"],251090:["mastery","vers"],
  251093:["haste","mastery"],251094:["crit","vers"],251108:["mastery","vers"],251115:["haste","mastery"],
  251206:["mastery","vers"],251213:["haste","mastery"],251217:["crit","haste"],251513:["crit","mastery"],
  258218:["crit","mastery"],258514:["crit","mastery"],258575:["crit","mastery"],258578:["haste","mastery"],
  258580:["mastery","vers"],258584:["haste","mastery"],268282:["crit","mastery"],268287:["haste","mastery"],
  268290:["haste","mastery"],268291:["crit","mastery"],
};

