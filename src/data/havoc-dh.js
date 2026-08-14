export var SPEC_LABEL = "Havoc Demon Hunter";
export var SPEC_KEY = "havoc-dh";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/havoc-demon-hunter-raid-guide";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "havoc";
export var SPEC_ICON = "ability_demonhunter_specdps";
export var STORAGE_KEY = "bis-havoc-dh-v1";

export var THEME = {
  accent: "#A330C9",
  accentLight: "#c883df",
  accentBg: "#18071e",
  accentBorder: "#391146",
  shimmer: "linear-gradient(90deg,#621d79,#A330C9,#c883df,#A330C9,#621d79)",
  btnBg: "linear-gradient(135deg,#621d79,#A330C9)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271535, source: "Tier", stats: ["crit","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271540, source: "Tier", stats: ["haste","vers"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271538, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271536, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268209, source: "The Coiled Altar & Crafted", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 237840, source: "The Coiled Altar & Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 159318, source: "Temple of Sethraliss", stats: [] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 239048, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "wrist", id: 251183, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { slot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251186, source: "The Blinding Vale & Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 251231, source: "The Blinding Vale & Voidscar Arena", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { forSlot: "shoulder", id: 273774, source: "Altar of Fangs", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 160216, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273780, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "havoc-dh-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159312:["crit","mastery"],159317:["haste","mastery"],159318:[],
  159327:["crit","mastery"],160216:["crit","mastery"],237840:[],239048:["crit","mastery"],
  244576:[],250215:[],250228:[],251130:["crit","mastery"],
  251132:["crit","mastery"],251136:["crit","mastery"],251146:["crit","vers"],251183:["crit","mastery"],
  251186:["crit","mastery"],251190:["haste","mastery"],251223:["crit","haste"],251224:["haste","mastery"],
  251231:["crit","haste"],251234:["crit","mastery"],251513:["crit","mastery"],268209:["haste","mastery"],
  268211:["haste","mastery"],268249:["crit","mastery"],268253:["haste","mastery"],268256:["haste","mastery"],
  268265:["crit"],270173:[],270175:["crit"],271535:["crit","vers"],
  271536:["crit","mastery"],271537:["crit","mastery"],271538:["crit","mastery"],271540:["haste","vers"],
  271875:["haste"],273774:["crit","vers"],273778:["haste","mastery"],273780:["crit","mastery"],
  275070:["crit","haste"],
};

