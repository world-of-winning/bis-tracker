export var SPEC_LABEL = "Fury Warrior";
export var SPEC_KEY = "fury-warrior";
export var SIMC_CLASS = "warrior";
export var SIMC_SPEC = "fury";
export var SPEC_ICON = "ability_warrior_innerrage";
export var STORAGE_KEY = "bis-fury-warrior-v1";

export var THEME = {
  accent: "#ca6040",
  accentLight: "#dfa08c",
  accentBg: "#1e0e0a",
  accentBorder: "#472216",
  shimmer: "linear-gradient(90deg,#793a26,#ca6040,#dfa08c,#ca6040,#793a26)",
  btnBg: "linear-gradient(135deg,#793a26,#ca6040)",
};

export var BIS = [
  { slot: "head", en: "Skeleton Lord's Cranium", ko: "해골 군주의 두개골", id: 49819, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Searing Spaulders", ko: "작열하는 어깨덮개", id: 251157, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Frost Wyrm Ribcage", ko: "서리고룡 뼈갑옷", id: 50272, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Vambraces of Lost Hope", ko: "잃어버린 희망의 완갑", id: 151328, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", en: "Embergrove Grasps", ko: "잿불숲 손아귀", id: 251081, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Legplates of Lingering Dusk", ko: "잔존하는 암흑의 다리갑옷", id: 251118, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", en: "Footwraps of Ill-Fate", ko: "불길한 운명의 발등싸개", id: 251169, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", id: 251168, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "off_hand", en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", id: 251168, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 251077, en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251105, en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258049, en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258514, en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251107, en: "Oathsworn Stompers", ko: "서약신도 디딤장화", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "fury-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],49812:["crit","haste"],49819:["crit","haste"],50228:["crit","haste"],
  50272:["crit","haste"],51802:["crit","haste"],151328:["crit","haste"],251077:["crit","mastery"],
  251081:["crit","haste"],251093:["haste","mastery"],251105:["crit","mastery"],251107:["haste","mastery"],
  251115:["haste","mastery"],251118:["crit","mastery"],251157:["crit","haste"],251168:["crit","mastery"],
  251169:["haste","mastery"],251175:["crit","mastery"],251217:["crit","haste"],252420:[],
  258049:["crit","mastery"],258514:["crit","mastery"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
