export var SPEC_LABEL = "Vengeance Demon Hunter";
export var SPEC_KEY = "veng-dh";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/vengeance-demon-hunter-raid-guide";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "vengeance";
export var SPEC_ICON = "ability_demonhunter_spectank";
export var STORAGE_KEY = "bis-veng-dh-v1";

export var THEME = {
  accent: "#4dca4d",
  accentLight: "#94df94",
  accentBg: "#0c1e0c",
  accentBorder: "#1b471b",
  shimmer: "linear-gradient(90deg,#2e792e,#4dca4d,#94df94,#4dca4d,#2e792e)",
  btnBg: "linear-gradient(135deg,#2e792e,#4dca4d)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 271537, source: "Tier", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 271535, source: "Tier", stats: ["crit","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271540, source: "Tier", stats: ["haste","vers"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271538, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271536, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", id: 251153, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268209, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 237840, source: "Crafted", stats: [] },
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
  { slot: "main_hand", id: 251143, source: "Den of Nalorakk", stats: ["haste","vers"] },
  { slot: "off_hand", id: 251143, source: "Den of Nalorakk", stats: ["haste","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268261, source: "The Twin Fangs", stats: ["crit","haste"] },
  { forSlot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { forSlot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { forSlot: "shoulder", id: 273774, source: "Altar of Fangs", stats: ["crit","vers"] },
  { forSlot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","vers","crit","mastery"];

export var STAT_CACHE_KEY = "veng-dh-stat-cache-v1";

export var KNOWN_STATS = {
  159301:["crit","haste"],159312:["crit","mastery"],159313:["haste","vers"],159317:["haste","mastery"],
  159459:["haste","vers"],193763:["crit","haste"],237840:[],244576:[],
  249294:["haste","mastery"],250215:[],250228:[],251124:["crit","haste"],
  251130:["crit","mastery"],251135:["crit","haste"],251143:["haste","vers"],251146:["crit","vers"],
  251153:["crit","haste"],251173:["crit","haste"],251190:["haste","mastery"],251223:["crit","haste"],
  251224:["haste","mastery"],251226:["crit","vers"],251234:["crit","mastery"],268209:["haste","mastery"],
  268211:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],268256:["haste","mastery"],
  268261:["crit","haste"],268266:["haste","vers"],270164:[],270173:[],
  271535:["crit","vers"],271536:["crit","mastery"],271537:["crit","mastery"],271538:["crit","mastery"],
  271540:["haste","vers"],271875:["haste"],273774:["crit","vers"],273778:["haste","mastery"],
  273781:["crit","haste"],273791:["crit","haste"],273792:["crit","haste"],
};

