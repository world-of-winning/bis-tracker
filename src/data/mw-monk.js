export var SPEC_LABEL = "Mistweaver Monk";
export var SPEC_KEY = "mw-monk";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "mistweaver";
export var SPEC_ICON = "monk_stance_wiseserpent";
export var STORAGE_KEY = "bis-mw-monk-v1";

export var THEME = {
  accent: "#60d0a0",
  accentLight: "#a0e3c6",
  accentBg: "#0e1f18",
  accentBorder: "#224938",
  shimmer: "linear-gradient(90deg,#3a7d60,#60d0a0,#a0e3c6,#60d0a0,#3a7d60)",
  btnBg: "linear-gradient(135deg,#3a7d60,#60d0a0)",
};

export var BIS = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Potion-Stained Cloak", ko: "물약으로 얼룩진 망토", id: 193712, dungeon: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", id: 151318, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", en: "Falconer's Cinch", ko: "매사냥꾼의 허리끈", id: 251166, dungeon: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "legs", en: "Skyterror's Stonehide Leggings", ko: "하늘공포의 돌껍질 다리보호구", id: 178819, dungeon: "Halls of Atonement", stats: ["haste","mastery"] },
  { slot: "feet", en: "Eclipse Espadrilles", ko: "일월식 발목화", id: 251210, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", id: 251163, dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, dungeon: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 49817, en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", dungeon: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "head", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 50227, en: "Surgeon's Needle", ko: "외과의사의 바늘", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat", stats: ["crit","vers"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 151316, en: "Cinch of the Umbral Lasher", ko: "암영 덩굴손의 허리끈", dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "mw-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49817:["haste","mastery"],50227:["crit","vers"],51802:["crit","haste"],
  151309:["haste","vers"],151316:["haste","vers"],151318:["crit","haste"],151336:["crit","haste"],
  178819:["haste","mastery"],193712:["haste","vers"],193714:["haste","mastery"],193717:["crit","vers"],
  193718:[],193723:["crit","vers"],251092:["haste","mastery"],251093:["haste","mastery"],
  251096:["haste","vers"],251115:["haste","mastery"],251122:["haste","mastery"],251159:["haste","mastery"],
  251163:["crit","vers"],251166:["haste","vers"],251171:["haste","mastery"],251210:["haste","vers"],
  251216:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],258516:["crit","vers"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Halls of Atonement", "Magisters' Terrace", "Seat of the Triumvirate", "Skyreach",
];
