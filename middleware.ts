// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLogin, verifyToken } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoggedIn = await isLogin();
    if (isLoggedIn) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/api")) {
    const isPublicEndpoint =
      pathname.includes("/login") || pathname.includes("/register");

    if (isPublicEndpoint) {
      return NextResponse.next();
    }

    const token = await verifyToken();
    if (token) {
      return NextResponse.next();
    } else {
      return Response.json(
        { message: "authentication failed" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
