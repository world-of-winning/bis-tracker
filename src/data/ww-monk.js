export var SPEC_LABEL = "Windwalker Monk";
export var SPEC_KEY = "ww-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/windwalker-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "windwalker";
export var SPEC_ICON = "spell_monk_windwalker_spec";
export var STORAGE_KEY = "bis-ww-monk-v1";

export var THEME = {
  accent: "#00FF98",
  accentLight: "#66ffc1",
  accentBg: "#002617",
  accentBorder: "#005935",
  shimmer: "linear-gradient(90deg,#00995b,#00FF98,#66ffc1,#00FF98,#00995b)",
  btnBg: "linear-gradient(135deg,#00995b,#00FF98)",
};

export var BIS = [
  { slot: "head", id: 271519, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271517, source: "Tier", stats: ["haste","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271522, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 251124, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 271518, source: "Tier", stats: ["crit","vers"] },
  { slot: "feet", id: 159327, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
  { slot: "off_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
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
  { slot: "main_hand", id: 273783, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 273783, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "chest", id: 268235, source: "Nek'zali the Soulcoiler", stats: ["haste","mastery"] },
  { forSlot: "head", id: 273791, source: "Altar of Fangs", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "legs", id: 159329, source: "Temple of Sethraliss", stats: ["mastery","vers"], fit: "equivalent" },
  { forSlot: "legs", id: 251198, source: "The Blinding Vale", stats: ["mastery","vers"], fit: "equivalent" },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "trinket", id: 270168, source: "Ula'tek", stats: ["mastery"], fit: "equivalent" },
  { forSlot: "trinket", id: 270174, source: "Sszorak", stats: ["mastery"], fit: "equivalent" },
  { forSlot: "waist", id: 159301, source: "Kings' Rest", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268209, source: "Ula'tek", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "weapon", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"], fit: "equivalent" },
];

export var PRIORITY_STATS = [["haste"],["crit","mastery"],["vers"]];

export var STAT_CACHE_KEY = "ww-monk-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158373:["crit","haste"],159301:["crit","haste"],159317:["haste","mastery"],
  159327:["crit","mastery"],159329:["mastery","vers"],193763:["crit","haste"],193767:["crit","haste"],
  244576:[],249294:["haste","mastery"],250215:[],250259:[],
  251124:["crit","haste"],251130:["crit","mastery"],251132:["crit","mastery"],251135:["crit","haste"],
  251136:["crit","mastery"],251140:["haste","mastery"],251142:["haste","mastery"],251159:["haste","mastery"],
  251173:["crit","haste"],251190:["haste","mastery"],251195:["crit","haste"],251198:["mastery","vers"],
  251223:["crit","haste"],251224:["haste","mastery"],251513:["crit","mastery"],252258:["haste","mastery"],
  268209:["haste","mastery"],268211:["haste","mastery"],268215:["mastery"],268235:["haste","mastery"],
  268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268256:["haste","mastery"],268265:["crit"],270168:["mastery"],270173:[],
  270174:["mastery"],270175:["crit"],271517:["haste","mastery"],271518:["crit","vers"],
  271519:["crit","mastery"],271522:["haste","mastery"],273781:["crit","haste"],273783:["haste","mastery"],
  273791:["crit","haste"],273792:["crit","haste"],
};

