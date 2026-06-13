import Link from "next/link";
import Image from "next/image";
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
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6 sm:px-8 md:h-32">
        {/* Brand lockup — the Neural Zenith (N7) chrome wordmark image, top-left.
            Sized to fill most of the bar height; w-auto preserves its ~2.25:1
            ratio so it reads big and wide. Bar height bumped to fit it. */}
        <Link
          href="/"
          aria-label="Neural Zenith Technologies — home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/brand/neural-zenith-banner.png"
            alt="Neural Zenith Technologies (N7)"
            width={1881}
            height={836}
            priority
            className="h-20 w-auto sm:h-24 md:h-28"
          />
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
