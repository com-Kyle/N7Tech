import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ContactButton } from "@/components/contact-buttons";
import { PODS } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Very subtle red tint wash behind the mark — clean, not muddy. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(225,29,39,0.9), transparent)" }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center">
          <div className="rounded-2xl bg-[#0b0b0f] p-3 shadow-lg ring-1 ring-black/5 sm:p-4">
            <Image
              src="/brand/n7-technologies.jpg"
              alt="N7 Technologies"
              width={1320}
              height={1245}
              priority
              className="h-auto w-[260px] sm:w-[340px]"
            />
          </div>

          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Small, sharp AI pods for everyday people.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-muted)]">
            A studio shipping focused AI products — one job, one audience, one
            polished interface. ContractorPod is live today; MealPod and
            BudgetPod are next.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
            >
              See our products <ArrowRight size={16} aria-hidden />
            </Link>
            <ContactButton label="Get in touch" />
          </div>
        </div>
      </section>

      {/* Product strip */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Products
          </h2>
          <Link
            href="/products"
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PODS.map((pod) => (
            <ProductCard key={pod.slug} pod={pod} />
          ))}
        </div>
      </section>
    </>
  );
}
