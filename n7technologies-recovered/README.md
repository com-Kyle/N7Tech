# Recovered N7 Worker Snapshot

`worker.js` is a recovered snapshot of the original `n7technologies` Next.js
Worker bundle. It is not the public custom-domain entry point and should not be
deployed directly without restoring its matching Cloudflare asset manifest.

Active production flow:

1. `n7technologies-shell` receives both N7 custom domains.
2. The shell serves current branding and public contact behavior.
3. The shell proxies application requests to the `n7technologies` service.
4. `n7-founder-email-router` privately forwards `founder@`, `contact@`, and
   `help@` mail to both verified destination inboxes.

The recovered snapshot has been normalized to the public founder alias so it
does not preserve obsolete public Gmail contacts.
