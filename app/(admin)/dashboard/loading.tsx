/**
 * Skeleton shown while the dashboard's `await getProducts()` resolves — covers
 * the Render cold-start window (~30s) so the tab shows structure instead of a
 * blank page. Mirrors the real dashboard's layout: heading, 3 stat cards, and
 * a products panel.
 */
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-[var(--color-elevated)] ${className}`} />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Shimmer className="h-7 w-44" />
        <Shimmer className="mt-2 h-4 w-72" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <Shimmer className="h-9 w-12" />
            <Shimmer className="mt-2 h-4 w-20" />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] px-6 py-4">
          <Shimmer className="h-4 w-24" />
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="space-y-2">
                <Shimmer className="h-4 w-40" />
                <Shimmer className="h-3 w-56" />
              </div>
              <Shimmer className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
