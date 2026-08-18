export var SPEC_LABEL = "Mistweaver Monk";
export var SPEC_KEY = "mw-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/mistweaver-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "mistweaver";
export var SPEC_ICON = "spell_monk_mistweaver_spec";
export var STORAGE_KEY = "bis-mw-monk-v1";

export var THEME = {
  accent: "#60d0a0",
  accentLight: "#a0e3c6",
  accentBg: "#0e1f18",
  accentBorder: "#224938",
  shimmer: "linear-gradient(90deg,#3a7d60,#60d0a0,#a0e3c6,#60d0a0,#3a7d60)",
  btnBg: "linear-gradient(135deg,#3a7d60,#60d0a0)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271517, source: "Tier", stats: ["haste","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271522, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271520, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271518, source: "Tier", stats: ["crit","vers"] },
  { slot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 273791, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "shoulder", id: 273774, source: "Altar of Fangs", stats: ["crit","vers"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251226, source: "Voidscar Arena", stats: ["crit","vers"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 159301, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 273649, source: "Kings' Rest", stats: [] },
  { slot: "main_hand", id: 159636, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { forSlot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { forSlot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268209, source: "Ula'tek", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = [["haste"],["crit"],["vers"],["mastery"]];

export var STAT_CACHE_KEY = "mw-monk-stat-cache-v1";

export var KNOWN_STATS = {
  159301:["crit","haste"],159317:["haste","mastery"],159459:["haste","vers"],159636:["haste","mastery"],
  193763:["crit","haste"],244576:[],245769:[],249294:["haste","mastery"],
  250215:[],251124:["crit","haste"],251130:["crit","mastery"],251135:["crit","haste"],
  251146:["crit","vers"],251153:["crit","haste"],251159:["haste","mastery"],251173:["crit","haste"],
  251190:["haste","mastery"],251224:["haste","mastery"],251226:["crit","vers"],268209:["haste","mastery"],
  268211:["haste","mastery"],268235:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268256:["haste","mastery"],268261:["crit","haste"],268265:["crit"],268266:["haste","vers"],
  270164:[],270167:["haste"],271092:["haste"],271517:["haste","mastery"],
  271518:["crit","vers"],271520:["haste","vers"],271522:["haste","mastery"],271875:["haste"],
  273649:[],273774:["crit","vers"],273778:["haste","mastery"],273779:["crit","haste"],
  273781:["crit","haste"],273791:["crit","haste"],273792:["crit","haste"],
};

