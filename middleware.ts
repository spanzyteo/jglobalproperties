import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl;

  // Handle admin login protection
  if (pathname === "/admin-login") {
    const key = url.searchParams.get("key");
    if (key !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
    return NextResponse.next();
  }

  // Protect /admin and subroutes
  if (pathname.startsWith("/admin")) {
    const accessToken = request.cookies.get("access_token")?.value;
    const isAuthenticated = request.cookies.get("is_authenticated")?.value;
    const userId = request.cookies.get("user_id")?.value;

    if (!accessToken || !userId || isAuthenticated !== "true") {
      console.log("Authentication failed - redirecting to login");

      // Redirect to admin login with the key
      const notFound = new URL("/not-found", request.url);
      return NextResponse.rewrite(notFound);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
