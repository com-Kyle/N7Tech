import Link from "next/link";
import { ServicesMenu } from "./services-menu";
import { MobileNav } from "./mobile-nav";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "text-black/75 transition-colors hover:text-black";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#9e0006] bg-[#e00008]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold tracking-wide text-black">
            N7
          </span>
          <span className="font-display text-lg font-extrabold tracking-[0.28em] text-black/75 transition-colors group-hover:text-black">
            TECHNOLOGIES
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-xl font-extrabold text-black/85">
          {/* Products */}
          <Link href="/products" className={`hidden ${linkClass} sm:block`}>
            Products
          </Link>

          {/* Services — click-toggle dropdown (own client island) */}
          <ServicesMenu />

          {/* About + Contact — the admin door is intentionally not in the
              public nav; reach the dashboard directly at /dashboard. */}
          {LINKS.filter((l) => l.href !== "/products").map((l) => (
            <Link key={l.href} href={l.href} className={`hidden ${linkClass} sm:block`}>
              {l.label}
            </Link>
          ))}

          {/* Mobile hamburger — only renders below sm (own client island) */}
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
