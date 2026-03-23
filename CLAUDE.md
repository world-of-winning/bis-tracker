# WoW Midnight BiS Tracker

## 프로젝트 개요
WoW Midnight 시즌 1 BiS(Best in Slot) 아이템 추적기. SimC 가져오기로 현재 장비 분석, 파밍 우선순위 정렬, 던전별 Alt 아이템 표시.

## 기술 스택
- **프레임워크:** React 18 + Vite
- **스타일링:** CSS (src/styles.css) + inline styles
- **저장:** localStorage (src/storage.js)
- **외부 API:** Wowhead tooltip API (nether.wowhead.com) — 동적 아이템 스탯 조회
- **패키지 매니저:** bun
- **배포:** Cloudflare Pages (정적 빌드)

## 프로젝트 구조
```
src/
├── App.jsx              # 스펙 선택 탭 (보기/황폐)
├── main.jsx             # 엔트리
├── storage.js           # localStorage 래퍼
├── styles.css           # 전역 CSS + 애니메이션
├── components/
│   └── BisTracker.jsx   # 핵심 트래커 컴포넌트 (스펙-무관)
└── data/
    ├── shared.js         # 던전 컬러, 등급, 능력치명, fetchItemStats()
    ├── prot-paladin.js   # 보호 성기사 BiS/Alt/KNOWN_STATS
    ├── dev-evoker.js     # 황폐 기원사 BiS/Alt/KNOWN_STATS
    └── specs.js          # 스펙 레지스트리
```

## 아키텍처 핵심

### 데이터 흐름
1. 스펙 데이터(BIS, ALTS, KNOWN_STATS, WORST_STATS) → BisTracker에 prop으로 전달
2. SimC 텍스트 파싱 → 장착/가방 아이템 ID 추출
3. KNOWN_STATS에 없는 ID → `fetchItemStats()`로 Wowhead API 동적 조회
4. `allStats = KNOWN_STATS + runtimeStats` 병합 → 우선순위/Alt/worst stat 판정

### 우선순위 시스템 (tier 1→4)
- **tier 1 ▲:** 능력치 불일치 (BiS도 Alt도 아닌 아이템 장착)
- **tier 2 ◆:** Alt 장착 (능력치 동일, BiS 아닌 아이템)
- **tier 3 ↑:** BiS 장착했지만 목표 등급 미달
- **tier 4 ✓:** 완료
- 같은 tier 내: worst stat 장착 → 먼저, deficit 큰 것 → 먼저

### 스펙별 데이터 파일 형식
```js
export var SPEC_LABEL = "스펙 한글명";
export var SPEC_KEY = "url-safe-key";
export var STORAGE_KEY = "bis-{key}-v1";
export var STAT_CACHE_KEY = "{key}-stat-cache-v1";
export var THEME = { accent, accentLight, accentBg, accentBorder, shimmer, btnBg };
export var WORST_STATS = ["vers"];  // 빈 배열이면 비활성
export var KNOWN_STATS = { itemId: ["crit","haste"], ... };  // BiS+Alt만
export var BIS = [ { slot, simcSlot, en, ko, id, dungeon, stats }, ... ];
export var ALTS = [ { forSlot, id, en, ko, dungeon, stats }, ... ];
export var DUNGEONS = [ ... ];  // 한밤 먼저, 구 던전 뒤
```

## 새 스펙 추가 절차
1. BiS 목록 16슬롯 준비 (영문명 + 던전)
2. Wowhead 검색 API로 Item ID 확보: `wowhead.com/search/suggestions-template?id=items&q={name}`
3. Wowhead tooltip API로 한글명 확보: `nether.wowhead.com/tooltip/item/{id}?dataEnv=1&locale=1`
4. Wowhead tooltip API로 스탯 확보: `nether.wowhead.com/tooltip/item/{id}?dataEnv=1&locale=0` → `<!--rtg32-->` crit, `<!--rtg36-->` haste, `<!--rtg49-->` mastery, `<!--rtg40-->` vers
5. 던전 zone 드롭 테이블에서 Alt 아이템 탐색 (같은 슬롯 + 같은 보조 능력치 조합)
6. `src/data/{spec-key}.js` 생성 → `src/data/specs.js`에 import 추가

## 언어 규칙
- UI 텍스트: 한국어
- 코드 변수/함수명: 영어
- WoW 능력치 공식명: 가속(Haste), 특화(Mastery), 치명타(Critical Strike), 유연성(Versatility)
- 던전 약칭: 사론, 제나스, 윈첨, 마정, 하늘탑, 삼두정, 알대, 마이사라
- Wowhead 링크는 항상 `/ko/` 로케일 사용

## 빌드 & 개발
```bash
bun install
bun run dev      # 개발 서버 (WSL: --host 자동 활성화됨)
bun run build    # 프로덕션 빌드 → dist/
bun run preview  # 빌드 결과 미리보기
```

## 외부 의존성
- **Wowhead power.js:** `index.html`에서 `<script>` 로딩. 아이템 호버 시 인게임 툴팁 표시.
- **Wowhead tooltip API:** SimC import 시 미등록 아이템 스탯 동적 조회. CORS 없음 (자체 도메인 호스팅 시).
- **Google Fonts:** Cinzel + Noto Sans KR

## 주의사항
- `localStorage`를 직접 호출하지 말 것 → `src/storage.js`의 `load()`/`save()` 사용
- BiS/Alt 아이템 스탯은 `KNOWN_STATS`에 정적 등록, 장착 아이템은 동적 조회
- 아티팩트(claude.ai) 버전은 별도 관리 — `window.storage` API 사용, 이 프로젝트와 동기화 필요 시 수동
