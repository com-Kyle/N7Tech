import { ContactStack } from "@/components/contact-buttons";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Get a quote — N7 Technologies",
  description:
    "Tell us about your website or app project and we'll send back a real price range — no commitment, read by a founder.",
};

/**
 * The quote/lead page — the destination every "Get a quote" CTA points to.
 *
 * Reads the selected tier from `?service=` (forwarded by ContactButton's isQuote
 * branch) and passes it into the lead form, which folds it into the submitted
 * message so the captured lead carries which tier it came from. Mirrors the
 * /contact layout so it feels native, not bolted on.
 */
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left — the ask + the form + the fallback addresses */}
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Get a quote</h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Tell us what you&rsquo;re building and we&rsquo;ll send back a real
            price range — not a fake-binding number. No commitment, and a founder
            reads every request.
          </p>

          {service && (
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-md border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.05] px-4 py-2.5 ring-1 ring-white/5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Requesting a quote for
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-[var(--color-fg)]">
                {service}
              </span>
            </div>
          )}

          <div className="brand-rule mt-8 w-full max-w-md" />

          {/* The form — the primary path. Tagged source="quote" so leads are
              attributable; service rides along inside the message. */}
          <div id="form" className="mt-10 scroll-mt-24">
            <ContactForm source="quote" service={service} />
          </div>

          {/* Fallback — the raw addresses, beneath the form. */}
          <div className="mt-12">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Or email a founder directly
            </p>
            <ContactStack subject={service ? `Quote request — ${service}` : "Quote request"} />
          </div>
        </div>

        {/* Right — what to expect when you ask for a quote */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5 lg:mt-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What to expect
          </p>
          <ul className="mt-6 space-y-4 text-sm text-[var(--color-fg)]">
            {[
              "A real price range for your project — not a fake-binding number.",
              "A free consult to scope the work and see if we're a fit.",
              "Transparent tiers — the pricing you saw is the pricing we quote from.",
              "We reply within a day, and you talk to a founder. No commitment.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
