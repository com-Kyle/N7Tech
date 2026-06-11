# n7technologies

The n7technologies website + admin platform. Domain: **www.n7technologies.org**
(Cloudflare). Structure deliberately mirrors **ContractorPod**.

## Stack

- **Frontend** — Next.js 16, App Router, React 19, Tailwind 4, dark-only.
  Route groups: `app/(public)` (apex marketing) + `app/(admin)` (dashboard).
  Path alias `@/*` → repo root. Fonts: Inter + JetBrains Mono.
- **Backend** — Go 1.25, Gin, GORM, Postgres. Boot order in
  `backend/cmd/server/main.go`: `config.Load` → `db.Open` → `AutoMigrate` →
  `Seed` → `router.New` → serve. Liveness at `/healthz`, API under `/api`.
- **Hosting** — Cloudflare Pages (frontend). Backend deployed separately.

## Conventions

- Branch + MR per change; never push to `main`.
- New GORM model → add it to `db.AutoMigrate`. Not-null columns on existing
  tables need a `default:` to survive AutoMigrate (the ContractorPod rule).
- Backend config: required env fails `config.Load` loudly; optional env falls
  back to a documented default so the server boots in bare dev.
- The admin dashboard will move to its own subdomain (admin.n7technologies.org)
  later; today it renders from the same Next.js app via the `(admin)` group.

## TODO (shell only so far)

- Auth gating on `(admin)` routes (currently open).
- Admin write endpoints (products/users/settings are read-only).
- Cloudflare Pages deploy config + custom domain.
