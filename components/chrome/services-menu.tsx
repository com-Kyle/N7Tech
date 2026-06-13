"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/** Items in the Services dropdown. */
const SERVICE_LINKS = [
  { href: "/website-services", label: "Website Services" },
  { href: "/app-services", label: "App Services" },
  { href: "/deploypod", label: "DeployPod" },
];

/**
 * Services nav dropdown — click/tap toggle (NOT hover).
 *
 * Hover-only CSS dropdowns flash-then-vanish on touch/trackpad because a tap
 * fires a transient synthetic :hover that clears on click. This is an explicit
 * click-toggle: works identically on mouse, touch, and keyboard, closes on
 * outside-click + Escape, and reports state via aria-expanded.
 *
 * Isolated as its own "use client" island so SiteNav stays a server component.
 */
export function ServicesMenu() {
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
        className="flex items-center gap-1 text-black/85 transition-colors hover:text-black"
      >
        Services
        <ChevronDown
          size={18}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Services"
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
        >
          <div className="min-w-[13rem] rounded-lg border border-white/10 bg-[var(--color-surface)] p-2 text-base font-bold shadow-xl ring-1 ring-white/10">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-white transition-colors hover:bg-[#e00008] hover:text-white"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
