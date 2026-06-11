import { ContactStack } from "@/components/contact-buttons";

export const metadata = {
  title: "Contact — N7 Technologies",
  description:
    "Reach N7 Technologies about ContractorPod, early access to MealPod or BudgetPod, partnerships, or press.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        We read every message that lands here. Whether you want to use
        ContractorPod, get early access to MealPod or BudgetPod, partner on a
        product, or just understand what we&rsquo;re building — start with a line
        and we&rsquo;ll take it from there.
      </p>
      <div className="brand-rule mt-8 w-full max-w-md" />

      <div className="mt-12">
        <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Reach a founder
        </p>
        <ContactStack subject="Hello from n7technologies.org" />
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          Try the primary contact first; the second founder is there as backup.
          Product partnerships, early access, press — anything on your mind.
        </p>
      </div>
    </section>
  );
}
