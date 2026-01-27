// next.config.js
// import path from "path";

// module.exports = {
//   webpack(config: { resolve: { alias: { [x: string]: string } } }) {
//     config.resolve.alias["@"] = path.resolve(__dirname, "src");
//     return config;
//   },
// };

// For Dev

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   turbopack: {
//     root: __dirname,
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/v1/:path*",
//         destination: "https://wealthdb-backend.vercel.app/api/v1/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
