export var SPEC_LABEL = "Survival Hunter";
export var SPEC_KEY = "surv-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/survival-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "survival";
export var SPEC_ICON = "ability_hunter_camouflage";
export var STORAGE_KEY = "bis-surv-hunter-v1";

export var THEME = {
  accent: "#d4aa60",
  accentLight: "#e5cca0",
  accentBg: "#201a0e",
  accentBorder: "#4a3b22",
  shimmer: "linear-gradient(90deg,#7f663a,#d4aa60,#e5cca0,#d4aa60,#7f663a)",
  btnBg: "linear-gradient(135deg,#7f663a,#d4aa60)",
};

export var BIS = [
  { slot: "head", id: 271492, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271490, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271495, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 271493, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 244581, source: "Crafted", stats: [] },
  { slot: "legs", id: 271491, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 268233, source: "Sszorak", stats: ["haste","mastery"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251220, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239049, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 251233, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
  { slot: "hands", id: 160213, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "waist", id: 251228, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "legs", id: 159375, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "feet", id: 159388, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251149, source: "Den of Nalorakk", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "feet", id: 268258, source: "The Lost Explorers", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "hands", id: 193752, source: "Ruby Life Pools", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "hands", id: 251165, source: "The Blinding Vale", stats: ["crit","vers"], fit: "equivalent" },
  { forSlot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "trinket", id: 270167, source: "Altar of Fangs", stats: ["haste"], fit: "equivalent" },
  { forSlot: "waist", id: 268254, source: "Vashnik the Malignant", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251155, source: "Den of Nalorakk", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 268213, source: "The Coiled Altar", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["mastery"],["crit","haste"],["vers"]];

export var STAT_CACHE_KEY = "surv-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159375:["crit","haste"],159380:["crit","haste"],159388:["crit","mastery"],
  160213:["haste","mastery"],193752:["crit","mastery"],239049:["crit","haste"],244581:[],
  244584:[],249294:["haste","mastery"],250228:[],251132:["crit","mastery"],
  251136:["crit","mastery"],251142:["haste","mastery"],251149:["haste","mastery"],251155:["crit","mastery"],
  251165:["crit","vers"],251190:["haste","mastery"],251200:["crit","haste"],251220:["haste","mastery"],
  251228:["haste","mastery"],251233:["crit","haste"],251234:["crit","mastery"],251513:["crit","mastery"],
  252258:["haste","mastery"],268213:["crit","mastery"],268215:["mastery"],268233:["haste","mastery"],
  268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268254:["haste","mastery"],268258:["crit","mastery"],268265:["crit"],270167:["haste"],
  270173:[],270175:["crit"],271490:["crit","haste"],271491:["haste","mastery"],
  271492:["haste","mastery"],271493:["haste","vers"],271495:["haste","mastery"],273792:["crit","haste"],
  273796:[],275070:["crit","haste"],
};

