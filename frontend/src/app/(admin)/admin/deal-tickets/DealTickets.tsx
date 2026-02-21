/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Modal, Tooltip } from "antd";
import { useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faPenToSquare,
  faPlus,
  faTrash,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import DealTicketCreateModal from "@/app/components/Dashboard/Modals/DealTicketCreateModal/DealTicketCreateModal";
import dayjs from "dayjs";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";

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

const DealTickets = () => {
  // const { tickets, loading } = useTickets();
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const { tickets, loading, deleteTicket } = useGlobal();

  console.log("fetchTickets", tickets);

  // const sortedTickets = tickets
  //   .map((t) => t.dealDetails)
  //   .sort((a, b) => a.ticketNumber.localeCompare(b.ticketNumber));

  const sortedTickets = [...tickets].sort((a, b) =>
    a.dealDetails.ticketNumber.localeCompare(b.dealDetails.ticketNumber),
  );

  const filteredData = sortedTickets.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this ticket?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deleteTicket(record._id),
    });
  };

  const columns = [
    {
      title: "Date/Time",
      render: (_: any, record: any) =>
        dayjs(record.createdAt).format("DD MMM YYYY hh:mmA"),
    },
    {
      title: "Ticket Number",
      render: (_: any, record: any) => record.dealDetails?.ticketNumber,
    },
    {
      title: "Name",
      render: (_: any, record: any) => record.dealDetails?.clientName,
    },
    {
      title: "Investment",
      render: (_: any, record: any) => record.dealDetails?.security,
    },
    {
      title: "Total",
      render: (_: any, record: any) => record.dealDetails?.tradeAmount,
    },
    {
      title: "Representative",
      render: (_: any, record: any) => record.dealDetails?.representative,
    },
    {
      title: "",
      key: "editTicket",
      render: (_: any, record: any) => (
        <Tooltip title="Edit Ticket">
          <a
            onClick={() => {
              setSelectedTicket(record);
              setEditModalOpen(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "var(--primary-color)" }}
            />
          </a>
        </Tooltip>
      ),
    },
    {
      title: "",
      key: "deleteTicket",
      render: (_: any, record: any) => (
        <Tooltip title="Delete Ticket">
          <a onClick={() => handleDelete(record)} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: "rgb(231, 76, 60)" }}
            />
          </a>
        </Tooltip>
      ),
    },
  ];

  // const columns = [
  //   {
  //     title: "Date/Time",
  //     dataIndex: "createdAt",
  //     render: (text: string) => dayjs(text).format("DD MMM YYYY hh:mmA"),
  //   },
  //   { title: "Ticket Number", dataIndex: "ticketNumber" },
  //   { title: "Name", dataIndex: "clientName" },
  //   { title: "Investment", dataIndex: "security" },
  //   { title: "Total", dataIndex: "tradeAmount" },
  //   { title: "Representative", dataIndex: "representative" },
  //   {
  //     title: "",
  //     key: "editTicket",
  //     render: (_: any, record: any) => (
  //       <Tooltip title="Edit Ticket">
  //         {/* <a onClick={() => handleUpdate(record)} style={{ cursor: "pointer" }}>
  //           <FontAwesomeIcon
  //             icon={faPenToSquare}
  //             style={{ color: "var(--primary-color)" }}
  //           />
  //         </a> */}
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     title: "",
  //     key: "deleteTicket",
  //     render: (_: any, record: any) => (
  //       <Tooltip title="Delete Ticket">
  //         <a onClick={() => handleDelete(record)} style={{ cursor: "pointer" }}>
  //           <FontAwesomeIcon
  //             icon={faTrash}
  //             style={{ color: "rgb(231, 76, 60)" }}
  //           />
  //         </a>
  //       </Tooltip>
  //     ),
  //   },
  // ];

  return (
    <>
      <HeaderTotalDisplay items={headerData} />
      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="All Deal Tickets"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
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
        {/* Table renders immediately with empty array, updates dynamically */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          loading={loading}
          emptyText="No deal tickets to display."
        />

        <DealTicketCreateModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedTicket(null);
          }}
          ticket={selectedTicket}
        />
      </Card>
    </>
  );
};

export default DealTickets;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Card, message } from "antd";
// import { useContext, useEffect, useState } from "react";
// import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
// import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCalendarCheck,
//   faCalendarXmark,
//   faPlus,
//   faUserCheck,
//   faUserClock,
// } from "@fortawesome/free-solid-svg-icons";
// import HeaderTotalDisplay, {
//   DisplayItem,
// } from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
// import DealTicketCreateModal from "@/app/components/Dashboard/Modals/DealTicketCreateModal/DealTicketCreateModal";
// import axios from "axios";
// import dayjs from "dayjs";
// import { AuthContext } from "@/app/Auth/AuthContext/AuthContext";

// const headerData: DisplayItem[] = [
//   {
//     icon: <FontAwesomeIcon icon={faCalendarCheck} />,
//     label: "Active clients in last 30 Days",
//     value: 0,
//   },
//   {
//     icon: <FontAwesomeIcon icon={faUserClock} />,
//     label: "Clients deposited in last 30 Days",
//     value: 0,
//   },
//   {
//     icon: <FontAwesomeIcon icon={faCalendarXmark} />,
//     label: "Inactive client accounts",
//     value: 0,
//   },
//   {
//     icon: <FontAwesomeIcon icon={faUserCheck} />,
//     label: "New clients in last 30 Days",
//     value: 0,
//   },
// ];

// const columns = [
//   {
//     title: "Date/Time",
//     dataIndex: "createdAt",
//     render: (text: string) => dayjs(text).format("DD MMM YYYY hh:mmA"),
//   },
//   { title: "Ticket Number", dataIndex: "ticketNumber" },
//   { title: "Name", dataIndex: "clientName" },
//   { title: "Investment", dataIndex: "security" },
//   { title: "Total", dataIndex: "tradeAmount" },
//   { title: "Representative", dataIndex: "representative" },
// ];

// const DealTickets = () => {
//   const { user, loading: authLoading } = useContext(AuthContext); // 👈 get user + loading

//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");

//   const [tickets, setTickets] = useState<any[]>([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!authLoading && user) {
//       const fetchTickets = async () => {
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
//             { withCredentials: true },
//           );
//           setTickets(res?.data?.tickets || []);
//         } catch (err) {
//           message.error(
//             axios.isAxiosError(err)
//               ? err.response?.data?.message || "Failed to fetch tickets"
//               : "Something went wrong",
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchTickets();
//     }
//   }, [authLoading, user]);

//   // Sort + filter
//   const sortedDealDetails = tickets
//     .map((t) => t.dealDetails)
//     .sort((a, b) => a.ticketNumber.localeCompare(b.ticketNumber));

//   const filteredData = sortedDealDetails.filter((row) =>
//     Object.values(row).some((v) =>
//       String(v).toLowerCase().includes(searchText.toLowerCase()),
//     ),
//   );

//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchTickets = async () => {
//   //     try {
//   //       const res = await axios.get(
//   //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
//   //         { withCredentials: true },
//   //       );

//   //       setTickets(res?.data?.tickets || []);
//   //     } catch (error) {
//   //       message.error(
//   //         axios.isAxiosError(error)
//   //           ? error.response?.data?.message || "Failed to fetch tickets"
//   //           : "Something went wrong",
//   //       );
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchTickets();
//   // }, []);

//   // const sortedDealDetails = tickets
//   //   .map((ticket) => ticket.dealDetails)
//   //   .sort((a, b) => a.ticketNumber.localeCompare(b.ticketNumber));

//   // console.log("fetch tickets", sortedDealDetails);

//   // // console.log("fetch data", data);

//   // const filteredData = sortedDealDetails.filter((row) =>
//   //   Object.values(row).some((value) =>
//   //     String(value).toLowerCase().includes(searchText.toLowerCase()),
//   //   ),
//   // );

//   return (
//     <>
//       <HeaderTotalDisplay items={headerData} />

//       <Card
//         style={{ marginTop: 16, background: "var(--secondary-color)" }}
//         variant="borderless"
//       >
//         <DataTableHeader
//           title="All Deal Tickets"
//           pageSize={pageSize}
//           onPageSizeChange={setPageSize}
//           totalCount={filteredData.length}
//           onSearch={setSearchText}
//           // showAddButton={true}
//           // AddModal={(open, onClose) => (
//           //   <DealTicketCreateModal open={open} onClose={onClose} />
//           // )}
//           modals={[
//             {
//               title: "Create a deal ticket",
//               icon: <FontAwesomeIcon icon={faPlus} />,
//               ModalComponent: (open, onClose) => (
//                 <DealTicketCreateModal open={open} onClose={onClose} />
//               ),
//             },
//           ]}
//         />

//         {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}

//         {/* {tickets.length > 0 && (
//           <DataTable
//             columns={columns}
//             data={filteredData}
//             pageSize={pageSize}
//             emptyText="No deal tickets to display."
//           />
//         )} */}

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pageSize={pageSize}
//           loading={loading || authLoading} // ✅ wait until auth is ready
//           emptyText="No deal tickets to display."
//         />

//         {/* <DataTable
//           columns={columns}
//           data={filteredData}
//           pageSize={pageSize}
//           emptyText="No deal tickets to display."
//         /> */}
//       </Card>
//     </>
//   );
// };

// export default DealTickets;

// const names = [
//   "John Doe",
//   "Jane Smith",
//   "Michael Brown",
//   "Emily Johnson",
//   "David Wilson",
//   "Sophia Miller",
//   "Daniel Anderson",
//   "Olivia Martinez",
//   "James Taylor",
//   "Isabella Thomas",
//   "William Moore",
//   "Mia Jackson",
//   "Benjamin White",
//   "Charlotte Harris",
//   "Lucas Martin",
//   "Amelia Thompson",
//   "Henry Garcia",
//   "Evelyn Martinez",
//   "Alexander Robinson",
//   "Akram Smith",
// ];

// const representatives = ["Alice", "Bob", "Chris", "Two"];

// const data = Array.from({ length: 40 }, (_, i) => {
//   const name = names[i % names.length];
//   const representative = representatives[i % representatives.length];
//   const investment = Math.floor(Math.random() * 1500) + 300; // random $300-$1800
//   const total = investment + Math.floor(Math.random() * 1000); // total > investment
//   const date = new Date(
//     2026,
//     0,
//     15 + Math.floor(i / 10),
//     10 + (i % 10),
//     (i % 6) * 15,
//   );
//   const dateTime = date.toISOString().slice(0, 16).replace("T", " ");

//   return {
//     id: i + 1,
//     dateTime,
//     ticketNumber: `TK-${1001 + i}`,
//     name,
//     investment: `$${investment}`,
//     total: `$${total}`,
//     representative,
//   };
// });
