/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Tooltip } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DealTableHeader/DataTableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarTimes,
  faCalendarXmark,
  faCreditCard,
  faEdit,
  faFilePdf,
  faMoneyCheckDollar,
  faPenToSquare,
  faPlus,
  faUserCheck,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import type { ColumnsType } from "antd/es/table";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import AddFundingModal from "@/app/components/Dashboard/Funding/AddFundingModal/AddFundingModal";
import CreatePaymentModal from "@/app/components/Dashboard/Funding/CreatePaymentModal/CreatePaymentModal";

const OpenFunding = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  //   const openData = data.filter((row) => row.applicationState === "Open");

  //   const filteredData = openData.filter((row) =>
  //     Object.values(row).some((value) =>
  //       String(value).toLowerCase().includes(searchText.toLowerCase()),
  //     ),
  //   );

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card style={{ marginTop: 16 }}>
        <DataTableHeader
          title="Open Funding"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          modals={[
            {
              title: "Create a new client fund",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <AddFundingModal open={open} onClose={onClose} />
              ),
            },
            {
              title: "Create a new single payment fund & invoice",
              icon: <FontAwesomeIcon icon={faEdit} />,
              ModalComponent: (open, onClose) => (
                <CreatePaymentModal open={open} onClose={onClose} />
              ),
            },
            // add more modals here if needed
          ]}
        />
        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No open fundings to display."
        />
      </Card>
    </>
  );
};

export default OpenFunding;

const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faCreditCard} />,
    label: "Open payments , totalling £ 20,000",
    value: 1,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "Client confirmed payments",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    label: "Scheduled payments",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarXmark} />,
    label: "Overdue payments, totalling £ 20,000",
    value: 1,
  },
];

interface FundingRow {
  id: number;
  clientName: string;
  clientLink: string;
  applicationState: "Open" | "Complete";
  date: string;
  fundingType: string;
  fundValue: string;
  invoiceUrl: string | null;
  paymentStatus: string;
  editPayment: string;
  editFunding: string;
}

export const columns: ColumnsType<FundingRow> = [
  {
    title: "",
    dataIndex: "statusIcon",
    key: "statusIcon",
    // render: () => {
    //   return (
    //     <FontAwesomeIcon
    //       icon={faCreditCard}
    //       style={{ color: "rgb(231, 76, 60)" }}
    //     />
    //   );
    // },
    render: (_: any, record) => {
      if (record.paymentStatus !== "Fund Active - waiting for payment")
        return null;
      return (
        <FontAwesomeIcon
          icon={faCreditCard}
          style={{ color: "rgb(231, 76, 60)" }}
          title="Fund Active - waiting for payment"
        />
      );
    },
  },
  {
    title: "",
    dataIndex: "clientLink",
    key: "clientLink",
    render: (_link, record) => {
      if (record.paymentStatus !== "Fund Active - waiting for payment")
        return null;
      return (
        <Tooltip title={`View as ${record.clientName}`}>
          <a href={record.clientLink} target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              style={{ color: "rgb(231, 76, 60)" }}
              icon={faUserTie}
            />
          </a>
        </Tooltip>
      );
    },
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "",
    dataIndex: "applicationState",
    key: "applicationState",
    render: (state, record) => {
      if (record.paymentStatus === "Fund Active - waiting for payment")
        return null;

      if (record.paymentStatus.startsWith("Payment Overdue")) {
        return (
          <Tooltip title="Open">
            <FontAwesomeIcon
              icon={faCalendarTimes}
              style={{ color: "rgb(231, 76, 60)" }}
            />
          </Tooltip>
        );
      }

      if (record.paymentStatus === "Payment Confirmed") {
        return (
          <Tooltip title="Complete">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "var(--primary-color)" }}
            />
          </Tooltip>
        );
      }

      return null;
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Funding Type",
    dataIndex: "fundingType",
    key: "fundingType",
  },
  {
    title: "Fund Value",
    dataIndex: "fundValue",
    key: "fundValue",
  },
  {
    title: "Invoice",
    dataIndex: "invoiceUrl",
    key: "invoiceUrl",
    render: (_url, record) => {
      const firstColumnVisible =
        record.paymentStatus === "Fund Active - waiting for payment";
      if (firstColumnVisible) return null;

      if (record.invoiceUrl) {
        return (
          <Tooltip title="View Invoice">
            <a href={record.invoiceUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon
                icon={faFilePdf}
                style={{ color: "rgb(231, 76, 60)" }}
              />
            </a>
          </Tooltip>
        );
      }
      return <FontAwesomeIcon icon={faFilePdf} style={{ color: "#DEDEDE" }} />;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
  },
  {
    title: "",
    dataIndex: "editPayment",
    key: "editPayment",
    render: (_url, record) => {
      const isEditable =
        record.paymentStatus === "Fund Active - waiting for payment";

      return (
        <Tooltip title={isEditable ? "Edit Payment" : "Not Editable"}>
          <a
            href={isEditable ? record.editPayment : undefined}
            style={{
              pointerEvents: isEditable ? "auto" : "none",
              color: isEditable ? "rgb(231, 76, 60)" : "#DEDEDE",
            }}
          >
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
          </a>
        </Tooltip>
      );
    },
  },
  {
    title: "",
    dataIndex: "editFunding",
    key: "editFunding",
    render: (_url, record) => (
      <Tooltip title="Edit Fund">
        <a href={record.editFunding}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "var(--primary-color)" }}
          />
        </a>
      </Tooltip>
    ),
  },
];

export const data: FundingRow[] = Array.from({ length: 40 }).map((_, i) => {
  const isComplete = i % 3 !== 0;
  const hasInvoice = i % 4 !== 0;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const baseDate = new Date(2026, 0, 10);
  baseDate.setDate(baseDate.getDate() + i);

  // Assign fundingType dynamically
  const fundingType =
    i % 5 === 0 ? "Fund Payment - Bank Transfer" : "Fund Active";

  // Assign paymentStatus dynamically
  let paymentStatus: string;
  if (!isComplete) {
    paymentStatus = "Fund Active - waiting for payment";
  } else if (i % 4 === 0) {
    // Make some payments overdue with dynamic date
    const overdueDate = new Date(baseDate);
    overdueDate.setDate(baseDate.getDate() + 5); // 5 days later
    paymentStatus = `Payment Overdue - ${formatDate(overdueDate)}`;
  } else {
    paymentStatus = "Payment Confirmed";
  }

  return {
    id: i + 1,
    clientName: `Client ${i + 1}`,
    clientLink: `/admin/access/client-${i + 1}`,
    applicationState: (isComplete ? "Complete" : "Open") as "Complete" | "Open",
    date: formatDate(baseDate),
    fundingType,
    fundValue: `£ ${(10000 + i * 2500).toLocaleString()}.00`,
    invoiceUrl: hasInvoice ? `/invoices/invoice-${i + 1}.pdf` : null,
    paymentStatus,
    editPayment: `/admin/funding/edit-payment/${i + 1}`,
    editFunding: `/admin/funding/edit-fund/${i + 1}`,
  };
});
