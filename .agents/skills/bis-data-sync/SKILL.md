---
name: bis-data-sync
description: >
  WoW BiS Tracker의 spec data 파일을 Maxroll.gg 최신 가이드 기준으로 갱신하는 스킬.
  Maxroll 가이드 페이지를 크롤링해 기존 데이터와 비교 — 변경된 스펙만 Wowhead 아이템 룩업 후 파일 업데이트.
  아이템 추가/변경/삭제 감지, ALTS 재탐색, 다국어 아이템명 보완까지 자동 처리.
  트리거: "BiS 갱신", "데이터 업데이트", "Maxroll 체크", "아이템 정보 최신화", "스펙 데이터 싱크",
  "update BiS data", "sync spec data", "check Maxroll for changes", "regenerate spec files".
  직업명 + "갱신/업데이트" 조합에도 반드시 트리거.
---

# BiS Data Sync Skill

Maxroll.gg BiS 가이드 변경을 감지하고 `src/data/{spec}.js` 파일을 최신 상태로 유지한다.

## 작업 디렉토리

항상 `/home/hanjukim/bis-tracker/`에서 실행한다.

```bash
cd /home/hanjukim/bis-tracker
```

## Step 1: 대상 스펙 결정

유저가 스펙을 지정하지 않으면 **전체 스펙** 대상으로 동작한다.

```bash
# 전체 스펙 키 목록 확인
node scripts/generate-spec-data.mjs --list
```

일반적인 범위 옵션:
- **특정 스펙**: `prot-paladin`, `blood-dk` 등 spec key를 직접 지정
- **전체**: 인수 없이 실행
- **미완성만**: `--missing` (BIS+MYTHIC 14개 미만인 스펙만)

## Step 2: Maxroll 데이터 동기화

파이프라인이 **내부적으로 Maxroll 변경 감지**를 수행한다:
- Maxroll 데이터 == 기존 파일 → "No changes from maxroll — skipping Wowhead lookups" (빠름)
- Maxroll 데이터 ≠ 기존 파일 → Wowhead에서 아이템 스탯 재조회 후 파일 업데이트

```bash
# 특정 스펙 (예: prot-paladin)
node scripts/generate-spec-data.mjs prot-paladin

# 전체 스펙
node scripts/generate-spec-data.mjs

# Maxroll 캐시 무시하고 강제 재처리 (스크립트가 unchanged 판정해도 재실행)
node scripts/generate-spec-data.mjs --force

# 빠른 체크: 미완성 스펙만
node scripts/generate-spec-data.mjs --missing
```

## Step 3: 변경 여부 확인

```bash
rtk git diff --stat
```

- **변경 없음**: Maxroll 가이드가 기존 데이터와 동일. 유저에게 보고하고 종료.
- **변경 있음**: Step 4 계속.

## Step 4: 후속 스크립트 실행

spec 파일이 변경된 경우에만 실행한다.

```bash
# 전 스펙 교차 ALTS 재탐색 (같은 슬롯+스탯 조합 아이템 갱신)
node scripts/find-alts.mjs

# 새 아이템 ID에 대한 다국어 아이템명 보완 (--missing 플래그 미지원, 전체 실행)
node scripts/generate-item-names.mjs
```

`find-alts.mjs`는 특정 스펙만 바뀌어도 전체 인덱스 기준으로 동작하므로 **항상 전체 실행**한다.

## Step 5: 변경 내용 보고

```bash
# 변경된 spec 파일 상세 diff
rtk git diff src/data/

# i18n 아이템명 변경 확인
rtk git diff src/i18n/
```

유저에게 보고할 내용:
1. 어떤 스펙이 업데이트됐는지
2. BIS 또는 MYTHIC에서 추가/제거된 아이템
3. 새로 발견된 ALTS
4. 전체 변경 파일 수 요약

## 선택 옵션: 빌드 검증

```bash
bun run build
```

## 선택 옵션: 커밋

변경 내용이 정상이면 커밋 제안. 커밋 메시지 형식:

```
chore: update BiS data from Maxroll (YYYY-MM-DD)

- Updated specs: prot-paladin, blood-dk, ...
- New items: [item names]
- Removed items: [item names]
```

## 에러 처리

| 증상 | 원인 | 대처 |
|------|------|------|
| 403/429 응답 | Maxroll rate limit | 30초 후 재시도, 또는 단일 스펙으로 쪼개서 실행 |
| Item not found | Maxroll 가이드의 아이템명 변경 | `rtk grep "item-name" src/data/` 로 수동 확인 |
| ALTS 파일 갱신 안 됨 | `find-alts.mjs` 미실행 | Step 4 재실행 |
| Wowhead cache 오류 | `.wowhead-cache.json` 손상 | `node scripts/generate-spec-data.mjs {spec} --regenerate` |

## 주의사항

- `priority-stats.json`은 수동 관리 파일 — 절대 자동 덮어쓰기 금지
- 아이템 소스/던전명 불일치 시 임의 교체 금지 — Wowhead에서 먼저 확인
- `--regenerate` 플래그는 Wowhead 캐시를 삭제함 — 느리고 API 부하 큼, 꼭 필요할 때만 사용
- 기존 ALTS의 무기 항목은 보존됨 (find-alts가 덮어쓰지 않음)
