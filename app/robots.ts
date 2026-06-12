import type { MetadataRoute } from "next";

/**
 * App-authored robots.txt (replaces Cloudflare's generic auto-default).
 * Next auto-serves this at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard",
    },
    sitemap: "https://www.n7technologies.org/sitemap.xml",
  };
}
