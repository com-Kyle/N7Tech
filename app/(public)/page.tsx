import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Red glow behind the mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.55), transparent)" }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center">
          <Image
            src="/brand/n7-technologies.jpg"
            alt="N7 Technologies"
            width={1320}
            height={1245}
            priority
            className="h-auto w-[260px] sm:w-[340px]"
          />

          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Building the next generation of software.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-muted)]">
            A studio engineering focused products — each one managed from a
            single command center.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] transition-shadow hover:shadow-[0_0_22px_-2px_rgba(225,29,39,0.75)]"
            >
              See our products <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[var(--color-border)] px-5 py-3 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-brand)]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Product strip */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="font-display mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Products
        </h2>
        {products.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)]">
            Products launching soon.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-brand)]"
              >
                <div className="font-display text-chrome text-sm font-bold tracking-wide">
                  {p.name}
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{p.tagline}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
