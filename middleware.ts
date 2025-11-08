import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest)=>{
    const token = req.cookies.get("access_token")?.value;
    console.log("token",token)
     // Protected routes
  const protectedRoutes = ["/dashboard", "/documents", "/profile"];

  const currentPath = req.nextUrl.pathname;

  // Check if the route is protected and token is missing
  const isProtected = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtected && !token) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();

}


export const config = {
  matcher: ["/dashboard/:path*", "/documents/:path*", "/profile/:path*"],
};