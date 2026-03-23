export var SPEC_LABEL = "신성 성기사";
export var SPEC_KEY = "holy-paladin";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "holy";
export var SPEC_ICON = "spell_holy_holybolt";
export var STORAGE_KEY = "bis-holy-paladin-v1";

export var THEME = {
  accent: "#F48CBA",
  accentLight: "#f8bad6",
  accentBg: "#25151c",
  accentBorder: "#553141",
  shimmer: "linear-gradient(90deg,#925470,#F48CBA,#f8bad6,#F48CBA,#925470)",
  btnBg: "linear-gradient(135deg,#925470,#F48CBA)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Gutcrusher Greathelm", ko: "내장분쇄자 철갑투구", id: 258579, dungeon: "Skyreach", stats: ["mastery","vers"] },
  { slot: "목", simcSlot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Amalgamation's Harness", ko: "융합체의 멜빵", id: 251164, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Fluxweave Cloak", ko: "융제매듭 망토", id: 251206, dungeon: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "가슴", simcSlot: "chest", en: "Breastplate of the Dark Touch", ko: "어둠의 손길 가슴보호갑", id: 151329, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "손목", simcSlot: "wrist", en: "Trollhunter's Bands", ko: "트롤사냥꾼의 손목매듭", id: 263193, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Voidclaw Gauntlets", ko: "공허발톱 건틀릿", id: 151332, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "허리", simcSlot: "waist", en: "Girdle of the Shadowguard", ko: "어둠수호병의 요대", id: 151327, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "다리", simcSlot: "legs", en: "Lightscarred Cuisses", ko: "빛흉터 다리가리개", id: 251208, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "발", simcSlot: "feet", en: "Oathsworn Stompers", ko: "서약신도 디딤장화", id: 251107, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Spellboon Saber", ko: "주문은총 사브르", id: 193710, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "방패", simcSlot: "off_hand", en: "Crawth's Scaleguard", ko: "크로스의 비늘보호대", id: 258531, dungeon: "Algeth'ar Academy", stats: ["mastery","vers"] },
];

export var ALTS = [
  { forSlot: "목", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "무기", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "발", id: 251169, en: "Footwraps of Ill-Fate", ko: "불길한 운명의 발등싸개", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["crit"];

export var STAT_CACHE_KEY = "holy-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  51802:["crit","haste"],151309:["haste","vers"],151327:["haste","mastery"],151329:["haste","mastery"],
  151332:["haste","vers"],193707:["haste","mastery"],193710:["haste","mastery"],193718:[],
  251093:["haste","mastery"],251096:["haste","vers"],251107:["haste","mastery"],251115:["haste","mastery"],
  251122:["haste","mastery"],251164:["haste","mastery"],251169:["haste","mastery"],251174:["haste","mastery"],
  251201:["haste","mastery"],251206:["mastery","vers"],251208:["haste","vers"],258438:["haste","mastery"],
  258531:["mastery","vers"],258579:["mastery","vers"],263193:["haste","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Seat of the Triumvirate", "Skyreach",
];
