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

  const { user, applicants, loading } = useGlobal();

  const transactionsData = generateTransactions(40);

  const filteredData = transactionsData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const investedTotal = 50000;
  const bondAmount = 20000;
  const termDeposits = 30000;

  const pieData = AmountDetails({
    investedTotal,
    bondAmount,
    termDeposits,
  });

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
          background: "var(--background)",
          border: "1px solid var(--border-color)",
          marginTop: 16,
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={10}>
            <DashboardPie
              data={pieData}
              title="Portfolio Overview"
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

const generateTransactions = (count: number = 40) => {
  const types = [
    "Deposit",
    "Withdrawal",
    "Bond Investment",
    "Term Deposit",
    "Interest Credit",
  ];

  const data = [];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];

    // Random amount logic
    let amount = Math.floor(Math.random() * 20000) + 1000;

    if (type === "Withdrawal") {
      amount = -amount; // negative for withdrawals
    }

    data.push({
      id: (i + 1).toString(),
      transactionType: type,
      transactionDate: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30, // last 30 days
      ).toISOString(),
      transactionAmount: amount,
    });
  }

  return data;
};
