import Link from "next/link";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-chrome font-display text-xl font-bold tracking-wide">
            N7
          </span>
          <span className="font-display text-[0.62rem] font-medium tracking-[0.3em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-fg)]">
            TECHNOLOGIES
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-sm text-[var(--color-muted)]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden transition-colors hover:text-[var(--color-fg)] sm:block"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-md bg-[var(--color-brand)] px-3.5 py-1.5 font-medium text-[var(--color-brand-fg)] shadow-[0_0_0_0_rgba(225,29,39,0)] transition-shadow hover:shadow-[0_0_18px_-2px_rgba(225,29,39,0.7)]"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
