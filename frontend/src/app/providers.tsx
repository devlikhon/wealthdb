"use client";

import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto, system-ui, sans-serif",
          colorPrimary: "#2c82be",
          colorLinkHover: "#ffffffa6",
          colorPrimaryHover: "#2c82be",
          colorPrimaryActive: "#2c82be",
          colorLink: "#2c82be",
          colorTextDisabled: "#12213c",
          colorTextHeading: "#12213c", // change heading text color globally
          colorIcon: "#12213c", // change icon color globally
          colorIconHover: "#ffffffa6", // change icon hover color globally
          colorBorder: "#54595f",
          colorBorderSecondary: "#54595f", // your custom color
        },
        components: {
          Modal: {
            colorBgElevated: "#12213c", // change popup background
            colorIcon: "#ffffffa6",
            colorIconHover: "#ffffffa6",
          },
          Form: {
            labelColor: "#ffffffa6",
          },
          InputNumber: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffa6", // input text color
            colorTextPlaceholder: "#ffffffa6", // placeholder text color
          },
          Input: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffa6", // input text color
            colorTextPlaceholder: "#ffffffa6", // placeholder text color
          },
          Select: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffa6", // input text color
            colorTextPlaceholder: "#ffffffa6", // placeholder text color
            colorBgElevated: "#2c82be", // your custom color
            paddingXXS: 0,
            optionSelectedBg: "transparent", // ✅ selected option background
            optionActiveBg: "rgba(0,0,0,0.04)",
            optionPadding: "4px 8px",
            optionSelectedFontWeight: 400,
            // optionSelectedColor: "#000", // ✅ selected option text color
          },
          DatePicker: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffa6", // input text color
            colorTextPlaceholder: "#ffffffa6", // placeholder text color
            colorPrimary: "#ffffffa6",
            colorTextLightSolid: "#12213c",
            colorTextQuaternary: "#ffffffa6",
            colorIcon: "#ffffffa6",
            colorBgElevated: "#2c82be",
          },

          Steps: {
            colorText: "#ffffffa6",
            colorTextDescription: "#ffffffa6",
            colorPrimary: "#2c82be",
            colorTextDisabled: "#ffffffa6",
          },

          Card: {
            colorBorderSecondary: "#54595f",
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
