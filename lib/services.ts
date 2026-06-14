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

export type ServiceTier = {
  /** Tier name, e.g. "Launch" | "Growth" | "Pro". */
  name: string;
  /** Display price, e.g. "$499", "$2,400". */
  price: string;
  /** One-line scope summary shown under the price. */
  blurb: string;
  /**
   * What's included in this tier — 4-6 short bullets. Higher tiers are written
   * as a superset (the first bullet reads "Everything in <lower>, plus:").
   */
  features: ReadonlyArray<string>;
  /** CTA label for this tier's button (e.g. "Start a Launch site"). */
  cta: string;
  /**
   * The `?subject=` forwarded to the contact form, so the captured lead carries
   * which tier was picked (e.g. "Website Services — Launch ($499)"). MUST stay
   * in sync with the `QUOTE_SERVICES` allowlist in `n7-home-shell/src/auth.js`,
   * or the quote form will not pre-select the tier.
   */
  contactSubject: string;
  /** The middle, recommended/anchor tier — visually emphasized. */
  featured?: boolean;
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
  /** Exactly three good-better-best tiers; the middle one is `featured`. */
  tiers: ReadonlyArray<ServiceTier>;
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
  tiers: [
    {
      name: "Launch",
      price: "$499",
      blurb: "A sharp landing or single-page site, designed and launched fast.",
      features: [
        "1 page — landing or single-page",
        "Custom design from your brand",
        "Mobile-responsive, fast-loading",
        "Contact form wired to your inbox",
        "Live in about a week",
      ],
      cta: "Start a Launch site",
      contactSubject: "Website Services — Launch ($499)",
    },
    {
      name: "Growth",
      price: "$2,400",
      blurb: "A full multi-page site with a CMS you can edit yourself.",
      features: [
        "Everything in Launch, plus:",
        "Up to 8 pages",
        "CMS — edit your own content",
        "SEO setup + analytics",
        "Blog or news section",
        "30 days of post-launch support",
      ],
      cta: "Start a Growth site",
      contactSubject: "Website Services — Growth ($2,400)",
      featured: true,
    },
    {
      name: "Pro",
      price: "$3,500",
      blurb: "A larger, bespoke site with custom features and integrations.",
      features: [
        "Everything in Growth, plus:",
        "Unlimited core pages",
        "Custom features (booking, payments, CRM)",
        "Performance + accessibility hardening",
        "Priority build timeline",
        "90 days of post-launch support",
      ],
      cta: "Start a Pro site",
      contactSubject: "Website Services — Pro ($3,500)",
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
  tiers: [
    {
      name: "MVP",
      price: "$2,500",
      blurb: "Validate the idea with a real, working build people can use.",
      features: [
        "Core feature set (1-2 key flows)",
        "Web or single platform",
        "Modern, AI-native stack",
        "Auth + your core data model",
        "Shipped to real testers",
      ],
      cta: "Start an MVP",
      contactSubject: "App Services — MVP ($2,500)",
    },
    {
      name: "Product",
      price: "$9,500",
      blurb: "The full product build — polished, scalable, and ready to grow.",
      features: [
        "Everything in MVP, plus:",
        "Full feature set",
        "Web + mobile",
        "Polished, production-grade UI/UX",
        "Admin dashboard + analytics",
        "30 days of post-launch support",
      ],
      cta: "Start a Product build",
      contactSubject: "App Services — Product ($9,500)",
      featured: true,
    },
    {
      name: "Scale",
      price: "$14,000",
      blurb: "A production-grade app built to scale — with the works.",
      features: [
        "Everything in Product, plus:",
        "Advanced integrations + AI agents",
        "Performance + load hardening",
        "CI/CD pipeline + monitoring",
        "Priority roadmap",
        "90 days of post-launch support",
      ],
      cta: "Start a Scale build",
      contactSubject: "App Services — Scale ($14,000)",
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
