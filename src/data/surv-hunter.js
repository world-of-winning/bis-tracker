export var SPEC_LABEL = "생존 사냥꾼";
export var SPEC_KEY = "surv-hunter";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "survival";
export var SPEC_ICON = "ability_hunter_camouflage";
export var STORAGE_KEY = "bis-surv-hunter-v1";

export var THEME = {
  accent: "#d4aa60",
  accentLight: "#e5cca0",
  accentBg: "#201a0e",
  accentBorder: "#4a3b22",
  shimmer: "linear-gradient(90deg,#7f663a,#d4aa60,#e5cca0,#d4aa60,#7f663a)",
  btnBg: "linear-gradient(135deg,#7f663a,#d4aa60)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Vortex Visage", ko: "회오리의 안면", id: 251119, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "가슴", simcSlot: "chest", en: "Decaying Cuirass", ko: "썩어가는 흉갑", id: 251179, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "손목", simcSlot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", id: 251215, dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Whipcoil Sabatons", ko: "채찍뱀 발덮개", id: 251084, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", id: 251077, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "다리", id: 251170, en: "Wickedweave Trousers", ko: "교활매듭 긴바지", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "머리", id: 258585, en: "Sharpeye Gleam", ko: "뾰족눈 광투구", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 258514, en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "손목", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "surv-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],50228:["crit","haste"],51802:["crit","haste"],151321:["crit","mastery"],
  151323:["haste","mastery"],193701:[],251077:["crit","mastery"],251079:["crit","mastery"],
  251084:["crit","mastery"],251089:["haste","mastery"],251093:["haste","mastery"],251115:["haste","mastery"],
  251119:["crit","mastery"],251168:["crit","mastery"],251170:["crit","mastery"],251179:["crit","mastery"],
  251215:["crit","mastery"],258514:["crit","mastery"],258575:["crit","mastery"],258585:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
