import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Route protection (the "middleware" layer — Next.js 16 calls it proxy).
 * Unauthenticated visitors to /dashboard are redirected to /login.
 */
export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
