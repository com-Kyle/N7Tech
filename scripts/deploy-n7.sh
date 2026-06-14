#!/usr/bin/env bash
set -euo pipefail

# Single, guarded production deploy for n7technologies. Run this for EVERY prod
# change — it does not matter whether you touched the Next.js app, the shell
# Worker, both, or neither. It deploys everything in the one correct order and
# verifies the result. You never have to know "which Worker" again.
#
# Order matters and is the whole point:
#   1. remote D1 migrations
#   2. APP Worker      (n7technologies)        — build + deploy
#   3. email router    (n7-founder-email-router)
#   4. SHELL Worker    (n7technologies-shell)  — LAST, so it reclaims the
#                                                www + apex custom domain and
#                                                fronts the app. If the app is
#                                                deployed after the shell it
#                                                steals the domain and login
#                                                silently breaks — see the
#                                                2026-06-14 incident.
#   5. verify https://www.n7technologies.org/login == 200 (404 = shell bypassed)

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

# --- guards: clean tree, has upstream, pushed to GitHub --------------------
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
DEPLOY_STAMP=$(TZ=America/New_York date "+N7KP | %Y-%m-%d %H:%M:%S EST | Git $(git rev-parse --short HEAD)")

# --- 1. remote D1 migrations ----------------------------------------------
echo "==> Applying remote D1 migrations"
npx wrangler d1 migrations apply n7-accounts --remote --config n7-home-shell/wrangler.toml

# --- 2. APP Worker (build + deploy) ---------------------------------------
# Must run BEFORE the shell so the shell reclaims the custom domain last.
echo "==> Building + deploying the app Worker (n7technologies)"
npm run deploy:app

# --- 3. email router ------------------------------------------------------
echo "==> Deploying the email router"
npx wrangler deploy --config n7-email-router/wrangler.toml --message "$DEPLOY_STAMP"

# --- 4. SHELL Worker (reclaims the custom domain — must be last) -----------
echo "==> Deploying the shell Worker (n7technologies-shell)"
npx wrangler deploy --config n7-home-shell/wrangler.toml --message "$DEPLOY_STAMP"

# --- 5. verify the shell owns the domain ----------------------------------
# /login is served only by the shell. 200 = shell fronts the domain (login
# active). 404 = the shell was bypassed (app stole the domain) — the exact
# failure this script exists to prevent.
echo "==> Verifying https://www.n7technologies.org/login"
code=000
for _ in $(seq 1 10); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://www.n7technologies.org/login || echo 000)
  if [[ "$code" == "200" ]]; then
    echo "✅ Deploy verified: /login -> 200 (shell live, login active)."
    exit 0
  fi
  sleep 3
done

echo "⚠️  Deploy FAILED verification: /login -> $code (expected 200)." >&2
echo "    The shell may not own the custom domain. Re-run this script, or check" >&2
echo "    Cloudflare → Workers → n7technologies-shell custom domains." >&2
exit 1
