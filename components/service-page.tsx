/**
 * Shared template for an agency-style service page (Website / App services).
 * Both pages render `<ServicePage service={...} />` so they stay one coherent
 * layout. Matches the site's charcoal design language: neon-purple hero bloom,
 * font-sans eyebrow, font-display headings, flat content cards (surface + ring-1
 * ring-white/5), a neon-purple-glowing compare table, and a red brand CTA.
 */
import { Check, Minus } from "lucide-react";
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
          style={{ background: "radial-gradient(closest-side, rgba(180,60,255,0.85), transparent)" }}
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

      {/* --- PRICING TIERS: good / better / best --- */}
      <section className="mx-auto max-w-7xl px-6 pt-8 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Pricing
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Pick a starting point
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Three ways in — every project is quoted to fit. Not sure which? Start
            anywhere and we&rsquo;ll right-size it together.
          </p>
        </div>
        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          {service.tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                "relative flex h-full flex-col rounded-lg bg-[var(--color-surface)] p-7 shadow-sm",
                tier.featured
                  ? "border border-[var(--color-brand)] ring-1 ring-[var(--color-brand)]/40 md:-translate-y-1"
                  : "border border-[var(--color-border)] ring-1 ring-white/5",
              ].join(" ")}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-brand)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-fg)] shadow-sm">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight">
                {tier.name}
              </h3>
              <p className="font-display mt-3 text-3xl font-bold tracking-tight text-[var(--color-fg)]">
                {tier.price}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {tier.blurb}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {tier.features.map((feature) =>
                  feature.startsWith("Everything in") ? (
                    <li
                      key={feature}
                      className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
                    >
                      {feature}
                    </li>
                  ) : (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={16}
                        aria-hidden
                        className="mt-0.5 shrink-0 text-[var(--color-brand)]"
                      />
                      <span className="leading-snug text-[var(--color-fg)]">
                        {feature}
                      </span>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-7 flex grow flex-col justify-end pt-1">
                <ContactButton
                  label={tier.cta}
                  subject={tier.contactSubject}
                  variant={tier.featured ? "primary" : "secondary"}
                  className="w-full justify-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Custom / "not sure which" escape hatch — the concrete top tier (Pro /
            Scale) replaces the old "Custom — Let's talk" card; this keeps the
            bespoke option without diluting the three-tier grid. */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm text-[var(--color-muted)]">
            Need something bigger, or not sure which tier fits? We&rsquo;ll scope
            and quote it to fit exactly what you need.
          </p>
          <div className="mt-4 flex justify-center">
            <ContactButton
              label="Talk about a custom build"
              subject={`${service.name} — Custom (let's talk)`}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* --- COMPARE TIERS: feature matrix (what you do / don't get) --- */}
      <section className="mx-auto max-w-7xl px-6 pt-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Compare
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What&rsquo;s included at each tier
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Exactly what you get — and what you don&rsquo;t — as you move up.
          </p>
        </div>

        <div className="neon-glow mt-10 overflow-x-auto rounded-lg border border-[var(--color-border)] ring-1 ring-white/5">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="bg-[var(--color-surface)] p-4 text-sm font-semibold text-[var(--color-muted)]">
                  Feature
                </th>
                {service.tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className={[
                      "p-4 text-center align-bottom",
                      tier.featured
                        ? "bg-[var(--color-brand)]/[0.07]"
                        : "bg-[var(--color-surface)]",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-display text-lg font-bold tracking-tight",
                        tier.featured
                          ? "text-[var(--color-brand)]"
                          : "text-[var(--color-fg)]",
                      ].join(" ")}
                    >
                      {tier.name}
                    </div>
                    <div className="mt-1 text-sm text-[var(--color-muted)]">
                      {tier.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {service.comparison.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-[var(--color-border)]/60 last:border-0"
                >
                  <th
                    scope="row"
                    className="p-4 text-left text-sm font-medium text-[var(--color-fg)]"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={[
                        "p-4 text-center text-sm",
                        service.tiers[i]?.featured
                          ? "bg-[var(--color-brand)]/[0.05]"
                          : "",
                      ].join(" ")}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check
                            size={18}
                            aria-label="Included"
                            className="mx-auto text-[var(--color-brand)]"
                          />
                        ) : (
                          <Minus
                            size={16}
                            aria-label="Not included"
                            className="mx-auto text-[var(--color-muted)]"
                          />
                        )
                      ) : (
                        <span className="font-medium text-[var(--color-fg)]">
                          {value}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
