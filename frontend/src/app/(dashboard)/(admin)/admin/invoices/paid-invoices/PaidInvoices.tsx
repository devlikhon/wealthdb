/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faEdit,
  faPlus,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import type { ColumnsType } from "antd/es/table";
import CreatePaymentModal from "@/app/components/Dashboard/Modals/Funding/CreatePaymentModal/CreatePaymentModal";
import AddInvoiceModal from "@/app/components/Dashboard/Modals/Invoice/AddInvoiceModal";

const PaidInvoices = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // const filteredData = data.filter((row) =>
  //   Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(searchText.toLowerCase()),
  //   ),
  // );

  const openData = data.filter((row) => row.invoiceStatus === "Paid");

  const filteredData = openData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="Paid Invoices"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          modals={[
            {
              title: "Add a new invoice",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <AddInvoiceModal open={open} onClose={onClose} />
              ),
            },
            {
              title: "Create a new single payment fund & invoice",
              icon: <FontAwesomeIcon icon={faEdit} />,
              ModalComponent: (open, onClose) => (
                <CreatePaymentModal open={open} onClose={onClose} />
              ),
              buttonClassName: "secondary-modal-btn",
            },
            // add more modals here if needed
          ]}
        />
        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No paid invoices to display."
        />
      </Card>
    </>
  );
};

export default PaidInvoices;

const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    label: "Active clients in last 30 Days",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUserClock} />,
    label: "Clients deposited in last 30 Days",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarXmark} />,
    label: "Inactive client accounts",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "New clients in last 30 Days",
    value: 0,
  },
];

interface InvoiceRow {
  id: number;
  invoiceDate: string;
  invoiceNumber: number;
  clientName: string;
  investmentValue: string;
  invoiceStatus: string;
  invoiceDueDate: string;
}

export const columns: ColumnsType<InvoiceRow> = [
  {
    title: "",
    dataIndex: "statusIcon",
    key: "statusIcon",
  },
  {
    title: "Invoice Date",
    dataIndex: "invoiceDate",
    key: "invoiceDate",
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "Investment Value",
    dataIndex: "investmentValue",
    key: "investmentValue",
  },
  {
    title: "Status",
    dataIndex: "invoiceStatus",
    key: "invoiceStatus",
  },
  {
    title: "Invoice Due Date",
    dataIndex: "invoiceDueDate",
    key: "invoiceDueDate",
  },
];

export const data: InvoiceRow[] = Array.from({ length: 40 }, (_, i) => {
  const baseDate = new Date(2026, 0, 10 + i);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  type InvoiceStatus = "Open" | "Paid" | "Deleted";

  const invoiceStatus: InvoiceStatus =
    i % 3 === 0 ? "Open" : i % 4 === 0 ? "Paid" : "Deleted";

  return {
    id: i + 1,
    invoiceDate: formatDate(baseDate),
    invoiceNumber: 100000 + i,
    clientName: `Client ${i + 1}`,
    investmentValue: `£ ${(10000 + i * 2500).toLocaleString()}.00`,
    invoiceStatus,
    invoiceDueDate: formatDate(
      new Date(baseDate.setDate(baseDate.getDate() + 14)),
    ),
  };
});
