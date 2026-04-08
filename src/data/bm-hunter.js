export var SPEC_LABEL = "Beast Mastery Hunter";
export var SPEC_KEY = "bm-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/beast-mastery-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "beastmastery";
export var SPEC_ICON = "ability_hunter_bestialdiscipline";
export var STORAGE_KEY = "bis-bm-hunter-v1";

export var THEME = {
  accent: "#AAD372",
  accentLight: "#cce5aa",
  accentBg: "#1a2011",
  accentBorder: "#3b4a28",
  shimmer: "linear-gradient(90deg,#667f44,#AAD372,#cce5aa,#AAD372,#667f44)",
  btnBg: "linear-gradient(135deg,#667f44,#AAD372)",
};

export var BIS = [
  { slot: "head", id: 249988, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 249986, source: "Fallen-King Salhadaar", stats: ["haste","vers"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 249991, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 249989, source: "Vorasius", stats: ["crit","mastery"] },
  { slot: "waist", id: 249371, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "legs", id: 249987, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "feet", id: 249990, source: "Tier", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", id: 249806, source: "Belo'ren", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 251174, source: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251119, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 251179, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "feet", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 251174, source: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { forSlot: "feet", id: 249377, source: "Belo'ren", stats: ["crit","haste"] },
  { forSlot: "feet", id: 251084, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "head", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 244611, source: "Crafted", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "bm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49824:["crit","haste"],151321:["crit","mastery"],151323:["haste","mastery"],
  193701:[],193715:["crit","haste"],240949:[],244584:[],
  244611:["haste","mastery"],249304:["crit","mastery"],249325:["crit","mastery"],249343:["mastery"],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249371:["haste","mastery"],
  249377:["crit","haste"],249806:[],249920:["haste"],249986:["haste","vers"],
  249987:["crit","mastery"],249988:["crit","haste"],249989:["crit","mastery"],249990:["crit","mastery"],
  249991:["crit","haste"],250247:["haste","mastery"],250256:[],251079:["crit","mastery"],
  251084:["crit","mastery"],251089:["haste","mastery"],251093:["haste","mastery"],251115:["haste","mastery"],
  251119:["crit","mastery"],251170:["crit","mastery"],251174:["haste","mastery"],251179:["crit","mastery"],
  251190:["haste","mastery"],251215:["crit","mastery"],258576:["crit","haste"],258585:["crit","mastery"],
};

