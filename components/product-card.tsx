/**
 * Marketing product card for the curated `PODS` catalog. Live pods link out;
 * coming-soon pods render as a non-interactive tile with a soft accent glow.
 */
import { ArrowUpRight } from "lucide-react";
import { STATUS_LABEL, type Pod } from "@/lib/products";

function StatusBadge({ pod }: { pod: Pod }) {
  const available = pod.status === "available";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
        available
          ? "border-[var(--color-brand)]/50 text-[var(--color-fg)]"
          : "border-[var(--color-border)] text-[var(--color-muted)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: available ? pod.accent : "var(--color-muted)" }}
      />
      {STATUS_LABEL[pod.status]}
    </span>
  );
}

export function ProductCard({ pod }: { pod: Pod }) {
  const available = pod.status === "available";

  const inner = (
    <>
      {/* Per-pod accent glow, kept whisper-subtle against the white card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.14]"
        style={{ background: pod.accent }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-chrome text-xl font-bold tracking-wide">
            {pod.name}
          </h3>
          <StatusBadge pod={pod} />
        </div>
        <p className="mt-3 text-sm font-medium text-[var(--color-fg)]">{pod.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {pod.description}
        </p>
        {available && pod.href && (
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] transition-colors group-hover:underline">
            Visit ContractorPod <ArrowUpRight size={15} aria-hidden />
          </span>
        )}
      </div>
    </>
  );

  const base =
    "group relative overflow-hidden rounded-lg border bg-[var(--color-surface)] p-6 shadow-sm transition-all";

  if (available && pod.href) {
    return (
      <a
        href={pod.href}
        target="_blank"
        rel="noreferrer"
        className={`${base} border-[var(--color-brand)]/40 hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-md`}
      >
        {inner}
      </a>
    );
  }

  return <div className={`${base} border-[var(--color-border)]`}>{inner}</div>;
}
