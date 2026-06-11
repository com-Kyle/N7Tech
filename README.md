# n7technologies

The n7technologies website + admin platform. Structure mirrors ContractorPod.

- **Frontend** — Next.js 16 (App Router, React 19, Tailwind 4). Route groups:
  `app/(public)` (apex marketing site, www.n7technologies.org) and
  `app/(admin)` (the products dashboard, destined for admin.n7technologies.org).
- **Backend** — Go 1.25 / Gin / GORM / Postgres (`backend/`).
- **Hosting** — Cloudflare Pages (frontend); backend deployed separately.

## Run it locally

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

## Layout

```
app/(public)/     marketing site — home, about, products, contact
app/(admin)/      dashboard — products, users, settings
components/chrome/ shared nav, footer, sidebar
lib/api.ts        typed fetch helper for the Go backend
backend/          Go API — cmd/server + internal/{config,db,handlers,router}
```
