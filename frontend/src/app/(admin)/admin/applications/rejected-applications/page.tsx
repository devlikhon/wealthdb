/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CreateApplicantModal from "@/app/components/Dashboard/CreateApplicantModal/CreateApplicantModal";

const RejectedApplications = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // const filteredData = data.filter((row) =>
  //   Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(searchText.toLowerCase()),
  //   ),
  // );

  const filteredData = data.filter(
    (row) =>
      row.applicationStatus === "Deleted" &&
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase()),
      ),
  );

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card style={{ marginTop: 16 }}>
        <DataTableHeader
          title="Rejected Applications"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          showAddButton={true}
          addButtonIcon={<FontAwesomeIcon icon={faUserPlus} />}
          AddModal={(open, onClose) => (
            <CreateApplicantModal open={open} onClose={onClose} />
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

export default RejectedApplications;

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
  { title: "Reference Number", dataIndex: "referenceNumber" },
  { title: "Application Type", dataIndex: "applicationType" },
  { title: "Client Name", dataIndex: "clientName" },
  { title: "Email Address", dataIndex: "emailAddress" },
  { title: "Lead Manager", dataIndex: "leadManager" },
  {
    title: "Application Status",
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
    applicationStatus: ["In Progress", "Completed", "Deleted"][i % 3],
    lastUpdated: `2026-01-${String(5 + (i % 20)).padStart(2, "0")} 10:00`,
  };
});

// Compute counts
const counts = {
  open: data.length, // total applications
  inProgress: data.filter((d) => d.applicationStatus === "In Progress").length,
  completed: data.filter((d) => d.applicationStatus === "Completed").length,
  deleted: data.filter((d) => d.applicationStatus === "Deleted").length,
};

// Update headerData dynamically including Deleted
const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faClipboardUser} />,
    label: "Open Applications",
    value: counts.open,
  },
  {
    icon: <FontAwesomeIcon icon={faFileSignature} />,
    label: "Currently In Progress",
    value: counts.inProgress,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "Client Completed",
    value: counts.completed,
  },

  {
    icon: <FontAwesomeIcon icon={faFileCircleCheck} />,
    label: "Completed Applications",
    value: counts.completed,
  },
];
