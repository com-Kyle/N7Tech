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
      <div className="flex h-16 items-center border-b border-[var(--color-border)] px-6">
        <Link href="/" className="font-mono text-sm font-bold">
          n7<span className="text-[var(--color-brand)]">admin</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-fg)]"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
