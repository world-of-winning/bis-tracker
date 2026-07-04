export var SPEC_LABEL = "Protection Paladin";
export var SPEC_KEY = "prot-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/protection-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_paladin_shieldofthetemplar";
export var STORAGE_KEY = "bis-prot-paladin-v1";

export var THEME = {
  accent: "#c9a227",
  accentLight: "#dfc77d",
  accentBg: "#1e1806",
  accentBorder: "#46390e",
  shimmer: "linear-gradient(90deg,#796117,#c9a227,#dfc77d,#c9a227,#796117)",
  btnBg: "linear-gradient(135deg,#796117,#c9a227)",
};

export var BIS = [
  { slot: "head", id: 249961, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 249959, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249964, source: "Rotmire + Catalyst", stats: ["haste","mastery"] },
  { slot: "wrist", id: 151328, source: "Midnight Falls", stats: ["crit","haste"] },
  { slot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249960, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "off_hand", id: 249275, source: "Imperator Averzian", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 49819, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 251203, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "waist", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251208, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "feet", id: 251091, source: "Windrunner Spire", stats: ["crit","vers"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "off_hand", id: 258049, source: "Skyreach", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 151329, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268285, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "hands", id: 249962, source: "Tier", stats: ["haste","vers"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251202, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","crit","mastery","vers"];

export var STAT_CACHE_KEY = "prot-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],49812:["crit","haste"],49819:["crit","haste"],50228:["crit","haste"],
  50234:["crit","mastery"],50272:["crit","haste"],151328:["crit","haste"],151329:["haste","mastery"],
  151332:["haste","vers"],221200:["mastery","vers"],237828:[],239656:[],
  249275:["crit","vers"],249295:["crit","haste"],249337:["crit","haste"],249343:["mastery"],
  249369:["haste","mastery"],249920:["haste"],249959:["crit","mastery"],249960:["crit","haste"],
  249961:["haste","mastery"],249962:["haste","vers"],249964:["haste","mastery"],250247:["haste","mastery"],
  250256:[],251091:["crit","vers"],251093:["haste","mastery"],251105:["crit","mastery"],
  251115:["haste","mastery"],251157:["crit","haste"],251175:["crit","mastery"],251202:["crit","vers"],
  251203:["crit","vers"],251208:["haste","vers"],251217:["crit","haste"],252420:[],
  258049:["crit","mastery"],258525:["crit","haste"],260235:[],260312:["crit","haste"],
  260423:["crit","haste"],268285:["haste","mastery"],268289:["crit","mastery"],268290:["haste","mastery"],
  268291:["crit","mastery"],
};

