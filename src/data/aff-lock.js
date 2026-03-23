export var SPEC_LABEL = "고통 흑마법사";
export var SPEC_KEY = "aff-lock";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "affliction";
export var SPEC_ICON = "spell_shadow_deathcoil";
export var STORAGE_KEY = "bis-aff-lock-v1";

export var THEME = {
  accent: "#8788EE",
  accentLight: "#b7b8f5",
  accentBg: "#141424",
  accentBorder: "#2f3053",
  shimmer: "linear-gradient(90deg,#51528f,#8788EE,#b7b8f5,#8788EE,#51528f)",
  btnBg: "linear-gradient(135deg,#51528f,#8788EE)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Organized Pontificator's Mask", ko: "조직화된 법왕의 가면", id: 193703, dungeon: "Algath'ar Academy", stats: ["crit","haste"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "가슴", simcSlot: "chest", en: "Bronze Challenger's Robe", ko: "청동 도전자의 로브", id: 193720, dungeon: "Algath'ar Academy", stats: ["crit","mastery"] },
  { slot: "손목", simcSlot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Clasp of Compliance", ko: "순응의 죔쇠띠", id: 251102, dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "다리", simcSlot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, dungeon: "Skyreach", stats: ["haste","vers"] },
  { slot: "발", simcSlot: "feet", en: "Slippers of Growing Despair", ko: "커지는 절망의 끌신", id: 151301, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Windrunner Spire", stats: [] },
  { slot: "무기", simcSlot: "main_hand", en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", id: 251201, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "무기", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "어깨", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", dungeon: "Nexus-Point", stats: ["haste","mastery"] },
  { forSlot: "허리", id: 50263, en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", dungeon: "Pit of Saron", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "aff-lock-stat-cache-v1";

export var KNOWN_STATS = {
  50228:["crit","haste"],50263:["haste","vers"],51802:["crit","haste"],151300:["crit","mastery"],
  151301:["haste","vers"],151305:["haste","mastery"],193703:["crit","haste"],193707:["haste","mastery"],
  193710:["haste","mastery"],193720:["crit","mastery"],250144:[],251093:["haste","mastery"],
  251102:["haste","vers"],251115:["haste","mastery"],251122:["haste","mastery"],251174:["haste","mastery"],
  251201:["haste","mastery"],251213:["haste","mastery"],258438:["haste","mastery"],258574:["haste","vers"],
  258575:["crit","mastery"],258578:["haste","mastery"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Algath'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
