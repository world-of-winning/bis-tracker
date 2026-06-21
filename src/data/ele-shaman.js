export var SPEC_LABEL = "Elemental Shaman";
export var SPEC_KEY = "ele-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/elemental-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "elemental";
export var SPEC_ICON = "spell_nature_lightning";
export var STORAGE_KEY = "bis-ele-shaman-v1";

export var THEME = {
  accent: "#0070DD",
  accentLight: "#66a9eb",
  accentBg: "#001121",
  accentBorder: "#00274d",
  shimmer: "linear-gradient(90deg,#004385,#0070DD,#66a9eb,#0070DD,#004385)",
  btnBg: "linear-gradient(135deg,#004385,#0070DD)",
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
  { slot: "main_hand", id: 237844, source: "Crafted", stats: [] },
  { slot: "off_hand", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
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
  { slot: "main_hand", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
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
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258049, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "ele-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49810:["crit","haste"],49824:["crit","haste"],50233:["crit","haste"],
  151309:["haste","vers"],151320:["haste","mastery"],151323:["haste","mastery"],237844:[],
  244584:[],244611:["haste","mastery"],249284:["crit","mastery"],249295:["crit","haste"],
  249324:["haste","mastery"],249325:["crit","mastery"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249371:["haste","mastery"],
  249920:["haste"],249977:["crit","haste"],249979:["haste","mastery"],249980:["crit","mastery"],
  249982:["haste","mastery"],250144:[],250247:["haste","mastery"],250256:[],
  251089:["haste","mastery"],251093:["haste","mastery"],251096:["haste","vers"],251105:["crit","mastery"],
  251111:["crit","haste"],251115:["haste","mastery"],251170:["crit","mastery"],251175:["crit","mastery"],
  251178:["crit","haste"],251190:["haste","mastery"],251209:["mastery","vers"],251215:["crit","mastery"],
  258049:["crit","mastery"],258525:["crit","haste"],258576:["crit","haste"],260312:["crit","haste"],
  268287:["haste","mastery"],268290:["haste","mastery"],
};

