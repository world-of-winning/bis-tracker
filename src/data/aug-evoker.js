export var SPEC_LABEL = "Augmentation Evoker";
export var SPEC_KEY = "aug-evoker";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/augmentation-evoker-raid-guide";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "augmentation";
export var SPEC_ICON = "classicon_evoker_augmentation";
export var STORAGE_KEY = "bis-aug-evoker-v1";

export var THEME = {
  accent: "#6b4dca",
  accentLight: "#a694df",
  accentBg: "#100c1e",
  accentBorder: "#251b47",
  shimmer: "linear-gradient(90deg,#402e79,#6b4dca,#a694df,#6b4dca,#402e79)",
  btnBg: "linear-gradient(135deg,#402e79,#6b4dca)",
};

export var BIS = [
  { slot: "head", id: 249914, source: "Midnight Falls", stats: ["crit"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 249995, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 250000, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 249998, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 249996, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "feet", id: 249999, source: "Rotmire", stats: ["crit","haste"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249810, source: "Midnight Falls", stats: [] },
  { slot: "main_hand", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", id: 249276, source: "Vorasius", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", id: 193709, source: "Algeth'ar Academy", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "head", id: 251119, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "head", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 249324, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 193704, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249318, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["crit","haste","mastery","vers"];

export var STAT_CACHE_KEY = "aug-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49810:["crit","haste"],49812:["crit","haste"],49824:["crit","haste"],
  50228:["crit","haste"],50233:["crit","haste"],151321:["crit","mastery"],193704:["crit","mastery"],
  193709:["crit","haste"],193710:["haste","mastery"],193715:["crit","haste"],239656:[],
  244584:[],249276:["crit","haste"],249283:["haste","mastery"],249287:["haste","mastery"],
  249295:["crit","haste"],249304:["crit","mastery"],249318:["crit","mastery"],249324:["haste","mastery"],
  249337:["crit","haste"],249343:["mastery"],249369:["haste","mastery"],249810:[],
  249914:["crit"],249920:["haste"],249995:["crit","mastery"],249996:["haste","mastery"],
  249998:["haste","vers"],249999:["crit","haste"],250000:["crit","haste"],250144:[],
  250247:["haste","mastery"],250256:[],251079:["crit","mastery"],251089:["haste","mastery"],
  251093:["haste","mastery"],251111:["crit","haste"],251115:["haste","mastery"],251119:["crit","mastery"],
  251122:["haste","mastery"],251170:["crit","mastery"],251178:["crit","haste"],251215:["crit","mastery"],
  251217:["crit","haste"],258438:["haste","mastery"],258525:["crit","haste"],258576:["crit","haste"],
  258585:["crit","mastery"],260312:["crit","haste"],260423:["crit","haste"],268290:["haste","mastery"],
};

