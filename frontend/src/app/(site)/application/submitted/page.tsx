"use client";

import SubmissionMessage from "@/app/(dashboard)/(user)/user/dashboard/components/SubmissionMessage/SubmissionMessage";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Submitted = () => {
  const screens = useBreakpoint();

  return (
    <div
      style={{
        margin: "0 auto",
        padding: screens.lg
          ? "40px 60px" // Desktop (>= 992px)
          : screens.md
            ? "30px 60px" // Tablet (768px - 991px)
            : "20px",
        minHeight: "80vh",
        width: screens.lg ? "85%" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SubmissionMessage />
    </div>
  );
};

export default Submitted;
