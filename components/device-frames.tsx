/**
 * Presentational device frames for the charcoal theme — used to showcase real
 * product screenshots on the marketing homepage.
 *
 * Both frames reference their image by STRING src (not a static import) so the
 * page still builds when the screenshot file is absent. A charcoal placeholder
 * interior means a missing image degrades to an empty frame, never a broken
 * icon.
 */
import Image from "next/image";

/**
 * Browser chrome around a landscape (16:10) web screenshot. The top bar carries
 * three traffic-light dots and a muted URL pill.
 */
export function BrowserFrame({
  src,
  url,
  alt,
}: {
  src: string;
  url: string;
  alt: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg ring-1 ring-white/5">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-elevated)] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <span className="max-w-full truncate rounded-md bg-[var(--color-bg)] px-3 py-1 text-xs text-[var(--color-muted)]">
            {url}
          </span>
        </div>
        {/* Spacer to keep the URL pill optically centered. */}
        <div className="w-12" aria-hidden />
      </div>
      {/* Screenshot — charcoal placeholder shows if the image is absent. */}
      <div className="relative aspect-[16/10] w-full bg-[var(--color-bg)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Phone bezel around a portrait (9:19.5) app screenshot. Kept tasteful in size
 * (capped width) so it doesn't dominate the row.
 */
export function PhoneFrame({
  src,
  alt,
  className = "mx-auto w-full max-w-[260px]",
}: {
  src: string;
  alt: string;
  /** Override the outer wrapper — used to scale/position a stacked phone. */
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative rounded-[2.5rem] border border-[var(--color-border)] bg-[#0e1119] p-2.5 shadow-lg ring-1 ring-white/10">
        {/* Notch / camera dot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-2.5 z-10 flex h-5 -translate-x-1/2 items-center justify-center"
        >
          <span className="h-1.5 w-16 rounded-full bg-black/60 ring-1 ring-white/5" />
        </div>
        {/* Screen — charcoal placeholder shows if the image is absent. */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-[var(--color-bg)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="260px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
