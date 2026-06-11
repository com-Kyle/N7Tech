import Link from "next/link";
import { PRIMARY_CONTACT, mailtoHref } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-[var(--color-muted)] sm:flex-row sm:justify-between">
        <span className="font-display flex items-baseline gap-1.5">
          <span className="text-chrome text-base font-bold tracking-wide">N7</span>
          <span className="text-[0.6rem] tracking-[0.28em]">TECHNOLOGIES</span>
        </span>

        <nav className="flex items-center gap-6">
          <Link href="/products" className="transition-colors hover:text-[var(--color-fg)]">
            Products
          </Link>
          <Link href="/about" className="transition-colors hover:text-[var(--color-fg)]">
            About
          </Link>
          <a
            href={mailtoHref(PRIMARY_CONTACT.email)}
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            Contact
          </a>
        </nav>

        <span>© {year} N7 Technologies. All rights reserved.</span>
      </div>
    </footer>
  );
}
