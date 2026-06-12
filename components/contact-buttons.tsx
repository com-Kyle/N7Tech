/**
 * Shared contact UI. The two-contact stack (primary, with the secondary
 * underneath) and the single "Contact us" CTA both live here so every page
 * reaches the same addresses from `lib/contact.ts`.
 *
 * As of Tier 0, the default `ContactButton` routes to the lead form
 * (`/contact#form`) instead of opening a `mailto:` — that single change makes
 * the homepage + service-page CTAs funnel into the captured form for free.
 * Pass `mailtoFallback` to render the raw-email behaviour (used for the
 * "or email us directly" rows beneath the form on /contact).
 */
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { CONTACTS, PRIMARY_CONTACT, mailtoHref, type Contact } from "@/lib/contact";

/** One email row, rendered as a full mailto button. */
function ContactRow({ contact, subject }: { contact: Contact; subject?: string }) {
  return (
    <a
      href={mailtoHref(contact.email, subject)}
      className={[
        "group flex items-center justify-between gap-4 rounded-lg border px-5 py-4 shadow-sm ring-1 ring-white/5 transition-all hover:-translate-y-0.5 hover:shadow-md",
        contact.primary
          ? "border-[var(--color-brand)]/50 bg-[var(--color-brand)]/[0.05] hover:border-[var(--color-brand)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        <Mail
          size={18}
          className={contact.primary ? "text-[var(--color-brand)]" : "text-[var(--color-muted)]"}
          aria-hidden
        />
        <span className="flex flex-col">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {contact.label}
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-[var(--color-fg)]">
            {contact.name}
          </span>
          <span className="mt-0.5 text-sm text-[var(--color-muted)]">
            {contact.email}
          </span>
        </span>
      </span>
      <ArrowRight
        size={16}
        className="text-[var(--color-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-fg)]"
        aria-hidden
      />
    </a>
  );
}

/**
 * The two-contact stack: primary first, secondary underneath — exactly the
 * ordering in `CONTACTS`.
 */
export function ContactStack({ subject }: { subject?: string }) {
  return (
    <div className="flex flex-col gap-3">
      {CONTACTS.map((c) => (
        <ContactRow key={c.email} contact={c} subject={subject} />
      ))}
    </div>
  );
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]";

/**
 * A single brand "Contact us" button.
 *
 * Default: routes to the lead form at `/contact#form` so the conversion is
 * captured. The `subject` is forwarded as `?subject=` so the form context is
 * preserved when we want it later; it's harmless on the anchor.
 *
 * `mailtoFallback`: render the legacy `mailto:` behaviour instead — used where
 * a raw-email CTA is explicitly wanted as a fallback.
 */
export function ContactButton({
  label = "Contact us",
  subject,
  className = "",
  mailtoFallback = false,
}: {
  label?: string;
  subject?: string;
  className?: string;
  mailtoFallback?: boolean;
}) {
  if (mailtoFallback) {
    return (
      <a href={mailtoHref(PRIMARY_CONTACT.email, subject)} className={[buttonClass, className].join(" ")}>
        <Mail size={16} aria-hidden />
        {label}
      </a>
    );
  }

  const href = subject ? `/contact?subject=${encodeURIComponent(subject)}#form` : "/contact#form";
  return (
    <Link href={href} className={[buttonClass, className].join(" ")}>
      <Mail size={16} aria-hidden />
      {label}
    </Link>
  );
}
