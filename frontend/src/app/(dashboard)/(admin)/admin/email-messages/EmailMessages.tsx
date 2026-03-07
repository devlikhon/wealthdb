"use client";

import { Card, Tooltip } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faPlus,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { JSX } from "react/jsx-dev-runtime";
import EmailMessagesModal from "@/app/components/Dashboard/Modals/EmailMessagesModal/EmailMessagesModal";

const EmailMessages = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <>
      {/* <HeaderTotalDisplay items={headerData} /> */}

      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="All Email Messages"
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
              title: "Send Email Message",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <EmailMessagesModal open={open} onClose={onClose} />
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
};

export default EmailMessages;

interface EmailMessagesRow {
  id: number;
  dateTime: Date;
  sender: string;
  recipient: string;
  emailType: string | null;
  attachments: string[]; // <-- array of PDF URLs
  openedDateTime: Date;
  status: "Success" | "Failure";
  resend: JSX.Element;
}

// Sample names & emails
const senders = [
  "alice@example.com",
  "bob@example.com",
  "charlie@example.com",
  "dave@example.com",
];
const recipients = [
  "emma@example.com",
  "frank@example.com",
  "grace@example.com",
  "hannah@example.com",
];
const emailTypes = [
  "Open Email July 2025",
  "Account Application",
  "Manual Email - Thank you",
  "Account Password Reset",
];

const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

// Columns
export const columns: ColumnsType<EmailMessagesRow> = [
  {
    title: "", // no header
    dataIndex: "id",
    key: "id",
    render: () => null, // renders nothing
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
    render: formatDate,
  },
  {
    title: "Sender",
    dataIndex: "sender",
    key: "sender",
  },
  {
    title: "Recipient",
    dataIndex: "recipient",
    key: "recipient",
  },
  {
    title: "Email Type",
    dataIndex: "emailType",
    key: "emailType",
  },
  {
    title: "Attachments",
    dataIndex: "attachments",
    key: "attachments",
    render: (attachments: string[]) => (
      <div>
        {attachments.map((file, idx) => {
          const fileName = file.split("/").pop(); // extract "file_1.pdf"
          return (
            <Tooltip key={idx} title={fileName}>
              <a href={file} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ color: "rgb(231, 76, 60)" }}
                />
              </a>
            </Tooltip>
          );
        })}
      </div>
    ),
  },
  {
    title: "Opened Date Time",
    dataIndex: "openedDateTime",
    key: "openedDateTime",
    render: formatDate,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "",
    dataIndex: "resend",
    key: "resend",
    render: (icon) => <Tooltip title="Resend Email">{icon}</Tooltip>,
  },
];

export const data: EmailMessagesRow[] = Array.from({ length: 40 }, (_, i) => {
  const sender = senders[i % senders.length];
  const recipient = recipients[i % recipients.length];
  const emailType = emailTypes[i % emailTypes.length];

  // Random past date in 2026
  const dateTime = new Date(
    2026,
    0,
    1 + Math.floor(i / 2),
    10 + (i % 10),
    (i % 6) * 10,
  );
  const openedDateTime = new Date(
    dateTime.getTime() + Math.floor(Math.random() * 3) * 60 * 60 * 1000,
  ); // opened 0-2 hours later

  const status: "Success" | "Failure" =
    Math.random() > 0.2 ? "Success" : "Failure";

  return {
    id: i + 1,
    dateTime,
    sender,
    recipient,
    emailType,
    attachments: [
      `/client-documents/brochures/file_${i + 1}.pdf`,
      `/client-documents/brochures/file_${i + 2}.pdf`,
    ],
    openedDateTime,
    status,
    resend: (
      <FontAwesomeIcon
        icon={faSyncAlt}
        style={{ cursor: "pointer", color: "var(--primary-color)" }}
      />
    ),
  };
});
