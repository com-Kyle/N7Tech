/**
 * Admin route group: the dashboard for managing every n7technologies product.
 *
 * Today it renders from the same app as the public site; it will move to its
 * own subdomain (admin.n7technologies.org) later. Auth gating is a TODO —
 * for now every /dashboard route is open so you can see the shell.
 *
 * Desktop (lg+): persistent left sidebar + content column inset by lg:pl-64.
 */
import { AdminSidebar } from "@/components/chrome/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <AdminSidebar />
      <div className="lg:pl-64">
        <header className="flex h-16 items-center border-b border-[var(--color-border)] px-6">
          <span className="text-sm text-[var(--color-muted)]">Admin</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
