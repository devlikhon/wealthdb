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
        components: {
          Form: {
            labelColor: "#ffffffa6",
          },
          InputNumber: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
          },
          Input: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
          },
          Select: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
          },
          DatePicker: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
          },
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
