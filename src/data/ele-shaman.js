export var SPEC_LABEL = "Elemental Shaman";
export var SPEC_KEY = "ele-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/elemental-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "elemental";
export var SPEC_ICON = "spell_nature_lightning";
export var STORAGE_KEY = "bis-ele-shaman-v1";

export var THEME = {
  accent: "#0070DD",
  accentLight: "#66a9eb",
  accentBg: "#001121",
  accentBorder: "#00274d",
  shimmer: "linear-gradient(90deg,#004385,#0070DD,#66a9eb,#0070DD,#004385)",
  btnBg: "linear-gradient(135deg,#004385,#0070DD)",
};

export var BIS = [
  { slot: "head", en: "Locus of the Primal Core", ko: "원시 핵의 집중점", id: 249979, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Tempests of the Primal Core", ko: "원시 핵의 돌개바람", id: 249977, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Embrace of the Primal Core", ko: "원시 핵의 포옹", id: 249982, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Farstrider's Plated Bracers", ko: "원정순찰대원의 철판 팔보호구", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", en: "Earthgrips of the Primal Core", ko: "원시 핵의 대지손아귀", id: 249980, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", en: "Scornbane Waistguard", ko: "멸시파멸 허리보호대", id: 249371, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "legs", en: "Eternal Flame Scaleguards", ko: "영원의 불꽃 비늘보호대", id: 249324, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "feet", en: "Void-Coated Stompers", ko: "공허로 뒤덮인 디딤장화", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Vaelgor's Final Stare", ko: "바엘고어의 마지막 시선", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", en: "Magister's Cleaver", ko: "마법학자의 가로날도끼", id: 237844, source: "Crafted", stats: [] },
  { slot: "off_hand", en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Corewarden Cuffs", ko: "핵감시관 소매장식", id: 251209, source: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", en: "Void-Coated Stompers", ko: "공허로 뒤덮인 디딤장화", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 249325, en: "Untethered Berserker's Grips", ko: "풀어헤쳐진 광전사의 손장갑", source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 50233, en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "waist", id: 244611, en: "World Tender's Barkclasp", ko: "세계지기의 껍질죔쇠띠", source: "Crafted", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249284, en: "Belo'ren's Swift Talon", ko: "벨로렌의 날렵한 갈퀴발톱", source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258049, en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "ele-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49810:["crit","haste"],49824:["crit","haste"],50233:["crit","haste"],
  151309:["haste","vers"],151320:["haste","mastery"],151323:["haste","mastery"],237844:[],
  244584:[],244611:["haste","mastery"],249284:["crit","mastery"],249295:["crit","haste"],
  249324:["haste","mastery"],249325:["crit","mastery"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249371:["haste","mastery"],
  249920:["haste"],249977:["crit","haste"],249979:["haste","mastery"],249980:["crit","mastery"],
  249982:["haste","mastery"],250144:[],250247:["haste","mastery"],250256:[],
  251089:["haste","mastery"],251093:["haste","mastery"],251096:["haste","vers"],251105:["crit","mastery"],
  251111:["crit","haste"],251115:["haste","mastery"],251170:["crit","mastery"],
  251175:["crit","mastery"],251178:["crit","haste"],251190:["haste","mastery"],251209:["mastery","vers"],
  251215:["crit","mastery"],258049:["crit","mastery"],258525:["crit","haste"],258576:["crit","haste"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
