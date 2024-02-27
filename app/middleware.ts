// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (
    authHeader &&
    authHeader.startsWith("Bearer ") &&
    process.env.JWT_SECRET
  ) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect("/login");
    }
  } else {
    return NextResponse.redirect("/login");
  }
  return NextResponse.next();
}
// Run the middleware only on the /dashboard path
// export const config = {
//   matcher: "/",
// };
