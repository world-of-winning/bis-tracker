export var SPEC_LABEL = "Affliction Warlock";
export var SPEC_KEY = "aff-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/affliction-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "affliction";
export var SPEC_ICON = "spell_shadow_deathcoil";
export var STORAGE_KEY = "bis-aff-lock-v1";

export var THEME = {
  accent: "#8788EE",
  accentLight: "#b7b8f5",
  accentBg: "#141424",
  accentBorder: "#2f3053",
  shimmer: "linear-gradient(90deg,#51528f,#8788EE,#b7b8f5,#8788EE,#51528f)",
  btnBg: "linear-gradient(135deg,#51528f,#8788EE)",
};

export var BIS = [
  { slot: "head", en: "Abyssal Immolator's Smoldering Flames", ko: "불태우는 심연의 이글거리는 불길", id: 250042, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Echoing Void Mantle", ko: "메아리치는 공허 어깨덧옷", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Abyssal Immolator's Dreadrobe", ko: "불태우는 심연의 공포로브", id: 250045, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Voracious Wristwraps", ko: "게걸스러운 손목싸개", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
  { slot: "hands", en: "Abyssal Immolator's Grasps", ko: "불태우는 심연의 손아귀", id: 250043, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", en: "Clasp of Compliance", ko: "순응의 죔쇠띠", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "legs", en: "Abyssal Immolator's Pillars", ko: "불태우는 심연의 기둥", id: 250041, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", en: "Dream-Scorched Striders", ko: "꿈의 불꽃 성큼장화", id: 249373, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Masterwork Sin'dorei Band", ko: "걸작 신도레이 고리", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Aln'hara Lantern", ko: "알른하라의 등불", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", en: "Organized Pontificator's Mask", ko: "조직화된 법왕의 가면", id: 193703, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Bronze Challenger's Robe", ko: "청동 도전자의 로브", id: 193720, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", en: "Clasp of Compliance", ko: "순응의 죔쇠띠", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Slippers of Growing Despair", ko: "커지는 절망의 끌신", id: 151301, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251172, en: "Vilehex Bonds", ko: "부정사술 결속대", source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "head", id: 151337, en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 50263, en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", source: "Pit of Saron", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", source: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "aff-lock-stat-cache-v1";

export var KNOWN_STATS = {
  50228:["crit","haste"],50263:["haste","vers"],151300:["crit","mastery"],151301:["haste","vers"],
  151305:["haste","mastery"],151337:["crit","mastery"],193703:["crit","haste"],193710:["haste","mastery"],
  193720:["crit","mastery"],240949:[],245769:[],249283:["haste","mastery"],
  249294:["haste","mastery"],249315:["haste","mastery"],249328:["haste","mastery"],249337:["crit","haste"],
  249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],
  249373:["crit","mastery"],249920:["haste"],250041:["crit","haste"],250042:["crit","mastery"],
  250043:["crit","haste"],250045:["haste","mastery"],250144:[],250247:["haste","mastery"],
  250256:[],251093:["haste","mastery"],251102:["haste","vers"],251115:["haste","mastery"],
  251122:["haste","mastery"],251172:["crit","haste"],251190:["haste","mastery"],
  251201:["haste","mastery"],251213:["haste","mastery"],258574:["haste","vers"],258575:["crit","mastery"],
  258578:["haste","mastery"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
