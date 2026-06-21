// Changelog entries — newest first
// { date: "YYYY-MM-DD", text: { ko, en } }
export var CHANGELOG = [
    {
        date: "2026-06-21",
        text: {
            ko: "Rotmire 던전 신규 아이템 추가 — 전 40 스펙 ALTS 업데이트",
            en: "Add Rotmire dungeon items — ALTS updated for all 40 specs",
        },
    },
    {
        date: "2025-04-08",
        text: {
            ko: "10개 언어 지원 — 아이템명·UI·튜토리얼 전체 현지화 (en/ko/fr/de/zhCN/zhTW/es/ru/pt/it)",
            en: "10-language support — item names, UI, and tutorial fully localized (en/ko/fr/de/zhCN/zhTW/es/ru/pt/it)",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "아이템 데이터 전수 검증 — 슬롯 오류, 소스 불일치, 누락 아이템 수정 (20+ 스펙)",
            en: "Full item data audit — fix slot errors, source mismatches, missing items across 20+ specs",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "generate-spec-data 슬롯 이름 퍼지 매칭으로 개선 (Maxroll 표기 변형 대응)",
            en: "Fuzzy slot name matching in generate-spec-data to handle Maxroll label variants",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "능력치 불일치 아이템에서 '등급↑ 필요' 라벨이 표시되지 않던 버그 수정",
            en: "Fix grade-up label not showing on stat-mismatched equipped items",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "포식 악사 Wowhead 툴팁 주 능력치가 민첩 대신 지능으로 올바르게 표시",
            en: "Fix Devourer DH Wowhead tooltip showing Agility instead of Intellect",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "완료 카드에서 착용 중인 아이템 이름 라벨이 표시되지 않던 버그 수정",
            en: "Fix equipped item name label not showing on completed cards",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "크로스스펙 SimC 공유 — 같은 클래스 다른 전문화 장비 데이터로 BiS 비교",
            en: "Cross-spec SimC sharing — Compare BiS using gear data from another spec of the same class",
        },
    },
    {
        date: "2025-04-01",
        text: {
            ko: "무기 타입/주 능력치 미스매치 감지 및 경고",
            en: "Weapon type and primary stat mismatch detection with warnings",
        },
    },
    {
        date: "2025-03-31",
        text: {
            ko: "직업/전문화 아이콘 그리드 랜딩 + URL 라우팅 (?class=paladin&spec=retribution)",
            en: "Class/spec icon grid landing + URL routing (?class=paladin&spec=retribution)",
        },
    },
    {
        date: "2025-03-31",
        text: {
            ko: "카탈로그 모드 — SimC 없이 스펙별 BiS/Alt 목록 열람",
            en: "Catalog mode — Browse BiS/Alt lists per spec without SimC",
        },
    },
    {
        date: "2025-03-31",
        text: {
            ko: "아이템 소스 데이터 정리 (합성 소스 분리, 오타 수정, 비시즌 던전 제거)",
            en: "Item source data cleanup (split combined sources, fix typos, remove non-season dungeons)",
        },
    },
    {
        date: "2025-03-29",
        text: {
            ko: "잘못된 방어구 타입 착용 감지 및 경고 표시",
            en: "Detect and warn when wearing wrong armor type",
        },
    },
    {
        date: "2025-03-28",
        text: {
            ko: "파밍 카운트 통합 및 등급↑ 필요 아이템 빨간색 표시",
            en: "Unified farming count logic, tierUp items shown in red",
        },
    },
    {
        date: "2025-03-27",
        text: {
            ko: "아이템 등급 판별 bonus_id 기반으로 개선",
            en: "Improved item grade detection using bonus_id ranges",
        },
    },
    {
        date: "2025-03-26",
        text: {
            ko: "장착 아이템 툴팁에 스탯 변화량 비교 표시",
            en: "Stat diff comparison on equipped item tooltip",
        },
    },
    {
        date: "2025-03-25",
        text: {
            ko: "M+ BiS 추적, Alt 카드 개선, 완료 조건 통합",
            en: "M+ BiS tracking, alt card improvements, unified completion logic",
        },
    },
    {
        date: "2025-03-24",
        text: {
            ko: "4열 레이아웃, 등급 상한 표시 개선, 프로그레스 바 간소화",
            en: "4-column layout, tier-cap status labels, simplified progress bar",
        },
    },
    {
        date: "2025-03-24",
        text: {
            ko: "BiS/M+ 이중 뷰 및 레이드 출처 지원 (티어/제작/보스별 필터)",
            en: "BiS/M+ dual view with raid source filters (Tier/Crafted/Boss)",
        },
    },
    {
        date: "2025-03-23",
        text: {
            ko: "체험하기 + 튜토리얼 기능 추가",
            en: "Added interactive demo with tutorial",
        },
    },
    {
        date: "2025-03-23",
        text: {
            ko: "같은 캐릭터 다른 전문화 지원",
            en: "Support multiple specs per character",
        },
    },
    {
        date: "2025-03-23",
        text: {
            ko: "전 직업/전문화 BiS 데이터 추가",
            en: "Added BiS data for all classes/specs",
        },
    },
    {
        date: "2025-03-23",
        text: {
            ko: "한국어/영어 다국어 지원",
            en: "Korean/English localization support",
        },
    },
    {
        date: "2025-03-21",
        text: {
            ko: "최초 출시 — SimC 가져오기, BiS 우선순위 정렬",
            en: "Initial release — SimC import, BiS priority sorting",
        },
    },
];
