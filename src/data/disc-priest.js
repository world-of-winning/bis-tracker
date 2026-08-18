export var SPEC_LABEL = "Discipline Priest";
export var SPEC_KEY = "disc-priest";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/discipline-priest-raid-guide";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "discipline";
export var SPEC_ICON = "spell_holy_powerwordshield";
export var STORAGE_KEY = "bis-disc-priest-v1";

export var THEME = {
  accent: "#b0b0b0",
  accentLight: "#d0d0d0",
  accentBg: "#1a1a1a",
  accentBorder: "#3e3e3e",
  shimmer: "linear-gradient(90deg,#6a6a6a,#b0b0b0,#d0d0d0,#b0b0b0,#6a6a6a)",
  btnBg: "linear-gradient(135deg,#6a6a6a,#b0b0b0)",
};

export var BIS = [
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271556, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268257, source: "Crafted", stats: ["haste","mastery"] },
  { slot: "legs", id: 251160, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251232, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "wrist", id: 251127, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 159247, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "waist", id: 193691, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { slot: "legs", id: 251160, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "feet", id: 251219, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 159636, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "feet", id: 159259, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 273773, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 271553, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "waist", id: 251185, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = [["haste"],["mastery"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "disc-priest-stat-cache-v1";

export var KNOWN_STATS = {
  159247:["crit","haste"],159259:["crit","haste"],159636:["haste","mastery"],193691:["haste","mastery"],
  239031:["crit","haste"],239648:[],245769:[],250214:[],
  250215:[],251127:["crit","haste"],251137:["haste","mastery"],251139:["crit","haste"],
  251160:["crit","haste"],251173:["crit","haste"],251185:["haste","mastery"],251190:["haste","mastery"],
  251219:["crit","haste"],251232:["haste","mastery"],252258:["haste","mastery"],268252:["crit","haste"],
  268253:["haste","mastery"],268255:["haste","mastery"],268257:["haste","mastery"],268265:["crit"],
  270164:[],270167:["haste"],271092:["haste"],271553:["crit","haste"],
  271556:["crit","mastery"],271874:["mastery"],273773:["crit","mastery"],273778:["haste","mastery"],
  273781:["crit","haste"],273792:["crit","haste"],
};

