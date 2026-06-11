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
 * page still renders during local frontend-only development. */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: Product[] };
    return data.products ?? [];
  } catch {
    return [];
  }
}
