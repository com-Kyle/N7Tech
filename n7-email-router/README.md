# N7 Founder Email Router

Cloudflare Email Worker for these N7 aliases:

- `founder@n7technologies.org`
- `contact@n7technologies.org`
- `help@n7technologies.org`

Incoming messages are forwarded to both verified destinations:

- `n7kpierce@gmail.com`
- `n7dpagan@gmail.com`

These Gmail addresses are private routing destinations. Public website code
must use only the N7 aliases listed above.

Deploy from the repository root:

```bash
npx wrangler deploy --config n7-email-router/wrangler.toml
```

The Email Routing rule must use the `worker` action and target
`n7-founder-email-router`.
