export var SPEC_LABEL = "Protection Paladin";
export var SPEC_KEY = "prot-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/protection-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_paladin_shieldofthetemplar";
export var STORAGE_KEY = "bis-prot-paladin-v1";

export var THEME = {
  accent: "#c9a227",
  accentLight: "#dfc77d",
  accentBg: "#1e1806",
  accentBorder: "#46390e",
  shimmer: "linear-gradient(90deg,#796117,#c9a227,#dfc77d,#c9a227,#796117)",
  btnBg: "linear-gradient(135deg,#796117,#c9a227)",
};

export var BIS = [
  { slot: "head", id: 271465, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271463, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271468, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271466, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268209, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 268196, source: "The Lost Explorers", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", id: 239050, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251193, source: "The Blinding Vale", stats: ["haste","vers"] },
  { slot: "wrist", id: 159425, source: "Temple of Sethraliss", stats: ["haste","vers"] },
  { slot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 273777, source: "Altar of Fangs", stats: ["haste","vers"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 158367, source: "Temple of Sethraliss", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { slot: "off_hand", id: 159664, source: "Temple of Sethraliss", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "chest", id: 151329, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 249964, source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268285, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "hands", id: 249962, source: "Tier", stats: ["haste","vers"] },
  { forSlot: "hands", id: 251081, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "hands", id: 258583, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "head", id: 151333, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 249960, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 151311, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249959, source: "Tier", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { forSlot: "waist", id: 151327, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249958, source: "Catalyst", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249275, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251202, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","crit","mastery","vers"];

export var STAT_CACHE_KEY = "prot-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],50228:["crit","haste"],50234:["crit","mastery"],151311:["haste","vers"],
  151327:["haste","mastery"],151329:["haste","mastery"],151332:["haste","vers"],151333:["crit","mastery"],
  158367:[],159418:["haste","mastery"],159425:["haste","vers"],159459:["haste","vers"],
  159664:["crit","vers"],193710:["haste","mastery"],193763:["crit","haste"],221200:["mastery","vers"],
  237828:[],237834:[],239037:["crit","haste"],239050:["haste","vers"],
  249275:["crit","vers"],249287:["haste","mastery"],249294:["haste","mastery"],249295:["crit","haste"],
  249337:["crit","haste"],249369:["haste","mastery"],249370:["haste","mastery"],249958:["haste","mastery"],
  249959:["crit","mastery"],249960:["crit","haste"],249962:["haste","vers"],249964:["haste","mastery"],
  250228:[],250247:["haste","mastery"],251081:["crit","haste"],251105:["crit","mastery"],
  251115:["haste","mastery"],251122:["haste","mastery"],251157:["crit","haste"],251173:["crit","haste"],
  251175:["crit","mastery"],251193:["haste","vers"],251195:["crit","haste"],251202:["crit","vers"],
  251214:["crit","haste"],251217:["crit","haste"],258525:["crit","haste"],258583:["crit","mastery"],
  260312:["crit","haste"],260423:["crit","haste"],268196:["crit","haste"],268209:["haste","mastery"],
  268253:["haste","mastery"],268259:["crit","mastery"],268265:["crit"],268266:["haste","vers"],
  268285:["haste","mastery"],268289:["crit","mastery"],268290:["haste","mastery"],270164:[],
  270173:[],271463:["crit","mastery"],271465:["crit","mastery"],271466:["crit","mastery"],
  271468:["haste","mastery"],271878:["mastery"],273776:["crit","haste"],273777:["haste","vers"],
  273792:["crit","haste"],
};

