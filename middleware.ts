// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLogin } from "./utils/auth";

export function middleware(request: NextRequest) {
  if (isLogin()) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin"],
};
