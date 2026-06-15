import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Cpu,
  Target,
  Compass,
  Medal,
  Leaf,
  Handshake,
  HeartHandshake,
} from "lucide-react";
import { ContactButton } from "@/components/contact-buttons";
import { ENGINE } from "@/lib/products";
import { PRIMARY_CONTACT, SECONDARY_CONTACT } from "@/lib/contact";

export const metadata = {
  title: "About — N7 Technologies",
  description:
    "N7 Technologies is a founder-run studio building small, honest AI pods for everyday people. Meet the founders, the engine that powers the pods, our mission, our veteran-first pledge, and our commitment to sustainable, responsible operations.",
};

/**
 * The two people who own and run N7. Names + the single contact email come from
 * `lib/contact.ts` (the source of truth); the role label and the longer
 * background blurb live here because they're about-page narrative, not contact
 * metadata. Dante is the founder, Kyle the co-founder — the ordering mirrors
 * PRIMARY/SECONDARY in `lib/contact.ts`.
 */
const FOUNDERS: ReadonlyArray<{
  name: string;
  email: string;
  role: string;
  field: string;
  school: string;
  body: string;
}> = [
  {
    name: PRIMARY_CONTACT.name,
    email: PRIMARY_CONTACT.email,
    role: "Founder",
    field: "Project & supply-chain management",
    school: "Bachelor's, Penn State University",
    body: "Comes from operations and supply chain — the discipline of making moving parts arrive on time and on budget. Runs product, the customer relationship, and the day-to-day of every pod.",
  },
  {
    name: SECONDARY_CONTACT.name,
    email: SECONDARY_CONTACT.email,
    role: "Co-founder",
    field: "Audio engineering & music production",
    school: "Bachelor's, Full Sail University",
    body: "Comes from audio engineering and production — a craft of obsessing over how a finished thing actually feels to use. Shapes the build and the polish that makes each pod feel right.",
  },
];

/** Mission and vision — the two statements that anchor everything else. */
const PURPOSE: ReadonlyArray<{
  kicker: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}> = [
  {
    kicker: "Our mission",
    title: "Put frontier AI in everyday hands.",
    body: "We put frontier AI to work in everyday hands — wrapping the best models available in small, honest tools for tradespeople, home cooks, and households. We don't build the models; we package them behind plain-spoken interfaces that quote real price ranges, own their limits, and never pretend a chatbot is a contract.",
    icon: <Target size={22} aria-hidden />,
  },
  {
    kicker: "Our vision",
    title: "The same caliber of AI, for everyone.",
    body: "A world where a solo contractor, a parent running a household, or a veteran has the same caliber of AI models working for them as any large company — and never has to learn to code, or decode the fine print, to use it. The people who build, cook, fix, and serve already bring the skill; the tool should meet them there and get out of the way.",
    icon: <Compass size={22} aria-hidden />,
  },
];

/** The CSR / sustainability pledge — three commitments, plain-spoken. */
const PLEDGE: ReadonlyArray<{
  title: string;
  body: string;
  icon: React.ReactNode;
}> = [
  {
    title: "Operate sustainably",
    body: "We run lean by design — minimal footprint, efficient compute, no waste we can avoid. As we grow, we measure our environmental impact honestly and work to shrink it, rather than buy our way out of it after the fact.",
    icon: <Leaf size={22} aria-hidden />,
  },
  {
    title: "Choose sustainable partners",
    body: "We don't build alone, so the companies we build on matter. We favor infrastructure and partners with credible commitments to renewable-powered, responsible operations — and we keep choosing the ones who take their footprint as seriously as we take ours.",
    icon: <Handshake size={22} aria-hidden />,
  },
  {
    title: "Give back to our communities",
    body: "A small company can still be a good neighbor. We hold ourselves to using what we build to serve the people around us — starting with the veterans and working families our pods are meant to reach.",
    icon: <HeartHandshake size={22} aria-hidden />,
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
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-20 text-center sm:px-8">
          <div className="rounded-2xl bg-[#11151f] p-3 shadow-lg ring-1 ring-white/10 sm:p-4">
            <Image
              src="/brand/neural-zenith-logo.png"
              alt="Neural Zenith Technologies"
              width={1254}
              height={1254}
              priority
              className="h-auto w-[200px] sm:w-[260px]"
            />
          </div>
          <p className="mt-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
            The studio behind ContractorPod
          </p>
          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Two founders building small, honest AI pods for everyday people.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            N7 Technologies is a founder-run studio shipping AI-native software in
            tightly focused product pods — one job, one audience, one polished
            interface. We answer our own email, run our own products, and stand
            behind the people we build for.
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

      {/* --- FOUNDERS (top — the trust signal) --- */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Who&rsquo;s behind it
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The founders who build and run what they sell
          </h2>
          <p className="mt-6 text-[var(--color-muted)]">
            N7 Technologies is two people, not a faceless studio. Neither of us
            came up through a computer-science track — we came from operations
            and from production. We taught ourselves to ship AI software, and
            ContractorPod is live proof: built, run, and supported by the same
            two people whose names are on this page. When you reach out, you
            reach a founder.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <div
              key={f.email}
              className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-3xl"
                style={{ background: "var(--color-brand)" }}
              />
              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  {f.role}
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-[var(--color-fg)]">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[var(--color-brand)]">
                  {f.field}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {f.school}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.body}
                </p>
                <a
                  href={`mailto:${f.email}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:text-[var(--color-brand)]"
                >
                  <Mail size={15} aria-hidden />
                  {f.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- DEPLOYPOD (after founders, before mission — they wire the agents) --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            The engine behind the pods
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            We design the pods. DeployPod wires the agents.
          </h2>
          <p className="mt-6 text-[var(--color-muted)]">
            We don&rsquo;t run the AI plumbing ourselves. N7 Technologies and
            DeployPod are independent companies bound by a master services
            agreement: N7 ships the consumer pods; DeployPod builds and runs the
            agents inside them.
          </p>
        </div>

        <div className="mt-12">
          <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-3xl"
              style={{ background: ENGINE.accent }}
            />
            <div className="relative md:flex md:items-start md:gap-8">
              <div className="md:max-w-xl">
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
                  When you chat with Mason inside ContractorPod, you&rsquo;re
                  talking to a DeployPod-hosted agent. They own model
                  orchestration, retrieval, and tool-use — the hosted-agent
                  runtime every pod calls into — and license that engine to N7.
                  Close and aligned, but legally and operationally distinct.
                </p>
                <Link
                  href={ENGINE.page}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: ENGINE.accent }}
                >
                  Learn more about DeployPod <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
              <ul className="mt-6 grid flex-1 gap-2 text-sm text-[var(--color-fg)] md:mt-1">
                {[
                  "Hosts and runs every agent the pods use",
                  "Owns model orchestration, retrieval, tool-use",
                  "Licenses the engine to N7 under an MSA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Cpu
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: ENGINE.accent }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What drives us
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Our mission and vision
          </h2>
          <div className="brand-rule mx-auto mt-8 w-full max-w-md" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PURPOSE.map((p) => (
            <div
              key={p.kicker}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-elevated)] text-[var(--color-brand)]">
                {p.icon}
              </span>
              <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {p.kicker}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- VETERANS PLEDGE (highlighted band) --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-brand)]/40 bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-[0.16] blur-[90px]"
            style={{ background: "rgba(225,29,39,0.85)" }}
          />
          <div className="relative max-w-3xl">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-brand)]/50 bg-[var(--color-brand)]/[0.08] text-[var(--color-brand)]">
              <Medal size={22} aria-hidden />
            </span>
            <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-brand)]">
              Our pledge to veterans
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Affordable for everyone. Free for veterans wherever we can carry it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              We believe the people who served shouldn&rsquo;t be priced out of
              the tools that make work and life easier. So we keep our pods as
              affordable as we honestly can for everyone — and we go further for
              veterans. We discount wherever the math allows, and we offer it
              free wherever we can carry the cost ourselves.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              This is a commitment, not a coupon. If you&rsquo;ve served and a
              price is the only thing standing between you and a pod, reach out.
              We&rsquo;d rather find a way than turn you away.
            </p>
            <div className="mt-8">
              <ContactButton
                label="Talk to us"
                subject="Veteran pricing — N7 Technologies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- CSR & SUSTAINABILITY --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Corporate social responsibility
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Responsibility isn&rsquo;t a footnote
          </h2>
          <p className="mt-6 text-[var(--color-muted)]">
            We&rsquo;re a small company, but how we operate still leaves a
            footprint — on the planet, on the partners we choose, and on the
            communities our pods reach. We hold ourselves to a simple standard:
            act sustainably, build with people who do the same, and give back
            where we can.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLEDGE.map((p) => (
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
