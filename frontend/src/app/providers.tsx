"use client";

import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto, system-ui, sans-serif",
          colorPrimary: "#2c82be",
          colorLinkHover: "#2c82be",
          colorPrimaryHover: "#2c82be",
          colorPrimaryActive: "#2c82be",
          colorLink: "#2c82be",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

// "use client";

// import { ConfigProvider } from "antd";
// import type { ReactNode } from "react";

// export default function Providers({ children }: { children: ReactNode }) {
//   return <ConfigProvider>{children}</ConfigProvider>;
// }
