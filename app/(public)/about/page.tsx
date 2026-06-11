import Image from "next/image";
import Link from "next/link";
import { Boxes, Sparkles, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ContactButton } from "@/components/contact-buttons";
import { PODS, ENGINE } from "@/lib/products";

export const metadata = {
  title: "About — N7 Technologies",
  description:
    "N7 Technologies is a studio building small, focused AI pods for everyday people. ContractorPod is live today; MealPod and BudgetPod are coming soon. The pods run on DeployPod — a separate AI-infrastructure partner.",
};

const PRINCIPLES: ReadonlyArray<{
  title: string;
  body: string;
  icon: React.ReactNode;
}> = [
  {
    title: "Ship small pods, not platforms",
    body: "Every product solves one job for one audience. We'd rather ship a few sharp tools than one bloated suite.",
    icon: <Boxes size={22} aria-hidden />,
  },
  {
    title: "AI for the everyday",
    body: "Frontier models aren't just for engineers. Our pods put the same intelligence behind ChatGPT into job sites, kitchens, and budgets.",
    icon: <Sparkles size={22} aria-hidden />,
  },
  {
    title: "Honest interfaces",
    body: "Ranges instead of fake-binding numbers. Disclaimers built in, not bolted on. We never let a chat bubble pretend to be a contract.",
    icon: <ShieldCheck size={22} aria-hidden />,
  },
  {
    title: "Own the boring parts",
    body: "Payments, scheduling, audit trails — the parts everyone hates. Our pods absorb the drudgery so people can keep doing the craft.",
    icon: <Wrench size={22} aria-hidden />,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.85), transparent)" }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-20 text-center">
          <div className="rounded-2xl bg-[#11151f] p-3 shadow-lg ring-1 ring-white/10 sm:p-4">
            <Image
              src="/brand/n7-technologies.jpg"
              alt="N7 Technologies"
              width={1320}
              height={1245}
              priority
              className="h-auto w-[200px] sm:w-[260px]"
            />
          </div>
          <p className="mt-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
            The studio behind ContractorPod
          </p>
          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            We build small, sharp AI pods for everyday people.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            N7 Technologies is a studio shipping AI-native software in tightly
            focused product pods — one job, one audience, one polished interface.
            ContractorPod is live today. MealPod and BudgetPod are next. The pods
            run on DeployPod — a separate AI-infrastructure company we partner
            with.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
            >
              See our products <ArrowRight size={16} aria-hidden />
            </Link>
            <ContactButton label="Contact us" subject="Hello from the About page" />
          </div>
        </div>
      </section>

      {/* --- MISSION --- */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Why N7 Technologies exists
        </p>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          The best models are locked behind chatbots. We unlock them through
          interfaces.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
          GPT-class models can quote a deck rebuild, plan a week of meals, or
          draft a budget — but only if someone wraps them in the right context,
          the right tools, and the right guardrails. That wrapping is our job. We
          pick small audiences the big AI labs ignore, and we ship them tools
          their grandmother could use.
        </p>
        <div className="brand-rule mx-auto mt-10 w-full max-w-md" />
      </section>

      {/* --- TWO COMPANIES (left-aligned, breaks the centered rhythm) --- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            How we&rsquo;re structured
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Two companies, working together
          </h2>
          <p className="mt-6 text-[var(--color-muted)]">
            N7 Technologies and DeployPod are independent companies bound by a
            master services agreement. N7 ships the consumer pods; DeployPod
            ships the AI infrastructure they run on. Close, aligned, but legally
            and operationally distinct.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* N7 */}
          <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-3xl"
              style={{ background: "var(--color-brand)" }}
            />
            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Pods
              </span>
              <h3 className="font-display text-chrome mt-4 text-2xl font-bold tracking-wide">
                N7 Technologies
              </h3>
              <p className="mt-2 text-sm font-semibold text-[var(--color-brand)]">
                The studio that owns the pods.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                N7 Technologies owns the ContractorPod, MealPod, and BudgetPod
                brands. We do product, design, payments, and the day-to-day
                operations of each pod — and we set the rules every pod follows
                about honest AI interfaces.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--color-fg)]">
                {[
                  "Owns the ContractorPod, MealPod & BudgetPod brands",
                  "Ships product, design, and payments",
                  "Holds the customer relationship",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DeployPod */}
          <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-3xl"
              style={{ background: ENGINE.accent }}
            />
            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Engine
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-wide text-[var(--color-fg)]">
                {ENGINE.name}
              </h3>
              <p className="mt-2 text-sm font-semibold" style={{ color: ENGINE.accent }}>
                {ENGINE.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {ENGINE.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--color-fg)]">
                {[
                  "Hosts and runs every agent the pods use",
                  "Owns model orchestration, retrieval, tool-use",
                  "Licenses the engine to N7 under an MSA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ENGINE.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={ENGINE.page}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: ENGINE.accent }}
              >
                Learn more about DeployPod <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRINCIPLES (left-aligned, alternates with the centered sections) --- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Operating principles
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Four rules that show up in every pod
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-elevated)] text-[var(--color-brand)]">
                {p.icon}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCT FAMILY --- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            The pod family
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One pod live, two on the way
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PODS.map((pod) => (
            <ProductCard key={pod.slug} pod={pod} />
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(480px,80%)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[90px]"
            style={{ background: "rgba(225,29,39,0.85)" }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Try ContractorPod, or get in line for the rest.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
              ContractorPod is live and taking contractors now. Want first access
              to MealPod or BudgetPod when they ship? Reach out — we read every
              message.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand)]"
              >
                See our products
              </Link>
              <ContactButton label="Contact us" subject="Early access — N7 products" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
