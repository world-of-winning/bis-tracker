export var SPEC_LABEL = "Survival Hunter";
export var SPEC_KEY = "surv-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/survival-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "survival";
export var SPEC_ICON = "ability_hunter_camouflage";
export var STORAGE_KEY = "bis-surv-hunter-v1";

export var THEME = {
  accent: "#d4aa60",
  accentLight: "#e5cca0",
  accentBg: "#201a0e",
  accentBorder: "#4a3b22",
  shimmer: "linear-gradient(90deg,#7f663a,#d4aa60,#e5cca0,#d4aa60,#7f663a)",
  btnBg: "linear-gradient(135deg,#7f663a,#d4aa60)",
};

export var BIS = [
  { slot: "head", id: 249988, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 268291, source: "Sporefall", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249991, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { slot: "hands", id: 249989, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 249371, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "legs", id: 249987, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", id: 268287, source: "Sporefall", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268290, source: "Sporefall", stats: ["haste","mastery"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 237837, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251119, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251179, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "feet", id: 251084, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { forSlot: "feet", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249320, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "feet", id: 249990, source: "Rotmire + Catalyst", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "head", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249371, source: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251174, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "surv-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49824:["crit","haste"],50228:["crit","haste"],151320:["haste","mastery"],
  151321:["crit","mastery"],151323:["haste","mastery"],193701:[],193710:["haste","mastery"],
  237837:[],239656:[],249284:["crit","mastery"],249294:["haste","mastery"],
  249304:["crit","mastery"],249320:["crit","vers"],249325:["crit","mastery"],249337:["crit","haste"],
  249343:["mastery"],249369:["haste","mastery"],249371:["haste","mastery"],249920:["haste"],
  249987:["crit","mastery"],249988:["crit","haste"],249989:["crit","mastery"],249990:["crit","mastery"],
  249991:["crit","haste"],250247:["haste","mastery"],250256:[],251079:["crit","mastery"],
  251084:["crit","mastery"],251089:["haste","mastery"],251093:["haste","mastery"],251115:["haste","mastery"],
  251119:["crit","mastery"],251122:["haste","mastery"],251168:["crit","mastery"],251170:["crit","mastery"],
  251174:["haste","mastery"],251179:["crit","mastery"],251215:["crit","mastery"],258218:["crit","mastery"],
  258436:["haste","mastery"],258438:["haste","mastery"],258575:["crit","mastery"],258576:["crit","haste"],
  258585:["crit","mastery"],268287:["haste","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

