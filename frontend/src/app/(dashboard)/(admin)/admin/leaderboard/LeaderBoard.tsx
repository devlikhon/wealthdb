/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faUserMinus,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import type { ColumnsType } from "antd/es/table";

const Leaderboard = () => {
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

      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="Sales Leaderboard"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
        />
        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No sales leaderboard to display."
        />
      </Card>
    </>
  );
};

export default Leaderboard;

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

interface SalesLeaderBoardRow {
  id: number;
  name: string;
  prospects: string;
  clients: string[];
  pending: string;
  pending£: number;
  deals: string;
  sales£: number;
}

export const columns: ColumnsType<SalesLeaderBoardRow> = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: () => null, // renders nothing
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Prospects",
    dataIndex: "prospects",
    key: "prospects",
  },
  {
    title: "Clients",
    dataIndex: "clients",
    key: "clients",
    render: (clients) => clients.join(", "),
  },
  {
    title: "Pending",
    dataIndex: "pending",
    key: "pending",
  },
  {
    title: "Pending (£)",
    dataIndex: "pending£",
    key: "pending£",
  },
  {
    title: "Deals",
    dataIndex: "deals",
    key: "deals",
  },
  {
    title: "Sales (£)",
    dataIndex: "sales£",
    key: "sales£",
  },
];

export const data: SalesLeaderBoardRow[] = Array.from(
  { length: 40 },
  (_, i) => ({
    id: i + 1,
    name: `Sales Rep ${i + 1}`,
    prospects: `${10 + i}`,
    clients: [`Client A${i}`, `Client B${i}`],
    pending: `${2 + (i % 5)}`,
    pending£: 5000 + i * 750,
    deals: `${1 + (i % 3)}`,
    sales£: 15000 + i * 2500,
  }),
);
