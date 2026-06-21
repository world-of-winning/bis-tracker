export var SPEC_LABEL = "Frost Mage";
export var SPEC_KEY = "frost-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/frost-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "frost";
export var SPEC_ICON = "spell_frost_frostbolt02";
export var STORAGE_KEY = "bis-frost-mage-v1";

export var THEME = {
  accent: "#3FC7EB",
  accentLight: "#8cddf3",
  accentBg: "#091e23",
  accentBorder: "#164652",
  shimmer: "linear-gradient(90deg,#26778d,#3FC7EB,#8cddf3,#3FC7EB,#26778d)",
  btnBg: "linear-gradient(135deg,#26778d,#3FC7EB)",
};

export var BIS = [
  { slot: "head", id: 250060, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 250063, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 250061, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 250057, source: "Tier", stats: ["crit","haste"] },
  { slot: "legs", id: 250059, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 268282, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 193720, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "wrist", id: 251108, source: "Magisters' Terrace", stats: ["mastery","vers"] },
  { slot: "hands", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", id: 151302, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "chest", id: 151303, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "feet", id: 250062, source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { forSlot: "waist", id: 249319, source: "Imperator Averzian", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 258580, source: "Skyreach", stats: ["mastery","vers"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "frost-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49825:["crit","haste"],50228:["crit","haste"],151300:["crit","mastery"],151302:["mastery","vers"],
  151303:["crit","haste"],151337:["crit","mastery"],193708:["crit","mastery"],193720:["crit","mastery"],
  239648:[],239664:["crit","haste"],245769:[],249284:["crit","mastery"],
  249319:["crit","haste"],249337:["crit","haste"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249919:["crit","mastery"],250057:["crit","haste"],
  250059:["crit","haste"],250060:["haste","mastery"],250061:["haste","mastery"],250062:["haste","mastery"],
  250063:["crit","haste"],250144:[],250256:[],251077:["crit","mastery"],
  251085:["crit","mastery"],251093:["haste","mastery"],251108:["mastery","vers"],251115:["haste","mastery"],
  251513:["crit","mastery"],258218:["crit","mastery"],258514:["crit","mastery"],258574:["haste","vers"],
  258575:["crit","mastery"],258580:["mastery","vers"],258584:["haste","mastery"],268282:["crit","mastery"],
  268287:["haste","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

