/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Tooltip } from "antd";
import { useMemo, useState } from "react";
import DataTable from "@/app/components/Dashboard/DataTable/DataTable";
import DataTableHeader from "@/app/components/Dashboard/DataTableHeader/DataTableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faCalendarCheck,
  faCalendarXmark,
  faCreditCard,
  faEdit,
  faPlus,
  faUserCheck,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import dayjs from "dayjs";
import AddNewIPOModal from "@/app/components/Dashboard/Modals/IPOS/AddNewIPO/AddNewIPOModal";
import AddNewBondModal from "@/app/components/Dashboard/Modals/Bonds/AddNewBond/AddNewBondModal";

const AllFundings = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { applicants, impersonateUser, user } = useGlobal();

  // console.log("Applicants:", applicants);
  // console.log("currentUser:", user);

  const myApplicants = useMemo(() => {
    if (!user || applicants.length === 0) return [];

    return applicants.filter(
      (applicant) => applicant.assignedBy?.adminEmail === user.email,
    );
  }, [applicants, user]);

  // ✅ Build one funding row per applicant, aggregating their bonds + IPOs
  const fundingRows = useMemo(() => {
    return myApplicants.map((applicant) => {
      const bonds = applicant.investmentDetails || [];
      const ipos = applicant.ipoShares || [];

      // Combine both into one list so we can find the most recent DATE
      const combined = [
        ...bonds.map((b: any) => ({
          date: b.investedAt,

          availableForWithdraw: b.availableForWithdraw || 0,
        })),
        ...ipos.map((i: any) => ({
          date: i.startDate,

          availableForWithdraw: i.availableForWithdraw || 0,
        })),
      ];

      const sorted = [...combined].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const latest = sorted[0];

      const fundValue = combined.reduce(
        (sum, item) => sum + (item.availableForWithdraw || 0),
        0,
      );

      // ✅ Funding Type: list ALL bond names + ALL stock names together,
      // not just whichever is most recent.
      const fundingLabels = [
        ...bonds.map((b: any) => b.bondInvestmentOption).filter(Boolean),
        ...ipos.map((i: any) => i.stockName).filter(Boolean),
      ];

      return {
        ...applicant,
        date: latest?.date ? dayjs(latest.date).format("DD MMM YYYY") : "—",
        fundingType:
          fundingLabels.length > 0 ? fundingLabels.join(" || ") : "—",
        fundValue: `£${fundValue.toLocaleString()}`,
        status: "Completed",
      };
    });
  }, [myApplicants]);

  const filteredData = fundingRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  // console.log("myApplicants:",myApplicants);

  const handleImpersonate = async (userEmail: string) => {
    const token = await impersonateUser(userEmail);

    if (!token) return;

    window.open(`/user/dashboard?impersonation=${token}`, "_blank");
  };

  const columns = [
    {
      title: "",
      dataIndex: "statusIcon",
      key: "statusIcon",

      render: (_: any, record: any) => {
        if (record.status !== "Fund Active - waiting for payment") return null;
        return (
          <Tooltip title="Fund Active - waiting for payment">
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ color: "rgb(231, 76, 60)" }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "clientLink",
      key: "clientLink",
      render: (_url: any, record: any) => (
        <Tooltip title={`View as ${record.firstName} ${record.lastName}`}>
          <span
            onClick={() => handleImpersonate(record.email)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faUserTie}
              style={{ color: "rgb(231, 76, 60)" }}
            />
          </span>
        </Tooltip>
      ),
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Funding Type",
      dataIndex: "fundingType",
      key: "fundingType",
    },
    {
      title: "Fund Value",
      dataIndex: "fundValue",
      key: "fundValue",
    },

    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
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
          title="All Fundings"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          modals={[
            {
              title: "Create a new bond",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <AddNewBondModal
                  open={open}
                  onClose={onClose}
                  applicants={myApplicants}
                />
              ),
            },
            {
              title: "Create a new IPO",
              icon: <FontAwesomeIcon icon={faArrowTrendDown} />,
              ModalComponent: (open, onClose) => (
                <AddNewIPOModal
                  open={open}
                  onClose={onClose}
                  applicants={myApplicants}
                />
              ),
              buttonClassName: "secondary-modal-btn",
            },
            // add more modals here if needed
          ]}
        />
        {/* <DataTable columns={columns} data={[]} pageSize={pageSize} /> */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={pageSize}
          emptyText="No fundings to display."
        />
      </Card>
    </>
  );
};

export default AllFundings;

const headerData: DisplayItem[] = [
  {
    icon: <FontAwesomeIcon icon={faCreditCard} />,
    label: "Open payments , totalling £ 20,000",
    value: 1,
  },
  {
    icon: <FontAwesomeIcon icon={faUserCheck} />,
    label: "Client confirmed payments",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    label: "Scheduled payments",
    value: 0,
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarXmark} />,
    label: "Overdue payments, totalling £ 20,000",
    value: 1,
  },
];
