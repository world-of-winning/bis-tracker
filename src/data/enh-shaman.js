export var SPEC_LABEL = "Enhancement Shaman";
export var SPEC_KEY = "enh-shaman";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "enhancement";
export var SPEC_ICON = "spell_nature_lightningshield";
export var STORAGE_KEY = "bis-enh-shaman-v1";

export var THEME = {
  accent: "#2090dd",
  accentLight: "#79bceb",
  accentBg: "#051621",
  accentBorder: "#0b324d",
  shimmer: "linear-gradient(90deg,#135685,#2090dd,#79bceb,#2090dd,#135685)",
  btnBg: "linear-gradient(135deg,#135685,#2090dd)",
};

export var BIS = [
  { slot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirute", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, dungeon: "Seat of the Triumvirute", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Corewarden Cuffs", ko: "핵감시관 소매장식", id: 251209, dungeon: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", en: "Void-Coated Stompers", ko: "공허로 뒤덮인 디딤장화", id: 151320, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Widnrunner Spire", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Widnrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Blazing Sunclaws", ko: "타오르는 태양발톱", id: 258438, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Blazing Sunclaws", ko: "타오르는 태양발톱", id: 258438, dungeon: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "legs", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258472, en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", dungeon: "Skyreach", stats: ["haste","mastery"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "enh-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49824:["crit","haste"],51802:["crit","haste"],151309:["haste","vers"],
  151320:["haste","mastery"],151323:["haste","mastery"],193707:["haste","mastery"],193710:["haste","mastery"],
  250144:[],251089:["haste","mastery"],251093:["haste","mastery"],251096:["haste","vers"],
  251115:["haste","mastery"],251122:["haste","mastery"],251170:["crit","mastery"],251174:["haste","mastery"],
  251201:["haste","mastery"],251209:["mastery","vers"],251215:["crit","mastery"],258438:["haste","mastery"],
  258472:["haste","mastery"],258576:["crit","haste"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Seat of the Triumvirute", "Skyreach", "Widnrunner Spire",
];
