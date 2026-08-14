export var SPEC_LABEL = "Arcane Mage";
export var SPEC_KEY = "arcane-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/arcane-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "arcane";
export var SPEC_ICON = "spell_holy_magicalsentry";
export var STORAGE_KEY = "bis-arcane-mage-v1";

export var THEME = {
  accent: "#69CCF0",
  accentLight: "#a5e0f6",
  accentBg: "#101f24",
  accentBorder: "#254754",
  shimmer: "linear-gradient(90deg,#3f7a90,#69CCF0,#a5e0f6,#69CCF0,#3f7a90)",
  btnBg: "linear-gradient(135deg,#3f7a90,#69CCF0)",
};

export var BIS = [
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271562, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271567, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271565, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 271561, source: "Catalyst", stats: ["mastery","vers"] },
  { slot: "legs", id: 271563, source: "Tier", stats: ["crit","vers"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251199, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 159257, source: "Temple of Sethraliss", stats: [] },
  { slot: "wrist", id: 251127, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251129, source: "Murder Row", stats: ["mastery","vers"] },
  { slot: "waist", id: 159255, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { slot: "legs", id: 193750, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "feet", id: 251219, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250224, source: "Voidscar Arena", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 159667, source: "Kings' Rest", stats: ["haste","vers"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "feet", id: 159259, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 159234, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "arcane-mage-stat-cache-v1";

export var KNOWN_STATS = {
  159234:["crit","mastery"],159255:["mastery","vers"],159257:[],159259:["crit","haste"],
  159459:["haste","vers"],159667:["haste","vers"],193750:["crit","mastery"],239031:["crit","haste"],
  239648:[],245769:[],250215:[],250224:[],
  251127:["crit","haste"],251129:["mastery","vers"],251137:["haste","mastery"],251139:["crit","haste"],
  251173:["crit","haste"],251190:["haste","mastery"],251199:["crit","mastery"],251219:["crit","haste"],
  252258:["haste","mastery"],268211:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268255:["haste","mastery"],268265:["crit"],268266:["haste","vers"],270164:[],
  271092:["haste"],271561:["mastery","vers"],271562:["crit","haste"],271563:["crit","vers"],
  271565:["haste","mastery"],271567:["crit","haste"],271874:["mastery"],273778:["haste","mastery"],
  273781:["crit","haste"],273792:["crit","haste"],
};

