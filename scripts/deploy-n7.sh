#!/usr/bin/env bash
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

if [[ -n "$(git status --porcelain --untracked-files=all)" ]]; then
  echo "Deployment stopped: commit all N7Tech changes before deploying." >&2
  exit 1
fi

if ! UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null); then
  echo "Deployment stopped: the current branch has no GitHub upstream." >&2
  exit 1
fi

git fetch origin --quiet

if [[ "$(git rev-parse HEAD)" != "$(git rev-parse "$UPSTREAM")" ]]; then
  echo "Deployment stopped: push the current commit to GitHub first." >&2
  exit 1
fi

echo "GitHub is current at $(git rev-parse --short HEAD)."
npx wrangler d1 migrations apply n7-accounts --remote --config n7-home-shell/wrangler.toml
npx wrangler deploy --config n7-email-router/wrangler.toml
npx wrangler deploy --config n7-home-shell/wrangler.toml
