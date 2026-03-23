export var SPEC_LABEL = "Fire Mage";
export var SPEC_KEY = "fire-mage";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "fire";
export var SPEC_ICON = "spell_fire_firebolt02";
export var STORAGE_KEY = "bis-fire-mage-v1";

export var THEME = {
  accent: "#ca5030",
  accentLight: "#df9683",
  accentBg: "#1e0c07",
  accentBorder: "#471c11",
  shimmer: "linear-gradient(90deg,#79301d,#ca5030,#df9683,#ca5030,#79301d)",
  btnBg: "linear-gradient(135deg,#79301d,#ca5030)",
};

export var BIS = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", id: 251213, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Palebone Robes", ko: "창백한 뼈 로브", id: 49825, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Vilehex Bonds", ko: "부정사술 결속대", id: 251172, dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", id: 50263, dungeon: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, dungeon: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Final Grade", ko: "최종 학점", id: 193707, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 151303, en: "Voidbender Robe", ko: "공허술사 로브", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 258578, en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251102, en: "Clasp of Compliance", ko: "순응의 죔쇠띠", dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "fire-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49825:["crit","haste"],50263:["haste","vers"],51802:["crit","haste"],151303:["crit","haste"],
  151305:["haste","mastery"],151309:["haste","vers"],151337:["crit","mastery"],193707:["haste","mastery"],
  193710:["haste","mastery"],250144:[],251093:["haste","mastery"],251096:["haste","vers"],
  251102:["haste","vers"],251115:["haste","mastery"],251122:["haste","mastery"],251172:["crit","haste"],
  251174:["haste","mastery"],251201:["haste","mastery"],251213:["haste","mastery"],258438:["haste","mastery"],
  258574:["haste","vers"],258578:["haste","mastery"],258584:["haste","mastery"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
