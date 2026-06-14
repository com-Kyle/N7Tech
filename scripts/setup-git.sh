#!/usr/bin/env bash
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

git config --local core.hooksPath .githooks
git config --local user.name N7KP

echo "N7KP commit stamping is enabled for this repository."
