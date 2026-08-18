export var SPEC_LABEL = "Outlaw Rogue";
export var SPEC_KEY = "outlaw-rogue";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/outlaw-rogue-raid-guide";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "outlaw";
export var SPEC_ICON = "ability_rogue_waylay";
export var STORAGE_KEY = "bis-outlaw-rogue-v1";

export var THEME = {
  accent: "#FFF468",
  accentLight: "#fff8a4",
  accentBg: "#262510",
  accentBorder: "#595524",
  shimmer: "linear-gradient(90deg,#99923e,#FFF468,#fff8a4,#FFF468,#99923e)",
  btnBg: "linear-gradient(135deg,#99923e,#FFF468)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271508, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 268248, source: "Nek'zali the Soulcoiler", stats: ["crit","vers"] },
  { slot: "chest", id: 271513, source: "Tier", stats: ["haste","vers"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271511, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271509, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 268209, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 268209, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 273791, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251226, source: "Voidscar Arena", stats: ["crit","vers"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 251189, source: "The Blinding Vale", stats: ["crit","vers"] },
  { slot: "legs", id: 159313, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "finger1", id: 251148, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 159617, source: "Kings' Rest", stats: [] },
  { slot: "trinket2", id: 250259, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "off_hand", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["crit"],["haste"],["mastery"],["vers"]];

export var STAT_CACHE_KEY = "outlaw-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  158373:["crit","haste"],159312:["crit","mastery"],159313:["haste","vers"],159317:["haste","mastery"],
  159617:[],193763:["crit","haste"],193767:["crit","haste"],237837:[],
  244576:[],249294:["haste","mastery"],250259:[],251124:["crit","haste"],
  251135:["crit","haste"],251148:["crit","vers"],251153:["crit","haste"],251173:["crit","haste"],
  251189:["crit","vers"],251195:["crit","haste"],251223:["crit","haste"],251224:["haste","mastery"],
  251226:["crit","vers"],268209:["haste","mastery"],268211:["haste","mastery"],268248:["crit","vers"],
  268252:["crit","haste"],268256:["haste","mastery"],268261:["crit","haste"],268265:["crit"],
  270173:[],270175:["crit"],271508:["haste","vers"],271509:["crit","haste"],
  271511:["crit","mastery"],271513:["haste","vers"],271875:["haste"],273778:["haste","mastery"],
  273781:["crit","haste"],273791:["crit","haste"],273792:["crit","haste"],275070:["crit","haste"],
};

