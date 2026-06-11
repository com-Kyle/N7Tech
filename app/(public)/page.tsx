import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";
import { BrowserFrame, PhoneFrame } from "@/components/device-frames";
import { PODS, ENGINE } from "@/lib/products";
import { WEBSITE_SERVICE, APP_SERVICE } from "@/lib/services";

/** ContractorPod is the lead (web) product; BudgetPod is the showcased app. */
const CONTRACTORPOD = PODS.find((p) => p.slug === "contractorpod")!;
const BUDGETPOD = PODS.find((p) => p.slug === "budgetpod")!;
const BLUE = ENGINE.accent; // #3B82F6 — DeployPod's accent

/** The three "what we do" service entries, sourced from lib/services + ENGINE. */
const SERVICE_CARDS = [
  {
    href: `/${WEBSITE_SERVICE.slug}`,
    name: WEBSITE_SERVICE.name,
    blurb: WEBSITE_SERVICE.tagline,
    meta: `Starting at ${WEBSITE_SERVICE.startingAt}`,
    accent: "var(--color-brand)",
  },
  {
    href: `/${APP_SERVICE.slug}`,
    name: APP_SERVICE.name,
    blurb: APP_SERVICE.tagline,
    meta: `Starting at ${APP_SERVICE.startingAt}`,
    accent: "var(--color-brand)",
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
      {/* --- HERO --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.85), transparent)" }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center">
          <div className="rounded-2xl bg-[#11151f] p-3 shadow-lg ring-1 ring-white/10 sm:p-4">
            <Image
              src="/brand/n7-technologies.jpg"
              alt="N7 Technologies"
              width={1320}
              height={1245}
              priority
              className="h-auto w-[220px] sm:w-[300px]"
            />
          </div>

          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Small, sharp AI products — and the studio that builds them.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            N7 Technologies ships its own focused AI products — and builds,
            improves, and tests websites and apps for everyone else. One studio,
            two ways to work with us.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
            >
              See our products <ArrowRight size={16} aria-hidden />
            </Link>
            <ContactButton label="Get in touch" />
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO (services) --- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What we do
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build with us, or hire us to build
          </h2>
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
                className="block h-1.5 w-8 rounded-full"
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
                  style={{ color: s.accent }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE --- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Our products
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            See the pods in action
          </h2>
        </div>

        {/* ContractorPod — WEB, browser frame, text left / frame right */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <ProductBadge label="Web service" accent="var(--color-brand)" />
            <h3 className="font-display mt-4 text-2xl font-bold tracking-tight">
              {CONTRACTORPOD.name}
            </h3>
            <p className="mt-3 text-lg text-[var(--color-fg)]">
              {CONTRACTORPOD.tagline}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
              {CONTRACTORPOD.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <StatusPill available />
              {CONTRACTORPOD.href && (
                <a
                  href={CONTRACTORPOD.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] transition-colors hover:underline"
                >
                  Visit {CONTRACTORPOD.name} <ArrowUpRight size={15} aria-hidden />
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
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <ProductBadge label="App" accent={String(BUDGETPOD.accent)} />
            <h3 className="font-display mt-4 text-2xl font-bold tracking-tight">
              {BUDGETPOD.name}
            </h3>
            <p className="mt-3 text-lg text-[var(--color-fg)]">
              Conversational personal finance — chat with Virgil.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
              {BUDGETPOD.description}
            </p>
            <div className="mt-6">
              <StatusPill available={false} />
            </div>
          </div>
          <div className="lg:order-1">
            {/* Layered two-phone preview: chat in front, coach peeking behind. */}
            <div className="relative mx-auto w-full max-w-[260px]">
              {/* Back phone — coach (voice picker), scaled + rotated, hidden on mobile */}
              <PhoneFrame
                src="/screenshots/budgetpod-coach.png"
                alt="BudgetPod — meet your money coach"
                className="absolute -top-6 left-[38%] z-0 hidden w-full max-w-[260px] origin-bottom-left rotate-[4deg] scale-[0.85] opacity-80 sm:block"
              />
              {/* Front phone — Virgil chat (the hero) */}
              <PhoneFrame
                src="/screenshots/budgetpod-chat.png"
                alt="BudgetPod — Virgil chat"
                className="relative z-10 w-full max-w-[260px]"
              />
            </div>
            <p className="relative z-10 mt-3 text-center text-xs text-[var(--color-muted)]">
              Preview
            </p>
          </div>
        </div>

        {/* All products / MealPod mention */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--color-muted)]">
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
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Use our products, or build your own with us.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
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
    </>
  );
}

/** A small uppercase badge marking a product as web vs app. */
function ProductBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em]"
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
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
