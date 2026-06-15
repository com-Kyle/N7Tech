#!/usr/bin/env bash
set -euo pipefail

ACTION=${1:-operation}
ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

BRANCH=$(git symbolic-ref --quiet --short HEAD || true)
if [[ -z "$BRANCH" ]]; then
  echo "GitHub sync check stopped: detached HEAD cannot be used for $ACTION." >&2
  exit 1
fi

if ! UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null); then
  echo "GitHub sync check stopped: branch '$BRANCH' has no upstream." >&2
  exit 1
fi

REMOTE=${UPSTREAM%%/*}
git fetch "$REMOTE" --quiet

read -r AHEAD BEHIND < <(git rev-list --left-right --count HEAD..."$UPSTREAM")

if (( BEHIND > 0 )); then
  echo "GitHub sync check stopped $ACTION: '$BRANCH' is $BEHIND commit(s) behind $UPSTREAM." >&2
  if (( AHEAD > 0 )); then
    echo "The branch has also diverged by $AHEAD local commit(s)." >&2
  fi
  echo "Run: git pull --rebase --autostash $REMOTE $BRANCH" >&2
  echo "Then review, restage if needed, and retry $ACTION." >&2
  exit 1
fi

echo "GitHub sync check passed for $ACTION: $BRANCH is current with $UPSTREAM."
