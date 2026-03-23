export var SPEC_LABEL = "복원 드루이드";
export var SPEC_KEY = "resto-druid";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_healingtouch";
export var STORAGE_KEY = "bis-resto-druid-v1";

export var THEME = {
  accent: "#60d060",
  accentLight: "#a0e3a0",
  accentBg: "#0e1f0e",
  accentBorder: "#224922",
  shimmer: "linear-gradient(90deg,#3a7d3a,#60d060,#a0e3a0,#60d060,#3a7d3a)",
  btnBg: "linear-gradient(135deg,#3a7d3a,#60d060)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "목", simcSlot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Potion-Stained Cloak", ko: "물약으로 얼룩진 망토", id: 193712, dungeon: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "가슴", simcSlot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "손목", simcSlot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", id: 151318, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "허리", simcSlot: "waist", en: "Falconer's Cinch", ko: "매사냥꾼의 허리끈", id: 251166, dungeon: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "다리", simcSlot: "legs", en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", id: 49817, dungeon: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Eclipse Espadrilles", ko: "일월식 발목화", id: 251210, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "무기", simcSlot: "main_hand", en: "Ceremonial Hexblade", ko: "의식용 사술칼날", id: 251178, dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "보조 무기", simcSlot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, dungeon: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "가슴", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "다리", id: 178819, en: "Skyterror's Stonehide Leggings", ko: "하늘공포의 돌껍질 다리보호구", dungeon: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "머리", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "목", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "무기", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "어깨", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "허리", id: 151316, en: "Cinch of the Umbral Lasher", ko: "암영 덩굴손의 허리끈", dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "resto-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],51802:["crit","haste"],
  151309:["haste","vers"],151316:["haste","vers"],151318:["crit","haste"],151336:["crit","haste"],
  178819:["haste","mastery"],193712:["haste","vers"],193714:["haste","mastery"],193718:[],
  251092:["haste","mastery"],251093:["haste","mastery"],251095:["crit","haste"],251096:["haste","vers"],
  251111:["crit","haste"],251115:["haste","mastery"],251122:["haste","mastery"],251159:["haste","mastery"],
  251162:["crit","haste"],251166:["haste","vers"],251171:["haste","mastery"],251178:["crit","haste"],
  251210:["haste","vers"],251216:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],
  258525:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
