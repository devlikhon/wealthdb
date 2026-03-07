/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import { Card, Tooltip, Modal, Typography, Button, Space } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faFileCircleCheck,
  faFileSignature,
  faPenToSquare,
  faTrash,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import CreateApplicantModal from "@/app/components/Dashboard/Modals/CreateApplicantModal/CreateApplicantModal";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const AllApplications = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const { applicants, updateApplicant, deleteApplicant } = useGlobal();

  console.log("Applicants", applicants);

  const filteredData = applicants.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const handleUpdateClick = (record: any) => {
    setSelectedRecord(record);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (record: any) => {
    setSelectedRecord(record);
    setOpenDeleteModal(true);
  };

  const handleStatusUpdate = async (status: string) => {
    if (!selectedRecord) return;

    if (status === "Rejected") {
      await updateApplicant(selectedRecord._id, { status: "Rejected" });
    } else {
      await updateApplicant(selectedRecord._id);
    }

    setOpenUpdateModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRecord) return;

    // Call your delete function from the global context
    await deleteApplicant(selectedRecord._id);

    // Close the Delete Modal
    setOpenDeleteModal(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_: any, record: any) => {
        const color =
          record.status === "Completed"
            ? "var(--primary-color)"
            : record.status === "Sent"
              ? "var(--border-color)"
              : record.status === "Rejected"
                ? "#e74c3c"
                : "var(--secondary-color)";

        return (
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
        );
      },
    },
    {
      title: "Reference Number",
      render: (_: any, record: any) => record?.referenceNumber,
    },
    {
      title: "Application Type",
      render: (_: any, record: any) => record?.accountType,
    },
    {
      title: "Client Name",
      render: (_: any, record: any) =>
        `${record?.title} ${record?.firstName} ${record?.lastName}`,
    },
    { title: "Email Address", render: (_: any, record: any) => record?.email },
    {
      title: "Asiggned By",
      render: (_: any, record: any) => record?.assignedBy?.adminEmail,
    },
    {
      title: "Application Status",
      render: (_: any, record: any) => {
        const status = record.status; // or record.status
        const map: Record<string, { bg: string; color: string }> = {
          Completed: { bg: "var(--primary-color)", color: "#fff" },
          "In Progress": { bg: "var(--secondary-color)", color: "#fff" },
          Rejected: { bg: "#e74c3c", color: "#fff" },
          Sent: { bg: "var(--border-color)", color: "#fff" },
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
              width: "80px",
              display: "inline-block",
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Last Updated",
      render: (_: any, record: any) =>
        dayjs(record.updatedAt).format("DD MMM YYYY hh:mmA"),
    },
    {
      title: "",
      key: "updateStatus",
      render: (_: any, record: any) => {
        if (record.status === "Completed") return null;

        return (
          <Tooltip title="Update Application">
            <a onClick={() => handleUpdateClick(record)}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "var(--primary-color)" }}
              />
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      key: "deleteTicket",
      render: (_: any, record: any) => {
        if (record.status === "Completed") return null;

        return (
          <Tooltip title="Delete Ticket">
            <a onClick={() => handleDeleteClick(record)}>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "rgb(231, 76, 60)" }}
              />
            </a>
          </Tooltip>
        );
      },
    },
  ];

  // Compute counts
  const counts = {
    applications: applicants.length, // total applications
    inProgress: applicants.filter((d) => d.status === "In Progress").length,
    completed: applicants.filter((d) => d.status === "Completed").length,
    sent: applicants.filter((d) => d.status === "Sent").length,
  };

  // Update headerData dynamically including Deleted
  const headerData: DisplayItem[] = [
    {
      icon: <FontAwesomeIcon icon={faClipboardUser} />,
      label: "Total Applications",
      value: counts.applications,
    },
    {
      icon: <FontAwesomeIcon icon={faFileSignature} />,
      label: "Currently In Progress",
      value: counts.inProgress,
    },
    {
      icon: <FontAwesomeIcon icon={faUserCheck} />,
      label: "Client Application Completed",
      value: counts.completed,
    },

    {
      icon: <FontAwesomeIcon icon={faFileCircleCheck} />,
      label: "Sent Applications",
      value: counts.sent,
    },
  ];

  return (
    <>
      <HeaderTotalDisplay items={headerData} />

      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="All Applications"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          // showAddButton={true}
          // addButtonIcon={<FontAwesomeIcon icon={faUserPlus} />}
          // AddModal={(open, onClose) => (
          //   <CreateApplicantModal open={open} onClose={onClose} />
          // )}
          modals={[
            {
              title: "Create a new applicant",
              icon: <FontAwesomeIcon icon={faUserPlus} />,
              ModalComponent: (open, onClose) => (
                <CreateApplicantModal open={open} onClose={onClose} />
              ),
            },
          ]}
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

        {/* Update Modal  */}
        <Modal
          title={
            <Title
              level={4}
              style={{ marginBottom: 0, color: "var(--primary-color)" }}
            >
              Update Application
            </Title>
          }
          open={openUpdateModal}
          footer={null}
          onCancel={() => setOpenUpdateModal(false)}
        >
          <Text style={{ marginBottom: 0, color: "var(--foreground)" }}>
            Choose the action for this applicant.
          </Text>

          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 15,
            }}
            size={10}
          >
            <Button
              onClick={() => setOpenUpdateModal(false)}
              style={{
                padding: "6px 14px",
                background: "var(--foreground)",
                border: "none",
                color: "var(--secondary-color)",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </Button>

            <Button
              onClick={() => handleStatusUpdate("Rejected")}
              style={{
                padding: "6px 14px",
                background: "#e74c3c",
                border: "none",
                color: "var(--foreground)",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reject
            </Button>

            <Button
              onClick={() => handleStatusUpdate("Completed")}
              style={{
                padding: "6px 14px",
                background: "var(--primary-color)",
                border: "none",
                color: "var(--foreground)",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Complete
            </Button>
          </Space>
        </Modal>

        {/* Delete Modal  */}
        <Modal
          title={
            <Title
              level={4}
              style={{ marginBottom: 0, color: "var(--primary-color)" }}
            >
              Are you sure you want to delete this applicant?
            </Title>
          }
          open={openDeleteModal}
          onCancel={() => setOpenDeleteModal(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setOpenDeleteModal(false)}
              style={{
                padding: "6px 14px",
                background: "var(--foreground)",
                border: "none",
                color: "var(--secondary-color)",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </Button>,
            <Button
              key="delete"
              onClick={handleDeleteConfirm}
              style={{
                background: "var(--primary-color)",
                borderColor: "var(--primary-color)",
                color: "var(--foreground)",
                padding: "6px 14px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Yes
            </Button>,
          ]}
        />
      </Card>
    </>
  );
};

export default AllApplications;

// const data = Array.from({ length: 40 }, (_, i) => {
//   const id = i + 1;

//   return {
//     id, // required rowKey
//     select: "",
//     referenceNumber: `REF-${1000 + id}`,
//     applicationType: ["New", "Renewal", "Upgrade"][i % 3],
//     clientName: `Client ${id}`,
//     emailAddress: `client${id}@example.com`,
//     leadManager: ["Alice", "Bob", "Chris", "Emma"][i % 4],
//     applicationStatus: ["In Progress", "Completed", "Deleted"][i % 3],
//     lastUpdated: `2026-01-${String(5 + (i % 20)).padStart(2, "0")} 10:00`,
//   };
// });
