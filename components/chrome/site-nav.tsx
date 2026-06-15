import Link from "next/link";
import { ServicesMenu } from "./services-menu";
import { MoreMenu } from "./more-menu";
import { MobileNav } from "./mobile-nav";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "text-black transition-colors hover:text-black/70";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#9e0006] bg-[#e00008]">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:h-28 sm:px-8">
        {/* Neural Zenith Technologies LLC — CSS wordmark lockup (.nz-* in
            globals.css), built from the brand banner art instead of a PNG.
            Mirrored verbatim in the n7-home-shell Worker so dev == prod. */}
        <Link
          href="/"
          aria-label="Neural Zenith Technologies LLC — home"
          className="flex shrink-0 items-center"
        >
          <span className="nz-lockup" aria-hidden>
            <span className="nz-panel">
              <span className="nz-title">
                <span className="nz-neural">NEURAL</span>
                <span className="nz-zenith">ZENITH</span>
              </span>
              <span className="nz-divider">
                <span className="nz-rule" />
                <span className="nz-dot" />
                <span className="nz-rule" />
              </span>
              <span className="nz-sub">TECHNOLOGIES</span>
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-xl font-extrabold text-black">
          {/* Services — click-toggle dropdown (own client island) */}
          <ServicesMenu />

          {/* About + Contact — the admin door is intentionally not in the
              public nav; reach the dashboard directly at /dashboard. */}
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`hidden ${linkClass} sm:block`}>
              {l.label}
            </Link>
          ))}

          {/* More — Products + FAQ, click-toggle dropdown (own client island) */}
          <MoreMenu />

          {/* Get a quote — the persistent conversion CTA. Black on the red bar
              so it reads as the one focal action (a red button would vanish). */}
          <Link
            href="/quote"
            className="hidden rounded-md bg-black px-4 py-2.5 text-base text-white shadow-sm transition-colors hover:bg-black/80 sm:block"
          >
            Get a quote
          </Link>

          {/* Mobile hamburger — only renders below sm (own client island) */}
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
