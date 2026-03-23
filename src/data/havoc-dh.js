export var SPEC_LABEL = "Havoc Demon Hunter";
export var SPEC_KEY = "havoc-dh";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "havoc";
export var SPEC_ICON = "ability_demonhunter_spectral_sight";
export var STORAGE_KEY = "bis-havoc-dh-v1";

export var THEME = {
  accent: "#A330C9",
  accentLight: "#c883df",
  accentBg: "#18071e",
  accentBorder: "#391146",
  shimmer: "linear-gradient(90deg,#621d79,#A330C9,#c883df,#A330C9,#621d79)",
  btnBg: "linear-gradient(135deg,#621d79,#A330C9)",
};

export var BIS = [
  { slot: "head", en: "Spellsnap Shadowmask", ko: "주문절단 그림자복면", id: 251109, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", id: 251092, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Vest of the Howling Gale", ko: "울부짖는 강풍의 조끼", id: 251099, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Bracers of Dark Binding", ko: "암흑의 구속 팔보호구", id: 151315, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", en: "Gloves of Viscous Goo", ko: "농후한 찐득이 장갑", id: 251113, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Legwraps of Lingering Legacies", ko: "머무는 유산의 다리싸개", id: 251087, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", id: 193717, dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { slot: "off_hand", en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", id: 251175, dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 50227, en: "Surgeon's Needle", ko: "외과의사의 바늘", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251105, en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251163, en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258049, en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat", stats: ["crit","vers"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 50264, en: "Chewed Leather Wristguards", ko: "물어뜯긴 가죽 손목보호구", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, en: "Fury-fletched Armlets", ko: "지옥 새김 팔찌", dungeon: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 251171, en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "havoc-dh-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],50227:["crit","vers"],50228:["crit","haste"],50264:["crit","haste"],
  151315:["crit","haste"],193701:[],193708:["crit","mastery"],193717:["crit","vers"],
  193723:["crit","vers"],251082:["crit","mastery"],251087:["crit","haste"],251092:["haste","mastery"],
  251099:["crit","mastery"],251105:["crit","mastery"],251109:["crit","mastery"],251113:["crit","mastery"],
  251135:["crit","haste"],251163:["crit","vers"],251168:["crit","mastery"],251171:["haste","mastery"],
  251175:["crit","mastery"],251217:["crit","haste"],252420:[],258049:["crit","mastery"],
  258516:["crit","vers"],258575:["crit","mastery"],258577:["crit","mastery"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Algeth'ar Academy & Maisara Caverns", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
