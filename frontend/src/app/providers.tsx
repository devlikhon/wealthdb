"use client";

import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto, system-ui, sans-serif",
          colorPrimary: "#2c82be",
          colorLinkHover: "#ffffffe3",
          colorPrimaryHover: "#2c82be",
          colorPrimaryActive: "#2c82be",
          colorLink: "#2c82be",
          colorTextDisabled: "#12213c",
          colorTextHeading: "#12213c", // change heading text color globally
          colorIcon: "#12213c", // change icon color globally
          colorIconHover: "#ffffffe3", // change icon hover color globally
          colorBorder: "#54595f",
          colorBorderSecondary: "#54595f", // your custom color
        },
        components: {
          Modal: {
            colorBgElevated: "#12213c", // change popup background
            colorIcon: "#ffffffe3",
            colorIconHover: "#ffffffe3",
          },
          Form: {
            labelColor: "#ffffffe3",
          },
          InputNumber: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffe3", // input text color
            colorTextPlaceholder: "#ffffffe3", // placeholder text color
          },
          Input: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffe3", // input text color
            colorTextPlaceholder: "#ffffffe3", // placeholder text color
          },
          Select: {
            controlHeight: 24, // changes height
            paddingContentVertical: 0, // removes vertical padding
            colorText: "#ffffffe3", // input text color
            colorTextPlaceholder: "#ffffffe3", // placeholder text color
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
            colorText: "#ffffffe3", // input text color
            colorTextPlaceholder: "#ffffffe3", // placeholder text color
            colorPrimary: "#ffffffe3",
            colorTextLightSolid: "#12213c",
            colorTextQuaternary: "#ffffffe3",
            colorIcon: "#ffffffe3",
            colorBgElevated: "#2c82be",
          },

          Steps: {
            colorText: "#ffffffe3",
            colorTextDescription: "#ffffffe3",
            colorPrimary: "#2c82be",
            colorTextDisabled: "#ffffffe3",
          },

          Card: {
            colorBorderSecondary: "#54595f",
          },

          Descriptions: {
            itemPaddingBottom: 0, // 🔥 remove bottom gap
            itemPaddingEnd: 0, // 🔥 remove right/end gap
            titleMarginBottom: 0,
          },

          Tabs: {
            itemColor: "var(--foreground)", // normal color
            itemSelectedColor: "var(--primary-color)", // active tab color
            itemHoverColor: "var(--primary-color)", // hover color
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
