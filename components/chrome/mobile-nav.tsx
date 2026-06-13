"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/**
 * Mobile nav — hamburger + full-width dropdown panel, shown only below `sm`
 * (the desktop links in site-nav are `hidden sm:block`, so phones had NO
 * navigation at all before this). Click-toggle, closes on link click +
 * outside-click + Escape. Own "use client" island so SiteNav stays a server
 * component.
 *
 * Links mirror site-nav.tsx (primary) + services-menu.tsx (services). Kept
 * inline rather than shared — the marketing nav is tiny and changes rarely.
 */
const PRIMARY_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/website-services", label: "Website Services" },
  { href: "/app-services", label: "App Services" },
  { href: "/deploypod", label: "DeployPod" },
];

const itemClass =
  "block rounded-md px-3 py-3 text-lg font-bold text-white transition-colors hover:bg-[#e00008]";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-black transition-colors hover:bg-black/10"
      >
        {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Site"
          className="absolute left-0 right-0 top-full z-50 border-b border-[#9e0006] bg-[#11151f] px-6 py-4 shadow-xl"
        >
          <Link
            href="/products"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            Products
          </Link>

          <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Services
          </p>
          {SERVICE_LINKS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              {s.label}
            </Link>
          ))}

          <div className="my-2 border-t border-white/10" />
          {PRIMARY_LINKS.filter((l) => l.href !== "/products").map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
