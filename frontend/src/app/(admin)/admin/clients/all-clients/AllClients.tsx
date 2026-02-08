/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DealTableHeader/DataTableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";

const AllClients = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card style={{ marginTop: 16 }}>
        <DataTableHeader
          title="All Clients"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          // showAddButton={true}
          // AddModal={(open, onClose) => (
          //   <DealTicketCreateModal open={open} onClose={onClose} />
          // )}
        />

        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}

        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No clients to display."
        />
      </Card>
    </>
  );
};

export default AllClients;

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

const columns = [
  {
    title: "",
    dataIndex: "select",
    render: (_: any, record: any) => {
      const color =
        record.applicationStatus === "Completed"
          ? "var(--primary-color)"
          : record.applicationStatus === "Deleted"
            ? "#e74c3c"
            : "#000e28";

      return (
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      );
    },
  },
  { title: "Name", dataIndex: "clientName" },
  {
    title: "Status",
    dataIndex: "applicationStatus",
    render: (status: string) => {
      const map: Record<string, { bg: string; color: string }> = {
        Completed: { bg: "var(--primary-color)", color: "#fff" },
        "In Progress": { bg: "#000e28", color: "#fff" },
        Deleted: { bg: "#e74c3c", color: "#fff" },
      };

      const style = map[status] || {
        bg: "transparent",
        color: "rgba(0,0,0,0.88)",
      };

      return (
        <span
          style={{
            backgroundColor: style.bg,
            color: style.color,
            padding: "2px 0px",
            borderRadius: 4,
            textAlign: "center",
            width: "90px",
            display: "inline-block",
          }}
        >
          {status}
        </span>
      );
    },
  },
  { title: "Type", dataIndex: "applicationType" },
  { title: "Balance", dataIndex: "balance" },
  { title: "Invested", dataIndex: "investment" },
  { title: "Tel", dataIndex: "tel" },
  { title: "Mobile", dataIndex: "mobile" },
  { title: "Last Login", dataIndex: "lastLogin" },
];

const names = [
  "John Doe",
  "Jane Smith",
  "Michael Brown",
  "Emily Johnson",
  "David Wilson",
  "Sophia Miller",
  "Daniel Anderson",
  "Olivia Martinez",
  "James Taylor",
  "Isabella Thomas",
  "William Moore",
  "Mia Jackson",
  "Benjamin White",
  "Charlotte Harris",
  "Lucas Martin",
  "Amelia Thompson",
  "Henry Garcia",
  "Evelyn Martinez",
  "Alexander Robinson",
  "Akram Smith",
];

const statuses = ["In Progress", "Completed", "Deleted"];
const types = ["New", "Renewal", "Upgrade"];

const data = Array.from({ length: 40 }, (_, i) => {
  const investment = Math.floor(Math.random() * 1500) + 300;
  const balance = Math.floor(Math.random() * 2000);

  const date = new Date(2026, 0, 10 + (i % 15), 9 + (i % 8), (i % 6) * 10);

  return {
    id: i + 1, // rowKey
    select: "",
    clientName: names[i % names.length],
    applicationStatus: statuses[i % statuses.length],
    applicationType: types[i % types.length],
    balance: `$${balance}`,
    investment: `$${investment}`,
    tel: `+1 202-55${String(i).padStart(2, "0")}`,
    mobile: `+1 917-88${String(i).padStart(2, "0")}`,
    lastLogin: date.toISOString().slice(0, 16).replace("T", " "),
  };
});
