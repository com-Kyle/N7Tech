import Link from "next/link";
import { LayoutDashboard, Package, Settings, Users } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
      <div className="flex h-16 items-center gap-1.5 border-b border-[var(--color-border)] px-6">
        <Link href="/" className="font-display flex items-baseline gap-1.5">
          <span className="text-chrome text-base font-bold tracking-wide">N7</span>
          <span className="text-[0.6rem] font-medium tracking-[0.28em] text-[var(--color-brand)]">
            ADMIN
          </span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-elevated)] hover:text-[var(--color-fg)]"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
