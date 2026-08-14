export var SPEC_LABEL = "Preservation Evoker";
export var SPEC_KEY = "pres-evoker";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/preservation-evoker-raid-guide";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "preservation";
export var SPEC_ICON = "classicon_evoker_preservation";
export var STORAGE_KEY = "bis-pres-evoker-v1";

export var THEME = {
  accent: "#60ca8b",
  accentLight: "#a0dfb9",
  accentBg: "#0e1e15",
  accentBorder: "#224731",
  shimmer: "linear-gradient(90deg,#3a7953,#60ca8b,#a0dfb9,#60ca8b,#3a7953)",
  btnBg: "linear-gradient(135deg,#3a7953,#60ca8b)",
};

export var BIS = [
  { slot: "head", id: 271501, source: "Tier", stats: ["haste","vers"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271499, source: "Tier", stats: ["crit","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271876, source: "Ula'tek", stats: ["crit"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 271502, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 251155, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "legs", id: 271500, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 244577, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 268263, source: "Nymrissa Wavecaller", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 159374, source: "Temple of Sethraliss", stats: [] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239049, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251233, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "hands", id: 193752, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "waist", id: 251155, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "legs", id: 159375, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "feet", id: 159388, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 193761, source: "Ruby Life Pools", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268258, source: "The Lost Explorers", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 160213, source: "Kings' Rest", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251131, source: "Murder Row", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 160216, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251186, source: "The Blinding Vale & Voidscar Arena", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 273780, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "pres-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159374:[],159375:["crit","haste"],159380:["crit","haste"],
  159388:["crit","mastery"],160213:["haste","mastery"],160216:["crit","mastery"],193752:["crit","mastery"],
  193761:["crit","mastery"],239049:["crit","haste"],244577:[],244584:[],
  249294:["haste","mastery"],250214:[],250215:[],251131:["crit","vers"],
  251132:["crit","mastery"],251136:["crit","mastery"],251155:["crit","mastery"],251186:["crit","mastery"],
  251190:["haste","mastery"],251200:["crit","haste"],251233:["crit","haste"],251234:["crit","mastery"],
  251513:["crit","mastery"],268249:["crit","mastery"],268253:["haste","mastery"],268258:["crit","mastery"],
  268263:["crit","mastery"],268265:["crit"],270164:[],270167:["haste"],
  271092:["haste"],271499:["crit","vers"],271500:["crit","haste"],271501:["haste","vers"],
  271502:["haste","mastery"],271876:["crit"],273780:["crit","mastery"],
};

