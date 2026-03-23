export var SPEC_LABEL = "보존 기원사";
export var SPEC_KEY = "pres-evoker";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "preservation";
export var SPEC_ICON = "classicon_evoker_preservation";
export var STORAGE_KEY = "bis-pres-evoker-v1";

export var THEME = {
  accent: "#60ca8b",
  accentLight: "#a0dfb9",
  accentBg: "#0e1e15",
  accentBorder: "#224731",
  shimmer: "linear-gradient(90deg,#3a7953,#60ca8b,#a0dfb9,#60ca8b,#3a7953)",
  btnBg: "linear-gradient(135deg,#3a7953,#60ca8b)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Vortex Visage", ko: "회오리의 안면", id: 251119, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Scaled Commencement Spaulders", ko: "비늘 학위 어깨덮개", id: 193704, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "가슴", simcSlot: "chest", en: "Decaying Cuirass", ko: "썩어가는 흉갑", id: 251179, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "손목", simcSlot: "wrist", en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", id: 251079, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", id: 251215, dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Whipcoil Sabatons", ko: "채찍뱀 발덮개", id: 251084, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Final Grade", ko: "최종 학점", id: 193707, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "다리", id: 251170, en: "Wickedweave Trousers", ko: "교활매듭 긴바지", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "머리", id: 258585, en: "Sharpeye Gleam", ko: "뾰족눈 광투구", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "반지", id: 251093, en: "Omission of Light", ko: "소외된 빛", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "손목", id: 151321, en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "pres-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],50228:["crit","haste"],51802:["crit","haste"],151321:["crit","mastery"],
  193704:["crit","mastery"],193707:["haste","mastery"],193708:["crit","mastery"],193710:["haste","mastery"],
  193718:[],251079:["crit","mastery"],251084:["crit","mastery"],251089:["haste","mastery"],
  251093:["haste","mastery"],251115:["haste","mastery"],251119:["crit","mastery"],251122:["haste","mastery"],
  251170:["crit","mastery"],251174:["haste","mastery"],251179:["crit","mastery"],251201:["haste","mastery"],
  251215:["crit","mastery"],258438:["haste","mastery"],258575:["crit","mastery"],258585:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Skyreach",
];
