import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";

export const metadata = {
  title: "FAQ — N7 Technologies",
  description:
    "Straight answers to the questions prospective customers ask before they hire us — pricing, timelines, ownership, app-store publishing, DeployPod, veteran pricing, post-launch support, and how our quotes work.",
};

/**
 * Honest, sourced answers to the real buyer questions. Facts pulled from
 * lib/services.ts (tiers + prices), components/service-page.tsx (the Talk/
 * Build/Launch process), lib/products.ts (the N7 ↔ DeployPod MSA), and the
 * About page (veterans pledge). Grouped so the page stays scannable; each
 * group is a band of question/answer cards. Answers are text-base (16px)
 * leading-relaxed — body text is full size; muted is reserved for secondary
 * lines only.
 */
type QA = {
  q: string;
  /** Each entry is one paragraph in the answer. */
  a: ReadonlyArray<string>;
};

type FaqGroup = {
  eyebrow: string;
  heading: string;
  items: ReadonlyArray<QA>;
};

const GROUPS: ReadonlyArray<FaqGroup> = [
  {
    eyebrow: "Pricing & scope",
    heading: "What it costs and why",
    items: [
      {
        q: "Why does a website start at $499 but an app at $2,500?",
        a: [
          "They're different amounts of work. A website is presentation — pages, copy, a contact form, your brand. Our Minimum Website Package is a single sharp landing page, designed from your brand and wired to your inbox, that we can take live in about a week. That's why it starts at $499.",
          "An app is software, not a page. The Minimum App Package starts at $2,500 because even a starter build includes real auth, your core data model, one or two working flows, and a modern AI-native stack — a thing people actually log into and use, shipped to real testers. Websites run from $499 to $3,500; apps run from $2,500 to $14,000, because the top of each ladder (custom features, integrations, AI agents, CI/CD, load hardening) is genuinely more engineering.",
        ],
      },
      {
        q: "How does the quote process work — is the price binding?",
        a: [
          "The tier prices on our Services pages are honest starting points, not fake-binding numbers. Every project is quoted to fit. You tell us what you need, we send back a plan and a quote shaped to the actual work — and if you're not sure which tier fits, we right-size it with you.",
          "Quoting real ranges instead of pretending a number is final is core to how we work — the same way ContractorPod's estimator returns an honest price range rather than a fake-binding figure. We'd rather scope it accurately than surprise you later.",
        ],
      },
    ],
  },
  {
    eyebrow: "Timeline & process",
    heading: "How long it takes",
    items: [
      {
        q: "How long does a project take?",
        a: [
          "The lowest website tier — the Minimum Website Package — is built to go live in about a week. Larger work takes longer, and we'll give you a real timeline once we've scoped it.",
          "As honest estimates: a full multi-page Growth site or a Minimum App build is typically a few weeks; a full Product app or a bespoke Pro site is more like one to a few months depending on scope. These are estimates, not promises carved in stone — we set the actual timeline against your project when we quote it, and we share progress in tight iterations so you're never guessing.",
        ],
      },
      {
        q: "What's the process from first call to launch?",
        a: [
          "Three steps. Talk: a free consult to scope the work and see if we're a fit. Build: we design, build, and test in tight iterations, sharing progress as we go. Launch: we ship it and hand it off — clean and documented, with ongoing support optional.",
        ],
      },
    ],
  },
  {
    eyebrow: "Ownership & publishing",
    heading: "What you walk away with",
    items: [
      {
        q: "Who owns the code and the finished product?",
        a: [
          "You do. We build it for you, and at launch we hand it off clean and documented — it's yours. The site or app we deliver is your product, not something you rent from us.",
        ],
      },
      {
        q: "Do you publish apps to the App Store and Google Play?",
        a: [
          "We build web and mobile apps, and the higher app tiers (Product and Scale) cover mobile alongside web. Getting a mobile app onto the App Store and Google Play is part of shipping it — we'll handle the build and walk the submission with you.",
          "Store submission has requirements that sit on your side (developer accounts, app-store listings, and the platforms' own review), so the exact steps depend on your situation. We'll scope publishing as part of the quote rather than promise specifics here that may not fit your case.",
        ],
      },
    ],
  },
  {
    eyebrow: "DeployPod & the AI",
    heading: "Who runs the AI",
    items: [
      {
        q: "What is DeployPod, and what's its relationship to N7?",
        a: [
          "DeployPod is an independent company that runs the AI infrastructure — model orchestration, retrieval, tool-use, and the hosted-agent runtime our products call into. N7 ships the products; DeployPod ships the engine they run on.",
          "We're candid about this because it's already disclosed across the site: N7 Technologies and DeployPod are separate companies bound by a master services agreement. When you chat with Mason inside ContractorPod, you're talking to a DeployPod-hosted agent. Close and aligned, but legally and operationally distinct — we design the pods, DeployPod wires the agents.",
        ],
      },
    ],
  },
  {
    eyebrow: "After launch",
    heading: "Support, hosting & what recurs",
    items: [
      {
        q: "What happens after launch — is there ongoing support?",
        a: [
          "Post-launch support is built into the higher tiers: 30 days on a Growth site or a Product app, and 90 days on a Pro site or a Scale app. Beyond that, ongoing support is optional — we hand the project off clean and documented, and you decide how much continued help you want.",
          "Hosting and maintenance are the usual recurring pieces of running live software — a site or app needs somewhere to live and the occasional update. We'll lay out what recurs for your specific project when we scope it, rather than quote a maintenance number that wouldn't fit every build.",
        ],
      },
    ],
  },
  {
    eyebrow: "Veterans",
    heading: "Veteran pricing",
    items: [
      {
        q: "Is there veteran pricing?",
        a: [
          "Yes. We keep our work as affordable as we honestly can for everyone, and we go further for veterans — we discount wherever the math allows, and offer it free wherever we can carry the cost ourselves.",
          "This is a commitment, not a coupon. If you've served and price is the only thing standing between you and what you need built, reach out. We'd rather find a way than turn you away.",
        ],
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(180,60,255,0.85), transparent)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-24 text-center sm:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Questions, answered
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            The honest answers we&rsquo;d give you on a first call — what it
            costs, how long it takes, who owns the result, and how the AI
            behind our products actually works.
          </p>
          <div className="brand-rule mx-auto mt-8 w-full max-w-md" />
        </div>
      </section>

      {/* --- Q&A GROUPS --- */}
      <section className="mx-auto max-w-3xl px-6 pb-8 sm:px-8">
        <div className="flex flex-col gap-16">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                {group.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {group.heading}
              </h2>

              <dl className="mt-8 flex flex-col gap-5">
                {group.items.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5"
                  >
                    <dt className="font-display text-lg font-bold tracking-tight text-[var(--color-fg)]">
                      {item.q}
                    </dt>
                    <dd className="mt-4 flex flex-col gap-3">
                      {item.a.map((para, i) => (
                        <p
                          key={i}
                          className="text-base leading-relaxed text-[var(--color-fg)]"
                        >
                          {para}
                        </p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* --- SOFT CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(480px,80%)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[90px]"
            style={{ background: "rgba(180,60,255,0.85)" }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Still have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              Tell us what you&rsquo;re trying to build and we&rsquo;ll send
              back a plan and a quote. Or just talk it through with a founder
              first — we read every message.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ContactButton label="Get a quote" subject="FAQ — Get a quote" />
              <Link
                href="/contact#form"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                Talk to a founder <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
