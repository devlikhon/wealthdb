/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "antd";
import { useMemo, useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";

const AllClients = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { applicants, user } = useGlobal();

  // console.log("Applicants:", applicants);
  // console.log("currentUser:", user);

  const myApplicants = useMemo(() => {
    if (!user || applicants.length === 0) return [];

    return applicants.filter(
      (applicant) => applicant.assignedBy?.adminEmail === user.email,
    );
  }, [applicants, user]);

  console.log("myApplicants:", myApplicants);

  const filteredData = myApplicants.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const getAccount = (record: any) => {
    const account =
      record.individualAccount ||
      record.jointAccount ||
      record.companyAccount ||
      null;

    if (!account) return null;

    // ✅ Defend against legacy null entries in phones
    return {
      ...account,
      phones: (account.phones || []).filter(Boolean),
    };
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_: any, record: any) => {
        const color =
          record.status === "Pending"
            ? "var(--primary-color)"
            : record.status === "Rejected"
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
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: any, record: any) => {
        return `${record.title} ${record.firstName} ${record.lastName}`;
      },
    },
    {
      title: "Application Status",
      dataIndex: "status",
      render: (status: string) => {
        const map: Record<string, { bg: string; color: string }> = {
          Approved: { bg: "var(--primary-color)", color: "#fff" },
          Pending: { bg: "#000e28", color: "#fff" },
          Rejected: { bg: "#e74c3c", color: "#fff" },
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
    { title: "Account Type", dataIndex: "accountType" },
    {
      title: "Invested",
      key: "investment",
      render: (_: any, record: any) => {
        const bondTotal =
          record.investmentDetails?.reduce(
            (sum: number, item: any) => sum + (item.investmentAmount || 0),
            0,
          ) || 0;

        const ipoTotal =
          record.ipoShares?.reduce(
            (sum: number, item: any) => sum + (item.totalReturn || 0),
            0,
          ) || 0;

        const total = bondTotal + ipoTotal;

        return total.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        });
      },
    },
    {
      title: "Tel",
      key: "tel",
      render: (_: any, record: any) => {
        const account = getAccount(record);

        const homePhone = account?.phones?.find(
          (phone: any) => phone.type === "home",
        );

        return homePhone ? `${homePhone.countryCode} ${homePhone.number}` : "-";
      },
    },
    {
      title: "Mobile",
      key: "mobile",
      render: (_: any, record: any) => {
        const account = getAccount(record);

        const mobilePhone =
          account?.phones?.find((phone: any) => phone.isPrimary) ||
          account?.phones?.find((phone: any) => phone.type === "mobile");

        return mobilePhone
          ? `${mobilePhone.countryCode} ${mobilePhone.number}`
          : "-";
      },
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
          title="All Clients"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          // showAddButton={true}
          // AddModal={(open, onClose) => (
          //   <DealTicketCreateModal open={open} onClose={onClose} />
          // )}
        />

        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}

        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No clients to display."
        />
      </Card>
    </>
  );
};

export default AllClients;

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
