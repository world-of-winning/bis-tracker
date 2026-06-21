export var SPEC_LABEL = "Enhancement Shaman";
export var SPEC_KEY = "enh-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/enhancement-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "enhancement";
export var SPEC_ICON = "spell_shaman_improvedstormstrike";
export var STORAGE_KEY = "bis-enh-shaman-v1";

export var THEME = {
  accent: "#2090dd",
  accentLight: "#79bceb",
  accentBg: "#051621",
  accentBorder: "#0b324d",
  shimmer: "linear-gradient(90deg,#135685,#2090dd,#79bceb,#2090dd,#135685)",
  btnBg: "linear-gradient(135deg,#135685,#2090dd)",
};

export var BIS = [
  { slot: "head", id: 249979, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 249977, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 249982, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 249980, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 249371, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "legs", id: 249324, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "feet", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 237845, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", id: 251209, source: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "hands", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251215, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "waist", id: 244611, source: "Crafted", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "enh-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49824:["crit","haste"],50233:["crit","haste"],151309:["haste","vers"],
  151320:["haste","mastery"],151323:["haste","mastery"],237845:[],244584:[],
  244611:["haste","mastery"],249283:["haste","mastery"],249287:["haste","mastery"],249324:["haste","mastery"],
  249325:["crit","mastery"],249343:["mastery"],249346:[],249368:["haste","mastery"],
  249369:["haste","mastery"],249370:["haste","mastery"],249371:["haste","mastery"],249920:["haste"],
  249977:["crit","haste"],249979:["haste","mastery"],249980:["crit","mastery"],249982:["haste","mastery"],
  250144:[],250247:["haste","mastery"],250256:[],251089:["haste","mastery"],
  251093:["haste","mastery"],251096:["haste","vers"],251115:["haste","mastery"],251170:["crit","mastery"],
  251190:["haste","mastery"],251209:["mastery","vers"],251215:["crit","mastery"],258436:["haste","mastery"],
  258438:["haste","mastery"],258576:["crit","haste"],260312:["crit","haste"],268287:["haste","mastery"],
  268290:["haste","mastery"],
};

