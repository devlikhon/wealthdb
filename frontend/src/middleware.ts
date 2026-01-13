import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 🔒 Not logged in → block admin routes
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔒 Logged in → block login page
  if ((pathname === "/" || pathname === "/login") && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const middleware = (req: NextRequest) => {
//   const token = req.cookies.get("token")?.value;
//   const url = req.nextUrl.clone();

//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!token) {
//       // redirect to login if no token
//       url.pathname = "/";
//       return NextResponse.redirect(url);
//     }

//     try {
//       // verify JWT server-side
//       jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
//       return NextResponse.next();
//     } catch {
//       // invalid token → redirect
//       url.pathname = "/";
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// export default middleware;
