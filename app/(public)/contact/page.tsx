import { CalendarClock } from "lucide-react";
import { ContactStack } from "@/components/contact-buttons";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact — N7 Technologies",
  description:
    "Reach N7 Technologies about ContractorPod, early access to MealPod or BudgetPod, partnerships, or press.",
};

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left — the ask + the form + the fallback addresses */}
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            We read every message that lands here. Whether you want to use
            ContractorPod, get early access to MealPod or BudgetPod, partner on a
            product, or just understand what we&rsquo;re building — start with a
            line and we&rsquo;ll take it from there.
          </p>
          <div className="brand-rule mt-8 w-full max-w-md" />

          {/* The form — the primary path. */}
          <div id="form" className="mt-10 scroll-mt-24">
            <ContactForm source="contact" />
          </div>

          {BOOKING_URL && (
            <div className="mt-6">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 font-medium text-[var(--color-fg)] shadow-sm transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <CalendarClock size={16} aria-hidden />
                Book a 15-min call
              </a>
            </div>
          )}

          {/* Fallback — the raw addresses, beneath the form. */}
          <div className="mt-12">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Or email us directly
            </p>
            <ContactStack subject="Hello from n7technologies.org" />
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Try the primary contact first; the second founder is there as
              backup. Product partnerships, early access, press — anything on
              your mind.
            </p>
          </div>
        </div>

        {/* Right — what to expect when you reach out */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5 lg:mt-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            What to expect
          </p>
          <ul className="mt-6 space-y-4 text-sm text-[var(--color-fg)]">
            {[
              "Use ContractorPod — get set up or ask how it works.",
              "Early access to MealPod or BudgetPod before they ship.",
              "Partnerships & press — collaborations and media.",
              "We reply to every message, usually within a day or two.",
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
