import type { MetadataRoute } from "next";

/**
 * Static sitemap for the 7 public marketing routes.
 * Next auto-serves this at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.n7technologies.org";
  // Fixed date (not new Date()) so every crawl doesn't see all 7 routes as
  // "just modified", which would waste crawl budget.
  const lastModified = new Date("2026-06-11");

  const routes = [
    "/",
    "/about",
    "/products",
    "/website-services",
    "/app-services",
    "/deploypod",
    "/contact",
    "/quote",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
  }));
}
