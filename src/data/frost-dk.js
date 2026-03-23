export var SPEC_LABEL = "냉기 죽음의 기사";
export var SPEC_KEY = "frost-dk";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "frost";
export var SPEC_ICON = "spell_deathknight_frostpresence";
export var STORAGE_KEY = "bis-frost-dk-v1";

export var THEME = {
  accent: "#4d9dca",
  accentLight: "#94c4df",
  accentBg: "#0c181e",
  accentBorder: "#1b3747",
  shimmer: "linear-gradient(90deg,#2e5e79,#4d9dca,#94c4df,#4d9dca,#2e5e79)",
  btnBg: "linear-gradient(135deg,#2e5e79,#4d9dca)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Crown of the Dark Envoy", ko: "암흑 특사의 관", id: 151333, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Shoulderplates of Frozen Blood", ko: "얼어붙은 피의 어깨철갑", id: 50234, dungeon: "Pit of Saron", stats: ["crit","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "가슴", simcSlot: "chest", en: "Frost Wyrm Ribcage", ko: "서리고룡 뼈갑옷", id: 50272, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "손목", simcSlot: "wrist", en: "Vambraces of Lost Hope", ko: "잃어버린 희망의 완갑", id: 151328, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "장갑", simcSlot: "hands", en: "Incarnadine Gauntlets", ko: "진홍빛 건틀릿", id: 258583, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Legplates of Lingering Dusk", ko: "잔존하는 암흑의 다리갑옷", id: 251118, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Oathsworn Stompers", ko: "서약신도 디딤장화", id: 251107, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Al'geth'ar Academy", stats: ["crit","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "주 무기", simcSlot: "main_hand", en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", id: 251168, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "보조 무기", simcSlot: "off_hand", en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", id: 251168, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "무기", id: 251077, en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251105, en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 258049, en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 258514, en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "반지", id: 251093, en: "Omission of Light", ko: "소외된 빛", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "발", id: 251169, en: "Footwraps of Ill-Fate", ko: "불길한 운명의 발등싸개", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "frost-dk-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],50228:["crit","haste"],50234:["crit","mastery"],50272:["crit","haste"],
  51802:["crit","haste"],151328:["crit","haste"],151333:["crit","mastery"],193708:["crit","mastery"],
  251077:["crit","mastery"],251093:["haste","mastery"],251105:["crit","mastery"],251107:["haste","mastery"],
  251115:["haste","mastery"],251118:["crit","mastery"],251168:["crit","mastery"],251169:["haste","mastery"],
  251175:["crit","mastery"],252420:[],258049:["crit","mastery"],258514:["crit","mastery"],
  258583:["crit","mastery"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Al'geth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
