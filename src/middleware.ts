import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Define only public paths
  const publicPaths = ["/","/login", "/signup", "/verifyemail", ];
  const isPublicPath = publicPaths.includes(pathname);

  const token = request.cookies.get("token")?.value;

  // If logged in and trying to access public page → redirect home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If NOT logged in and trying to access protected page → login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    // Match everything EXCEPT the excluded paths
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif)$).*)",
  ],
};
