import { PRIMARY_CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Terms of Service — N7 Technologies",
  description:
    "The plain-English terms for using the N7 Technologies website — what a quote means, who owns delivered work, and the limits on an informational marketing site.",
};

const EFFECTIVE_DATE = "June 15, 2026";

export default function TermsPage() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[min(620px,90vw)] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(180,60,255,0.85), transparent)" }}
      />
      <div className="relative max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Legal
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Effective date: {EFFECTIVE_DATE}
        </p>
        <div className="brand-rule mt-8 w-full max-w-md" />

        <p className="mt-10 text-base leading-relaxed text-[var(--color-fg)]">
          These terms cover your use of the website at www.n7technologies.org,
          operated by{" "}
          <strong className="font-semibold">Neural Zenith Technologies LLC</strong>{" "}
          (&ldquo;N7 Technologies,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). This
          site is a marketing site: it tells you about our website- and
          app-building services and our products, and it gives you a way to reach
          us. By using it, you agree to what&rsquo;s below. We&rsquo;ve kept it
          short and readable on purpose.
        </p>

        <div className="mt-12 space-y-12">
          {/* Acceptable use */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Using the site
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Use the site for what it&rsquo;s for: learning about what we do and
              getting in touch. Don&rsquo;t try to break it, scrape it at a scale
              that strains it, abuse the contact form to send spam or malicious
              content, or use it to do anything illegal. There are no user
              accounts on this public site, so most of this comes down to common
              sense and good faith.
            </p>
          </div>

          {/* Quotes are estimates */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Quotes and prices are estimates, not contracts
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Any price, range, or quote you see on this site — or that we send
              back after you fill out the form — is a good-faith estimate to help
              you plan. It is not a binding offer and it doesn&rsquo;t create a
              contract on its own. A real engagement only begins when we both
              agree to a separate written agreement with its own scope, price, and
              terms. Until then, nothing here obligates either of us.
            </p>
          </div>

          {/* IP / ownership */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Ownership of the site, and of work we deliver
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              The content, branding, and code of this website belong to N7
              Technologies. Please don&rsquo;t copy or reuse it as your own.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Ownership of work we actually build for you — a website, an app, or
              other deliverables — is handled in the written agreement for that
              specific engagement, not here. Who owns what, and when it transfers,
              lives in that contract. This page doesn&rsquo;t grant you any rights
              to delivered work, and it doesn&rsquo;t take any away.
            </p>
          </div>

          {/* No warranty */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              No warranty on the site
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              This site is informational, and we provide it &ldquo;as is.&rdquo; We
              work to keep it accurate and available, but we don&rsquo;t promise
              it&rsquo;s error-free, always online, or that every detail is current
              at the moment you read it. Product availability changes — for
              example, ContractorPod is live today while MealPod and BudgetPod are
              still on the way. Don&rsquo;t treat anything here as a guarantee;
              when it matters, ask us directly.
            </p>
          </div>

          {/* Limitation of liability */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Limitation of liability
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              To the fullest extent the law allows, N7 Technologies isn&rsquo;t
              liable for indirect, incidental, or consequential damages arising
              from your use of this informational website. Anything about paid work
              we do for you is governed by that engagement&rsquo;s own agreement,
              which controls over this page where the two overlap.
            </p>
          </div>

          {/* Governing law */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Governing law
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              These terms are governed by the laws of the State of Delaware,
              USA, where Neural Zenith Technologies LLC is organized, and any
              disputes will be resolved in the state or federal courts located
              in Delaware.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)]">
              {/* TODO before launch: add the registered mailing address. */}
              <span className="italic">[Mailing address — to be added.]</span>
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Changes to these terms
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              We may update these terms as the business grows. When we do,
              we&rsquo;ll update this page and move the effective date at the top.
              Continuing to use the site after a change means you accept the
              updated terms.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Questions about these terms go to a real person. Email{" "}
              <a
                href={`mailto:${PRIMARY_CONTACT.email}?subject=${encodeURIComponent(
                  "Terms question — N7 Technologies",
                )}`}
                className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-brand)] underline-offset-4 transition-colors hover:text-[var(--color-brand)]"
              >
                {PRIMARY_CONTACT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
