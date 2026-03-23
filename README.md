# WoW Midnight BiS Tracker

WoW Midnight 시즌 1 BiS 아이템 추적기. SimC 가져오기, 파밍 우선순위, 던전별 Alt 표시.

## 지원 스펙

- 보호 성기사 (Protection Paladin)
- 황폐 기원사 (Devastation Evoker)

## 기능

- **SimC 가져오기** — `/simc` 출력 붙여넣기로 현재 장비 자동 분석
- **파밍 우선순위** — 능력치 불일치 > Alt 장착 > BiS 등급↑ > 완료
- **목표 등급** — 노련가/챔피언/영웅/신화 선택, ilvl 갭 기반 정렬
- **던전별 뷰** — 각 던전에서 먹을 수 있는 BiS + Alt 한눈에
- **Wowhead 툴팁** — 아이템 호버 시 인게임 툴팁 표시
- **localStorage 저장** — 세션 간 진행도 유지

## 로컬 개발

```bash
bun install
bun run dev
```

## Cloudflare Pages 배포

1. GitHub에 push
2. [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create project → 레포 연결
3. Build command: `bun run build` / Output directory: `dist`

별도 설정 불필요. Vite 정적 빌드 결과가 그대로 배포됨.

## 스펙 추가

`src/data/` 에 새 파일 생성 후 `src/data/specs.js`에 등록.
필요한 데이터: BiS 목록(16슬롯), Alt 목록, STAT_CACHE, 던전 리스트.

## 데이터 소스

- 아이템 ID / 한글명: Wowhead tooltip API (locale=1)
- 보조 능력치: Wowhead tooltip HTML 파싱 (rtg32/36/49/40)
- Alt 아이템: Wowhead zone drop table (WH.Gatherer.addData)
