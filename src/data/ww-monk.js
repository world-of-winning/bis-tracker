export var SPEC_LABEL = "Windwalker Monk";
export var SPEC_KEY = "ww-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/windwalker-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "windwalker";
export var SPEC_ICON = "spell_monk_windwalker_spec";
export var STORAGE_KEY = "bis-ww-monk-v1";

export var THEME = {
  accent: "#00FF98",
  accentLight: "#66ffc1",
  accentBg: "#002617",
  accentBorder: "#005935",
  shimmer: "linear-gradient(90deg,#00995b,#00FF98,#66ffc1,#00FF98,#00995b)",
  btnBg: "linear-gradient(135deg,#00995b,#00FF98)",
};

export var BIS = [
  { slot: "head", id: 250015, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250013, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", id: 250010, source: "Tier", stats: ["crit","haste"] },
  { slot: "chest", id: 250018, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "waist", id: 250012, source: "Tier", stats: ["haste","mastery"] },
  { slot: "legs", id: 250014, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "feet", id: 250017, source: "Tier", stats: ["crit","haste"] },
  { slot: "finger1", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251109, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", id: 49806, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 258586, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "head", id: 49807, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "head", id: 268283, source: "Rotmire", stats: ["crit","haste"] },
  { forSlot: "legs", id: 178819, source: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "ww-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],151309:["haste","vers"],
  151318:["crit","haste"],151336:["crit","haste"],178819:["haste","mastery"],193701:[],
  193708:["crit","mastery"],193710:["haste","mastery"],193714:["haste","mastery"],244576:[],
  249287:["haste","mastery"],249294:["haste","mastery"],249312:["haste","mastery"],249321:["crit","mastery"],
  249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],249374:["crit","haste"],
  249382:["crit","mastery"],249919:["crit","mastery"],250010:["crit","haste"],250012:["haste","mastery"],
  250013:["haste","mastery"],250014:["haste","mastery"],250015:["crit","haste"],250017:["crit","haste"],
  250018:["crit","haste"],250247:["haste","mastery"],250256:[],251092:["haste","mastery"],
  251093:["haste","mastery"],251096:["haste","vers"],251109:["crit","mastery"],251113:["crit","mastery"],
  251115:["haste","mastery"],251122:["haste","mastery"],251159:["haste","mastery"],251171:["haste","mastery"],
  251216:["haste","mastery"],251513:["crit","mastery"],258438:["haste","mastery"],258577:["crit","mastery"],
  258586:["haste","mastery"],260312:["crit","haste"],268283:["crit","haste"],268290:["haste","mastery"],
};

