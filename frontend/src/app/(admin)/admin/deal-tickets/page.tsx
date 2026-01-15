"use client";

import { Card } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DealTableHeader/DataTableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";

export default function DealTickets() {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card style={{ marginTop: 16 }}>
        <DataTableHeader
          title="All Deal Tickets"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
        />

        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}

        <DataTable columns={columns} data={filteredData} pageSize={pageSize} />
      </Card>
    </>
  );
}

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
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
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
  { title: "Date/Time", dataIndex: "dateTime" },
  { title: "Ticket Number", dataIndex: "ticketNumber" },
  { title: "Name", dataIndex: "name" },
  { title: "Investment", dataIndex: "investment" },
  { title: "Total", dataIndex: "total" },
  { title: "Representative", dataIndex: "representative" },
];

const data = [
  {
    id: 1,
    dateTime: "2026-01-15 10:00",
    ticketNumber: "TK-1001",
    name: "John Doe",
    investment: "$500",
    total: "$2500",
    representative: "Alice",
  },
  {
    id: 2,
    dateTime: "2026-01-15 10:15",
    ticketNumber: "TK-1002",
    name: "Jane Smith",
    investment: "$400",
    total: "$500",
    representative: "Bob",
  },
  {
    id: 3,
    dateTime: "2026-01-15 10:30",
    ticketNumber: "TK-1003",
    name: "Michael Brown",
    investment: "$1000",
    total: "$1100",
    representative: "Alice",
  },
  {
    id: 4,
    dateTime: "2026-01-15 10:45",
    ticketNumber: "TK-1004",
    name: "Emily Johnson",
    investment: "$800",
    total: "$950",
    representative: "Chris",
  },
  {
    id: 5,
    dateTime: "2026-01-15 11:00",
    ticketNumber: "TK-1005",
    name: "David Wilson",
    investment: "$1200",
    total: "$1350",
    representative: "Alice",
  },
  {
    id: 6,
    dateTime: "2026-01-15 11:15",
    ticketNumber: "TK-1006",
    name: "Sophia Miller",
    investment: "$300",
    total: "$420",
    representative: "Bob",
  },
  {
    id: 7,
    dateTime: "2026-01-15 11:30",
    ticketNumber: "TK-1007",
    name: "Daniel Anderson",
    investment: "$1500",
    total: "$1700",
    representative: "Chris",
  },
  {
    id: 8,
    dateTime: "2026-01-15 11:45",
    ticketNumber: "TK-1008",
    name: "Olivia Martinez",
    investment: "$600",
    total: "$720",
    representative: "Alice",
  },
  {
    id: 9,
    dateTime: "2026-01-15 12:00",
    ticketNumber: "TK-1009",
    name: "James Taylor",
    investment: "$900",
    total: "$1050",
    representative: "Bob",
  },
  {
    id: 10,
    dateTime: "2026-01-15 12:15",
    ticketNumber: "TK-1010",
    name: "Isabella Thomas",
    investment: "$1100",
    total: "$1300",
    representative: "Chris",
  },
  {
    id: 11,
    dateTime: "2026-01-15 12:30",
    ticketNumber: "TK-1011",
    name: "William Moore",
    investment: "$700",
    total: "$820",
    representative: "Alice",
  },
  {
    id: 12,
    dateTime: "2026-01-15 12:45",
    ticketNumber: "TK-1012",
    name: "Mia Jackson",
    investment: "$950",
    total: "$1120",
    representative: "Bob",
  },
  {
    id: 13,
    dateTime: "2026-01-15 13:00",
    ticketNumber: "TK-1013",
    name: "Benjamin White",
    investment: "$1300",
    total: "$1500",
    representative: "Chris",
  },
  {
    id: 14,
    dateTime: "2026-01-15 13:15",
    ticketNumber: "TK-1014",
    name: "Charlotte Harris",
    investment: "$400",
    total: "$520",
    representative: "Alice",
  },
  {
    id: 15,
    dateTime: "2026-01-15 13:30",
    ticketNumber: "TK-1015",
    name: "Lucas Martin",
    investment: "$1600",
    total: "$1850",
    representative: "Bob",
  },
  {
    id: 16,
    dateTime: "2026-01-15 13:45",
    ticketNumber: "TK-1016",
    name: "Amelia Thompson",
    investment: "$750",
    total: "$880",
    representative: "Chris",
  },
  {
    id: 17,
    dateTime: "2026-01-15 14:00",
    ticketNumber: "TK-1017",
    name: "Henry Garcia",
    investment: "$1000",
    total: "$1200",
    representative: "Alice",
  },
  {
    id: 18,
    dateTime: "2026-01-15 14:15",
    ticketNumber: "TK-1018",
    name: "Evelyn Martinez",
    investment: "$500",
    total: "$650",
    representative: "Bob",
  },
  {
    id: 19,
    dateTime: "2026-01-15 14:30",
    ticketNumber: "TK-1019",
    name: "Alexander Robinson",
    investment: "$1400",
    total: "$1600",
    representative: "Chris",
  },
  {
    id: 20,
    dateTime: "2026-01-15 14:45",
    ticketNumber: "TK-1020",
    name: "Akram Smith",
    investment: "$1000",
    total: "$1100",
    representative: "Two",
  },
];
