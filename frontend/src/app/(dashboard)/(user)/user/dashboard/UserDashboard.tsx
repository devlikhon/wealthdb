"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import ApplicantStepperForm from "./components/ApplicantForm/ApplicantStepperForm";
import "./dashboard.css";
import PageLoader from "@/app/components/PageLoader";
import SubmissionMessage from "./components/SubmissionMessage/SubmissionMessage";
import { Typography } from "antd";

const { Title } = Typography;

const UserDashboard = () => {
  const { user, applicants, loading } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  // console.log("Current User", currentUser);

  // 🔥 WAIT until everything is ready
  if (loading || !user || !currentUser) {
    return <PageLoader />;
  }

  // ✅ dynamically show stepper if status is "In Progress"
  if (currentUser.status === "In Progress") {
    return <ApplicantStepperForm />;
  }

  if (currentUser.status === "Completed") {
    return <SubmissionMessage currentUser={currentUser} />;
  }

  return (
    <Title level={5} style={{ marginBottom: 0, color: "var(--foreground)" }}>
      Approved Done
    </Title>
  );
};

export default UserDashboard;
