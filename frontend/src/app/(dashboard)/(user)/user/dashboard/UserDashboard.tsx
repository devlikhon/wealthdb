"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import ApplicantStepperForm from "./components/ApplicantForm/ApplicantStepperForm";
import "./dashboard.css";
import { useEffect } from "react";
import PageLoader from "@/app/components/PageLoader";
import { Typography } from "antd";

const { Title } = Typography;

const UserDashboard = () => {
  const { user, applicants, startApplication, loading } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants.find(
    (applicant) => applicant.email === user?.email,
  );

  useEffect(() => {
    // If status is "Sent", start application
    if (currentUser?.status === "Sent") {
      // 🔹 wait for API to finish before proceeding
      startApplication(currentUser.email);
    }
  }, [currentUser?.email, currentUser?.status, startApplication]);

  // 🔥 WAIT until everything is ready
  if (loading || !user || !currentUser) {
    return <PageLoader />;
  }

  // ✅ dynamically show stepper if status is "In Progress"
  if (currentUser.status === "In Progress") {
    return <ApplicantStepperForm />;
  }

  return (
    <Title
      level={5}
      style={{
        color: "var(--foreground)",
        fontWeight: 500,
      }}
    >
      Application Done
    </Title>
  );
};

export default UserDashboard;
