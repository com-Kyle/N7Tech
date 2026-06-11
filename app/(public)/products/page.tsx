import { getProducts } from "@/lib/api";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Products</h1>
      <p className="mt-4 max-w-xl text-[var(--color-muted)]">
        Everything we’re building, all managed from one dashboard.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center text-[var(--color-muted)]">
          No published products yet. Start the Go backend (it seeds two demo
          products) and refresh.
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-chrome text-xl font-bold tracking-wide">{p.name}</h2>
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs uppercase tracking-wide text-[var(--color-brand)]">
                  {p.status}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-[var(--color-fg)]">{p.tagline}</p>
              {p.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{p.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
