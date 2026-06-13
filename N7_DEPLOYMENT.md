# N7Tech Deployment Process

The GitHub repository at `https://github.com/com-Kyle/N7Tech` is the source of
record for N7 production changes.

## Required Order

1. Make and test changes locally.
2. Commit the complete change to Git.
3. Push the commit to the `main` branch on GitHub.
4. Deploy to Cloudflare only after GitHub contains that exact commit.
5. Verify both `n7technologies.org` and `www.n7technologies.org` after deploy.

Use the guarded deployment script from the repository root:

```bash
./scripts/deploy-n7.sh
```

The script stops if tracked files are modified, the branch has no GitHub
upstream, or local commits have not been pushed. It then applies pending D1
migrations, deploys the email router, and deploys the public N7 shell.

## Production Components

- `n7-home-shell/`: Public custom-domain Worker, branding assets, account and
  admin routes, D1 migrations, password reset, and ContractorPod proxy.
- `n7-email-router/`: Email Worker for `founder@`, `contact@`, and `help@`.
- `n7technologies-recovered/`: Reference snapshot of the recovered upstream N7
  Worker. Do not deploy it directly without its matching asset manifest.

Private administrator activation links, OAuth credentials, local Wrangler
state, and environment secrets must never be committed.
