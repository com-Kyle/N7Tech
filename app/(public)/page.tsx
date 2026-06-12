import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";
import { BrowserFrame } from "@/components/device-frames";
import { PODS, ENGINE } from "@/lib/products";
import { WEBSITE_SERVICE, APP_SERVICE } from "@/lib/services";

export const metadata: Metadata = {
  // `absolute` opts out of the layout's "%s · N7 Technologies" template so the
  // homepage <title> reads cleanly (it already names the brand).
  title: {
    absolute:
      "N7 Technologies — ContractorPod, and the studio that builds it",
  },
  description:
    "ContractorPod is our live AI product: honest estimates and instant booking for small contractors. The studio behind it also builds, improves, and tests websites and apps for everyone else.",
};

/** ContractorPod is the live product the page leads with. */
const CONTRACTORPOD = PODS.find((p) => p.slug === "contractorpod")!;
/** The not-yet-live pods, shown demoted below the hero. */
const COMING_SOON = PODS.filter((p) => p.status === "coming-soon");
const BLUE = ENGINE.accent; // #3B82F6 — DeployPod's accent

/**
 * The honest-product angle, grounded in ContractorPod's real description in
 * `lib/products.ts` — no invented metrics or claims.
 */
const PRODUCT_PROOF = [
  "Homeowners chat with Mason, an AI estimator that asks the right questions.",
  "Honest price ranges — never a fake-binding number.",
  "Book a site visit in the same flow. No spreadsheets for the contractor.",
];

/** Secondary "studio" offerings — demoted below the product. */
const SERVICE_CARDS = [
  {
    href: `/${WEBSITE_SERVICE.slug}`,
    name: WEBSITE_SERVICE.name,
    blurb: WEBSITE_SERVICE.tagline,
    meta: `Starting at ${WEBSITE_SERVICE.startingAt}`,
    accent: "var(--color-muted)",
  },
  {
    href: `/${APP_SERVICE.slug}`,
    name: APP_SERVICE.name,
    blurb: APP_SERVICE.tagline,
    meta: `Starting at ${APP_SERVICE.startingAt}`,
    accent: "var(--color-muted)",
  },
  {
    href: ENGINE.page,
    name: "AI Agents",
    blurb: "The AI agents behind our pods — via DeployPod, our infra partner.",
    meta: "Powered by DeployPod",
    accent: BLUE,
  },
];

export default function HomePage() {
  return (
    <>
      {/* --- HERO: leads with the live product, asymmetric (copy left / shot right) --- */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Single hero bloom, anchored behind the live-product screenshot. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-12 h-[460px] w-[min(680px,80vw)] translate-x-1/4 rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.85), transparent)" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_1.25fr] lg:gap-16 lg:pb-24">
          {/* LEFT — product-led copy + the one red CTA */}
          <div className="flex flex-col items-start text-left">
            {/* Live eyebrow — muted, not red, so it doesn't compete with the CTA. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: CONTRACTORPOD.accent }}
              />
              Live now · ContractorPod
            </span>

            <h1 className="font-display mt-6 max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Honest estimates and instant booking for small contractors.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
              ContractorPod is our live AI product. Homeowners chat with Mason —
              an AI estimator that returns an honest price range, not a
              fake-binding number — and book a site visit in the same flow. We
              build it, run it, and ship it ourselves.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {/* THE single red focal element on the page. */}
              {CONTRACTORPOD.href && (
                <a
                  href={CONTRACTORPOD.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
                >
                  Visit ContractorPod <ArrowUpRight size={16} aria-hidden />
                </a>
              )}
              {/* Secondary CTA — ghost/outline, deliberately not red. */}
              <Link
                href="/contact#form"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg)]/40"
              >
                Get in touch <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          {/* RIGHT — real product imagery, above the fold. */}
          <div className="w-full">
            <BrowserFrame
              src="/screenshots/contractorpod-web.png"
              url="contractorpod.deploypod.ai"
              alt="ContractorPod — AI estimates and booking for small contractors"
            />
          </div>
        </div>
      </section>

      {/* --- WHY IT'S DIFFERENT — the honest-price angle, grounded in real copy --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Why ContractorPod
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around an honest quote.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">
              {CONTRACTORPOD.description}
            </p>
          </div>
          {/* Flat content card — non-interactive, so no hover, no red. */}
          <ul className="grid gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5">
            {PRODUCT_PROOF.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-[var(--color-muted)]"
                />
                <span className="text-sm leading-relaxed text-[var(--color-fg)]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- MORE PRODUCTS — coming-soon pods, demoted to a compact row --- */}
      <section className="mx-auto max-w-7xl px-6 pb-4 sm:px-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                Also in the family
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight">
                More pods on the way
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-muted)]"
            >
              See all products <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {COMING_SOON.map((pod) => (
              <div
                key={pod.slug}
                className="flex items-start gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full opacity-70"
                  style={{ backgroundColor: pod.accent }}
                />
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {pod.name}
                    </h3>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {pod.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE STUDIO (services, secondary) — one scroll down, clearly present --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            The studio behind ContractorPod
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Need something built? We build for others too.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            We ship our own products — so when we build your website or app, you
            get a studio that lives in production every day, not a contractor who
            disappears at launch.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICE_CARDS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-fg)]/20"
            >
              <span
                aria-hidden
                className="block h-1.5 w-8 rounded-full opacity-80"
                style={{ backgroundColor: s.accent }}
              />
              <h3 className="font-display mt-4 text-lg font-bold tracking-tight">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {s.blurb}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {s.meta}
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="text-[var(--color-muted)] transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- CLOSING CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Try ContractorPod, or tell us what to build.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
            Use the product that's live today, get in line for MealPod and
            BudgetPod, or tell us about the website or app you need built. We
            read every message.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {CONTRACTORPOD.href && (
              <a
                href={CONTRACTORPOD.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg)]/40"
              >
                Visit ContractorPod <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            <ContactButton label="Get in touch" />
          </div>
        </div>
      </section>
    </>
  );
}
