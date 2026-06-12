# Deploying n7technologies

Two pieces deploy independently:

| Piece | Host | Cost |
|---|---|---|
| Frontend (Next.js) | Cloudflare Workers (via OpenNext) | Free |
| Backend (Go API) | Render web service (Docker) | Free |
| Database (Postgres) | Neon serverless Postgres | Free |

The frontend fetches the API server-side at `NEXT_PUBLIC_API_BASE_URL`. Deploy
the backend first so you have that URL, then point the frontend at it.

---

## 1. Database — Neon (free, no expiry)

1. Sign up at https://neon.tech and create a project (region close to your
   Render region).
2. Copy the connection string. It looks like:
   `postgresql://USER:PASSWORD@ep-xxx.REGION.aws.neon.tech/neondb?sslmode=require`
3. Keep it — it becomes `DATABASE_URL` on Render below.

Neon's free tier is generous and does not expire. The backend runs
`AutoMigrate` + `Seed` on boot, so the schema and demo products appear on first
deploy automatically.

## 2. Backend — Render (free Go web service)

The repo has `backend/Dockerfile` **and** a `render.yaml` Blueprint, so Render
can set the whole service up in one click.

**Fast path (Blueprint):**
1. Sign up at https://render.com (you can use your GitLab account).
2. **New → Blueprint** → connect `gitlab.com/dpagan117/n7technologies` → Render
   reads `render.yaml` and creates `n7technologies-api` (Docker, free, health
   check `/healthz`, `SESSION_SECRET` auto-generated).
3. It will prompt for the one secret marked `sync: false` — paste the Neon
   `DATABASE_URL` from §1. Deploy.

**Manual path (if you prefer):**
1. Sign up at https://render.com and connect this repo.
2. **New → Web Service** → pick the repo.
   - **Root Directory:** `backend`
   - **Runtime:** Docker
   - **Instance type:** Free
3. Environment variables:
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | the Neon string from §1 |
   | `APP_ENV` | `production` |
   | `SESSION_SECRET` | a long random string (required in production) |
   | `FRONTEND_ORIGIN` | `https://www.n7technologies.org` |
   | `TRUSTED_PROXIES` | `0.0.0.0/0` (Render terminates TLS upstream) |
   | `RESEND_API_KEY` | optional — Resend key for lead-notification emails; leads still persist if unset |
   - `PORT` is provided by Render automatically; our `config.Load` reads it.
4. Deploy. Render gives you a URL like `https://n7technologies-api.onrender.com`.
   Verify: open `<that-url>/healthz` → `{"ok":true}`.

> Free Render web services sleep after ~15 min idle and cold-start in ~30s.
> Fine for a new site; upgrade later if you need always-on.

## 3. Frontend — Cloudflare Workers (OpenNext)

Already configured: `wrangler.jsonc`, `open-next.config.ts`, and the
`deploy`/`preview` npm scripts.

1. **Log in** (interactive, one time):
   ```sh
   npx wrangler login
   ```
2. **Set the API URL** the frontend should call. Edit `wrangler.jsonc` →
   `vars.NEXT_PUBLIC_API_BASE_URL` to the Render URL from §2, e.g.
   `https://n7technologies-api.onrender.com`.
3. **Set the frontend env vars.** Add these to `wrangler.jsonc` → `vars`
   (public) or as Wrangler secrets (sensitive):

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | the Render URL from §2 |
   | `ADMIN_BASIC_AUTH` | `user:pass` for the `/dashboard` Basic-auth gate; **required in production** (the middleware returns 401 for everyone if unset in prod) |
   | `NEXT_PUBLIC_BOOKING_URL` | Cal.com / Calendly link; gates the "Book a call" button (hidden if unset) |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | e.g. `n7technologies.org`; enables Plausible analytics (no-op if unset) |

   > **`ADMIN_BASIC_AUTH` MUST be set** as a Wrangler secret
   > (`npx wrangler secret put ADMIN_BASIC_AUTH`) or the `/dashboard` is locked
   > out — the middleware fails closed and 401s everyone in production.
4. **Deploy:**
   ```sh
   npm run deploy
   ```
   This runs `opennextjs-cloudflare build` then `opennextjs-cloudflare deploy`.
   First deploy creates the `n7technologies` Worker and prints a
   `*.workers.dev` URL — open it to confirm.

Preview locally on the real Workers runtime before deploying:
```sh
cp .dev.vars.example .dev.vars   # then edit if needed
npm run preview
```

## 3a. Keep-warm cron Worker (optional, recommended)

The Render free tier sleeps the backend after ~15 min idle (~30s cold start on
the next request). A tiny **standalone** Cloudflare cron Worker in `keepwarm/`
pings `/healthz` every 10 minutes so the service never idles. It is fully
separate from the frontend Worker — it has its own `wrangler.toml` and does
**not** touch `wrangler.jsonc`, `open-next.config.ts`, or the Next.js build.

One-time deploy:
```sh
cd keepwarm
npx wrangler deploy
```

That registers the cron trigger (`*/10 * * * *`) and the `n7technologies-keepwarm`
Worker. No further action needed — Cloudflare runs it automatically and for free.

- The healthz URL is set in `keepwarm/wrangler.toml` → `[vars] HEALTHZ_URL`.
  Update it there if the Render URL changes, then re-run `npx wrangler deploy`.
- Tail logs to confirm it's firing: `npx wrangler tail` (from `keepwarm/`).

## 4. Custom domain — www.n7technologies.org

The domain is already on Cloudflare, which makes this easy.

1. Push the repo to GitHub (optional but recommended for Render auto-deploys):
   ```sh
   git remote add origin git@github.com:<you>/n7technologies.git
   git push -u origin main
   ```
2. In the Cloudflare dashboard → **Workers & Pages → n7technologies →
   Settings → Domains & Routes → Add → Custom Domain** → enter
   `www.n7technologies.org` (and `n7technologies.org` for the apex). Cloudflare
   provisions the DNS records + TLS automatically since the zone is already here.
3. After the route is live, set `FRONTEND_ORIGIN` on Render (§2) to
   `https://www.n7technologies.org` if you haven't, so CORS matches.

---

## Order of operations (summary)

1. Neon → get `DATABASE_URL`.
2. Render → deploy `backend/`, set env, get the API URL, check `/healthz`.
3. `wrangler.jsonc` → set `NEXT_PUBLIC_API_BASE_URL` to the API URL.
4. `npx wrangler login` → `npm run deploy`.
5. Cloudflare dashboard → attach `www.n7technologies.org` to the Worker.

## Notes / later optimizations

- **R2 incremental cache** — for ISR/cache performance, create an R2 bucket and
  add `NEXT_INC_CACHE_R2_BUCKET` to `wrangler.jsonc` (see OpenNext caching docs).
- **Admin subdomain** — when the dashboard moves to `admin.n7technologies.org`,
  add it as a second custom domain on the same Worker and branch on hostname,
  or split it into its own Worker.
- **Secrets** — prefer `npx wrangler secret put NAME` over `vars` for anything
  sensitive (none yet — the API URL is public).
