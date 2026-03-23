export var SPEC_LABEL = "Beast Mastery Hunter";
export var SPEC_KEY = "bm-hunter";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "beastmastery";
export var SPEC_ICON = "ability_hunter_bestialdiscipline";
export var STORAGE_KEY = "bis-bm-hunter-v1";

export var THEME = {
  accent: "#AAD372",
  accentLight: "#cce5aa",
  accentBg: "#1a2011",
  accentBorder: "#3b4a28",
  shimmer: "linear-gradient(90deg,#667f44,#AAD372,#cce5aa,#AAD372,#667f44)",
  btnBg: "linear-gradient(135deg,#667f44,#AAD372)",
};

export var BIS = [
  { slot: "head", en: "Vortex Visage", ko: "회오리의 안면", id: 251119, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", id: 250247, dungeon: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "chest", en: "Decaying Cuirass", ko: "썩어가는 흉갑", id: 251179, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", id: 251079, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", id: 251215, dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "feet", en: "Boots of Explosive Growth", ko: "폭발적인 성장의 장화", id: 193715, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Deceiver's Rotbow", ko: "기만자의 부식활", id: 251174, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "legs", id: 251170, en: "Wickedweave Trousers", ko: "교활매듭 긴바지", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", dungeon: "Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "head", id: 258585, en: "Sharpeye Gleam", ko: "뾰족눈 광투구", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 251142, en: "Pendant of Malefic Fury", ko: "사악한 격노의 펜던트", dungeon: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 151321, en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "bm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],51802:["crit","haste"],151321:["crit","mastery"],151323:["haste","mastery"],
  193701:[],193707:["haste","mastery"],193710:["haste","mastery"],193715:["crit","haste"],
  249370:["haste","mastery"],250247:["haste","mastery"],251079:["crit","mastery"],251089:["haste","mastery"],
  251093:["haste","mastery"],251115:["haste","mastery"],251119:["crit","mastery"],251122:["haste","mastery"],
  251142:["haste","mastery"],251170:["crit","mastery"],251174:["haste","mastery"],251179:["crit","mastery"],
  251190:["haste","mastery"],251201:["haste","mastery"],251215:["crit","mastery"],258438:["haste","mastery"],
  258585:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
