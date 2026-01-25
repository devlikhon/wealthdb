"use client";

import { Card } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DealTableHeader/DataTableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faPlus,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import DealTicketCreateModal from "@/app/components/Dashboard/DealTicketCreateModal/DealTicketCreateModal";

export default function DealTickets() {
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
          title="All Deal Tickets"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          // showAddButton={true}
          // AddModal={(open, onClose) => (
          //   <DealTicketCreateModal open={open} onClose={onClose} />
          // )}
          modals={[
            {
              title: "Create a deal ticket",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <DealTicketCreateModal open={open} onClose={onClose} />
              ),
            },
          ]}
        />

        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}

        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No deal tickets to display."
        />
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
  { title: "Date/Time", dataIndex: "dateTime" },
  { title: "Ticket Number", dataIndex: "ticketNumber" },
  { title: "Name", dataIndex: "name" },
  { title: "Investment", dataIndex: "investment" },
  { title: "Total", dataIndex: "total" },
  { title: "Representative", dataIndex: "representative" },
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

const representatives = ["Alice", "Bob", "Chris", "Two"];

const data = Array.from({ length: 40 }, (_, i) => {
  const name = names[i % names.length];
  const representative = representatives[i % representatives.length];
  const investment = Math.floor(Math.random() * 1500) + 300; // random $300-$1800
  const total = investment + Math.floor(Math.random() * 1000); // total > investment
  const date = new Date(
    2026,
    0,
    15 + Math.floor(i / 10),
    10 + (i % 10),
    (i % 6) * 15,
  );
  const dateTime = date.toISOString().slice(0, 16).replace("T", " ");

  return {
    id: i + 1,
    dateTime,
    ticketNumber: `TK-${1001 + i}`,
    name,
    investment: `$${investment}`,
    total: `$${total}`,
    representative,
  };
});
