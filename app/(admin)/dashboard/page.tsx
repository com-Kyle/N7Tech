import { getProducts } from "@/lib/api";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const products = await getProducts();

  const stats = [
    { label: "Products", value: products.length },
    { label: "Live", value: products.filter((p) => p.status === "live").length },
    { label: "Published", value: products.filter((p) => p.published).length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Overview of every product across N7 Technologies.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <div className="font-display text-3xl font-bold text-[var(--color-brand)]">{s.value}</div>
            <div className="mt-1 text-sm text-[var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] px-6 py-4 text-sm font-semibold">
          Products
        </div>
        {products.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--color-muted)]">
            No products. Start the Go backend to seed demo data.
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {products.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-[var(--color-muted)]">{p.tagline}</div>
                </div>
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
