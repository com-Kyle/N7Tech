import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-brand)]">
          n7technologies
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Building the next generation of software.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-muted)]">
          A studio shipping focused products — each one managed from a single
          admin dashboard.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] transition-opacity hover:opacity-90"
          >
            See our products <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-muted)]"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Product strip */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Products
        </h2>
        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center text-[var(--color-muted)]">
            No products yet — start the backend and they’ll appear here.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-brand)]"
              >
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{p.tagline}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
