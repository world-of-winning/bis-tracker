export var SPEC_LABEL = "Fire Mage";
export var SPEC_KEY = "fire-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/fire-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "fire";
export var SPEC_ICON = "spell_fire_firebolt02";
export var STORAGE_KEY = "bis-fire-mage-v1";

export var THEME = {
  accent: "#ca5030",
  accentLight: "#df9683",
  accentBg: "#1e0c07",
  accentBorder: "#471c11",
  shimmer: "linear-gradient(90deg,#79301d,#ca5030,#df9683,#ca5030,#79301d)",
  btnBg: "linear-gradient(135deg,#79301d,#ca5030)",
};

export var BIS = [
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 271562, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271567, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271565, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 271561, source: "Catalyst", stats: ["mastery","vers"] },
  { slot: "legs", id: 271563, source: "Tier", stats: ["crit","vers"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251232, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 239045, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "back", id: 159288, source: "Kings' Rest", stats: ["mastery","vers"] },
  { slot: "chest", id: 251147, source: "Den of Nalorakk", stats: ["mastery","vers"] },
  { slot: "wrist", id: 251127, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251129, source: "Murder Row", stats: ["mastery","vers"] },
  { slot: "waist", id: 251185, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "legs", id: 193750, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "feet", id: 159243, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 250224, source: "Voidscar Arena", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 159667, source: "Kings' Rest", stats: ["haste","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 159234, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { forSlot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "waist", id: 159255, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { forSlot: "waist", id: 193691, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 268257, source: "Crafted", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","mastery","vers","crit"];

export var STAT_CACHE_KEY = "fire-mage-stat-cache-v1";

export var KNOWN_STATS = {
  159234:["crit","mastery"],159243:["haste","vers"],159255:["mastery","vers"],159288:["mastery","vers"],
  159459:["haste","vers"],159667:["haste","vers"],193691:["haste","mastery"],193750:["crit","mastery"],
  239031:["crit","haste"],239045:["haste","mastery"],239648:[],245769:[],
  250214:[],250224:[],251127:["crit","haste"],251129:["mastery","vers"],
  251137:["haste","mastery"],251139:["crit","haste"],251142:["haste","mastery"],251147:["mastery","vers"],
  251185:["haste","mastery"],251190:["haste","mastery"],251232:["haste","mastery"],252258:["haste","mastery"],
  268211:["haste","mastery"],268251:["haste","mastery"],268253:["haste","mastery"],268255:["haste","mastery"],
  268257:["haste","mastery"],268266:["haste","vers"],270164:[],270167:["haste"],
  271092:["haste"],271561:["mastery","vers"],271562:["crit","haste"],271563:["crit","vers"],
  271565:["haste","mastery"],271567:["crit","haste"],271874:["mastery"],273778:["haste","mastery"],
};

