export var SPEC_LABEL = "Augmentation Evoker";
export var SPEC_KEY = "aug-evoker";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "augmentation";
export var SPEC_ICON = "classicon_evoker_augmentation";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/augmentation-evoker-raid-guide";
export var STORAGE_KEY = "bis-aug-evoker-v1";

export var THEME = {
  accent: "#6b4dca",
  accentLight: "#a694df",
  accentBg: "#100c1e",
  accentBorder: "#251b47",
  shimmer: "linear-gradient(90deg,#402e79,#6b4dca,#a694df,#6b4dca,#402e79)",
  btnBg: "linear-gradient(135deg,#402e79,#6b4dca)",
};

export var BIS = [
  { slot: "head", en: "Hornhelm of the Black Talon", ko: "검은 갈퀴발톱의 뿔투구", id: 249997, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Beacons of the Black Talon", ko: "검은 갈퀴발톱의 봉화", id: 249995, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Frenzyward of the Black Talon", ko: "검은 갈퀴발톱의 광란수호물", id: 250000, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", en: "Farstrider's Plated Bracers", ko: "원정순찰대원의 철판 팔보호구", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", en: "Farstrider's Sharpened Claws", ko: "원정순찰대원의 날카로운 발톱", id: 244583, source: "Crafted", stats: [] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Greaves of the Black Talon", ko: "검은 갈퀴발톱의 경갑", id: 249996, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", en: "Darkstrider Treads", ko: "어둠걸이의 발보호대", id: 249377, source: "Belo'ren", stats: ["crit","haste"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Grimoire of the Eternal Light", ko: "영원한 빛의 고서", id: 249276, source: "Vorasius", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", en: "Boots of Explosive Growth", ko: "폭발적인 성장의 장화", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Vexamus' Expulsion Rod", ko: "벡사무스의 배출 마법봉", id: 193709, source: "Algeth'ar Academy", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "chest", id: 249991, en: "Primal Sentry's Scaleplate", ko: "원시 파수꾼의 비늘판금", dungeon: "Chimaerus", stats: ["crit","haste"] },
  { forSlot: "legs", id: 249324, en: "Eternal Flame Scaleguards", ko: "영원의 불꽃 비늘보호대", dungeon: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249987, en: "Primal Sentry's Legguards", ko: "원시 파수꾼의 다리보호대", dungeon: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "head", id: 249988, en: "Primal Sentry's Maw", ko: "원시 파수꾼의 아귀", dungeon: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { forSlot: "head", id: 251119, en: "Vortex Visage", ko: "회오리의 안면", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "head", id: 258585, en: "Sharpeye Gleam", ko: "뾰족눈 광투구", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", dungeon: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", dungeon: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", dungeon: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, en: "Clutchmates' Caress", ko: "혈족의 애정", dungeon: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249288, en: "Ranger-Captain's Lethal Recurve", ko: "순찰대장의 치명적인 곡궁", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249304, en: "Fallen King's Cuffs", ko: "몰락한 왕의 소매장식", dungeon: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 193704, en: "Scaled Commencement Spaulders", ko: "비늘 학위 어깨덮개", dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249318, en: "Nullwalker's Dread Epaulettes", ko: "무위방랑자의 섬뜩한 견장", dungeon: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "aug-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49810:["crit","haste"],49812:["crit","haste"],
  49824:["crit","haste"],50228:["crit","haste"],50233:["crit","haste"],51802:["crit","haste"],
  151321:["crit","mastery"],193704:["crit","mastery"],193707:["haste","mastery"],193709:["crit","haste"],
  193710:["haste","mastery"],193715:["crit","haste"],244583:[],244584:[],
  249276:["crit","haste"],249283:["haste","mastery"],249287:["haste","mastery"],249288:["crit","haste"],
  249294:["haste","mastery"],249295:["crit","haste"],249304:["crit","mastery"],249318:["crit","mastery"],
  249324:["haste","mastery"],249337:["crit","haste"],249343:["mastery"],249368:["haste","mastery"],
  249369:["haste","mastery"],249377:["crit","haste"],249920:["haste"],249977:["crit","haste"],
  249987:["crit","mastery"],249988:["crit","haste"],249991:["crit","haste"],249995:["crit","mastery"],
  249996:["haste","mastery"],249997:["crit","mastery"],250000:["crit","haste"],250010:["crit","haste"],
  250144:[],250247:["haste","mastery"],251079:["crit","mastery"],251089:["haste","mastery"],
  251093:["haste","mastery"],251095:["crit","haste"],251111:["crit","haste"],251115:["haste","mastery"],
  251119:["crit","mastery"],251122:["haste","mastery"],251162:["crit","haste"],251170:["crit","mastery"],
  251174:["haste","mastery"],251178:["crit","haste"],251201:["haste","mastery"],251215:["crit","mastery"],
  251217:["crit","haste"],258525:["crit","haste"],258576:["crit","haste"],258585:["crit","mastery"],
  260312:["crit","haste"],260423:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Algeth'ar Academy", "Maisara Caverns",
];
