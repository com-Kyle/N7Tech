// Keep-warm cron Worker. The only export is a `scheduled` handler fired by the
// cron trigger in wrangler.toml (every 10 min). It pings the backend's healthz
// so Render's free tier never idles into a cold start.
//
// Self-typed: the two Workers-runtime types are declared inline so this folder
// needs no @cloudflare/workers-types dependency. `wrangler deploy` supplies the
// real runtime types at build time.

interface Env {
  HEALTHZ_URL: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

const worker = {
  async scheduled(_event: unknown, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(
      fetch(env.HEALTHZ_URL, { method: "GET" }).then(
        (res) => console.log(`keep-warm ping ${env.HEALTHZ_URL} -> ${res.status}`),
        (err) => console.error(`keep-warm ping failed: ${err}`),
      ),
    );
  },
};

export default worker;
