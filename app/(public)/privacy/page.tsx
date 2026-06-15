import { PRIMARY_CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Privacy Policy — N7 Technologies",
  description:
    "How N7 Technologies handles the data you share with us — what we collect, why, who touches it, and how to ask us to delete it. Plain English, no surprises.",
};

const EFFECTIVE_DATE = "June 15, 2026";

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <div className="max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Legal
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Effective date: {EFFECTIVE_DATE}
        </p>
        <div className="brand-rule mt-8 w-full max-w-md" />

        <p className="mt-10 text-base leading-relaxed text-[var(--color-fg)]">
          This is the website at www.n7technologies.org, run by{" "}
          <strong className="font-semibold">Neural Zenith Technologies LLC</strong>{" "}
          (&ldquo;N7 Technologies,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). We
          built this site to tell people what we make and to let them reach us.
          That&rsquo;s it. We don&rsquo;t run advertising networks, we don&rsquo;t
          build profiles to sell, and there&rsquo;s no account to log into here.
          This page explains, in plain English, the small amount of data the site
          touches and what we do with it.
        </p>

        <div className="mt-12 space-y-12">
          {/* What we collect */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              What we collect
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              There are exactly two ways this site collects anything about you:
            </p>
            <ul className="mt-5 space-y-5">
              <li className="text-base leading-relaxed text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-fg)]">
                  When you fill out the contact or quote form.
                </span>{" "}
                The form asks for your name, email, the company you&rsquo;re with
                (optional), and a message. You type it, you send it, and it goes to
                our backend so we can read it and reply. We don&rsquo;t collect
                anything you don&rsquo;t hand us.
              </li>
              <li className="text-base leading-relaxed text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-fg)]">
                  Privacy-friendly analytics.
                </span>{" "}
                We use Plausible to count visits and see which pages people read.
                Plausible is cookieless and doesn&rsquo;t track you across other
                sites or build an individual profile of you. It tells us
                aggregate things like &ldquo;the products page got more views this
                week&rdquo; — not who you are.
              </li>
            </ul>
          </div>

          {/* Why we collect it */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Why we collect it, and how we use it
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              We use what you send us to do the obvious thing: read your message
              and write back. If you asked for a quote, we use your details to put
              together an estimate and follow up about it. Analytics help us
              understand which parts of the site are useful so we can make it
              better. We don&rsquo;t use any of it to advertise to you, and we
              don&rsquo;t make automated decisions about you.
            </p>
          </div>

          {/* We don't sell it */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              We don&rsquo;t sell your data
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              We have never sold personal information and we don&rsquo;t intend to.
              We don&rsquo;t rent it, trade it, or hand it to data brokers. The only
              people who see your message are us and the service providers below
              who help us run the site — and they only see it to do their job.
            </p>
          </div>

          {/* Third parties */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Who else touches it (third parties)
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              We keep our list of vendors short on purpose. The ones that may
              process your data are:
            </p>
            <ul className="mt-5 space-y-4">
              {[
                {
                  label: "Our backend host",
                  body: "The server that receives and stores your form submission so we can read it.",
                },
                {
                  label: "Plausible Analytics",
                  body: "Aggregate, cookieless visit analytics — no individual profiles.",
                },
                {
                  label: "Email provider",
                  body: "When we reply to you, your message and our response pass through an email service.",
                },
                {
                  label: "DeployPod (our agent partner)",
                  body: "The independent company that builds and runs the AI agents inside our products. They are not given your marketing-site form submissions as a matter of course; if a future product feature ever routes your data to them, we'll say so plainly.",
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-3 text-base leading-relaxed text-[var(--color-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                  />
                  <span>
                    <span className="font-semibold text-[var(--color-fg)]">
                      {item.label}.
                    </span>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Cookies
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              This site doesn&rsquo;t set tracking or advertising cookies. Our
              analytics are cookieless. If we ever add a cookie that does anything
              beyond keeping the site working, we&rsquo;ll ask first.
            </p>
          </div>

          {/* Data requests */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Your data, and how to ask us about it
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              It&rsquo;s your information. You can ask us what we hold about you,
              ask for a copy, or ask us to delete it — and we&rsquo;ll do it. Since
              the only personal data we hold is whatever you sent through the form,
              this is usually as simple as emailing us and asking. Just write to{" "}
              <a
                href={`mailto:${PRIMARY_CONTACT.email}?subject=${encodeURIComponent(
                  "Privacy request — N7 Technologies",
                )}`}
                className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-brand)] underline-offset-4 transition-colors hover:text-[var(--color-brand)]"
              >
                {PRIMARY_CONTACT.email}
              </a>{" "}
              and tell us what you&rsquo;d like.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Changes to this policy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              If we change how the site handles data, we&rsquo;ll update this page
              and move the effective date at the top. We&rsquo;ll keep it honest
              and readable, the same way it is now.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Any privacy or legal question goes to a real person. Email{" "}
              <a
                href={`mailto:${PRIMARY_CONTACT.email}?subject=${encodeURIComponent(
                  "Privacy question — N7 Technologies",
                )}`}
                className="font-semibold text-[var(--color-fg)] underline decoration-[var(--color-brand)] underline-offset-4 transition-colors hover:text-[var(--color-brand)]"
              >
                {PRIMARY_CONTACT.email}
              </a>
              .
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
              {/* PLACEHOLDER — needs human legal review before launch. */}
              [Governing law / jurisdiction: state to be confirmed.] [Company
              mailing address: to be confirmed.]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
