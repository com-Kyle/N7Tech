export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">About N7 Technologies</h1>
      <p className="mt-6 text-lg text-[var(--color-muted)]">
        N7 Technologies is a software studio building a portfolio of focused
        products — each one purpose-built for a specific job, and every one of
        them run from a single platform.
      </p>

      <h2 className="mt-16 font-display text-2xl font-bold tracking-tight">What we build</h2>
      <p className="mt-4 text-[var(--color-muted)]">
        Most software gets wider every year and worse for it. We go the other
        way: we build products that do one thing exceptionally, then put them on
        shared rails so they ship faster, stay consistent, and improve together.
        Two of those rails are public today — N7 Core, the platform every
        product runs on, and N7 Admin, the one dashboard that operates them all.
      </p>

      <h2 className="mt-16 font-display text-2xl font-bold tracking-tight">How we work</h2>
      <p className="mt-4 text-[var(--color-muted)]">
        Common foundation, specialized surface. Authentication, billing, data,
        and operations live once in the platform; each product layers its own
        experience on top. That means a fix in the core lifts every product, and
        a new product starts from a running system instead of a blank page —
        small surface, deep capability, nothing bolted on after the fact.
      </p>

      <h2 className="mt-16 font-display text-2xl font-bold tracking-tight">Why it matters</h2>
      <p className="mt-4 text-[var(--color-muted)]">
        A studio that shares its foundation moves faster than the sum of its
        products. We would rather ship a handful of tools people genuinely rely
        on than a sprawl of features nobody asked for — and build them on
        infrastructure solid enough to carry the next one.
      </p>
    </section>
  );
}
