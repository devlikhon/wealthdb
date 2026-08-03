"use client";

import AccountDetails from "../dashboard/components/AccountDetails/AccountDetails";
import {
  UserOutlined,
  LockOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Card, Grid, Tabs } from "antd";
import AccountInformation from "./components/AccountInformation";
import ChangePassword from "./components/ChangePassword";
import UploadDocument from "./components/UploadDocument";
import BankingDetails from "./components/BankingDetails";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import PageLoader from "@/app/components/PageLoader";
import ApplicantStepperForm from "../dashboard/components/ApplicantForm/ApplicantStepperForm";
import SubmissionMessage from "../dashboard/components/SubmissionMessage/SubmissionMessage";

const Account = () => {
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

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
  // if (currentUser.status === "In Progress") {
  //   return <ApplicantStepperForm />;
  // }

  if (currentUser.status === "Completed") {
    return <SubmissionMessage currentUser={currentUser} />;
  }

  return (
    <>
      <AccountDetails />

      <Card
        size="small"
        title=""
        styles={{
          header: {
            textAlign: "center",
            width: "100%",
            fontSize: 16,
            color: "var(--foreground)",
            borderBottom: "1px solid var(--border-color)",
          },
          body: {
            padding: "12px 16px 24px 16px",
          },
        }}
        style={{
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
          background: "var(--secondary-color)",
          border: "0px solid var(--border-color)",
          marginTop: 16,
        }}
      >
        <Tabs
          defaultActiveKey="account"
          // centered
          // tabBarStyle={{ fontWeight: 500 }}
          items={[
            {
              key: "account",
              label: (
                <span style={{ fontSize: screens.md ? 16 : 14 }}>
                  Account Details
                </span>
              ),
              icon: <UserOutlined />,
              children: <AccountInformation />,
            },
            {
              key: "password",
              label: (
                <span style={{ fontSize: screens.md ? 16 : 14 }}>
                  Change Password
                </span>
              ),
              icon: <LockOutlined />,
              children: <ChangePassword />,
            },
            {
              key: "documents",
              label: (
                <span style={{ fontSize: screens.md ? 16 : 14 }}>
                  Documents
                </span>
              ),
              icon: <FileTextOutlined />,
              children: <UploadDocument />,
            },
            {
              key: "banking",
              label: (
                <span style={{ fontSize: screens.md ? 16 : 14 }}>
                  Banking Details
                </span>
              ),
              icon: <BankOutlined />,
              children: <BankingDetails />,
            },
          ]}
        />
      </Card>
    </>
  );
};

export default Account;
