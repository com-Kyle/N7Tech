/**
 * Public route group: the apex marketing site (www.n7technologies.org).
 * Wraps every public page in the shared nav + footer chrome.
 *
 * The admin dashboard lives in the (admin) route group and will move to its
 * own subdomain (admin.n7technologies.org) later — for now both render from
 * this one Next.js app.
 */
import { SiteNav } from "@/components/chrome/site-nav";
import { SiteFooter } from "@/components/chrome/site-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
