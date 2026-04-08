export var SPEC_LABEL = "Holy Priest";
export var SPEC_KEY = "holy-priest";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/holy-priest-raid-guide";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "holy";
export var SPEC_ICON = "spell_holy_guardianspirit";
export var STORAGE_KEY = "bis-holy-priest-v1";

export var THEME = {
  accent: "#e0e0e0",
  accentLight: "#ececec",
  accentBg: "#222222",
  accentBorder: "#4e4e4e",
  shimmer: "linear-gradient(90deg,#868686,#e0e0e0,#ececec,#e0e0e0,#868686)",
  btnBg: "linear-gradient(135deg,#868686,#e0e0e0)",
};

export var BIS = [
  { slot: "head", id: 250051, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 250049, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 250046, source: "Tier", stats: ["crit","vers"] },
  { slot: "chest", id: 250054, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 250047, source: "Tier", stats: ["crit","mastery"] },
  { slot: "hands", id: 250052, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { slot: "legs", id: 249323, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "feet", id: 251167, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "finger1", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249809, source: "Crown of the Cosmos", stats: ["mastery"] },
  { slot: "main_hand", id: 258516, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 193703, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "chest", id: 251120, source: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "wrist", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", id: 251211, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "waist", id: 151302, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", id: 251205, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "feet", id: 251167, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "finger1", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 258516, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "off_hand", id: 251094, source: "Windrunner Spire", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "ring", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "waist", id: 249319, source: "Imperator Averzian", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 50227, source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 249293, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["crit","vers","mastery","haste"];

export var STAT_CACHE_KEY = "holy-priest-stat-cache-v1";

export var KNOWN_STATS = {
  49823:["crit","vers"],50227:["crit","vers"],50228:["crit","haste"],151302:["mastery","vers"],
  151305:["haste","mastery"],151308:["crit","vers"],193703:["crit","haste"],193708:["crit","mastery"],
  193718:[],239664:["crit","haste"],245769:[],249293:["crit","vers"],
  249315:["haste","mastery"],249319:["crit","haste"],249323:["crit","vers"],249335:["crit","vers"],
  249336:["crit","vers"],249337:["crit","haste"],249343:["mastery"],249809:["mastery"],
  249919:["crit","mastery"],250046:["crit","vers"],250047:["crit","mastery"],250049:["crit","mastery"],
  250051:["crit","haste"],250052:["haste","vers"],250054:["haste","mastery"],250256:[],
  251085:["crit","mastery"],251094:["crit","vers"],251120:["crit","vers"],251161:["crit","vers"],
  251167:["crit","vers"],251205:["crit","vers"],251211:["crit","vers"],251513:["crit","mastery"],
  258514:["crit","mastery"],258516:["crit","vers"],
};

