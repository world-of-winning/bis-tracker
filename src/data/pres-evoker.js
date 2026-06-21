export var SPEC_LABEL = "Preservation Evoker";
export var SPEC_KEY = "pres-evoker";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/preservation-evoker-raid-guide";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "preservation";
export var SPEC_ICON = "classicon_evoker_preservation";
export var STORAGE_KEY = "bis-pres-evoker-v1";

export var THEME = {
  accent: "#60ca8b",
  accentLight: "#a0dfb9",
  accentBg: "#0e1e15",
  accentBorder: "#224731",
  shimmer: "linear-gradient(90deg,#3a7953,#60ca8b,#a0dfb9,#60ca8b,#3a7953)",
  btnBg: "linear-gradient(135deg,#3a7953,#60ca8b)",
};

export var BIS = [
  { slot: "head", id: 249997, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 249995, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 250000, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "waist", id: 249994, source: "Tier", stats: ["crit","mastery"] },
  { slot: "legs", id: 249996, source: "Rotmire Catalyst", stats: ["haste","mastery"] },
  { slot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249919, source: "Beloren", stats: ["crit","mastery"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249346, source: "Vaelgor and Ezzorak", stats: [] },
  { slot: "main_hand", id: 249286, source: "Midnight Falls", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251119, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 193704, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251179, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "feet", id: 251084, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 193707, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { forSlot: "feet", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "head", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 249324, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249318, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "pres-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],50228:["crit","haste"],151320:["haste","mastery"],151321:["crit","mastery"],
  193704:["crit","mastery"],193707:["haste","mastery"],193708:["crit","mastery"],193710:["haste","mastery"],
  193718:[],221200:["mastery","vers"],239656:[],244584:[],
  249283:["haste","mastery"],249284:["crit","mastery"],249286:["mastery"],249287:["haste","mastery"],
  249294:["haste","mastery"],249304:["crit","mastery"],249318:["crit","mastery"],249324:["haste","mastery"],
  249325:["crit","mastery"],249337:["crit","haste"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249919:["crit","mastery"],249994:["crit","mastery"],
  249995:["crit","mastery"],249996:["haste","mastery"],249997:["crit","mastery"],250000:["crit","haste"],
  250256:[],251079:["crit","mastery"],251084:["crit","mastery"],251089:["haste","mastery"],
  251093:["haste","mastery"],251115:["haste","mastery"],251119:["crit","mastery"],251122:["haste","mastery"],
  251170:["crit","mastery"],251179:["crit","mastery"],251201:["haste","mastery"],251215:["crit","mastery"],
  251513:["crit","mastery"],258047:["haste","mastery"],258438:["haste","mastery"],258575:["crit","mastery"],
  258576:["crit","haste"],258585:["crit","mastery"],268287:["haste","mastery"],268290:["haste","mastery"],
  268291:["crit","mastery"],
};

