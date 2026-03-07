import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // allow static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/client-documents") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|gif)$/)
  ) {
    return NextResponse.next();
  }

  // public routes
  const publicRoutes = ["/", "/login"];
  const isPublic = publicRoutes.includes(pathname);

  // if user not logged in
  if (!token) {
    // allow public pages
    if (isPublic) {
      return NextResponse.next();
    }

    // block protected routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;

    // logged in user visiting login page
    if (isPublic) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      if (role === "user") {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }

    // admin route protection
    if (pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }

    // user route protection
    if (pathname.startsWith("/user")) {
      if (role !== "user") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// On dev it's working - start

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const pathname = req.nextUrl.pathname;

//   console.log("Token proxy:", token);

//   // 0️⃣ Allow static PDFs / client-documents
//   if (pathname.startsWith("/client-documents")) {
//     return NextResponse.next();
//   }

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

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// 🔹 Middleware matcher
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
