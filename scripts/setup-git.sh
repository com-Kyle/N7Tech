#!/usr/bin/env bash
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

git config --local core.hooksPath .githooks
git config --local user.name N7KP
chmod +x .githooks/prepare-commit-msg .githooks/pre-commit .githooks/pre-push scripts/check-github-sync.sh

echo "N7KP commit stamping and GitHub sync checks are enabled for this repository."
