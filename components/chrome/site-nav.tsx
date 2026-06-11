import Link from "next/link";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          n7<span className="text-[var(--color-brand)]">technologies</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm text-[var(--color-muted)]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-[var(--color-fg)]">
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-md bg-[var(--color-brand)] px-3 py-1.5 font-medium text-[var(--color-brand-fg)] transition-opacity hover:opacity-90"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
