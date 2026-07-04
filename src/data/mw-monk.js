export var SPEC_LABEL = "Mistweaver Monk";
export var SPEC_KEY = "mw-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/mistweaver-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "mistweaver";
export var SPEC_ICON = "spell_monk_mistweaver_spec";
export var STORAGE_KEY = "bis-mw-monk-v1";

export var THEME = {
  accent: "#60d0a0",
  accentLight: "#a0e3c6",
  accentBg: "#0e1f18",
  accentBorder: "#224938",
  shimmer: "linear-gradient(90deg,#3a7d60,#60d0a0,#a0e3c6,#60d0a0,#3a7d60)",
  btnBg: "linear-gradient(135deg,#3a7d60,#60d0a0)",
};

export var BIS = [
  { slot: "head", id: 250015, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 249333, source: "Lightblinded Vanguard", stats: ["crit","vers"] },
  { slot: "back", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "chest", id: 250018, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 249327, source: "Vorasius", stats: ["crit","haste"] },
  { slot: "hands", id: 250016, source: "Tier", stats: ["crit","vers"] },
  { slot: "waist", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "legs", id: 250014, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 249334, source: "Imperator Averzian", stats: ["haste","vers"] },
  { slot: "finger1", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249808, source: "Lightblinded Vanguard", stats: [] },
  { slot: "main_hand", id: 249293, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 193712, source: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", id: 251166, source: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "legs", id: 178819, source: "Halls of Atonement", stats: ["haste","mastery"] },
  { slot: "feet", id: 251210, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 258586, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "head", id: 49807, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "head", id: 268283, source: "Rotmire", stats: ["crit","haste"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249919, source: "Belo'ren Child of Al'ar", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 250013, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 49806, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "waist", id: 151316, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251163, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 151315, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","crit","vers","mastery"];

export var STAT_CACHE_KEY = "mw-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],49823:["crit","vers"],
  50228:["crit","haste"],50264:["crit","haste"],151309:["haste","vers"],151315:["crit","haste"],
  151316:["haste","vers"],151318:["crit","haste"],151336:["crit","haste"],178819:["haste","mastery"],
  193708:["crit","mastery"],193710:["haste","mastery"],193712:["haste","vers"],193714:["haste","mastery"],
  193718:[],245769:[],249287:["haste","mastery"],249293:["crit","vers"],
  249294:["haste","mastery"],249312:["haste","mastery"],249327:["crit","haste"],249333:["crit","vers"],
  249334:["haste","vers"],249335:["crit","vers"],249337:["crit","haste"],249343:["mastery"],
  249369:["haste","mastery"],249374:["crit","haste"],249808:[],249919:["crit","mastery"],
  249920:["haste"],250013:["haste","mastery"],250014:["haste","mastery"],250015:["crit","haste"],
  250016:["crit","vers"],250018:["crit","haste"],250256:[],251092:["haste","mastery"],
  251093:["haste","mastery"],251096:["haste","vers"],251115:["haste","mastery"],251122:["haste","mastery"],
  251135:["crit","haste"],251159:["haste","mastery"],251161:["crit","vers"],251163:["crit","vers"],
  251166:["haste","vers"],251171:["haste","mastery"],251210:["haste","vers"],251216:["haste","mastery"],
  258047:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],258586:["haste","mastery"],
  268283:["crit","haste"],268290:["haste","mastery"],
};

