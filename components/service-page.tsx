/**
 * Shared template for an agency-style service page (Website / App services).
 * Both pages render `<ServicePage service={...} />` so they stay one coherent
 * layout. Matches the site's charcoal design language: red hero bloom, font-sans
 * eyebrow, font-display headings, flat content cards (surface + ring-1
 * ring-white/5), and a red brand CTA.
 */
import { ContactButton } from "@/components/contact-buttons";
import type { Service } from "@/lib/services";

/**
 * Generic 3-step process, shared by every service page. Kept here (not in
 * lib/services.ts) because it's the same for Website and App work.
 */
const PROCESS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Talk",
    body: "Tell us what you need — a free consult to scope the work and see if we're a fit.",
  },
  {
    title: "Build",
    body: "We design, build, and test in tight iterations, sharing progress as we go.",
  },
  {
    title: "Launch",
    body: "We ship it and hand it off — clean and documented. Ongoing support optional.",
  },
];

export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.85), transparent)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center sm:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What we do
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {service.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            {service.tagline}
          </p>
          <p className="mt-6 text-sm font-semibold text-[var(--color-fg)]">
            Starting at{" "}
            <span className="text-[var(--color-brand)]">{service.startingAt}</span>
          </p>
          <div className="mt-8 flex justify-center">
            <ContactButton label="Get a quote" subject={service.contactSubject} />
          </div>
        </div>
      </section>

      {/* --- PILLARS: Build / Improve / Test --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {service.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5"
            >
              <h2 className="font-display text-xl font-bold tracking-tight">
                {pillar.title}
              </h2>
              <div className="brand-rule mt-4 w-12" />
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS: Talk / Build / Launch --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            How it works
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From first call to launch
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROCESS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm ring-1 ring-white/5"
            >
              <span
                aria-hidden
                className="font-display text-sm font-bold text-[var(--color-brand)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-lg font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Let&rsquo;s build it together.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
            Tell us what you need {service.name.toLowerCase()} to do, and
            we&rsquo;ll send back a plan and a quote. We read every message.
          </p>
          <div className="mt-8 flex justify-center">
            <ContactButton label="Get a quote" subject={service.contactSubject} />
          </div>
        </div>
      </section>
    </>
  );
}
