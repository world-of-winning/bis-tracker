export var SPEC_LABEL = "Frost Mage";
export var SPEC_KEY = "frost-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/frost-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "frost";
export var SPEC_ICON = "spell_frost_frostbolt02";
export var STORAGE_KEY = "bis-frost-mage-v1";

export var THEME = {
  accent: "#3FC7EB",
  accentLight: "#8cddf3",
  accentBg: "#091e23",
  accentBorder: "#164652",
  shimmer: "linear-gradient(90deg,#26778d,#3FC7EB,#8cddf3,#3FC7EB,#26778d)",
  btnBg: "linear-gradient(135deg,#26778d,#3FC7EB)",
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
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251232, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 159257, source: "Temple of Sethraliss", stats: [] },
  { slot: "wrist", id: 251154, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "hands", id: 273773, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { slot: "waist", id: 159255, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { slot: "legs", id: 193750, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 159636, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "legs", id: 159234, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "frost-mage-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159234:["crit","mastery"],159255:["mastery","vers"],159257:[],
  159636:["haste","mastery"],193750:["crit","mastery"],239031:["crit","haste"],239648:[],
  245769:[],250214:[],250215:[],251136:["crit","mastery"],
  251137:["haste","mastery"],251139:["crit","haste"],251154:["crit","mastery"],251190:["haste","mastery"],
  251232:["haste","mastery"],251234:["crit","mastery"],251513:["crit","mastery"],268211:["haste","mastery"],
  268249:["crit","mastery"],268253:["haste","mastery"],268255:["haste","mastery"],268265:["crit"],
  270164:[],271092:["haste"],271561:["mastery","vers"],271562:["crit","haste"],
  271563:["crit","vers"],271565:["haste","mastery"],271567:["crit","haste"],271874:["mastery"],
  273773:["crit","mastery"],273778:["haste","mastery"],
};

