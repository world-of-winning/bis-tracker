export var SPEC_LABEL = "Devourer Demon Hunter";
export var SPEC_KEY = "devourer-dh";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/devourer-demon-hunter-raid-guide";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "devourer";
export var SPEC_ICON = "classicon_demonhunter_void";
export var STORAGE_KEY = "bis-devourer-dh-v1";

export var THEME = {
  accent: "#ca30a3",
  accentLight: "#df83c8",
  accentBg: "#1e0718",
  accentBorder: "#471139",
  shimmer: "linear-gradient(90deg,#791d62,#ca30a3,#df83c8,#ca30a3,#791d62)",
  btnBg: "linear-gradient(135deg,#791d62,#ca30a3)",
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
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek & The Coiled Altar", stats: ["haste"] },
  { slot: "off_hand", id: 268211, source: "Ula'tek & The Coiled Altar", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251140, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251223, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251159, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251135, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { slot: "legs", id: 251130, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250259, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 159312, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 251146, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { forSlot: "shoulder", id: 273774, source: "Altar of Fangs", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251224, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268209, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = [["mastery"],["haste"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "devourer-dh-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159312:["crit","mastery"],159317:["haste","mastery"],159327:["crit","mastery"],
  244569:[],244576:[],250215:[],250259:[],
  251124:["crit","haste"],251130:["crit","mastery"],251132:["crit","mastery"],251135:["crit","haste"],
  251136:["crit","mastery"],251140:["haste","mastery"],251146:["crit","vers"],251159:["haste","mastery"],
  251173:["crit","haste"],251190:["haste","mastery"],251223:["crit","haste"],251224:["haste","mastery"],
  251513:["crit","mastery"],252258:["haste","mastery"],268209:["haste","mastery"],268211:["haste","mastery"],
  268235:["haste","mastery"],268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268256:["haste","mastery"],268265:["crit"],270164:[],271092:["haste"],
  271535:["crit","vers"],271536:["crit","mastery"],271538:["crit","mastery"],271540:["haste","vers"],
  271875:["haste"],273774:["crit","vers"],273778:["haste","mastery"],273781:["crit","haste"],
  273792:["crit","haste"],
};

