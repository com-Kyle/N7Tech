# N7 Homepage Shell

Cloudflare Worker that places the N7 red network cover artwork behind the
`n7technologies.org` homepage while proxying the existing Next.js application.

The shell also:

- Gives Products, Services, About, and Contact the same prominent black button
  treatment, applies that same treatment to Login/Account, and includes a
  larger high-contrast Services dropdown.
- Uses full document navigation for same-site links so the transformed shell
  loads every destination correctly on the first click instead of entering a
  broken Next.js client-router state.
- Adds a mobile-only three-line menu for Products, Services, About, and Contact
  without altering the desktop navigation.
- Publishes the complete ContractorPod application at
  `https://www.n7technologies.org/contractorpod`, including prefixed assets,
  navigation, redirects, cookies, forms, API calls, and Next.js server actions.
- Replaces public links to `contractorpod.deploypod.ai` and
  `contractorpod.com` with the N7 ContractorPod URL.
- Adds N7 user accounts at `/signup`, `/login`, `/complete-profile`, and
  `/account`, backed by D1 with PBKDF2 password hashing and server-side
  sessions.
- Adds a working `/forgot-password` flow using one-hour, single-use reset
  links. Completing a reset invalidates all existing account sessions and
  outstanding reset links.
- Collects name, phone number, birthday, optional occupation, and Client,
  Homeowner, or Contractor account type during signup. Google and GitHub
  signups are automatically classified as Client.
- Adds `/admin` with signup totals, account details, recent activity, and
  controls for name, occupation, account type, active/suspended status, and
  administrator-managed N7 verification.
- Allows `n7kpierce@gmail.com` and `n7dpagan@gmail.com` to use the normal signup
  form and activates administrator access after a one-click email ownership
  verification. No private invitation is required for those two addresses.
- Keeps `founder@n7technologies.com` invitation-only and also supports verified
  OAuth identities for approved administrator addresses.
- Reapplies the homepage cover after Next.js client navigation, browser
  Back/Forward, and cached page restoration.
- Moves the Neural Zenith Technologies banner into the navigation header in
  place of the former text-only `N7 Technologies` home link and removes the
  separate banner strip above the header.
- Pins the current red-and-black N7 Technologies profile/logo image at
  `/brand/n7-technologies.png` so upstream application deployments cannot
  replace the approved graphic.
- Replaces the two direct founder Gmail cards on `/contact` with one
  contact group containing working buttons for `founder@n7technologies.org`,
  `contact@n7technologies.org`, and `help@n7technologies.org`.
- Keeps the About founder cards linked to Dante and Kyle's requested personal
  Gmail addresses as explicit page-specific exceptions.
- Points the footer Contact email link to the founder alias.

The original `n7technologies` Worker remains the application origin. This
Worker only serves the optimized cover asset and transforms homepage HTML.

ContractorPod remains a separate application origin, but visitors access it
through the path-aware reverse proxy in this Worker. The proxy strips the
`/contractorpod` prefix upstream and restores it on all public responses so
the old DeployPod hostname is not exposed in N7 navigation.

The shell is the public compatibility layer for the recovered Next.js build.
It normalizes legacy personal email addresses in HTML, React Server Component
payloads, and client JavaScript to `founder@n7technologies.org`. New public
email or navigation behavior belongs here until the original Next.js source
repository is restored.

## Deploy

```bash
npx wrangler deploy --config n7-home-shell/wrangler.toml
```

Custom domains:

- `n7technologies.org`
- `www.n7technologies.org`

Source artwork is retained in `source/`; the deployed WebP is in
`public/brand/`.

Cloudflare Email Routing must keep `founder@n7technologies.org` forwarding to
both verified founder inboxes. The same requirement applies to
`contact@n7technologies.org` and `help@n7technologies.org`.

## Accounts And OAuth

The `n7-accounts` D1 database stores profiles, sessions, OAuth state, admin
invitations and email verifications, password reset tokens, and audit events.
Apply schema changes with:

```bash
npx wrangler d1 migrations apply n7-accounts --remote
```

Email/password signup works without third-party credentials. To enable the
Gmail and GitHub buttons, create OAuth applications with these callbacks:

- `https://www.n7technologies.org/api/auth/oauth/google/callback`
- `https://www.n7technologies.org/api/auth/oauth/github/callback`

Then add the Worker secrets:

```bash
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Single-use production administrator activation links are stored outside the
repository in `../.admin-invites.txt`.

Password reset messages are sent from `accounts@n7technologies.org` through
the Worker's `EMAIL` binding. The Cloudflare account must have Email Service
enabled for `n7technologies.org`; inbound Email Routing alone does not permit
sending reset messages to arbitrary registered users.
