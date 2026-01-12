"use client";

import { Spin } from "antd";

const PageLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
