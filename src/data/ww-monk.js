export var SPEC_LABEL = "Windwalker Monk";
export var SPEC_KEY = "ww-monk";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "windwalker";
export var SPEC_ICON = "monk_stance_whitetiger";
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
  { slot: "head", en: "Spellsnap Shadowmask", ko: "주문절단 그림자복면", id: 251109, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", id: 151318, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", en: "Flayer's Black Belt", ko: "바위갈퀴의 검은띠", id: 49806, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", id: 49817, dungeon: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 178819, en: "Skyterror's Stonehide Leggings", ko: "하늘공포의 돌껍질 다리보호구", dungeon: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258472, en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "ww-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49817:["haste","mastery"],51802:["crit","haste"],151309:["haste","vers"],
  151318:["crit","haste"],178819:["haste","mastery"],193701:[],193707:["haste","mastery"],
  193710:["haste","mastery"],193714:["haste","mastery"],251092:["haste","mastery"],251093:["haste","mastery"],
  251096:["haste","vers"],251109:["crit","mastery"],251115:["haste","mastery"],251122:["haste","mastery"],
  251159:["haste","mastery"],251171:["haste","mastery"],251174:["haste","mastery"],251201:["haste","mastery"],
  251216:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],258577:["crit","mastery"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
