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
import { FilePdfOutlined } from "@ant-design/icons";
import BondCertificate from "@/app/components/PDF/BondCertificate";
import { pdf } from "@react-pdf/renderer";
import { generateBarcode } from "@/app/components/utils/generateBarcode/generateBarcode";
import QRCode from "qrcode";

const Bonds = () => {
  const { user, applicants, loading } = useGlobal();

  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  console.log("Current User", currentUser);

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

  const investmentDetails = currentUser?.investmentDetails;

  const sortedInvestments = [...(investmentDetails || [])].sort(
    (a, b) =>
      new Date(b.investedAt).getTime() - new Date(a.investedAt).getTime(),
  );

  // const filteredData = sortedTickets.filter((row) =>
  //   Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(searchText.toLowerCase()),
  //   ),
  // );

  const filteredData = sortedInvestments.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  // const getProfitRate = (option: "Aviva" | "JPMorgan") => {
  //   if (option === "Aviva") return 6.125;
  //   if (option === "JPMorgan") return 8.81;
  // };

  const generateQrCode = async (bondNumber: string) => {
    return await QRCode.toDataURL(bondNumber);
  };

  const handleDownloadCertificate = async (record: any) => {
    const barcode = await generateBarcode(record.bondNumber);

    const qrCode = await generateQrCode(record.bondNumber);

    const blob = await pdf(
      <BondCertificate
        bond={record}
        currentUser={currentUser}
        barcode={barcode}
        qrCode={qrCode}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    const link = document.createElement("a");

    link.href = url;
    link.download = `Bond-${record.bondNumber}.pdf`;

    link.click();
  };

  const columns = [
    {
      title: "Bond Number",
      dataIndex: "bondNumber",
    },
    {
      title: "Bond Name",
      dataIndex: "bondInvestmentOption",
    },
    {
      title: "Bond Offer",
      render: (_: any, record: any) => {
        const rate = record.profitPercentage;
        return `${rate}%`;
      },
    },
    {
      title: "Start Date",
      render: (_: any, record: any) =>
        dayjs(record.investedAt).format("DD MMM YYYY"),
    },
    {
      title: "Maturity Date",
      render: (_: any, record: any) =>
        dayjs(record.maturityDate).format("DD MMM YYYY"),
    },
    {
      title: "Total Investment",
      // dataIndex: "investmentAmount",
      render: (_: any, record: any) =>
        `£ ${record.investmentAmount.toLocaleString()}`,
    },
    {
      title: "Total Interest",
      // dataIndex: "totalReturn",
      render: (_: any, record: any) =>
        `£ ${record.totalReturn.toLocaleString()}`,
    },
    {
      title: "Total",
      // dataIndex: "availableForWithdraw",
      render: (_: any, record: any) =>
        `£ ${record.availableForWithdraw.toLocaleString()}`,
    },
    {
      title: "Certificate",
      render: (_: any, record: any) => (
        <FilePdfOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "#e74c3c" }}
          onClick={() => handleDownloadCertificate(record)}
        />
      ),
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
              title="My Bonds"
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              // totalCount={0}
              totalCount={filteredData.length || 0}
              onSearch={setSearchText}
              // modals={[]}
            />

            <DataTable
              columns={columns}
              // data={[]}
              data={filteredData || []}
              pageSize={pageSize}
              emptyText="No active Bond's in your account."
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Bonds;
