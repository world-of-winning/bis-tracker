export var SPEC_LABEL = "Balance Druid";
export var SPEC_KEY = "balance-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/balance-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "balance";
export var SPEC_ICON = "spell_nature_starfall";
export var STORAGE_KEY = "bis-balance-druid-v1";

export var THEME = {
  accent: "#FF7C0A",
  accentLight: "#ffb06c",
  accentBg: "#261302",
  accentBorder: "#592b04",
  shimmer: "linear-gradient(90deg,#994a06,#FF7C0A,#ffb06c,#FF7C0A,#994a06)",
  btnBg: "linear-gradient(135deg,#994a06,#FF7C0A)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271526, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271531, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271529, source: "Tier", stats: ["mastery","vers"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271527, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 271530, source: "Catalyst", stats: ["mastery","vers"] },
  { slot: "finger1", id: 251194, source: "The Blinding Vale", stats: ["mastery","vers"] },
  { slot: "finger2", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251140, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 159337, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { slot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { slot: "legs", id: 159329, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251194, source: "The Blinding Vale", stats: ["mastery","vers"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251191, source: "The Blinding Vale", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 159304, source: "Kings' Rest", stats: ["mastery","vers"] },
  { forSlot: "legs", id: 251198, source: "The Blinding Vale", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 268197, source: "Entombed Sentinels", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "balance-druid-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159304:["mastery","vers"],159317:["haste","mastery"],159327:["crit","mastery"],
  159329:["mastery","vers"],159337:["mastery","vers"],244576:[],245769:[],
  250214:[],251132:["crit","mastery"],251135:["crit","haste"],251136:["crit","mastery"],
  251140:["haste","mastery"],251159:["haste","mastery"],251190:["haste","mastery"],251191:["haste","mastery"],
  251194:["mastery","vers"],251198:["mastery","vers"],251223:["crit","haste"],251234:["crit","mastery"],
  251513:["crit","mastery"],268197:["haste","mastery"],268235:["haste","mastery"],268249:["crit","mastery"],
  268253:["haste","mastery"],268256:["haste","mastery"],268265:["crit"],270164:[],
  271092:["haste"],271526:["crit","mastery"],271527:["crit","haste"],271529:["mastery","vers"],
  271530:["mastery","vers"],271531:["crit","haste"],271875:["haste"],273778:["haste","mastery"],
  273796:[],
};

