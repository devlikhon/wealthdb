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
  faClipboardUser,
  faFileCircleCheck,
  faFileSignature,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import CreateCalendarAppointment from "@/app/components/Dashboard/CreateCalendarAppointment/CreateCalendarAppointment";

const IncompleteApplications = () => {
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
          title="Incomplete Applications"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          showAddButton={true}
          addButtonIcon={<FontAwesomeIcon icon={faUserPlus} />}
          AddModal={(open, onClose) => (
            <CreateCalendarAppointment open={open} onClose={onClose} />
          )}
        />

        {/* <DataTable
          columns={columns}
          data={[]}
          pageSize={pageSize}
          emptyText="No client applications to display."
        /> */}

        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No client applications to display."
        />
      </Card>
    </>
  );
};

export default IncompleteApplications;

const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faClipboardUser} />,
    label: "Open Applications",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faFileSignature} />,
    label: "Currently In Progress",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "Client Completed",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faFileCircleCheck} />,
    label: "Completed Applications",
    value: 0,
  },
];

const columns = [
  { title: "", dataIndex: "select" },
  { title: "Reference Number", dataIndex: "referenceNumber" },
  { title: "Application Type", dataIndex: "applicationType" },
  { title: "Client Name", dataIndex: "clientName" },
  { title: "Email Address", dataIndex: "emailAddress" },
  { title: "Lead Manager", dataIndex: "leadManager" },
  { title: "Application Status", dataIndex: "applicationStatus" },
  { title: "Last Updated", dataIndex: "lastUpdated" },
];

const data = Array.from({ length: 40 }, (_, i) => {
  const id = i + 1;

  return {
    id, // required rowKey
    select: "",
    referenceNumber: `REF-${1000 + id}`,
    applicationType: ["New", "Renewal", "Upgrade"][i % 3],
    clientName: `Client ${id}`,
    emailAddress: `client${id}@example.com`,
    leadManager: ["Alice", "Bob", "Chris", "Emma"][i % 4],
    applicationStatus: ["Pending", "Approved", "Rejected"][i % 3],
    lastUpdated: `2026-01-${String(5 + (i % 20)).padStart(2, "0")} 10:00`,
  };
});
