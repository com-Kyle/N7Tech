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
- User profiles for clients, homeowners, and contractors. Google and GitHub
  signups are classified as clients automatically.
- Administrator dashboard with editable names, occupations, account types,
  active/suspended status, N7 verification controls, and activity records.
- Quote scheduling at `/quote` with preliminary project details, a server-side
  48-hour minimum, founder email notifications, and a prefilled Google Calendar
  event containing both founder Gmail addresses as guests.
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

> **Note:** `npm run dev` serves the **raw Next.js app only** — without the
> `n7-home-shell` Worker that production runs in front. So the homepage cover
> art, account/login routes, the ContractorPod proxy, and the header brand
> lockup will **not** appear here. To preview what actually ships, use the
> full stack below.

### 3. Full production-like preview (Worker shell in front)

Runs Kyle's `n7-home-shell` Worker in front of a hot-reloading `next dev`, so
`localhost` renders **exactly like production** — cover background, login,
accounts, and the Neural Zenith header lockup. The shell reaches the local app
via the dev-only `ORIGIN_URL` var (prod uses the `ORIGIN` service binding).

```sh
npm run dev:db        # one-time: apply local D1 migrations for accounts/auth
npm run dev:full      # next dev (:3000) + shell Worker (:3137) together
```

Open **http://localhost:3137** (the shell). Local accounts live in a local D1
DB; `next dev`'s live-reload websocket doesn't tunnel through the Worker, so
**refresh manually** after edits (the page content is fully up to date).

## Production infrastructure

The `n7-home-shell` Worker owns both public custom domains (`n7technologies.org`
and `www.n7technologies.org`). It serves approved branding assets, handles
account and administrator routes, proxies ContractorPod, and forwards remaining
application requests to the `n7technologies` service binding.

Cloudflare D1 stores user profiles, sessions, OAuth state, password reset
tokens, administrator verification records, invitations, quote requests, and
audit logs. The `n7-email-router` Worker forwards `founder@`, `contact@`, and
`help@` to both verified founder inboxes through Cloudflare Email Routing.

See **`N7_DEPLOYMENT.md`** for the guarded, GitHub-first deployment process
(`./scripts/deploy-n7.sh`).

## Development

Requirements:

- Node.js
- npm
- Wrangler 4
- GitHub CLI for repository operations
- Authorized Cloudflare access to the N7 account

Run the public Worker locally:

```bash
npx wrangler dev --config n7-home-shell/wrangler.toml
```

Validate JavaScript before committing:

```bash
node --check n7-home-shell/src/index.js
node --check n7-home-shell/src/auth.js
node --check n7-email-router/src/index.js
```

## Deployment

GitHub is the source of record. Every update must be committed and pushed to
the `main` branch before Cloudflare is changed.

Enable repository commit stamping once per clone:

```bash
./scripts/setup-git.sh
```

Commit subjects and Cloudflare deployment messages are automatically prefixed
with `N7KP` and the requested Eastern date/time stamp.

```bash
git add .
git commit -m "Describe the N7 update"
git push origin main
./scripts/deploy-n7.sh
```

The deployment script refuses to run when:

- Tracked or untracked repository files are not committed.
- The current branch has no GitHub upstream.
- The local commit does not exactly match the pushed GitHub commit.

It then applies D1 migrations, deploys the email router, and deploys the public
shell. See [N7_DEPLOYMENT.md](N7_DEPLOYMENT.md) for the complete process.

## Configuration

OAuth login requires these Cloudflare Worker secrets:

```text
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

Password reset and administrator verification messages use the Worker's
Cloudflare Email binding and are sent from `accounts@n7technologies.org`.

Google and GitHub OAuth applications must use these canonical callback URLs:

```text
https://www.n7technologies.org/api/auth/oauth/google/callback
https://www.n7technologies.org/api/auth/oauth/github/callback
```

The Google OAuth client must include the Google callback above under
**Authorized redirect URIs**. Adding only the site origin is not sufficient.

## Security

Never commit:

- OAuth client secrets or API tokens
- Administrator activation links
- `.dev.vars` or `.env` files
- Wrangler local state
- User exports or production database records

The repository ignores these files. Private administrator activation links
are stored outside Git in `.admin-invites.txt`.

## Documentation

- [Public shell and account system](n7-home-shell/README.md)
- [Email routing Worker](n7-email-router/README.md)
- [Production deployment process](N7_DEPLOYMENT.md)
- [Recovered Worker notes](n7technologies-recovered/README.md)
