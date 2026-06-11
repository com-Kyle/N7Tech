/**
 * Curated catalog of the agency-style services N7 Technologies offers (Website
 * and App services). Like `lib/products.ts`, this is a static, hand-written
 * source of truth: the service pages and nav/footer cross-links all read from
 * here so copy lives in exactly one place.
 *
 * Every service is framed around the same three pillars — Build / Improve /
 * Test — so the shared `ServicePage` template can render any service coherently.
 */

export type ServicePillar = {
  /** "Build" | "Improve" | "Test". */
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  /** One-line value prop shown as the hero subhead. */
  tagline: string;
  /** Entry price, e.g. "$499". Rendered as "Starting at <price>". */
  startingAt: string;
  /** Pre-fills the mailto subject on the page's quote CTA. */
  contactSubject: string;
  /** Exactly three: Build, Improve, Test. */
  pillars: ReadonlyArray<ServicePillar>;
};

export const WEBSITE_SERVICE: Service = {
  slug: "website-services",
  name: "Website Services",
  tagline: "Websites that work — built, improved, and tested.",
  startingAt: "$499",
  contactSubject: "Website Services inquiry",
  pillars: [
    {
      title: "Build",
      body: "From a blank page to launched. We design, build, and ship your site end to end — fast, modern, and yours.",
    },
    {
      title: "Improve",
      body: "Already live but underperforming? We redesign, optimize, and modernize the site you already have.",
    },
    {
      title: "Test",
      body: "We audit, QA, and harden your site — performance, accessibility, SEO, and the edge cases that break in the wild.",
    },
  ],
};

export const APP_SERVICE: Service = {
  slug: "app-services",
  name: "App Services",
  tagline: "Apps, end to end — built, improved, and tested.",
  startingAt: "$2,500",
  contactSubject: "App Services inquiry",
  pillars: [
    {
      title: "Build",
      body: "From idea to shipped app. We design, build, and launch web and mobile apps on a modern, AI-native stack.",
    },
    {
      title: "Improve",
      body: "Inherited a slow or dated app? We refactor, redesign, and modernize it without a ground-up rewrite.",
    },
    {
      title: "Test",
      body: "We audit, QA, and harden your app — correctness, performance, and the regressions that bite after launch.",
    },
  ],
};

/** Ordered list for nav / footer cross-links. */
export const SERVICES: ReadonlyArray<Service> = [WEBSITE_SERVICE, APP_SERVICE];

/**
 * DeployPod — our independent AI-infrastructure partner. Re-exported here so the
 * services nav grouping has one place to reach both the on-site cross-marketing
 * page and the external site. Single source of truth lives in `lib/products.ts`
 * (`ENGINE`); this is a thin, intention-revealing alias.
 */
export { ENGINE as DEPLOYPOD } from "@/lib/products";
