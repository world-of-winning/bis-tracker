export var SPEC_LABEL = "Restoration Shaman";
export var SPEC_KEY = "resto-shaman";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_magicimmunity";
export var STORAGE_KEY = "bis-resto-shaman-v1";

export var THEME = {
  accent: "#40a0e0",
  accentLight: "#8cc6ec",
  accentBg: "#0a1822",
  accentBorder: "#16384e",
  shimmer: "linear-gradient(90deg,#266086,#40a0e0,#8cc6ec,#40a0e0,#266086)",
  btnBg: "linear-gradient(135deg,#266086,#40a0e0)",
};

export var BIS = [
  { slot: "head", en: "Locus of the Primal Core", ko: "원시 핵의 집중점", id: 249979, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "neck", en: "Masterwork Sin'dorei Amulet", ko: "걸작 신도레이 아뮬렛", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", en: "Nullwalker's Dread Epaulettes", ko: "무위방랑자의 섬뜩한 견장", id: 249318, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "back", en: "Imperator's Banner", ko: "전제군주의 깃발", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "chest", en: "Embrace of the Primal Core", ko: "원시 핵의 포옹", id: 249982, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Cuffs of the Primal Core", ko: "원시 핵의 소매장식", id: 249975, source: "Catalyst", stats: ["crit","vers"] },
  { slot: "hands", en: "Earthgrips of the Primal Core", ko: "원시 핵의 대지손아귀", id: 249980, source: "Vorasius", stats: ["crit","mastery"] },
  { slot: "waist", en: "Waistcord of the Judged", ko: "심판받은 자의 허리줄", id: 249303, source: "Lightblinded Vanguard", stats: ["crit","vers"] },
  { slot: "legs", en: "Leggings of the Primal Core", ko: "원시 핵의 다리보호구", id: 249978, source: "Vaelgor & Ezzorak", stats: ["crit","vers"] },
  { slot: "feet", en: "Sabatons of Obscurement", ko: "암연의 발덮개", id: 249320, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "finger1", en: "Signet of the Starved Beast", ko: "굶주린 야수의 인장", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "finger2", en: "Sin'dorei Band of Hope", ko: "희망의 신도레이 고리", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Magister's Ritual Knife", ko: "마법학자의 의식용 손칼", id: 237838, source: "Crafted", stats: [] },
  { slot: "off_hand", en: "Bulwark of Noble Resolve", ko: "귀족의 결의 보루 방패", id: 249275, source: "Imperator Averzian", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", en: "Void-Touched Grips", ko: "공허에 물든 손장갑", id: 151322, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Black Dragonskin Breeches", ko: "검은용가죽 짧은바지", id: 49811, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "feet", en: "Boots of Explosive Growth", ko: "폭발적인 성장의 장화", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", en: "Band of the Triumvirate", ko: "삼두정의 고리", id: 151311, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Surgeon's Needle", ko: "외과의사의 바늘", id: 50227, source: "Skyreach", stats: ["crit","vers"] },
  { slot: "off_hand", en: "Reflux Reflector", ko: "역류 굴절 장치", id: 251202, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "가슴", id: 249991, en: "Primal Sentry's Scaleplate", ko: "원시 파수꾼의 비늘판금", dungeon: "Chimaerus", stats: ["crit","haste"] },
  { forSlot: "가슴", id: 250000, en: "Frenzyward of the Black Talon", ko: "검은 갈퀴발톱의 광란수호물", dungeon: "Tier", stats: ["crit","haste"] },
  { forSlot: "망토", id: 250046, en: "Blind Oath's Shroud", ko: "맹목적인 맹세의 수의", dungeon: "Catalyst", stats: ["crit","vers"] },
  { forSlot: "망토", id: 251161, en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "머리", id: 249988, en: "Primal Sentry's Maw", ko: "원시 파수꾼의 아귀", dungeon: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { forSlot: "목", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", dungeon: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "무기", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "무기", id: 249293, en: "Weight of Command", ko: "지휘의 무게", dungeon: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "무기", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { forSlot: "반지", id: 193708, en: "Platinum Star Band", ko: "백금 별의 고리", dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "반지", id: 251513, en: "Loa Worshiper's Band", ko: "로아 신봉자의 고리", dungeon: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "발", id: 244610, en: "World Tender's Rootslippers", ko: "세계지기의 뿌리끌신", dungeon: "Crafted", stats: ["crit","vers"] },
  { forSlot: "발", id: 249377, en: "Darkstrider Treads", ko: "어둠걸이의 발보호대", dungeon: "Belo'ren", stats: ["crit","haste"] },
  { forSlot: "손목", id: 249304, en: "Fallen King's Cuffs", ko: "몰락한 왕의 소매장식", dungeon: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "손목", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "어깨", id: 193704, en: "Scaled Commencement Spaulders", ko: "비늘 학위 어깨덮개", dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "어깨", id: 249977, en: "Tempests of the Primal Core", ko: "원시 핵의 돌개바람", dungeon: "Tier", stats: ["crit","haste"] },
  { forSlot: "어깨", id: 249995, en: "Beacons of the Black Talon", ko: "검은 갈퀴발톱의 봉화", dungeon: "Tier", stats: ["crit","mastery"] },
  { forSlot: "장갑", id: 249325, en: "Untethered Berserker's Grips", ko: "풀어헤쳐진 광전사의 손장갑", dungeon: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "장갑", id: 249989, en: "Primal Sentry's Talonguards", ko: "원시 파수꾼의 갈퀴보호대", dungeon: "Voracius", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "resto-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49811:["crit","vers"],49823:["crit","vers"],49824:["crit","haste"],
  50227:["crit","vers"],50228:["crit","haste"],50233:["crit","haste"],51802:["crit","haste"],
  151308:["crit","vers"],151311:["haste","vers"],151321:["crit","mastery"],151322:["mastery","vers"],
  193704:["crit","mastery"],193708:["crit","mastery"],193715:["crit","haste"],193717:["crit","vers"],
  193718:[],193723:["crit","vers"],237838:[],240950:[],
  244610:["crit","vers"],249275:["crit","vers"],249293:["crit","vers"],249303:["crit","vers"],
  249304:["crit","mastery"],249318:["crit","mastery"],249320:["crit","vers"],249325:["crit","mastery"],
  249335:["crit","vers"],249336:["crit","vers"],249337:["crit","haste"],249343:["mastery"],
  249377:["crit","haste"],249919:["crit","mastery"],249975:["crit","vers"],249977:["crit","haste"],
  249978:["crit","vers"],249979:["haste","mastery"],249980:["crit","mastery"],249982:["haste","mastery"],
  249988:["crit","haste"],249989:["crit","mastery"],249991:["crit","haste"],249995:["crit","mastery"],
  250000:["crit","haste"],250046:["crit","vers"],251079:["crit","mastery"],251161:["crit","vers"],
  251202:["crit","vers"],251513:["crit","mastery"],258516:["crit","vers"],258576:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Algeth'ar Academy", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
