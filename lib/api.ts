/**
 * Tiny server-side fetch helper for talking to the Go backend.
 * Set NEXT_PUBLIC_API_BASE_URL to point at the API (defaults to localhost:8080).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  published: boolean;
};

/** Fetch published products. Returns [] if the backend is unreachable so the
 * page still renders during local frontend-only development. The fetch is
 * wrapped in a ~30s AbortController timeout so a sleeping Render backend fails
 * fast to the empty state instead of hanging the dashboard request. */
export async function getProducts(): Promise<Product[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: Product[] };
    return data.products ?? [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/** Input for a public lead submission. `website` is a honeypot — bots fill it,
 * the backend drops the submission. */
export type LeadInput = {
  name?: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
  website?: string;
};

/**
 * Submit a lead to the backend. Caller owns timeout/cold-start UX (see
 * components/contact-form.tsx) and may pass its own AbortSignal. Throws on a
 * non-2xx response.
 */
export async function submitLead(
  input: LeadInput,
  signal?: AbortSignal,
): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal,
  });
  if (!res.ok) throw new Error(`lead submit failed: ${res.status}`);
  return res.json();
}
