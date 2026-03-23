#!/bin/bash
# Pre-commit secret detection script
# Scans staged files for potential secrets and sensitive data

PATTERNS=(
  'PRIVATE.KEY'
  'BEGIN RSA'
  'BEGIN DSA'
  'BEGIN EC PRIVATE'
  'BEGIN OPENSSH PRIVATE'
  'password\s*[:=]'
  'secret\s*[:=]'
  'api[_-]?key\s*[:=]'
  'access[_-]?token\s*[:=]'
  'auth[_-]?token\s*[:=]'
  'AWS_ACCESS_KEY_ID'
  'AWS_SECRET_ACCESS_KEY'
  'AKIA[0-9A-Z]{16}'
  'ghp_[0-9a-zA-Z]{36}'
  'gho_[0-9a-zA-Z]{36}'
  'sk-[0-9a-zA-Z]{48}'
  'xox[bpors]-[0-9a-zA-Z-]+'
  'discord[_.]?token'
)

ALLOW_FILES=(
  'bun.lock'
  'package-lock.json'
  'scripts/check-secrets.sh'
)

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

FILTERED_FILES=""
for file in $STAGED_FILES; do
  skip=false
  for allow in "${ALLOW_FILES[@]}"; do
    if [ "$file" = "$allow" ]; then
      skip=true
      break
    fi
  done
  if [ "$skip" = false ]; then
    FILTERED_FILES="$FILTERED_FILES $file"
  fi
done

if [ -z "$FILTERED_FILES" ]; then
  exit 0
fi

FOUND=0
for pattern in "${PATTERNS[@]}"; do
  MATCHES=$(echo "$FILTERED_FILES" | xargs git diff --cached -G "$pattern" --name-only 2>/dev/null)
  if [ -n "$MATCHES" ]; then
    if [ "$FOUND" -eq 0 ]; then
      echo "🚨 Potential secrets detected in staged files:"
      echo ""
    fi
    FOUND=1
    for match in $MATCHES; do
      echo "  ⚠ $match  (pattern: $pattern)"
    done
  fi
done

# Check for .env files
for file in $STAGED_FILES; do
  case "$file" in
    .env|.env.*|*.pem|*.key|credentials*)
      if [ "$FOUND" -eq 0 ]; then
        echo "🚨 Potential secrets detected in staged files:"
        echo ""
      fi
      FOUND=1
      echo "  ⚠ $file  (sensitive filename)"
      ;;
  esac
done

if [ "$FOUND" -ne 0 ]; then
  echo ""
  echo "Commit blocked. Review the files above and remove secrets."
  echo "To bypass (NOT recommended): git commit --no-verify"
  exit 1
fi

exit 0
