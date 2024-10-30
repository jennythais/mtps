import { NextResponse } from "next/server";
import { getToken } from "@/utils/token";

export function middleware(req) {
  const token = getToken();
  const { pathname } = req.nextUrl;
  const allowedPaths = ["/forgot-password", "/reset-password"];
  if (!token && pathname !== "/login" && !allowedPaths) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|favicon.ico).*)",
};
