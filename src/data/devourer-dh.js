export var SPEC_LABEL = "Devourer Demon Hunter";
export var SPEC_KEY = "devourer-dh";
export var SIMC_CLASS = "demonhunter";
export var SIMC_SPEC = "havoc";
export var SPEC_ICON = "ability_demonhunter_spectral_sight";
export var STORAGE_KEY = "bis-devourer-dh-v1";

export var THEME = {
  accent: "#ca30a3",
  accentLight: "#df83c8",
  accentBg: "#1e0718",
  accentBorder: "#471139",
  shimmer: "linear-gradient(90deg,#791d62,#ca30a3,#df83c8,#ca30a3,#791d62)",
  btnBg: "linear-gradient(135deg,#791d62,#ca30a3)",
};

export var BIS = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
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
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Spellboon Saber", ko: "주문은총 사브르", id: 193710, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Spellboon Saber", ko: "주문은총 사브르", id: 193710, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 178819, en: "Skyterror's Stonehide Leggings", ko: "하늘공포의 돌껍질 다리보호구", dungeon: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "head", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258472, en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "devourer-dh-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],50228:["crit","haste"],
  51802:["crit","haste"],151318:["crit","haste"],151336:["crit","haste"],178819:["haste","mastery"],
  193707:["haste","mastery"],193710:["haste","mastery"],193714:["haste","mastery"],250144:[],
  251092:["haste","mastery"],251093:["haste","mastery"],251115:["haste","mastery"],251122:["haste","mastery"],
  251159:["haste","mastery"],251171:["haste","mastery"],251174:["haste","mastery"],251201:["haste","mastery"],
  251216:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],258577:["crit","mastery"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
