export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">
        We read every message that lands here. Whether you want to partner on a
        product, explore working together, or just understand what we are
        building and why — start with a line and we will take it from there.
      </p>
      <div className="brand-rule mt-8 w-full max-w-md" />

      <div className="mt-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <p className="text-[var(--color-muted)]">
          Reach out about product partnerships, early access, press, or anything
          else on your mind.
        </p>
        <a
          href="mailto:hello@n7technologies.org"
          className="mt-8 inline-block rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] transition-opacity hover:opacity-90"
        >
          hello@n7technologies.org
        </a>
      </div>
    </section>
  );
}
