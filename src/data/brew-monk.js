export var SPEC_LABEL = "Brewmaster Monk";
export var SPEC_KEY = "brew-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/brewmaster-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "brewmaster";
export var SPEC_ICON = "spell_monk_brewmaster_spec";
export var STORAGE_KEY = "bis-brew-monk-v1";

export var THEME = {
  accent: "#00AA60",
  accentLight: "#66cca0",
  accentBg: "#001a0e",
  accentBorder: "#003b22",
  shimmer: "linear-gradient(90deg,#00663a,#00AA60,#66cca0,#00AA60,#00663a)",
  btnBg: "linear-gradient(135deg,#00663a,#00AA60)",
};

export var BIS = [
  { slot: "head", id: 271519, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "back", id: 268248, source: "Nek'zali the Soulcoiler", stats: ["crit","vers"] },
  { slot: "chest", id: 271522, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 159300, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "hands", id: 271520, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 251189, source: "The Blinding Vale", stats: ["crit","vers"] },
  { slot: "legs", id: 271518, source: "Tier", stats: ["crit","vers"] },
  { slot: "feet", id: 159304, source: "Kings' Rest", stats: ["mastery","vers"] },
  { slot: "finger1", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { slot: "finger2", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270174, source: "Sszorak", stats: ["mastery"] },
  { slot: "main_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 193751, source: "Ruby Life Pools", stats: ["crit","vers"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "back", id: 159288, source: "Kings' Rest", stats: ["mastery","vers"] },
  { slot: "chest", id: 251226, source: "Voidscar Arena", stats: ["crit","vers"] },
  { slot: "wrist", id: 159300, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "hands", id: 193758, source: "Ruby Life Pools", stats: ["crit","vers"] },
  { slot: "waist", id: 251189, source: "The Blinding Vale", stats: ["crit","vers"] },
  { slot: "legs", id: 251198, source: "The Blinding Vale", stats: ["mastery","vers"] },
  { slot: "feet", id: 159304, source: "Kings' Rest", stats: ["mastery","vers"] },
  { slot: "finger1", id: 251148, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "finger2", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250244, source: "Den of Nalorakk", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251192, source: "The Blinding Vale", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 159329, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 273774, source: "Altar of Fangs", stats: ["crit","vers"] },
];

export var PRIORITY_STATS = ["vers","crit","mastery","haste"];

export var STAT_CACHE_KEY = "brew-monk-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159288:["mastery","vers"],159300:["crit","vers"],159304:["mastery","vers"],
  159329:["mastery","vers"],193751:["crit","vers"],193758:["crit","vers"],240949:[],
  250228:[],250244:[],251136:["crit","mastery"],251146:["crit","vers"],
  251148:["crit","vers"],251159:["haste","mastery"],251189:["crit","vers"],251192:["crit","vers"],
  251198:["mastery","vers"],251226:["crit","vers"],251234:["crit","mastery"],251513:["crit","mastery"],
  268215:["mastery"],268235:["haste","mastery"],268248:["crit","vers"],268249:["crit","mastery"],
  268265:["crit"],270174:["mastery"],270175:["crit"],271518:["crit","vers"],
  271519:["crit","mastery"],271520:["haste","vers"],271522:["haste","mastery"],273774:["crit","vers"],
};

