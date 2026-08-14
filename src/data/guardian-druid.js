export var SPEC_LABEL = "Guardian Druid";
export var SPEC_KEY = "guardian-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/guardian-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "guardian";
export var SPEC_ICON = "ability_racial_bearform";
export var STORAGE_KEY = "bis-guardian-druid-v1";

export var THEME = {
  accent: "#ca7a3d",
  accentLight: "#dfaf8b",
  accentBg: "#1e1209",
  accentBorder: "#472b15",
  shimmer: "linear-gradient(90deg,#794925,#ca7a3d,#dfaf8b,#ca7a3d,#794925)",
  btnBg: "linear-gradient(135deg,#794925,#ca7a3d)",
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
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 273791, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251226, source: "Voidscar Arena", stats: ["crit","vers"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 159301, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "legs", id: 159313, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 250228, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250215, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { forSlot: "hands", id: 159337, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251123, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","vers","crit","mastery"];

export var STAT_CACHE_KEY = "guardian-druid-stat-cache-v1";

export var KNOWN_STATS = {
  158370:["crit","haste"],159301:["crit","haste"],159313:["haste","vers"],159317:["haste","mastery"],
  159337:["mastery","vers"],159459:["haste","vers"],193763:["crit","haste"],244569:[],
  244576:[],250215:[],250228:[],251123:["crit","haste"],
  251124:["crit","haste"],251135:["crit","haste"],251153:["crit","haste"],251173:["crit","haste"],
  251190:["haste","mastery"],251223:["crit","haste"],251226:["crit","vers"],268215:["mastery"],
  268252:["crit","haste"],268253:["haste","mastery"],268256:["haste","mastery"],268261:["crit","haste"],
  268265:["crit"],268266:["haste","vers"],270164:[],270173:[],
  271526:["crit","mastery"],271527:["crit","haste"],271529:["mastery","vers"],271531:["crit","haste"],
  271875:["haste"],273781:["crit","haste"],273782:["crit","haste"],273791:["crit","haste"],
  273792:["crit","haste"],
};

