/**
 * Edge middleware — HTTP Basic auth gate on the (admin) dashboard.
 *
 * Runs on Cloudflare Workers via OpenNext, so it must stay Edge-compatible:
 * no Node APIs, use `atob` for base64 decoding.
 *
 * Credentials come from the `ADMIN_BASIC_AUTH` env var (format `user:pass`).
 * - Unset in dev (NODE_ENV !== "production"): allow through so local dev isn't
 *   blocked.
 * - Production with it unset, or a bad/missing Authorization header: 401 with
 *   a `WWW-Authenticate: Basic` challenge.
 *
 * Interim measure — a real session login is a Tier-1 follow-up.
 */
import { NextResponse, type NextRequest } from "next/server";

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="N7 Admin", charset="UTF-8"',
    },
  });
}

export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_BASIC_AUTH;
  const isProd = process.env.NODE_ENV === "production";

  // Dev convenience: no credential configured outside prod → let it through.
  if (!expected) {
    return isProd ? unauthorized() : NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  return decoded === expected ? NextResponse.next() : unauthorized();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
