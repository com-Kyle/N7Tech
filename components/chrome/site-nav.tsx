import Link from "next/link";
import { ChevronDown } from "lucide-react";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Items in the Services hover dropdown. */
const SERVICE_LINKS = [
  { href: "/website-services", label: "Website Services" },
  { href: "/app-services", label: "App Services" },
  { href: "/deploypod", label: "DeployPod" },
];

const linkClass =
  "transition-colors hover:text-[var(--color-brand)]";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[#222a3a]/80 backdrop-blur">
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
          {/* Products */}
          <Link href="/products" className={`hidden ${linkClass} sm:block`}>
            Products
          </Link>

          {/* Services — CSS hover dropdown (no client JS) */}
          <div className="group relative hidden sm:block">
            <button
              type="button"
              className={`flex items-center gap-1 ${linkClass} group-hover:text-[var(--color-brand)]`}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                size={14}
                aria-hidden
                className="transition-transform group-hover:rotate-180"
              />
            </button>
            {/* Panel — appears on hover. The pt-3 keeps the hover bridge so the
                panel doesn't close in the gap below the trigger. */}
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
              <div className="min-w-[12rem] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-lg ring-1 ring-white/5">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block rounded-md px-3 py-2 text-[var(--color-fg)] transition-colors hover:bg-[var(--color-elevated)] hover:text-[var(--color-brand)]"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* About + Contact */}
          {LINKS.filter((l) => l.href !== "/products").map((l) => (
            <Link key={l.href} href={l.href} className={`hidden ${linkClass} sm:block`}>
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
