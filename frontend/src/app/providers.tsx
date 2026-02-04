"use client";

import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto, system-ui, sans-serif",
          colorPrimary: "#00a3e0",
          colorLinkHover: "#00a3e0",
          colorPrimaryHover: "#00a3e0",
          colorPrimaryActive: "#00a3e0",
          colorLink: "#00a3e0",
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
