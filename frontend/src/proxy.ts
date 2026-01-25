import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Skip public assets
  if (pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|gif)$/)) {
    return NextResponse.next();
  }

  // 2️⃣ Admin root redirect
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 3️⃣ Block admin routes if NOT logged in
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4️⃣ Allow ALL admin routes if logged in
  if (token && pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 5️⃣ Logged-in users → restrict public pages
  if (token) {
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (
      !pathname.startsWith("/admin") &&
      pathname !== "/" &&
      pathname !== "/login"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// On dev it's working - start

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const pathname = req.nextUrl.pathname;

//   // 🔹 1️⃣ Skip public assets
//   if (pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|gif)$/)) {
//     return NextResponse.next();
//   }

//   // 🔹 2️⃣ Admin root redirect
//   if (pathname === "/admin") {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//   }

//   // 🔹 3️⃣ Block admin routes if NOT logged in
//   if (pathname.startsWith("/admin") && !token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // 🔹 4️⃣ Allow ALL admin routes if logged in
//   if (token && pathname.startsWith("/admin")) {
//     return NextResponse.next();
//   }

//   // 🔹 5️⃣ Logged-in users → restrict public pages
//   if (token) {
//     if (pathname === "/" || pathname === "/login") {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     }

//     if (
//       !pathname.startsWith("/admin") &&
//       pathname !== "/" &&
//       pathname !== "/login"
//     ) {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     }
//   }

//   // 🔹 6️⃣ Allow normal behavior (including 404)
//   return NextResponse.next();
// }

// // 🔹 Middleware matcher
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// On dev it's working - end

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
