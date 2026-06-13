import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config: runs the Next.js app on Cloudflare Workers. Incremental
// cache is in-memory for now; wire an R2 bucket (NEXT_INC_CACHE_R2_BUCKET in
// wrangler.jsonc) later if ISR/cache performance matters. See DEPLOY.md.
const config = defineCloudflareConfig();

// Next.js 16 defaults to Turbopack, whose server chunks fail to load in the
// Workers runtime (ChunkLoadError at request time). OpenNext requires a
// webpack build — force it here.
config.buildCommand = "next build --webpack";

export default config;
