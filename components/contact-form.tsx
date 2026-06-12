"use client";

/**
 * The public lead-capture form — replaces the mailto: leak. Posts to the Go
 * backend via `submitLead`. Each placement passes a `source` so leads are
 * tagged by origin ("contact" | "website-services" | ...).
 *
 * COLD-START UX (mandatory): the Go backend is on Render free tier and wakes in
 * ~30s. On submit we show "Sending…", after 8s swap to a "waking up" reassurance,
 * and hard-timeout at 35s into a graceful error that offers the mailto fallback.
 */
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/api";
import { mailtoHref, PRIMARY_CONTACT } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

/** After this long mid-submit, reassure the user the server is waking up. */
const WAKING_MS = 8_000;
/** Hard ceiling — abort the request and fall back to email after this. */
const TIMEOUT_MS = 35_000;

const fieldClass =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] shadow-sm outline-none ring-1 ring-white/5 transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:ring-[var(--color-brand)]/30";

const labelClass =
  "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]";

export function ContactForm({ source }: { source: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [waking, setWaking] = useState(false);

  // In-flight async resources, held in refs so a single cleanup path covers the
  // success, error, AND unmount cases — no post-unmount state updates.
  const wakingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  /** Clear both timers (idempotent). Called on every completion + on unmount. */
  function clearTimers() {
    if (wakingTimer.current) clearTimeout(wakingTimer.current);
    if (hardTimer.current) clearTimeout(hardTimer.current);
    wakingTimer.current = null;
    hardTimer.current = null;
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      // Unmount: stop timers and abort the in-flight request so no setState
      // fires on an unmounted component.
      mountedRef.current = false;
      clearTimers();
      controllerRef.current?.abort();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const input = {
      name: (data.get("name") as string)?.trim() || undefined,
      email: (data.get("email") as string)?.trim() ?? "",
      company: (data.get("company") as string)?.trim() || undefined,
      message: (data.get("message") as string)?.trim() || undefined,
      source,
      website: (data.get("website") as string) || undefined, // honeypot
    };

    setStatus("submitting");
    setWaking(false);

    const controller = new AbortController();
    controllerRef.current = controller;
    wakingTimer.current = setTimeout(() => {
      if (mountedRef.current) setWaking(true);
    }, WAKING_MS);
    hardTimer.current = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      await submitLead(input, controller.signal);
      if (!mountedRef.current) return;
      setStatus("success");
      form.reset();
    } catch {
      if (!mountedRef.current) return;
      setStatus("error");
    } finally {
      clearTimers();
      controllerRef.current = null;
      if (mountedRef.current) setWaking(false);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.05] p-8 text-center ring-1 ring-white/5"
      >
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)]">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="font-display mt-4 text-xl font-bold tracking-tight">
          Got it — we&rsquo;ll reply within a day.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Thanks for reaching out. Your message is on its way to a founder.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={submitting}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="text-[var(--color-brand)]">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={submitting}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className={labelClass}>
          Company
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          disabled={submitting}
          className={fieldClass}
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          disabled={submitting}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us what you need."
        />
      </div>

      {/* Honeypot — hidden from humans, bots fill it and the backend drops them. */}
      <div aria-hidden className="hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[var(--color-brand-strong)]">
          Something went wrong sending that. Please{" "}
          <a
            href={mailtoHref(PRIMARY_CONTACT.email)}
            className="font-medium underline underline-offset-2 hover:text-[var(--color-brand)]"
          >
            email us directly
          </a>{" "}
          and we&rsquo;ll pick it up.
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--color-brand)] px-5 py-3 font-medium text-[var(--color-brand-fg)] shadow-sm transition-colors hover:bg-[var(--color-brand-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              {waking ? "Still sending — waking up ⏳" : "Sending…"}
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
