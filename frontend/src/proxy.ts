import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 🔹 1️⃣ Skip public assets so images work
  if (pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|gif)$/)) {
    return NextResponse.next();
  }

  // 🔹 2️⃣ Admin route handling
  if (pathname === "/admin") {
    // Redirect admin root to dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (pathname === "/admin/dashboard") {
    // Allow dashboard to render
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !token) {
    // Not logged in → block admin routes
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && pathname.startsWith("/admin")) {
    // Unknown admin route → redirect to dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 🔹 3️⃣ Public route handling for logged-in users
  if (token) {
    if (pathname === "/" || pathname === "/login") {
      // Redirect home or login to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (
      !pathname.startsWith("/admin") &&
      pathname !== "/" &&
      pathname !== "/login"
    ) {
      // Unknown public route → redirect to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // ❌ 4️⃣ Not logged-in users → allow normal 404
  return NextResponse.next();
}

// 🔹 Middleware matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// export const config = {
//   matcher: [
//     "/((?!_next/static|favicon.ico).*)", // exclude static files
//   ],
// };

// export const config = {
//   matcher: ["/:path*"], // match all routes
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const pathname = req.nextUrl.pathname;

//   // 🔒 Not logged in → block admin routes
//   if (pathname.startsWith("/admin") && !token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // 🔒 Logged in → block login page
//   if ((pathname === "/" || pathname === "/login") && token) {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const proxy = (req: NextRequest) => {
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

// export default proxy;
