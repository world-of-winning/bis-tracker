export var SPEC_LABEL = "Retribution Paladin";
export var SPEC_KEY = "ret-paladin";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "retribution";
export var SPEC_ICON = "spell_holy_auraoflight";
export var STORAGE_KEY = "bis-ret-paladin-v1";

export var THEME = {
  accent: "#e06060",
  accentLight: "#eca0a0",
  accentBg: "#220e0e",
  accentBorder: "#4e2222",
  shimmer: "linear-gradient(90deg,#863a3a,#e06060,#eca0a0,#e06060,#863a3a)",
  btnBg: "linear-gradient(135deg,#863a3a,#e06060)",
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
  { slot: "main_hand", en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", id: 49802, dungeon: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251107, en: "Oathsworn Stompers", ko: "서약신도 디딤장화", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "ret-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49808:["crit","haste"],49812:["crit","haste"],
  49819:["crit","haste"],50228:["crit","haste"],50272:["crit","haste"],51802:["crit","haste"],
  151328:["crit","haste"],251081:["crit","haste"],251093:["haste","mastery"],251095:["crit","haste"],
  251107:["haste","mastery"],251111:["crit","haste"],251115:["haste","mastery"],251118:["crit","mastery"],
  251157:["crit","haste"],251162:["crit","haste"],251169:["haste","mastery"],251178:["crit","haste"],
  251217:["crit","haste"],252420:[],258525:["crit","haste"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
