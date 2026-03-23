export var SPEC_LABEL = "Marksmanship Hunter";
export var SPEC_KEY = "mm-hunter";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "marksmanship";
export var SPEC_ICON = "ability_hunter_focusedaim";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/marksmanship-hunter-raid-guide";
export var STORAGE_KEY = "bis-mm-hunter-v1";

export var THEME = {
  accent: "#71b040",
  accentLight: "#aad08c",
  accentBg: "#111a0a",
  accentBorder: "#283e16",
  shimmer: "linear-gradient(90deg,#446a26,#71b040,#aad08c,#71b040,#446a26)",
  btnBg: "linear-gradient(135deg,#446a26,#71b040)",
};

export var BIS = [
  { slot: "head", en: "Primal Sentry's Maw", ko: "원시 파수꾼의 아귀", id: 249988, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Primal Sentry's Scaleplate", ko: "원시 파수꾼의 비늘판금", id: 249991, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", en: "Primal Sentry's Talonguards", ko: "원시 파수꾼의 갈퀴보호대", id: 249989, source: "Vorasius", stats: ["crit","mastery"] },
  { slot: "waist", en: "World Tender's Barkclasp", ko: "세계지기의 껍질죔쇠띠", id: 244611, source: "Crafted", stats: ["haste","mastery"] },
  { slot: "legs", en: "Primal Sentry's Legguards", ko: "원시 파수꾼의 다리보호대", id: 249987, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "feet", en: "World Tender's Rootslippers", ko: "세계지기의 뿌리끌신", id: 244610, source: "Crafted", stats: ["crit","vers"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Sin'dorei Band of Hope", ko: "희망의 신도레이 고리", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Umbral Plume", ko: "암영의 꽁지깃", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", en: "Ranger-Captain's Lethal Recurve", ko: "순찰대장의 치명적인 곡궁", id: 249288, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", en: "Sharpeye Gleam", ko: "뾰족눈 광투구", id: 258585, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", en: "Whipcoil Sabatons", ko: "채찍뱀 발덮개", id: 251084, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Hurricane's Heart", ko: "태풍의 심장", id: 251095, source: "Windrunner Spire", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "다리", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "머리", id: 49824, en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "머리", id: 251119, en: "Vortex Visage", ko: "회오리의 안면", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "목", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", dungeon: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "목", id: 249368, en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", dungeon: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "무기", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "반지", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "반지", id: 251513, en: "Loa Worshiper's Band", ko: "로아 신봉자의 고리", dungeon: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "발", id: 249320, en: "Sabatons of Obscurement", ko: "암연의 발덮개", dungeon: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "손목", id: 249304, en: "Fallen King's Cuffs", ko: "몰락한 왕의 소매장식", dungeon: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "손목", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "장갑", id: 249325, en: "Untethered Berserker's Grips", ko: "풀어헤쳐진 광전사의 손장갑", dungeon: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "허리", id: 249371, en: "Scornbane Waistguard", ko: "멸시파멸 허리보호대", dungeon: "Chimaerus", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "mm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49810:["crit","haste"],49812:["crit","haste"],
  49824:["crit","haste"],50228:["crit","haste"],50233:["crit","haste"],151321:["crit","mastery"],
  151323:["haste","mastery"],193701:[],193708:["crit","mastery"],244610:["crit","vers"],
  244611:["haste","mastery"],249288:["crit","haste"],249295:["crit","haste"],249304:["crit","mastery"],
  249320:["crit","vers"],249325:["crit","mastery"],249337:["crit","haste"],249368:["haste","mastery"],
  249371:["haste","mastery"],249919:["crit","mastery"],249920:["haste"],249977:["crit","haste"],
  249980:["crit","mastery"],249987:["crit","mastery"],249988:["crit","haste"],249989:["crit","mastery"],
  249990:["crit","mastery"],249991:["crit","haste"],249997:["crit","mastery"],250000:["crit","haste"],
  250031:["crit","mastery"],250247:["haste","mastery"],251079:["crit","mastery"],251084:["crit","mastery"],
  251089:["haste","mastery"],251095:["crit","haste"],251111:["crit","haste"],251119:["crit","mastery"],
  251162:["crit","haste"],251170:["crit","mastery"],251178:["crit","haste"],251215:["crit","mastery"],
  251217:["crit","haste"],251513:["crit","mastery"],252420:[],258525:["crit","haste"],
  258575:["crit","mastery"],258576:["crit","haste"],258585:["crit","mastery"],260235:[],
  260423:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Algeth'ar Academy", "Maisara Caverns",
];
