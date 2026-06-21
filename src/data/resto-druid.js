export var SPEC_LABEL = "Restoration Druid";
export var SPEC_KEY = "resto-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/restoration-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_healingtouch";
export var STORAGE_KEY = "bis-resto-druid-v1";

export var THEME = {
  accent: "#60d060",
  accentLight: "#a0e3a0",
  accentBg: "#0e1f0e",
  accentBorder: "#224922",
  shimmer: "linear-gradient(90deg,#3a7d3a,#60d060,#a0e3a0,#60d060,#3a7d3a)",
  btnBg: "linear-gradient(135deg,#3a7d3a,#60d060)",
};

export var BIS = [
  { slot: "head", id: 250024, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 250022, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250025, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 268286, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 250023, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 260372, source: "Auction House", stats: [] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 268292, source: "Rotmire", stats: [] },
  { slot: "main_hand", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
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
  { slot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", id: 251210, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 258586, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249334, source: "Imperator Averzian", stats: ["haste","vers"] },
  { forSlot: "hands", id: 251204, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "head", id: 49807, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "head", id: 268283, source: "Rotmire", stats: ["crit","haste"] },
  { forSlot: "legs", id: 178819, source: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 151316, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249922, source: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","vers","crit"];

export var STAT_CACHE_KEY = "resto-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49817:["haste","mastery"],151309:["haste","vers"],151316:["haste","vers"],
  151318:["crit","haste"],151319:["crit","mastery"],151336:["crit","haste"],178819:["haste","mastery"],
  193712:["haste","vers"],193714:["haste","mastery"],193718:[],244576:[],
  245769:[],249283:["haste","mastery"],249287:["haste","mastery"],249295:["crit","haste"],
  249312:["haste","mastery"],249334:["haste","vers"],249343:["mastery"],249368:["haste","mastery"],
  249369:["haste","mastery"],249370:["haste","mastery"],249920:["haste"],249922:["haste","mastery"],
  250022:["crit","mastery"],250023:["haste","mastery"],250024:["haste","mastery"],250025:["haste","vers"],
  250256:[],251082:["crit","mastery"],251092:["haste","mastery"],251093:["haste","mastery"],
  251096:["haste","vers"],251111:["crit","haste"],251115:["haste","mastery"],251140:["haste","mastery"],
  251159:["haste","mastery"],251166:["haste","vers"],251171:["haste","mastery"],251178:["crit","haste"],
  251190:["haste","mastery"],251204:["haste","vers"],251210:["haste","vers"],251216:["haste","mastery"],
  258047:["haste","mastery"],258436:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],
  258525:["crit","haste"],258586:["haste","mastery"],260372:[],268283:["crit","haste"],
  268286:["crit","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],268292:[],
};

