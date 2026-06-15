import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ContactButton } from "@/components/contact-buttons";
import { PODS, ENGINE } from "@/lib/products";

export const metadata = {
  title: "Products — N7 Technologies",
  description:
    "The N7 Technologies product family. ContractorPod is available now; MealPod and BudgetPod are coming soon. Every pod runs on the DeployPod AI engine.",
};

export default function ProductsPage() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:px-8">
      {/* Neon-purple bloom wash — matches the home + about hero device on charcoal. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(180,60,255,0.85), transparent)" }}
      />
      <h1 className="font-display relative text-4xl font-bold tracking-tight sm:text-5xl">
        Products
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
        Small, sharp AI pods — each one solving a single job for a single
        audience. ContractorPod is live today. MealPod and BudgetPod are on the
        way.
      </p>
      <div className="brand-rule mt-8 w-full max-w-md" />

      <h2 className="font-sans mb-8 mt-14 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
        The pod family
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PODS.map((pod) => (
          <ProductCard key={pod.slug} pod={pod} />
        ))}
      </div>

      {/* The engine — DeployPod is infrastructure, not a consumer pod. */}
      <h2 className="font-sans mb-8 mt-20 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
        The engine underneath
      </h2>
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm ring-1 ring-white/5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: ENGINE.accent }}
        />
        <div className="relative max-w-2xl">
          <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-fg)]">
            {ENGINE.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-[var(--color-fg)]">
            {ENGINE.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {ENGINE.description}
          </p>
          <Link
            href={ENGINE.page}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] transition-colors hover:underline"
          >
            Learn more about DeployPod <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-sm ring-1 ring-white/5">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Want early access to a pod?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">
          ContractorPod is taking contractors now. Want first access to MealPod
          or BudgetPod when they ship? Send us a line.
        </p>
        <div className="mt-8 flex justify-center">
          <ContactButton label="Get in touch" subject="Early access — N7 products" />
        </div>
      </div>
    </section>
  );
}
