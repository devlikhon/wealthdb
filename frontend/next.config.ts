// next.config.js
// import path from "path";

// module.exports = {
//   webpack(config: { resolve: { alias: { [x: string]: string } } }) {
//     config.resolve.alias["@"] = path.resolve(__dirname, "src");
//     return config;
//   },
// };

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
