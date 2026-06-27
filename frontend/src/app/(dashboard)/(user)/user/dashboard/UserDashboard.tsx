/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import ApplicantStepperForm from "./components/ApplicantForm/ApplicantStepperForm";
import "./dashboard.css";
import PageLoader from "@/app/components/PageLoader";
import SubmissionMessage from "./components/SubmissionMessage/SubmissionMessage";
import AccountDetails from "./components/AccountDetails/AccountDetails";
import AmountDetails from "./components/AmountDetails/AmountDetails";
import { Card, Col, Row } from "antd";
import DashboardPie from "@/app/(dashboard)/(admin)/admin/dashboard/components/DashboardPie/DashboardPie";
import dayjs from "dayjs";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";

const UserDashboard = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { user, applicants, loading, myTransactions, myPortfolio } =
    useGlobal();

  // console.log("totalInvestedCombined", myPortfolio);

  // const transactionsData = generateTransactions(40);

  const filteredData = myTransactions.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const pieData = AmountDetails({
    totalBondInvested: myPortfolio?.totalBondInvested || 0,
    // totalIPOSharesInvested: 5000,
    totalIPOSharesInvested: myPortfolio?.totalIPOSharesInvested || 0,
    // grandTotal: (myPortfolio as any)?.grandTotal || 0,
  });

  // console.log("pieData", pieData);

  const grandTotal = myPortfolio?.grandTotal ?? 0;

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
      render: (_: any, record: any) => record?.type,
    },
    {
      title: "Date",
      // render: (_: any, record: any) => record?.transactionDate,
      render: (_: any, record: any) =>
        dayjs(record.date).format("DD MMM YYYY hh:mm A"),
    },
    {
      title: "Amount",
      render: (_: any, record: any) => {
        const amount = record.amount;
        const isNegative = amount < 0;

        return (
          <span
            style={{
              color: isNegative ? "#e74c3c" : "var(--primary-color)",
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
          background: "var(--background)",
          border: "1px solid var(--border-color)",
          marginTop: 16,
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={10}>
            <DashboardPie
              data={pieData}
              title={`£${Number(grandTotal).toLocaleString("en-GB")}`}
              // title={`£${grandTotal}`}
              height={350}
            />
          </Col>

          <Col xs={24} md={pieData ? 14 : 24}>
            <DataTableHeader
              title="Recent Transactions"
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              // totalCount={0}
              totalCount={filteredData.length}
              onSearch={setSearchText}
              // modals={[]}
            />

            <DataTable
              columns={columns}
              // data={[]}
              data={filteredData}
              pageSize={pageSize}
              emptyText="No recent transactions to display."
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserDashboard;
