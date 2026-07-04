export var SPEC_LABEL = "Feral Druid";
export var SPEC_KEY = "feral-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/feral-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "feral";
export var SPEC_ICON = "ability_druid_catform";
export var STORAGE_KEY = "bis-feral-druid-v1";

export var THEME = {
  accent: "#d4a017",
  accentLight: "#e5c674",
  accentBg: "#201803",
  accentBorder: "#4a3808",
  shimmer: "linear-gradient(90deg,#7f600e,#d4a017,#e5c674,#d4a017,#7f600e)",
  btnBg: "linear-gradient(135deg,#7f600e,#d4a017)",
};

export var BIS = [
  { slot: "head", id: 250024, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 250022, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250027, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250025, source: "Vorasius", stats: ["haste","vers"] },
  { slot: "waist", id: 268286, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251217, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 251204, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "head", id: 49807, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "head", id: 268283, source: "Rotmire", stats: ["crit","haste"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 178819, source: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 250023, source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 49806, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "waist", id: 268286, source: "Rotmire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249277, source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 151315, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "feral-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],49817:["haste","mastery"],
  50228:["crit","haste"],50264:["crit","haste"],151315:["crit","haste"],151319:["crit","mastery"],
  151336:["crit","haste"],178819:["haste","mastery"],193701:[],244569:[],
  244576:[],249277:["crit","mastery"],249312:["haste","mastery"],249321:["crit","mastery"],
  249327:["crit","haste"],249337:["crit","haste"],249343:["mastery"],249369:["haste","mastery"],
  249370:["haste","mastery"],249382:["crit","mastery"],249920:["haste"],250022:["crit","mastery"],
  250023:["haste","mastery"],250024:["haste","mastery"],250025:["haste","vers"],250027:["crit","mastery"],
  250256:[],251077:["crit","mastery"],251082:["crit","mastery"],251087:["crit","haste"],
  251092:["haste","mastery"],251093:["haste","mastery"],251099:["crit","mastery"],251113:["crit","mastery"],
  251115:["haste","mastery"],251135:["crit","haste"],251140:["haste","mastery"],251171:["haste","mastery"],
  251190:["haste","mastery"],251204:["haste","vers"],251217:["crit","haste"],258514:["crit","mastery"],
  258575:["crit","mastery"],258577:["crit","mastery"],268283:["crit","haste"],268286:["crit","mastery"],
  268290:["haste","mastery"],268291:["crit","mastery"],
};

