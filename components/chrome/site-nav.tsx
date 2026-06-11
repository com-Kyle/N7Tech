import Link from "next/link";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[#1b2130]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-chrome font-display text-xl font-bold tracking-wide">
            N7
          </span>
          <span className="font-display text-[0.7rem] font-medium tracking-[0.28em] text-[var(--color-fg)]/70 transition-colors group-hover:text-[var(--color-fg)]">
            TECHNOLOGIES
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-sm text-[var(--color-muted)]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden transition-colors hover:text-[var(--color-brand)] sm:block"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 font-medium text-[var(--color-fg)] shadow-sm transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
