/**
 * Single source of truth for how to reach N7 Technologies.
 * Every contact button / mailto on the public site reads from here so the
 * address lives in exactly one place.
 */

export type Contact = {
  /** Founder name — who the buyer is actually reaching. */
  name: string;
  /** One-line background / role, so a buyer knows who's on the other end. */
  role: string;
  /** Short label shown above the address (e.g. "Primary contact"). */
  label: string;
  email: string;
  /** When true, render with the brand-red emphasis (the address to try first). */
  primary?: boolean;
};

/** Primary contact — reached first. */
export const PRIMARY_CONTACT: Contact = {
  name: "Dante Pagan",
  role: "Co-founder — project & supply-chain management, Penn State",
  label: "Primary contact",
  email: "n7dpagan@gmail.com",
  primary: true,
};

/** Secondary contact — sits underneath the primary. */
export const SECONDARY_CONTACT: Contact = {
  name: "Kyle Pierce",
  role: "Co-founder — audio engineering & music production, Full Sail",
  label: "Secondary contact",
  email: "n7kpierce@gmail.com",
};

/** Ordered list — primary first, secondary underneath. */
export const CONTACTS: ReadonlyArray<Contact> = [
  PRIMARY_CONTACT,
  SECONDARY_CONTACT,
];

/**
 * Build a mailto: href with an optional pre-filled subject. Defaults to the
 * primary contact so a bare "Contact us" button always reaches someone.
 */
export function mailtoHref(
  email: string = PRIMARY_CONTACT.email,
  subject = "Hello from n7technologies.org",
): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
