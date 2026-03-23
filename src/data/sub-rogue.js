export var SPEC_LABEL = "Subtlety Rogue";
export var SPEC_KEY = "sub-rogue";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "subtlety";
export var SPEC_ICON = "ability_stealth";
export var STORAGE_KEY = "bis-sub-rogue-v1";

export var THEME = {
  accent: "#ca9060",
  accentLight: "#dfbca0",
  accentBg: "#1e160e",
  accentBorder: "#473222",
  shimmer: "linear-gradient(90deg,#79563a,#ca9060,#dfbca0,#ca9060,#79563a)",
  btnBg: "linear-gradient(135deg,#79563a,#ca9060)",
};

export var BIS = [
  { slot: "head", en: "Spellsnap Shadowmask", ko: "주문절단 그림자복면", id: 251109, dungeon: "Priory of the Sacred Flame", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Gloves of Viscous Goo", ko: "농후한 찐득이 장갑", id: 251113, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Shifting Stalker Hide Pants", ko: "변화의 추적자 가죽 바지", id: 151314, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, dungeon: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", dungeon: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "sub-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],50228:["crit","haste"],
  51802:["crit","haste"],151314:["mastery","vers"],193701:[],193714:["haste","mastery"],
  251082:["crit","mastery"],251092:["haste","mastery"],251093:["haste","mastery"],251095:["crit","haste"],
  251109:["crit","mastery"],251111:["crit","haste"],251113:["crit","mastery"],251115:["haste","mastery"],
  251159:["haste","mastery"],251162:["crit","haste"],251171:["haste","mastery"],251178:["crit","haste"],
  251216:["haste","mastery"],251217:["crit","haste"],258525:["crit","haste"],258575:["crit","mastery"],
  258577:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Priory of the Sacred Flame", "Seat of the Triumvirate", "Skyreach",
];
