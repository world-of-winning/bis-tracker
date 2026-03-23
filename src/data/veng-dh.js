export var SPEC_LABEL = "Vengeance Demon Hunter";
export var SPEC_KEY = "veng-dh";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "vengeance";
export var SPEC_ICON = "ability_demonhunter_metamorphosis_tank";
export var STORAGE_KEY = "bis-veng-dh-v1";

export var THEME = {
  accent: "#4dca4d",
  accentLight: "#94df94",
  accentBg: "#0c1e0c",
  accentBorder: "#1b471b",
  shimmer: "linear-gradient(90deg,#2e792e,#4dca4d,#94df94,#4dca4d,#2e792e)",
  btnBg: "linear-gradient(135deg,#2e792e,#4dca4d)",
};

export var BIS = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Potion-Stained Cloak", ko: "물약으로 얼룩진 망토", id: 193712, dungeon: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Custodial Cuffs", ko: "관리인의 소매장식", id: 251103, dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", en: "Corewright's Zappers", ko: "핵장인의 제어 장치", id: 251204, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "waist", en: "Cinch of the Umbral Lasher", ko: "암영 덩굴손의 허리끈", id: 151316, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Lingering Legacies", ko: "머무는 유산의 다리싸개", id: 251087, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", en: "Eclipse Espadrilles", ko: "일월식 발목화", id: 251210, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Band of the Triumvirate", ko: "삼두정의 고리", id: 151311, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "head", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258472, en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251166, en: "Falconer's Cinch", ko: "매사냥꾼의 허리끈", dungeon: "Maisara Caverns", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "veng-dh-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49812:["crit","haste"],51802:["crit","haste"],151309:["haste","vers"],
  151311:["haste","vers"],151316:["haste","vers"],151336:["crit","haste"],193707:["haste","mastery"],
  193710:["haste","mastery"],193712:["haste","vers"],251087:["crit","haste"],251092:["haste","mastery"],
  251096:["haste","vers"],251103:["haste","vers"],251122:["haste","mastery"],251159:["haste","mastery"],
  251166:["haste","vers"],251171:["haste","mastery"],251174:["haste","mastery"],251201:["haste","mastery"],
  251204:["haste","vers"],251210:["haste","vers"],251216:["haste","mastery"],251217:["crit","haste"],
  252420:[],258438:["haste","mastery"],258472:["haste","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Seat of the Triumvirate", "Skyreach",
];
