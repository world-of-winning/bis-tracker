export var SPEC_LABEL = "Devourer Demon Hunter";
export var SPEC_KEY = "devourer-dh";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/devourer-demon-hunter-raid-guide";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "devourer";
export var SPEC_ICON = "classicon_demonhunter_void";
export var STORAGE_KEY = "bis-devourer-dh-v1";

export var THEME = {
  accent: "#ca30a3",
  accentLight: "#df83c8",
  accentBg: "#1e0718",
  accentBorder: "#471139",
  shimmer: "linear-gradient(90deg,#791d62,#ca30a3,#df83c8,#ca30a3,#791d62)",
  btnBg: "linear-gradient(135deg,#791d62,#ca30a3)",
};

export var BIS = [
  { slot: "head", id: 250033, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250031, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250036, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244748, source: "Crafted", stats: [] },
  { slot: "hands", id: 250034, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", id: 260408, source: "Midnight Falls", stats: ["crit"] },
  { slot: "off_hand", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
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
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "devourer-dh-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],50228:["crit","haste"],
  151318:["crit","haste"],151319:["crit","mastery"],151336:["crit","haste"],193708:["crit","mastery"],
  193710:["haste","mastery"],193714:["haste","mastery"],244748:[],249283:["haste","mastery"],
  249294:["haste","mastery"],249312:["haste","mastery"],249337:["crit","haste"],249343:["mastery"],
  249346:[],249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],
  249374:["crit","haste"],249382:["crit","mastery"],249919:["crit","mastery"],250031:["crit","mastery"],
  250033:["haste","mastery"],250034:["crit","haste"],250036:["crit","mastery"],250144:[],
  250247:["haste","mastery"],250256:[],251092:["haste","mastery"],251093:["haste","mastery"],
  251099:["crit","mastery"],251115:["haste","mastery"],251122:["haste","mastery"],251140:["haste","mastery"],
  251159:["haste","mastery"],251171:["haste","mastery"],251190:["haste","mastery"],251216:["haste","mastery"],
  251513:["crit","mastery"],258438:["haste","mastery"],258577:["crit","mastery"],260312:["crit","haste"],
  260408:["crit"],
};

