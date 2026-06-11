/**
 * Curated marketing catalog for the public site (home / products / about).
 *
 * This is intentionally a static, hand-written list rather than a fetch from
 * the Go backend: the marketing narrative (which pod is live, which are coming
 * soon) is brand content that changes rarely and must render correctly even
 * when the backend is unreachable from the Cloudflare edge. The admin
 * dashboard still manages the operational `Product` rows over HTTP via
 * `lib/api.ts` — these two layers are deliberately separate.
 */

export type ProductStatus = "available" | "coming-soon";

export type Pod = {
  slug: string;
  name: string;
  /** One-line value prop. */
  tagline: string;
  /** Fuller paragraph for the products page + about page. */
  description: string;
  status: ProductStatus;
  /** Per-pod accent (used for the status dot / glow), kept subtle against the
   * light grey + white-card, N7-red-accent site palette. */
  accent: string;
  /** External site, present only for live pods. */
  href?: string;
};

/** Human label for a status, shown in the badge. */
export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "Available now",
  "coming-soon": "Coming soon",
};

/**
 * The consumer pods N7 Technologies ships. ContractorPod is live and the lead
 * product today; MealPod and BudgetPod are in build. Ordered for display —
 * the live pod leads.
 */
export const PODS: ReadonlyArray<Pod> = [
  {
    slug: "contractorpod",
    name: "ContractorPod",
    tagline: "AI estimates + booking for small contractors.",
    description:
      "A hosted estimate-and-booking platform for small contractors. Homeowners chat with Mason — an AI estimator that asks the right questions and returns an honest price range, never a fake-binding number — then book a site visit in the same flow. The contractor gets a polished storefront, a quote-to-contract pipeline, and payments, without touching a spreadsheet.",
    status: "available",
    accent: "#84CC16",
    href: "https://contractorpod.deploypod.ai",
  },
  {
    slug: "mealpod",
    name: "MealPod",
    tagline: "AI meal planning + grocery automation.",
    description:
      "Tell MealPod what you like, what's in the fridge, and who you're feeding — it plans the week, builds the grocery list, and keeps the boring logistics of eating well out of your way.",
    status: "coming-soon",
    accent: "#F59E0B",
  },
  {
    slug: "budgetpod",
    name: "BudgetPod",
    tagline: "Conversational personal finance — your money in plain English.",
    description:
      "BudgetPod turns your accounts into a conversation. Ask where your money went, what you can afford, or how to hit a goal, and get a straight answer — no spreadsheets, no jargon, no judgment.",
    status: "coming-soon",
    accent: "#2563EB",
  },
];

/** The lead product shown front-and-center on the home + about pages. */
export const LEAD_POD = PODS[0];

/**
 * DeployPod is not a consumer pod — it's the separate AI-infrastructure
 * company N7 partners with under a master services agreement. It runs the
 * agents (Mason, and the helpers behind every pod). Surfaced in the "two
 * companies" section, not the product grid.
 */
export const ENGINE = {
  name: "DeployPod",
  accent: "#3B82F6",
  tagline: "The AI infrastructure that powers every pod.",
  description:
    "DeployPod is an independent company that runs the AI plumbing — model orchestration, retrieval, tool-use, and the hosted-agent runtime the pods call into. When you chat with Mason inside ContractorPod, you're talking to a DeployPod-hosted agent. N7 ships the products; DeployPod ships the engine they run on.",
} as const;
