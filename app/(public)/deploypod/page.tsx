import { ArrowUpRight } from "lucide-react";
import { ENGINE } from "@/lib/products";

export const metadata = {
  title: "DeployPod — N7 Technologies",
  description:
    "DeployPod is the independent AI-infrastructure company N7 Technologies partners with. They build, host, and run the AI agents inside our pods — and they can do the same for your product.",
};

/** DeployPod's brand accent (blue), distinct from the site's N7 red. */
const BLUE = ENGINE.accent; // #3B82F6

const CAPABILITIES: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Agent runtime",
    body: "A hosted runtime that runs the AI agents behind every pod — stateful, observable, and production-ready.",
  },
  {
    title: "Model orchestration",
    body: "Routes each task to the right model, chains steps, and manages prompts, fallbacks, and cost.",
  },
  {
    title: "Retrieval / RAG",
    body: "Grounds answers in your data — embeddings, vector search, and retrieval pipelines that keep agents accurate.",
  },
  {
    title: "Tool-use & integrations",
    body: "Gives agents safe, structured access to real tools and APIs so they can do work, not just talk.",
  },
];

function VisitButton({ label = "Visit DeployPod" }: { label?: string }) {
  return (
    <a
      href={ENGINE.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-[#3B82F6] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#60A5FA]"
    >
      {label} <ArrowUpRight size={16} aria-hidden />
    </a>
  );
}

export default function DeployPodPage() {
  return (
    <>
      {/* --- HERO (blue accent) --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
          style={{ background: `radial-gradient(closest-side, ${BLUE}, transparent)` }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center sm:px-8">
          <p
            className="font-sans text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: BLUE }}
          >
            Our AI partner
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            DeployPod — the AI agents behind every N7 product.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            DeployPod is the independent AI-infrastructure company we partner
            with. They build, host, and run the AI agents inside our pods — and
            they can do the same for your product.
          </p>
          <div className="mt-8 flex justify-center">
            <VisitButton />
          </div>
        </div>
      </section>

      {/* --- WHAT DEPLOYPOD DOES --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What DeployPod does
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The AI plumbing, run for you
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
                style={{ backgroundColor: BLUE }}
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

      {/* --- HOW WE WORK TOGETHER --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            How we work together
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Two companies, one product experience
          </h2>
        </div>
        <div className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
          <p className="max-w-3xl text-[var(--color-muted)]">
            N7 Technologies ships the consumer products; DeployPod ships the AI
            engine they run on. We&rsquo;re independent companies bound by a
            master services agreement — close and aligned, but legally and
            operationally distinct. When you use an N7 pod, you&rsquo;re using a
            DeployPod-hosted agent under the hood.
          </p>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div
          className="relative overflow-hidden rounded-2xl border bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5"
          style={{ borderColor: BLUE }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(480px,80%)] -translate-x-1/2 rounded-full opacity-[0.16] blur-[90px]"
            style={{ background: BLUE }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Want AI agents in your product?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
              DeployPod builds and runs the AI infrastructure behind N7&rsquo;s
              pods — and can do the same for you. Take a look.
            </p>
            <div className="mt-8 flex justify-center">
              <VisitButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
