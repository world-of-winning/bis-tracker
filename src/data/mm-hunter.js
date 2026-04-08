export var SPEC_LABEL = "Marksmanship Hunter";
export var SPEC_KEY = "mm-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/marksmanship-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "marksmanship";
export var SPEC_ICON = "ability_hunter_focusedaim";
export var STORAGE_KEY = "bis-mm-hunter-v1";

export var THEME = {
  accent: "#71b040",
  accentLight: "#aad08c",
  accentBg: "#111a0a",
  accentBorder: "#283e16",
  shimmer: "linear-gradient(90deg,#446a26,#71b040,#aad08c,#71b040,#446a26)",
  btnBg: "linear-gradient(135deg,#446a26,#71b040)",
};

export var BIS = [
  { slot: "head", id: 249988, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249991, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", id: 249989, source: "Vorasius", stats: ["crit","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 249987, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "feet", id: 249377, source: "Belo'ren", stats: ["crit","haste"] },
  { slot: "finger1", id: 240949, source: "Crafted", stats: [] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", id: 249288, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", id: 251084, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 251095, source: "Windrunner Spire", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "feet", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { forSlot: "feet", id: 249990, source: "Tier", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "head", id: 251119, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251162, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "mm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49812:["crit","haste"],49824:["crit","haste"],50228:["crit","haste"],
  50233:["crit","haste"],151321:["crit","mastery"],151323:["haste","mastery"],193701:[],
  193708:["crit","mastery"],193715:["crit","haste"],239656:[],240949:[],
  249288:["crit","haste"],249304:["crit","mastery"],249325:["crit","mastery"],249337:["crit","haste"],
  249368:["haste","mastery"],249377:["crit","haste"],249919:["crit","mastery"],249987:["crit","mastery"],
  249988:["crit","haste"],249989:["crit","mastery"],249990:["crit","mastery"],249991:["crit","haste"],
  250247:["haste","mastery"],251079:["crit","mastery"],251084:["crit","mastery"],251089:["haste","mastery"],
  251095:["crit","haste"],251119:["crit","mastery"],251162:["crit","haste"],251170:["crit","mastery"],
  251215:["crit","mastery"],251217:["crit","haste"],251513:["crit","mastery"],252420:[],
  258575:["crit","mastery"],258576:["crit","haste"],258585:["crit","mastery"],260235:[],
};

