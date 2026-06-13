# N7Tech

Production infrastructure and compatibility layer for
[n7technologies.org](https://www.n7technologies.org).

N7Tech runs on Cloudflare Workers and provides the public website shell,
branding, account system, administrator panel, email routing, and the
ContractorPod path proxy.

## Current Features

- Responsive N7 homepage with persistent red network artwork and pinned
  red-and-black branding assets.
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

## Repository Structure

```text
n7-home-shell/              Public Worker, assets, authentication, and D1 schema
n7-email-router/            Inbound contact-email forwarding Worker
n7technologies-recovered/   Reference snapshot of the recovered origin Worker
scripts/deploy-n7.sh        GitHub-first guarded Cloudflare deployment
N7_DEPLOYMENT.md            Detailed production deployment process
```

The recovered Worker is retained for reference. Do not deploy it directly
without its matching Cloudflare asset manifest.

## Architecture

The `n7technologies-shell` Worker owns both public custom domains:

- `n7technologies.org`
- `www.n7technologies.org`

It serves approved branding assets, handles account and administrator routes,
proxies ContractorPod, and forwards remaining application requests to the
`n7technologies` service binding.

Cloudflare D1 stores user profiles, sessions, OAuth state, password reset
tokens, administrator verification records, invitations, and audit logs.

The `n7-founder-email-router` Worker forwards the three public contact aliases
to both verified founder inboxes through Cloudflare Email Routing.

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
