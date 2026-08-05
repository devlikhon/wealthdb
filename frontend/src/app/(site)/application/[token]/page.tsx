"use client";

import ApplicantStepperForm from "@/app/(dashboard)/(user)/user/dashboard/components/ApplicantForm/ApplicantStepperForm";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import PageLoader from "@/app/components/PageLoader";
import { Grid } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const { useBreakpoint } = Grid;

const ApplicationPage = () => {
  const {
    publicApplicantLoading,

    publicApplicant,
    getApplicantByToken,
  } = useGlobal();

  const params = useParams();
  const token = params.token as string;

  const screens = useBreakpoint();

  // console.log("params.token", token);

  useEffect(() => {
    if (token) {
      getApplicantByToken(token);
    }
  }, [token]);

  if (publicApplicantLoading) {
    return <PageLoader />;
  }

  if (!publicApplicant) {
    return (
      <h2
        style={{
          margin: "0 auto",
          minHeight: "80vh",
          width: screens.lg ? "85%" : "100%",
          textAlign: "center",
          color: "#ffffffe3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Invalid or expired application link.
      </h2>
    );
  }

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
      <ApplicantStepperForm token={token} applicant={publicApplicant} />
    </div>
  );
};

export default ApplicationPage;
