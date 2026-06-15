import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";
import { BrowserFrame } from "@/components/device-frames";
import { PODS, ENGINE } from "@/lib/products";

const CONTRACTORPOD = PODS.find((p) => p.slug === "contractorpod")!;
/** ContractorPod's own accent (lime), distinct from the site's N7 red. */
const LIME = CONTRACTORPOD.accent; // #84CC16

export const metadata: Metadata = {
  title: "ContractorPod — N7 Technologies",
  description: CONTRACTORPOD.tagline,
};

/**
 * The three steps of the flow, written from the description in lib/products.
 * Homeowner-then-contractor narrative — the same story the card compresses.
 */
const FLOW: ReadonlyArray<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "An honest estimate, in chat",
    body: "Homeowners chat with Mason — an AI estimator that asks the right questions and returns an honest price range, never a fake-binding number. No phone tag, no waiting days for a callback.",
  },
  {
    step: "02",
    title: "Book the site visit in the same flow",
    body: "When the estimate lands, the homeowner books a site visit right there — one continuous flow from question to appointment, no separate scheduling tool.",
  },
  {
    step: "03",
    title: "A storefront that runs the back office",
    body: "The contractor gets a polished storefront, a quote-to-contract pipeline, and payments — the whole job from first message to paid invoice, without touching a spreadsheet.",
  },
];

/** Capability grid — mirrors the deploypod page card dialect. */
const CAPABILITIES: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "AI estimator (Mason)",
    body: "An estimator that talks like a person, asks what it needs, and returns an honest range — so homeowners trust the number and contractors stop fielding tire-kickers.",
  },
  {
    title: "Integrated booking",
    body: "Site visits get scheduled inside the same conversation that produced the estimate — no hand-off to a separate calendar app.",
  },
  {
    title: "Quote-to-contract pipeline",
    body: "Every lead moves through one pipeline — estimate, quote, signed contract — so nothing falls through the cracks between the first chat and the job.",
  },
  {
    title: "Storefront + payments",
    body: "A polished public storefront and built-in payments mean a contractor looks established and gets paid without stitching together three tools.",
  },
];

/** Primary CTA — links out to the live ContractorPod app. */
function VisitButton({ label = "Visit ContractorPod" }: { label?: string }) {
  return (
    <a
      href={CONTRACTORPOD.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold text-[#0a0d12] shadow-sm transition-colors"
      style={{ backgroundColor: LIME }}
    >
      {label} <ArrowUpRight size={16} aria-hidden />
    </a>
  );
}

export default function ContractorPodPage() {
  return (
    <>
      {/* --- HERO (lime accent) --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
          style={{ background: `radial-gradient(closest-side, ${LIME}, transparent)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft size={15} aria-hidden /> All products
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p
                className="font-sans text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: LIME }}
              >
                Live in production
              </p>
              <h1 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                {CONTRACTORPOD.name}
              </h1>
              <p className="mt-5 max-w-xl text-xl text-[var(--color-fg)]">
                {CONTRACTORPOD.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
                A hosted estimate-and-booking platform for small contractors —
                an AI estimator out front for homeowners, a storefront and
                quote-to-contract pipeline behind it for the contractor.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <VisitButton />
                <ContactButton
                  label="Get a quote"
                  subject="ContractorPod"
                  variant="secondary"
                />
              </div>
            </div>

            <BrowserFrame
              src="/screenshots/contractorpod-web.png"
              url="contractorpod.deploypod.ai"
              alt="ContractorPod web app"
            />
          </div>
        </div>
      </section>

      {/* --- WHAT IT DOES (the flow) --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            How it works
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From first question to paid job
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {FLOW.map((f) => (
            <div
              key={f.step}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5"
            >
              <span
                aria-hidden
                className="font-display text-lg font-bold tracking-tight"
                style={{ color: LIME }}
              >
                {f.step}
              </span>
              <h3 className="font-display mt-3 text-xl font-bold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CAPABILITY GRID --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What you get
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One platform, no spreadsheets
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm ring-1 ring-white/5"
            >
              <span
                aria-hidden
                className="block h-1.5 w-8 rounded-full"
                style={{ backgroundColor: LIME }}
              />
              <h3 className="font-display mt-4 text-lg font-bold tracking-tight">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE AI UNDERNEATH (honest DeployPod relationship) --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            The AI underneath
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Mason is a DeployPod-hosted agent
          </h2>
        </div>
        <div className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
          <p className="max-w-3xl text-base leading-relaxed text-[var(--color-muted)]">
            When a homeowner chats with Mason inside ContractorPod, they&rsquo;re
            talking to a DeployPod-hosted agent. N7 ships the product; DeployPod
            ships the AI engine it runs on — model orchestration, retrieval, and
            the hosted-agent runtime behind every pod.
          </p>
          <Link
            href={ENGINE.page}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] transition-colors hover:underline"
          >
            Learn more about DeployPod <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      {/* --- CLOSING CTA BAND --- */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div
          className="relative overflow-hidden rounded-2xl border bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5"
          style={{ borderColor: LIME }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(480px,80%)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[90px]"
            style={{ background: LIME }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Run your contracting business on ContractorPod
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              It&rsquo;s live and taking contractors now. Take a look, or tell us
              about your business and we&rsquo;ll get you set up.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <VisitButton />
              <ContactButton
                label="Get a quote"
                subject="ContractorPod"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
