"use client";

import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DealTableHeader/DataTableHeader";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import { Card } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faUserMinus,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const ClientLeads = () => {
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
          title="Client Leads"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
        />

        {/* <DataTable
          columns={columns}
          data={[]}
          pageSize={pageSize}
          emptyText="No leads to display."
        /> */}

        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No leads to display."
        />
      </Card>
    </>
  );
};

export default ClientLeads;

const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faUserPlus} />,
    label: "New leads today",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} />,
    label: "New leads in last month",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUserMinus} />,
    label: "Unassinged Leads",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "Assigned Leads",
    value: 0,
  },
];

const columns = [
  { title: "", dataIndex: "select" },
  { title: "Name", dataIndex: "name" },
  { title: "Email Address", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Invest Total (GBP)", dataIndex: "investTotal" },
  { title: "APR %", dataIndex: "apr" },
  { title: "Start Date", dataIndex: "startDate" },
  { title: "Status", dataIndex: "status" },
  { title: "Assinged", dataIndex: "assigned" },
  { title: "Lead Date", dataIndex: "leadDate" },
];

const data = Array.from({ length: 40 }, (_, i) => {
  const base = [
    {
      name: "John Doe",
      investTotal: "£500",
      apr: "7%",
      status: "Active",
      assigned: "Alice",
    },
    {
      name: "Jane Smith",
      investTotal: "£800",
      apr: "6.5%",
      status: "Pending",
      assigned: "Bob",
    },
    {
      name: "Michael Brown",
      investTotal: "£1200",
      apr: "8%",
      status: "Active",
      assigned: "Chris",
    },
  ];

  const item = base[i % 3];

  return {
    id: i + 1,
    name: item.name,
    email: `${item.name.toLowerCase().replace(" ", ".")}${i + 1}@example.com`,
    phone: `+447700900${123 + i}`,
    investTotal: item.investTotal,
    apr: item.apr,
    startDate: `2026-01-${15 + Math.floor(i / 3)}`, // increment date every 3 items
    status: item.status,
    assigned: item.assigned,
    leadDate: `2026-01-${15 + Math.floor(i / 3)} ${10 + (i % 8)}:00`,
  };
});
