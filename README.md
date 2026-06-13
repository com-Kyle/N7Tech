# N7Tech

The unified repository for [n7technologies.org](https://www.n7technologies.org) —
both the editable application source and the production Cloudflare infrastructure.

This repo holds two layers that ship together:

1. **The Next.js application** (`app/`, `components/`, `lib/`, `backend/`) — the
   marketing site + admin dashboard source, editable as normal React/TSX + a
   Go API. Structure mirrors ContractorPod.
2. **The Cloudflare Worker infrastructure** (`n7-home-shell/`,
   `n7-email-router/`, `n7technologies-recovered/`) — the public Worker shell
   that fronts both custom domains, adds branding/auth/admin, routes contact
   email, and proxies ContractorPod.

## Current features

- Responsive N7 homepage with persistent red network artwork and pinned
  red-and-black branding assets.
- Approved N7 banner logo positioned directly in the navigation header.
- Desktop navigation and a mobile three-line menu for Products, Services,
  About, and Contact.
- ContractorPod available through
  `https://www.n7technologies.org/contractorpod`.
- Email/password accounts backed by Cloudflare D1.
- Google and GitHub OAuth integration points.
- One-hour, single-use password reset links with session revocation.
- User profiles for homeowners and contractors.
- Administrator dashboard with account status controls and activity records.
- Email-verified administrator access for the approved founder Gmail accounts.
- Contact aliases for `founder@`, `contact@`, and `help@` on the N7 domain.

## Repository layout

```text
app/                        Next.js App Router — (public) marketing + (admin) dashboard
components/                 Shared React components (nav, footer, cards, forms)
lib/                        Frontend data/util modules
backend/                    Go 1.25 / Gin / GORM / Postgres API
public/                     Static assets (brand, screenshots)

n7-home-shell/              Public Worker: assets, authentication, admin, and D1 schema
n7-email-router/            Inbound contact-email forwarding Worker
n7technologies-recovered/   Reference snapshot of the recovered origin Worker
scripts/deploy-n7.sh        GitHub-first guarded Cloudflare deployment
N7_DEPLOYMENT.md            Detailed production deployment process
```

The recovered Worker is retained for reference only. Do not deploy it directly
without its matching Cloudflare asset manifest.

## Run the Next.js app locally

### 1. Backend (needs Postgres)

```sh
cd backend
cp .env.example .env          # adjust DATABASE_URL if needed
docker compose up -d db       # or point DATABASE_URL at your own Postgres
go mod tidy
go run ./cmd/server           # listens on :8080, seeds demo products
```

Health check: http://localhost:8080/healthz

### 2. Frontend

```sh
npm install
npm run dev                   # http://localhost:3000
```

The frontend reads the API at `NEXT_PUBLIC_API_BASE_URL` (default
`http://localhost:8080`). With the backend down, pages still render with
empty-state placeholders.

## Production infrastructure

The `n7-home-shell` Worker owns both public custom domains (`n7technologies.org`
and `www.n7technologies.org`). It serves approved branding assets, handles
account and administrator routes, proxies ContractorPod, and forwards remaining
application requests to the `n7technologies` service binding.

Cloudflare D1 stores user profiles, sessions, OAuth state, password reset
tokens, administrator verification records, invitations, and audit logs. The
`n7-email-router` Worker forwards `founder@`, `contact@`, and `help@` to both
verified founder inboxes through Cloudflare Email Routing.

See **`N7_DEPLOYMENT.md`** for the guarded, GitHub-first deployment process
(`./scripts/deploy-n7.sh`).

Private administrator activation links, OAuth credentials, local Wrangler state,
and environment secrets must never be committed.
