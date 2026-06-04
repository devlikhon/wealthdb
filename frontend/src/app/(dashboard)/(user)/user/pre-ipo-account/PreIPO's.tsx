/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import AccountDetails from "../dashboard/components/AccountDetails/AccountDetails";
import { Card, Col, Row } from "antd";
import dayjs from "dayjs";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import PageLoader from "@/app/components/PageLoader";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import ApplicantStepperForm from "../dashboard/components/ApplicantForm/ApplicantStepperForm";
import SubmissionMessage from "../dashboard/components/SubmissionMessage/SubmissionMessage";

const PreIPO = () => {
  const { user, applicants, loading } = useGlobal();

  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

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

  const columns = [
    {
      title: "Transaction",
      render: (_: any, record: any) => record?.transactionType,
    },
    {
      title: "Date",
      // render: (_: any, record: any) => record?.transactionDate,
      render: (_: any, record: any) =>
        dayjs(record.transactionDate).format("DD MMM YYYY hh:mm A"),
    },
    {
      title: "Amount",
      render: (_: any, record: any) => {
        const amount = record.transactionAmount;
        const isNegative = amount < 0;

        return (
          <span
            style={{
              color: isNegative ? "#e74c3c" : "#2ecc71",
            }}
          >
            {isNegative ? "-" : "+"}
            {Math.abs(amount).toLocaleString()}
          </span>
        );
      },
    },
  ];

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
        }}
        style={{
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
          background: "var(--secondary-color)",
          border: "0px solid var(--border-color)",
          marginTop: 16,
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={24}>
            <DataTableHeader
              title="My Pre Ipo Shares"
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              totalCount={0}
              //   totalCount={filteredData.length}
              onSearch={setSearchText}
              // modals={[]}
            />

            <DataTable
              columns={columns}
              data={[]}
              //   data={filteredData}
              pageSize={pageSize}
              emptyText="No active term deposits in your account."
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PreIPO;
