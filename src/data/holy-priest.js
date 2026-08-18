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
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271553, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271558, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271556, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 271552, source: "Tier", stats: ["crit","mastery"] },
  { slot: "legs", id: 271554, source: "Tier", stats: ["haste","vers"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270162, source: "Nek'zali the Soulcoiler", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251199, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251227, source: "Voidscar Arena", stats: ["mastery","vers"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 159257, source: "Temple of Sethraliss", stats: [] },
  { slot: "wrist", id: 251154, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "hands", id: 273773, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { slot: "waist", id: 159255, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { slot: "legs", id: 159234, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "feet", id: 159259, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "finger1", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251136, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250214, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 193761, source: "Ruby Life Pools", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251219, source: "Voidscar Arena", stats: ["crit","haste"] },
  { forSlot: "legs", id: 193750, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251225, source: "Voidscar Arena", stats: ["mastery","vers"] },
];

export var PRIORITY_STATS = [["haste"],["mastery"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "holy-priest-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159234:["crit","mastery"],159255:["mastery","vers"],159257:[],
  159259:["crit","haste"],193750:["crit","mastery"],193761:["crit","mastery"],239031:["crit","haste"],
  239648:[],245769:[],250214:[],250215:[],
  251132:["crit","mastery"],251136:["crit","mastery"],251137:["haste","mastery"],251154:["crit","mastery"],
  251190:["haste","mastery"],251199:["crit","mastery"],251219:["crit","haste"],251225:["mastery","vers"],
  251227:["mastery","vers"],251234:["crit","mastery"],251513:["crit","mastery"],268249:["crit","mastery"],
  268253:["haste","mastery"],268255:["haste","mastery"],268265:["crit"],270162:[],
  270164:[],271092:["haste"],271552:["crit","mastery"],271553:["crit","haste"],
  271554:["haste","vers"],271556:["crit","mastery"],271558:["crit","mastery"],271681:["crit","mastery"],
  271874:["mastery"],273773:["crit","mastery"],
};

