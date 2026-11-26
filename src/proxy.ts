import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canAccessPath, homeForRole } from "@/lib/routing";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic =
    pathname === "/" ||
    pathname === "/help" ||
    pathname === "/atlas" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/api/health";

  if (isPublic) {
    return NextResponse.next();
  }

  const session = req.auth;
  if (!session?.user) {
    const url = new URL("/", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const activeRole = session.user.activeRole;

  if (pathname !== "/role" && !activeRole) {
    return NextResponse.redirect(new URL("/role", req.nextUrl.origin));
  }

  if (!canAccessPath(pathname, activeRole)) {
    return NextResponse.redirect(
      new URL(homeForRole(activeRole), req.nextUrl.origin),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
