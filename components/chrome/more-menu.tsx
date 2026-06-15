"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/** Items in the More dropdown — the secondary/utility pages that don't earn a
 * top-level nav slot (Products lives here, plus FAQ). The legal pages stay in
 * the footer. */
const MORE_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
];

/**
 * "More" nav dropdown — same click-toggle island as ServicesMenu (NOT hover, so
 * it works on touch/trackpad). Closes on outside-click + Escape, reports state
 * via aria-expanded. Own "use client" island so SiteNav stays a server
 * component.
 */
export function MoreMenu() {
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
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 text-black transition-colors hover:text-black/70"
      >
        More
        <ChevronDown
          size={18}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="More"
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
        >
          <div className="min-w-[12rem] rounded-lg border border-white/10 bg-[var(--color-surface)] p-2 text-base font-bold shadow-xl ring-1 ring-white/10">
            {MORE_LINKS.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-white transition-colors hover:bg-[#e00008] hover:text-white"
              >
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
