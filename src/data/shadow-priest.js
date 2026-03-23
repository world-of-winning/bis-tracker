export var SPEC_LABEL = "Shadow Priest";
export var SPEC_KEY = "shadow-priest";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "shadow";
export var SPEC_ICON = "spell_shadow_shadowwordpain";
export var STORAGE_KEY = "bis-shadow-priest-v1";

export var THEME = {
  accent: "#8080ca",
  accentLight: "#b3b3df",
  accentBg: "#13131e",
  accentBorder: "#2d2d47",
  shimmer: "linear-gradient(90deg,#4d4d79,#8080ca,#b3b3df,#8080ca,#4d4d79)",
  btnBg: "linear-gradient(135deg,#4d4d79,#8080ca)",
};

export var BIS = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Voidbender Robe", ko: "공허술사 로브", id: 151303, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Vilehex Bonds", ko: "부정사술 결속대", id: 251172, dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", id: 50263, dungeon: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, dungeon: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Vessel of Tortured Souls", ko: "괴로워하는 영혼의 그릇", id: 250258, dungeon: "Maisara Caverns", stats: ["mastery"] },
  { slot: "main_hand", en: "Ceremonial Hexblade", ko: "의식용 사술칼날", id: 251178, dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, dungeon: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 49825, en: "Palebone Robes", ko: "창백한 뼈 로브", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", dungeon: "Nexus-Point", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251102, en: "Clasp of Compliance", ko: "순응의 죔쇠띠", dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "shadow-priest-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],
  50263:["haste","vers"],51802:["crit","haste"],151303:["crit","haste"],151305:["haste","mastery"],
  151337:["crit","mastery"],250258:["mastery"],251093:["haste","mastery"],251095:["crit","haste"],
  251102:["haste","vers"],251111:["crit","haste"],251115:["haste","mastery"],251122:["haste","mastery"],
  251162:["crit","haste"],251172:["crit","haste"],251178:["crit","haste"],251213:["haste","mastery"],
  258438:["haste","mastery"],258472:["haste","mastery"],258525:["crit","haste"],258574:["haste","vers"],
  258578:["haste","mastery"],258584:["haste","mastery"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
