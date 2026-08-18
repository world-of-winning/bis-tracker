export var SPEC_LABEL = "Subtlety Rogue";
export var SPEC_KEY = "sub-rogue";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/subtlety-rogue-raid-guide";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "subtlety";
export var SPEC_ICON = "ability_stealth";
export var STORAGE_KEY = "bis-sub-rogue-v1";

export var THEME = {
  accent: "#ca9060",
  accentLight: "#dfbca0",
  accentBg: "#1e160e",
  accentBorder: "#473222",
  shimmer: "linear-gradient(90deg,#79563a,#ca9060,#dfbca0,#ca9060,#79563a)",
  btnBg: "linear-gradient(135deg,#79563a,#ca9060)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271508, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 271513, source: "Tier", stats: ["haste","vers"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271511, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271509, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 271093, source: "Ula'tek", stats: ["crit"] },
  { slot: "off_hand", id: 271093, source: "Ula'tek", stats: ["crit"] },
];

export var MYTHIC = [
  { slot: "head", id: 273791, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { slot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250259, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "off_hand", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["mastery"],["haste"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "sub-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158373:["crit","haste"],159312:["crit","mastery"],159317:["haste","mastery"],
  159327:["crit","mastery"],193767:["crit","haste"],244576:[],250215:[],
  250259:[],251124:["crit","haste"],251130:["crit","mastery"],251135:["crit","haste"],
  251136:["crit","mastery"],251153:["crit","haste"],251159:["haste","mastery"],251173:["crit","haste"],
  251190:["haste","mastery"],251195:["crit","haste"],251223:["crit","haste"],251513:["crit","mastery"],
  268235:["haste","mastery"],268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268256:["haste","mastery"],268261:["crit","haste"],268265:["crit"],270173:[],
  270175:["crit"],271093:["crit"],271508:["haste","vers"],271509:["crit","haste"],
  271511:["crit","mastery"],271513:["haste","vers"],271875:["haste"],273781:["crit","haste"],
  273791:["crit","haste"],273792:["crit","haste"],275070:["crit","haste"],
};

