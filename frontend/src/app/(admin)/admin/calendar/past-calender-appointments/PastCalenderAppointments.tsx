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
  faCalendarCheck,
  faCalendarPlus,
  faCalendarXmark,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import CreateCalendarAppointment from "@/app/components/Dashboard/CreateCalendarAppointment/CreateCalendarAppointment";

const PastCalendarAppointments = () => {
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

      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="Past Calendar Appointments"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          // showAddButton={true}
          // addButtonIcon={<FontAwesomeIcon icon={faCalendarPlus} />}
          // AddModal={(open, onClose) => (
          //   <CreateCalendarAppointment open={open} onClose={onClose} />
          // )}
          modals={[
            {
              title: "Create a new calendar appointment",
              icon: <FontAwesomeIcon icon={faCalendarPlus} />,
              ModalComponent: (open, onClose) => (
                <CreateCalendarAppointment open={open} onClose={onClose} />
              ),
            },
          ]}
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

export default PastCalendarAppointments;

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
  { title: "", dataIndex: "select" },
  { title: "Client Name", dataIndex: "clientName" },
  { title: "Appointed Staff", dataIndex: "appointedStaff" },
  { title: "Notes", dataIndex: "notes" },
  { title: "Start", dataIndex: "start" },
  { title: "Finish", dataIndex: "finish" },
  { title: "Timezone", dataIndex: "timezone" },
  { title: "Length", dataIndex: "length" },
  { title: "Assinged", dataIndex: "assigned" },
  { title: "Lead Date", dataIndex: "leadDate" },
];

const data = Array.from({ length: 40 }, (_, i) => {
  const id = i + 1;
  const startHour = 9 + (i % 8);

  return {
    id, // ✅ REQUIRED by DataTable typing
    select: "",
    clientName: `Client ${id}`,
    appointedStaff: ["Alice", "Bob", "Chris", "Emma"][i % 4],
    notes: `Session notes for client ${id}`,
    start: `2026-01-${String(10 + (i % 20)).padStart(2, "0")} ${String(
      startHour,
    ).padStart(2, "0")}:00`,
    finish: `2026-01-${String(10 + (i % 20)).padStart(2, "0")} ${String(
      startHour + 1,
    ).padStart(2, "0")}:00`,
    timezone: "GMT",
    length: "1h",
    assigned: ["Admin", "Manager", "Support"][i % 3],
    leadDate: `2026-01-${String(5 + (i % 20)).padStart(2, "0")} 10:00`,
  };
});
