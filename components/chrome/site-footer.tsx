export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-[var(--color-muted)] sm:flex-row">
        <span className="font-display flex items-baseline gap-1.5">
          <span className="text-chrome text-base font-bold tracking-wide">N7</span>
          <span className="text-[0.6rem] tracking-[0.28em]">TECHNOLOGIES</span>
        </span>
        <span>© {year} N7 Technologies. All rights reserved.</span>
      </div>
    </footer>
  );
}
