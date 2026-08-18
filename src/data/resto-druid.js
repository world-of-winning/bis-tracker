export var SPEC_LABEL = "Restoration Druid";
export var SPEC_KEY = "resto-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/restoration-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_healingtouch";
export var STORAGE_KEY = "bis-resto-druid-v1";

export var THEME = {
  accent: "#60d060",
  accentLight: "#a0e3a0",
  accentBg: "#0e1f0e",
  accentBorder: "#224922",
  shimmer: "linear-gradient(90deg,#3a7d3a,#60d060,#a0e3a0,#60d060,#3a7d3a)",
  btnBg: "linear-gradient(135deg,#3a7d3a,#60d060)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 271526, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271527, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251140, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 251166, source: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "legs", id: 159313, source: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 273649, source: "Kings' Rest", stats: [] },
  { slot: "main_hand", id: 159636, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { forSlot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "legs", id: 159329, source: "Temple of Sethraliss", stats: ["mastery","vers"], fit: "equivalent" },
  { forSlot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "legs", id: 251198, source: "The Blinding Vale", stats: ["mastery","vers"], fit: "equivalent" },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { forSlot: "ring", id: 251194, source: "The Blinding Vale", stats: ["mastery","vers"], fit: "equivalent" },
  { forSlot: "trinket", id: 270168, source: "Ula'tek", stats: ["mastery"], fit: "equivalent" },
  { forSlot: "trinket", id: 270174, source: "Sszorak", stats: ["mastery"], fit: "equivalent" },
  { forSlot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 251183, source: "The Blinding Vale", stats: ["crit","mastery"], fit: "equivalent" },
];

export var PRIORITY_STATS = [["haste","mastery"],["vers"],["crit"]];

export var STAT_CACHE_KEY = "resto-druid-stat-cache-v1";

export var KNOWN_STATS = {
  159312:["crit","mastery"],159313:["haste","vers"],159317:["haste","mastery"],159327:["crit","mastery"],
  159329:["mastery","vers"],159459:["haste","vers"],159636:["haste","mastery"],240949:[],
  244569:[],244576:[],245769:[],250214:[],
  251124:["crit","haste"],251130:["crit","mastery"],251135:["crit","haste"],251140:["haste","mastery"],
  251142:["haste","mastery"],251153:["crit","haste"],251159:["haste","mastery"],251166:["haste","vers"],
  251183:["crit","mastery"],251190:["haste","mastery"],251191:["haste","mastery"],251194:["mastery","vers"],
  251198:["mastery","vers"],251223:["crit","haste"],252258:["haste","mastery"],268235:["haste","mastery"],
  268251:["haste","mastery"],268253:["haste","mastery"],268256:["haste","mastery"],268261:["crit","haste"],
  268266:["haste","vers"],270164:[],270167:["haste"],270168:["mastery"],
  270174:["mastery"],271092:["haste"],271526:["crit","mastery"],271527:["crit","haste"],
  271875:["haste"],273649:[],273778:["haste","mastery"],
};

