export var SPEC_LABEL = "Havoc Demon Hunter";
export var SPEC_KEY = "havoc-dh";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/havoc-demon-hunter-raid-guide";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "havoc";
export var SPEC_ICON = "ability_demonhunter_specdps";
export var STORAGE_KEY = "bis-havoc-dh-v1";

export var THEME = {
  accent: "#A330C9",
  accentLight: "#c883df",
  accentBg: "#18071e",
  accentBorder: "#391146",
  shimmer: "linear-gradient(90deg,#621d79,#A330C9,#c883df,#A330C9,#621d79)",
  btnBg: "linear-gradient(135deg,#621d79,#A330C9)",
};

export var BIS = [
  { slot: "head", id: 250033, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250031, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 250036, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250034, source: "Vorasius", stats: ["crit","haste"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "finger2", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 260408, source: "Midnight Falls", stats: ["crit"] },
  { slot: "off_hand", id: 237840, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251109, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", id: 151315, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 193717, source: "Algeth'ar Academy", stats: ["crit","vers"] },
  { slot: "off_hand", id: 251175, source: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "hands", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 50227, source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251163, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "wrist", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "havoc-dh-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49817:["haste","mastery"],50227:["crit","vers"],50228:["crit","haste"],
  50264:["crit","haste"],151315:["crit","haste"],151318:["crit","haste"],151319:["crit","mastery"],
  193701:[],193708:["crit","mastery"],193717:["crit","vers"],237840:[],
  244576:[],249284:["crit","mastery"],249312:["haste","mastery"],249321:["crit","mastery"],
  249327:["crit","haste"],249337:["crit","haste"],249343:["mastery"],249368:["haste","mastery"],
  249382:["crit","mastery"],249919:["crit","mastery"],250031:["crit","mastery"],250033:["haste","mastery"],
  250034:["crit","haste"],250036:["crit","mastery"],250247:["haste","mastery"],251082:["crit","mastery"],
  251087:["crit","haste"],251092:["haste","mastery"],251099:["crit","mastery"],251109:["crit","mastery"],
  251113:["crit","mastery"],251135:["crit","haste"],251140:["haste","mastery"],251163:["crit","vers"],
  251171:["haste","mastery"],251175:["crit","mastery"],251217:["crit","haste"],251513:["crit","mastery"],
  252420:[],258575:["crit","mastery"],258577:["crit","mastery"],260235:[],
  260408:["crit"],
};

