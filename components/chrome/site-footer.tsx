export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-[var(--color-muted)] sm:flex-row">
        <span className="font-mono">n7technologies</span>
        <span>© {year} n7technologies. All rights reserved.</span>
      </div>
    </footer>
  );
}
