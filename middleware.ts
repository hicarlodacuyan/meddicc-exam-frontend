import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function isAuthRoute(pathname: string): boolean {
  return ["/login", "/register"].includes(pathname);
}

function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith("/dashboard");
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("accessToken"));
  const pathname = request.nextUrl.pathname;

  // Redirect to dashboard if logged in and accessing auth routes
  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to login if not logged in and accessing protected routes
  if (!isLoggedIn && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
