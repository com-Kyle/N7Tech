import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config: runs the Next.js app on Cloudflare Workers. Incremental
// cache is in-memory for now; wire an R2 bucket (NEXT_INC_CACHE_R2_BUCKET in
// wrangler.jsonc) later if ISR/cache performance matters. See DEPLOY.md.
export default defineCloudflareConfig();
