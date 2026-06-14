# N7Tech Deployment Process

The GitHub repository at `https://github.com/com-Kyle/N7Tech` is the source of
record for N7 production changes.

Run `./scripts/setup-git.sh` once after cloning. It configures the repository to
stamp commit subjects with `N7KP`, the Eastern date, and the Eastern time.
Cloudflare deployment messages receive the same stamp automatically.

## Required Order

1. Make and test changes locally.
2. Commit the complete change to Git.
3. Push the commit to the `main` branch on GitHub.
4. Deploy to Cloudflare only after GitHub contains that exact commit.

There is exactly **one** deploy command. You never have to know which Worker
your change touched — run this for every prod change, from the repo root:

```bash
npm run deploy        # equivalent: ./scripts/deploy-n7.sh
```

It is guarded (stops if tracked files are modified, the branch has no GitHub
upstream, or local commits are unpushed), then does everything in the one
correct order:

1. applies pending remote D1 migrations,
2. builds + deploys the **app** Worker (`n7technologies`),
3. deploys the **email router**,
4. deploys the **shell** Worker (`n7technologies-shell`) **last** — so it
   reclaims the `www` + apex custom domain and fronts the app,
5. verifies `https://www.n7technologies.org/login` returns `200` and fails
   loudly if not (a `404` means the shell got bypassed).

Order is load-bearing: the shell must deploy after the app, or the app keeps the
custom domain and login/auth silently disappear (the 2026-06-14 incident). The
app Worker is private (`workers_dev:false`, no routes) and is reached only via
the shell's `ORIGIN` service binding — never re-add custom-domain routes to its
`wrangler.jsonc`.

Escape hatches (rarely needed): `npm run deploy:app` (app only),
`npm run deploy:shell` (shell only).

## Production Components

- `n7-home-shell/`: Public custom-domain Worker, branding assets, account and
  admin routes, D1 migrations, password reset, and ContractorPod proxy.
- `n7-email-router/`: Email Worker for `founder@`, `contact@`, and `help@`.
- `n7technologies-recovered/`: Reference snapshot of the recovered upstream N7
  Worker. Do not deploy it directly without its matching asset manifest.

Private administrator activation links, OAuth credentials, local Wrangler
state, and environment secrets must never be committed.
