export var SPEC_LABEL = "Brewmaster Monk";
export var SPEC_KEY = "brew-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/brewmaster-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "brewmaster";
export var SPEC_ICON = "spell_monk_brewmaster_spec";
export var STORAGE_KEY = "bis-brew-monk-v1";

export var THEME = {
  accent: "#00AA60",
  accentLight: "#66cca0",
  accentBg: "#001a0e",
  accentBorder: "#003b22",
  shimmer: "linear-gradient(90deg,#00663a,#00AA60,#66cca0,#00AA60,#00663a)",
  btnBg: "linear-gradient(135deg,#00663a,#00AA60)",
};

export var BIS = [
  { slot: "head", en: "Fearsome Visage of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 무시무시한 안면", id: 250015, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", en: "Masterwork Sin'dorei Amulet", ko: "걸작 신도레이 아뮬렛", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", en: "Aurastones of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 기의 돌", id: 250013, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", en: "Battle Garb of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 전투복", id: 250018, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", en: "Custodial Cuffs", ko: "관리인의 소매장식", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", en: "Thunderfists of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 천둥주먹", id: 250016, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "waist", en: "Twisted Twilight Sash", ko: "뒤틀린 황혼의 장식띠", id: 249314, source: "Fallen-King Salhadaar", stats: ["mastery","vers"] },
  { slot: "legs", en: "Shifting Stalker Hide Pants", ko: "변화의 추적자 가죽 바지", id: 151314, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", en: "Footpads of Seeping Dread", ko: "스며드는 공포의 발보호구", id: 151317, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", en: "Signet of Azerothian Blessings", ko: "아제로스의 축복 인장", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "finger2", en: "Signet of the Starved Beast", ko: "굶주린 야수의 인장", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Umbral Plume", ko: "암영의 꽁지깃", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", id: 193723, source: "Algeth'ar Academy", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", en: "Fetid Vilecrown", ko: "악취 나는 부정왕관", id: 251177, source: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "neck", en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Twilight's Edge Spaulders", ko: "황혼의 서슬 어깨덮개", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "back", en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", en: "Vest of the Void's Embrace", ko: "공허의 포옹 조끼", id: 151313, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "wrist", en: "Custodial Cuffs", ko: "관리인의 소매장식", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", en: "Ruby Contestant's Gloves", ko: "루비 참가자의 장갑", id: 193721, source: "Algeth'ar Academy", stats: ["mastery","vers"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Shifting Stalker Hide Pants", ko: "변화의 추적자 가죽 바지", id: 151314, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", en: "Footpads of Seeping Dread", ko: "스며드는 공포의 발보호구", id: 151317, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Solar Core Igniter", ko: "태양 핵 점화자", id: 252418, source: "Skyreach", stats: [] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", id: 193723, source: "Algeth'ar Academy", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 49823, en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "back", id: 249335, en: "Imperator's Banner", ko: "전제군주의 깃발", source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "feet", id: 251121, en: "Domanaar's Dire Treads", ko: "도마나르의 광포한 발보호대", source: "Magisters' Terrace", stats: ["mastery","vers"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "head", id: 151336, en: "Voidlashed Hood", ko: "공허에 스친 두건", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "neck", id: 151309, en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "ring", id: 221200, en: "Radiant Necromancer's Band", ko: "찬란한 강령술사의 고리", source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249919, en: "Sin'dorei Band of Hope", ko: "희망의 신도레이 고리", source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251205, en: "Leyline Leggings", ko: "지맥 다리보호구", source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "ring", id: 251513, en: "Loa Worshiper's Band", ko: "로아 신봉자의 고리", source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251171, en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", source: "Maisara Caverns", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["vers","crit","mastery","haste"];

export var STAT_CACHE_KEY = "brew-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49823:["crit","vers"],151308:["crit","vers"],151309:["haste","vers"],
  151313:["crit","vers"],151314:["mastery","vers"],151317:["mastery","vers"],151319:["crit","mastery"],
  151336:["crit","haste"],193708:["crit","mastery"],193721:["mastery","vers"],193723:["crit","vers"],
  221200:["mastery","vers"],240950:[],241140:["mastery","vers"],249314:["mastery","vers"],
  249335:["crit","vers"],249336:["crit","vers"],249343:["mastery"],249919:["crit","mastery"],
  250013:["haste","mastery"],250015:["crit","haste"],250016:["crit","vers"],250018:["crit","haste"],
  251082:["crit","mastery"],251092:["haste","mastery"],251096:["haste","vers"],251103:["haste","vers"],
  251121:["mastery","vers"],251161:["crit","vers"],251171:["haste","mastery"],251177:["crit","vers"],
  251205:["crit","vers"],251513:["crit","mastery"],252418:[],252420:[],
  260235:[],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Seat of the Triumvirate", "Skyreach",
];
