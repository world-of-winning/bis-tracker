export var SPEC_LABEL = "Discipline Priest";
export var SPEC_KEY = "disc-priest";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "discipline";
export var SPEC_ICON = "spell_holy_powerwordshield";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/discipline-priest-raid-guide";
export var STORAGE_KEY = "bis-disc-priest-v1";

export var THEME = {
  accent: "#b0b0b0",
  accentLight: "#d0d0d0",
  accentBg: "#1a1a1a",
  accentBorder: "#3e3e3e",
  shimmer: "linear-gradient(90deg,#6a6a6a,#b0b0b0,#d0d0d0,#b0b0b0,#6a6a6a)",
  btnBg: "linear-gradient(135deg,#6a6a6a,#b0b0b0)",
};

export var BIS = [
  { slot: "head", en: "Blind Oath's Winged Crest", ko: "맹목적인 맹세의 날개 달린 문장", id: 250051, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Blind Oath's Seraphguards", ko: "맹목적인 맹세의 대천사보호대", id: 250049, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Blind Oath's Raiment", ko: "맹목적인 맹세의 예복", id: 250054, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Vilehex Bonds", ko: "부정사술 결속대", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", en: "Arcanoweave Cord", ko: "비전매듭 장식끈", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { slot: "legs", en: "Blind Oath's Leggings", ko: "맹목적인 맹세의 다리보호구", id: 250050, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Aln'hara Lantern", ko: "알른하라의 등불", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", en: "Organized Pontificator's Mask", ko: "조직화된 법왕의 가면", id: 193703, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Palebone Robes", ko: "창백한 뼈 로브", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Vilehex Bonds", ko: "부정사술 결속대", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Ceremonial Hexblade", ko: "의식용 사술칼날", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 151303, en: "Voidbender Robe", ko: "공허술사 로브", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", dungeon: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", dungeon: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, en: "Clutchmates' Caress", ko: "혈족의 애정", dungeon: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249288, en: "Ranger-Captain's Lethal Recurve", ko: "순찰대장의 치명적인 곡궁", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249294, en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249922, en: "Tome of Alnscorned Regret", ko: "알른멸시 회한의 고서", dungeon: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249315, en: "Voracious Wristwraps", ko: "게걸스러운 손목싸개", dungeon: "Vorasius", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 249328, en: "Echoing Void Mantle", ko: "메아리치는 공허 어깨덧옷", dungeon: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251085, en: "Mantle of Dark Devotion", ko: "어둠의 헌신의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 258578, en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249319, en: "Endless March Waistwrap", ko: "끝없는 행진 허리싸개", dungeon: "Imperator Averzian", stats: ["crit","haste"] },
  { forSlot: "waist", id: 251102, en: "Clasp of Compliance", ko: "순응의 죔쇠띠", dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "disc-priest-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],
  50263:["haste","vers"],51802:["crit","haste"],151303:["crit","haste"],151305:["haste","mastery"],
  193703:["crit","haste"],193707:["haste","mastery"],193710:["haste","mastery"],193718:[],
  239664:["crit","haste"],245769:[],249283:["haste","mastery"],249287:["haste","mastery"],
  249288:["crit","haste"],249294:["haste","mastery"],249295:["crit","haste"],249315:["haste","mastery"],
  249319:["crit","haste"],249328:["haste","mastery"],249337:["crit","haste"],249343:["mastery"],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249920:["haste"],
  249922:["haste","mastery"],250010:["crit","haste"],250043:["crit","haste"],250045:["haste","mastery"],
  250049:["crit","mastery"],250050:["haste","mastery"],250051:["crit","haste"],250054:["haste","mastery"],
  250055:["haste","mastery"],250057:["crit","haste"],250062:["haste","mastery"],250063:["crit","haste"],
  250247:["haste","mastery"],251085:["crit","mastery"],251093:["haste","mastery"],251095:["crit","haste"],
  251102:["haste","vers"],251111:["crit","haste"],251115:["haste","mastery"],251122:["haste","mastery"],
  251162:["crit","haste"],251172:["crit","haste"],251174:["haste","mastery"],251178:["crit","haste"],
  251201:["haste","mastery"],251213:["haste","mastery"],258472:["haste","mastery"],258525:["crit","haste"],
  258574:["haste","vers"],258578:["haste","mastery"],258584:["haste","mastery"],260312:["crit","haste"],
  260423:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Algeth'ar Academy", "Maisara Caverns",
];
