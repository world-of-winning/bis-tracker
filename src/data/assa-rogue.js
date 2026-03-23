export var SPEC_LABEL = "Assassination Rogue";
export var SPEC_KEY = "assa-rogue";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "assassination";
export var SPEC_ICON = "ability_rogue_deadlybrew";
export var STORAGE_KEY = "bis-assa-rogue-v1";

export var THEME = {
  accent: "#d0c060",
  accentLight: "#e3d9a0",
  accentBg: "#1f1d0e",
  accentBorder: "#494322",
  shimmer: "linear-gradient(90deg,#7d733a,#d0c060,#e3d9a0,#d0c060,#7d733a)",
  btnBg: "linear-gradient(135deg,#7d733a,#d0c060)",
};

export var BIS = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Vest of the Howling Gale", ko: "울부짖는 강풍의 조끼", id: 251099, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Chewed Leather Wristguards", ko: "물어뜯긴 가죽 손목보호구", id: 50264, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "hands", en: "Gloves of Viscous Goo", ko: "농후한 찐득이 장갑", id: 251113, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Legwraps of Lingering Legacies", ko: "머무는 유산의 다리싸개", id: 251087, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, dungeon: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 151315, en: "Bracers of Dark Binding", ko: "암흑의 구속 팔보호구", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, en: "Fury-fletched Armlets", ko: "지옥 새김 팔찌", dungeon: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "assa-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],50228:["crit","haste"],
  50264:["crit","haste"],51802:["crit","haste"],151315:["crit","haste"],151336:["crit","haste"],
  193701:[],251082:["crit","mastery"],251087:["crit","haste"],251092:["haste","mastery"],
  251093:["haste","mastery"],251095:["crit","haste"],251099:["crit","mastery"],251111:["crit","haste"],
  251113:["crit","mastery"],251115:["haste","mastery"],251135:["crit","haste"],251162:["crit","haste"],
  251171:["haste","mastery"],251178:["crit","haste"],251217:["crit","haste"],258525:["crit","haste"],
  258575:["crit","mastery"],258577:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
