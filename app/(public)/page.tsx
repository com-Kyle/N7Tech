import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Globe, Smartphone, Bot } from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";
import { BrowserFrame, PhoneFrame } from "@/components/device-frames";
import { PODS, ENGINE } from "@/lib/products";
import { WEBSITE_SERVICE, APP_SERVICE } from "@/lib/services";

export const metadata: Metadata = {
  // `absolute` opts out of the layout's "%s · N7 Technologies" template so the
  // homepage <title> reads cleanly (it already names the brand).
  title: {
    absolute:
      "N7 Technologies — AI products + a studio that builds web & app software",
  },
  description:
    "N7 Technologies ships its own focused AI products and builds, improves, and tests websites and mobile apps for everyone else. One studio, two ways to work with us.",
};

/** ContractorPod is the lead (web) product; BudgetPod is the showcased app. */
const CONTRACTORPOD = PODS.find((p) => p.slug === "contractorpod")!;
const BUDGETPOD = PODS.find((p) => p.slug === "budgetpod")!;
const BLUE = ENGINE.accent; // #3B82F6 — DeployPod's accent
const AMBER = "#f5a623"; // App-services accent — a warm middle note in the red→amber→blue chip triad

/**
 * The three "what we do" service entries, sourced from lib/services + ENGINE.
 * Each carries its own accent so the chips read as a deliberate triad (warm red
 * → warm amber → cool blue) rather than a red pair + an odd one out — which also
 * keeps N7 red singular in this section, per DESIGN.md. Card blurbs are written
 * here (not pulled from the shared taglines) so each card sells a distinct angle.
 */
const SERVICE_CARDS = [
  {
    href: `/${WEBSITE_SERVICE.slug}`,
    name: WEBSITE_SERVICE.name,
    blurb: "Marketing sites and web apps — designed, built, and launched fast.",
    meta: `Starting at ${WEBSITE_SERVICE.startingAt}`,
    accent: "var(--color-brand)",
    icon: Globe,
  },
  {
    href: `/${APP_SERVICE.slug}`,
    name: APP_SERVICE.name,
    blurb: "iOS, Android, and web apps on a modern, AI-native stack.",
    meta: `Starting at ${APP_SERVICE.startingAt}`,
    accent: AMBER,
    icon: Smartphone,
  },
  {
    href: ENGINE.page,
    name: "AI Agents",
    blurb: "The AI agents behind our pods — via DeployPod, our infra partner.",
    meta: "Powered by DeployPod",
    accent: BLUE,
    icon: Bot,
  },
];

export default function HomePage() {
  return (
    <div className="bg-carbon">
      {/* --- HERO --- */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex max-w-[90rem] flex-col items-center gap-10 px-4 pb-16 pt-16 sm:px-6 md:flex-row md:gap-14 lg:gap-20">
          {/* Logo chip — left of the headline */}
          <div className="shrink-0 rounded-2xl bg-[#11151f] p-3 shadow-lg ring-1 ring-white/10 sm:p-4">
            <Image
              src="/brand/neural-zenith-logo.png"
              alt="Neural Zenith Technologies"
              width={1254}
              height={1254}
              priority
              className="h-auto w-[480px] sm:w-[640px]"
            />
          </div>

          {/* Headline + subhead + CTAs — on a surface panel so text stays
              crisp over the technical backdrop. Balances the logo chip. */}
          <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-sm ring-1 ring-white/5 sm:p-10 md:items-start md:text-left">
            {/* Proof chip — ContractorPod is live, the studio's strongest
                credibility signal. Lime dot is ContractorPod's own accent. */}
            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-fg)] ring-1 ring-white/5 transition-colors hover:border-[#84CC16]/60"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#84CC16] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#84CC16]" />
              </span>
              ContractorPod — live in production
            </Link>

            <h1 className="font-display mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              We build AI-native websites and apps — and ship our own to prove
              it.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-[var(--color-muted)]">
              N7 is an AI software studio. We build, improve, and test websites
              and apps on a modern AI-native stack — and ship our own AI products
              like ContractorPod, live today. Websites from $499, apps from
              $2,500.
            </p>

            {/* Positioning wedge — slots N7 between DIY builders and legacy
                agencies, with transparent pricing as the differentiator. */}
            <p className="mt-5 max-w-2xl text-base font-semibold text-[var(--color-fg)]">
              More polished than a DIY builder, faster and cheaper than a
              traditional agency — with pricing you can actually see.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
              >
                Get a free quote now <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                See what we&rsquo;ve shipped <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              No commitment — see what it&rsquo;ll cost up front.
            </p>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO (services) --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="neon-glow inline-flex w-fit items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 font-sans text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)] ring-1 ring-white/5">
            What we do
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Build with us, or hire us to build
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICE_CARDS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-fg)]/25 hover:shadow-md"
            >
              {/* Decorative accent glow — matches the product-card dialect
                  (h-28 blur-2xl, ~0.12 resting → ~0.22 hover) per DESIGN.md. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.12] blur-2xl transition-opacity group-hover:opacity-[0.22]"
                style={{ backgroundColor: s.accent }}
              />
              {/* Accent icon chip — tinted square, replaces the bare accent bar. */}
              <span
                aria-hidden
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                  color: s.accent,
                  ["--tw-ring-color" as string]: `color-mix(in srgb, ${s.accent} 30%, transparent)`,
                }}
              >
                <s.icon size={20} strokeWidth={2} aria-hidden />
              </span>
              <h3 className="font-display mt-5 text-2xl font-bold tracking-tight">
                {s.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                {s.blurb}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)]/60 pt-4">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {s.meta}
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: s.accent }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="neon-glow inline-flex w-fit items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 font-sans text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)] ring-1 ring-white/5">
            Our products
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            See the pods in action
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Every pod runs on custom AI agents built with DeployPod — Mason
            &amp; Foreman power ContractorPod, Abbey &amp; Andre power MealPod,
            and Virgil &amp; Val power BudgetPod.
          </p>
        </div>

        {/* ContractorPod — WEB, browser frame, text left / frame right */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
            <ProductBadge label="Web service" accent="var(--color-brand)" />
            <h3 className="font-display mt-4 text-3xl font-bold tracking-tight">
              {CONTRACTORPOD.name}
            </h3>
            <p className="mt-3 text-xl text-[var(--color-fg)]">
              {CONTRACTORPOD.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              {CONTRACTORPOD.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <StatusPill available />
              {CONTRACTORPOD.href && (
                <a
                  href={CONTRACTORPOD.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-base font-semibold text-[var(--color-brand)] transition-colors hover:underline"
                >
                  Visit {CONTRACTORPOD.name} <ArrowUpRight size={17} aria-hidden />
                </a>
              )}
            </div>
          </div>
          <BrowserFrame
            src="/screenshots/contractorpod-web.png"
            url="contractorpod.deploypod.ai"
            alt="ContractorPod web app"
          />
        </div>

        {/* BudgetPod — APP, phone frame, frame left / text right */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5 lg:order-2">
            <ProductBadge label="App" accent={String(BUDGETPOD.accent)} />
            <h3 className="font-display mt-4 text-3xl font-bold tracking-tight">
              {BUDGETPOD.name}
            </h3>
            <p className="mt-3 text-xl text-[var(--color-fg)]">
              Conversational personal finance — chat with Virgil.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              {BUDGETPOD.description}
            </p>
            <div className="mt-6">
              <StatusPill available={false} />
            </div>
          </div>
          <div className="lg:order-1">
            {/* Two-phone fan — both fully visible, chat the slightly-larger hero. */}
            <div className="flex items-center justify-center gap-3 sm:gap-2">
              {/* Front / hero — Virgil chat */}
              <PhoneFrame
                src="/screenshots/budgetpod-chat.png"
                alt="BudgetPod — Virgil chat"
                className="z-10 w-full max-w-[280px] -rotate-3"
              />
              {/* Companion — money coach (voice picker); stacks below on mobile */}
              <PhoneFrame
                src="/screenshots/budgetpod-coach.png"
                alt="BudgetPod — meet your money coach"
                className="hidden w-full max-w-[248px] rotate-3 opacity-95 sm:block"
              />
            </div>
            <p className="neon-glow mx-auto mt-4 w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-center text-sm text-[var(--color-muted)] ring-1 ring-white/5">
              Preview
            </p>
          </div>
        </div>

        {/* All products / MealPod mention */}
        <div className="neon-glow mx-auto mt-12 flex w-fit flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-base text-[var(--color-muted)] shadow-sm ring-1 ring-white/5">
          <span>Three pods in the family — including MealPod.</span>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 font-semibold text-[var(--color-brand)] transition-colors hover:underline"
          >
            See all products <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      {/* --- CLOSING CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Use our products, or build your own with us.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-[var(--color-muted)]">
            Try ContractorPod today, get in line for MealPod and BudgetPod, or
            tell us about the website or app you need built. We read every
            message.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand)]"
            >
              See our products
            </Link>
            <ContactButton label="Get in touch" />
          </div>
        </div>
      </section>
    </div>
  );
}

/** A small uppercase badge marking a product as web vs app. */
function ProductBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]"
      style={{ borderColor: accent, color: accent }}
    >
      {label}
    </span>
  );
}

/** "Available now" / "Coming soon" status pill. */
function StatusPill({ available }: { available: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        available
          ? "border-[var(--color-brand)]/50 text-[var(--color-fg)]"
          : "border-[var(--color-border)] text-[var(--color-muted)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: available ? "var(--color-brand)" : "var(--color-muted)" }}
      />
      {available ? "Available now" : "Coming soon"}
    </span>
  );
}
