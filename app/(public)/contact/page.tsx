export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-[var(--color-muted)]">
        Want to work with us or learn more? Reach out.
      </p>
      <a
        href="mailto:hello@n7technologies.org"
        className="mt-8 inline-block rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] transition-opacity hover:opacity-90"
      >
        hello@n7technologies.org
      </a>
    </section>
  );
}
