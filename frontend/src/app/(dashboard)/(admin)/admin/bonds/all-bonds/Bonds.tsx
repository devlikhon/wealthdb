/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Card, Modal, Tooltip, Typography } from "antd";
import { useMemo, useState } from "react";
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
import { FilePdfOutlined } from "@ant-design/icons";
import HeaderTotalDisplay, {
  DisplayItem,
} from "@/app/components/Dashboard/HeaderTotalDisplay/HeaderTotalDisplay";
import dayjs from "dayjs";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import BondCertificate from "@/app/components/PDF/BondCertificate";
import { generateBarcode } from "@/app/components/utils/generateBarcode/generateBarcode";
import QRCode from "qrcode";
import { pdf } from "@react-pdf/renderer";
import AddNewBondModal from "@/app/components/Dashboard/Modals/Bonds/AddNewBond/AddNewBondModal";
import UpdateBondModal from "@/app/components/Dashboard/Modals/Bonds/UpdateBond/UpdateBond";

const { Title, Text } = Typography;

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

const Bonds = () => {
  // const { tickets, loading } = useTickets();
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBond, setSelectedBond] = useState<any>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { loading, deleteBond, applicants, user } = useGlobal();

  const myApplicants = useMemo(() => {
    if (!user || applicants.length === 0) return [];

    return applicants.filter(
      (applicant) => applicant.assignedBy?.adminEmail === user.email,
    );
  }, [applicants, user]);

  // console.log("myApplicants:",myApplicants);

  const allBonds = myApplicants.flatMap((app) =>
    (app.investmentDetails || []).map((investment: any) => ({
      ...investment,

      applicantId: app._id,

      applicant: app,
    })),
  );

  // const allBonds = myApplicants.flatMap((app) =>
  //   (app.investmentDetails || []).map((inv: any) => ({
  //     ...inv,
  //     applicant: app, // 👈 full user object attached here
  //   })),
  // );

  // console.log("All Bonds", allBonds);

  //   As it is data

  //   const sortedBonds = [...allBonds];

  //   Newest Data first

  const sortedBonds = [...allBonds].sort(
    (a, b) =>
      new Date(b.investedAt).getTime() - new Date(a.investedAt).getTime(),
  );

  //   Oldest Data first
  //   const sortedBonds = [...allBonds].sort(
  //     (a, b) =>
  //       new Date(a.investedAt).getTime() - new Date(b.investedAt).getTime(),
  //   );

  const filteredData = sortedBonds.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const handleDelete = (record: any) => {
    setSelectedBond(record);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBond) return;

    // Call your delete function from the global context
    await deleteBond(selectedBond.applicantId, selectedBond._id);

    // Close the Delete Modal
    setOpenDeleteModal(false);
  };

  const generateQrCode = async (bondNumber: string) => {
    return await QRCode.toDataURL(bondNumber);
  };

  const handleDownloadCertificate = async (record: any) => {
    const barcode = await generateBarcode(record.bondNumber);

    const qrCode = await generateQrCode(record.bondNumber);

    const blob = await pdf(
      <BondCertificate
        bond={record}
        currentUser={record.applicant}
        barcode={barcode}
        qrCode={qrCode}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    const link = document.createElement("a");

    link.href = url;
    link.download = `Bond-${record.bondNumber}.pdf`;

    link.click();
  };

  const columns = [
    {
      title: "Client Name",
      render: (_: any, record: any) =>
        `${record.applicant.title} ${record.applicant.firstName} ${record.applicant.lastName}`,
    },
    {
      title: "Bond Number",
      dataIndex: "bondNumber",
    },
    {
      title: "Bond Name",
      dataIndex: "bondInvestmentOption",
    },
    {
      title: "Bond Offer",
      render: (_: any, record: any) => {
        const rate = record.profitPercentage;
        return `${rate}%`;
      },
    },
    {
      title: "Start Date",
      render: (_: any, record: any) =>
        dayjs(record.investedAt).format("DD MMM YYYY"),
    },
    {
      title: "Maturity Date",
      render: (_: any, record: any) =>
        dayjs(record.maturityDate).format("DD MMM YYYY"),
    },
    {
      title: "Investment",
      // dataIndex: "investmentAmount",
      render: (_: any, record: any) =>
        `£${record.investmentAmount.toLocaleString()}`,
    },
    {
      title: "Interest",
      // dataIndex: "totalReturn",
      render: (_: any, record: any) =>
        `£${record.totalReturn.toLocaleString()}`,
    },
    {
      title: "Total Return",
      // dataIndex: "availableForWithdraw",
      render: (_: any, record: any) =>
        `£${record.availableForWithdraw.toLocaleString()}`,
    },
    {
      title: "Certificate",
      render: (_: any, record: any) => (
        <FilePdfOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "#e74c3c" }}
          onClick={() => handleDownloadCertificate(record)}
        />
      ),
    },
    {
      title: "",
      key: "editBond",
      render: (_: any, record: any) => (
        <Tooltip title="Edit Bond">
          <a
            onClick={() => {
              setSelectedBond(record);
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
      key: "deleteBond",
      render: (_: any, record: any) => (
        <Tooltip title="Delete Bond">
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

  return (
    <>
      <HeaderTotalDisplay items={headerData} />
      <Card
        style={{ marginTop: 16, background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <DataTableHeader
          title="All Bonds"
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
                  applicants={applicants}
                />
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
          emptyText="No bonds to display."
        />

        <UpdateBondModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBond(null);
          }}
          applicants={applicants}
          bond={selectedBond}
          // ticket={selectedTicket}
        />

        {/* Delete Modal  */}

        <Modal
          title={
            <Title
              level={4}
              style={{ marginBottom: 0, color: "var(--primary-color)" }}
            >
              Are you sure you want to delete this bond?
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

export default Bonds;
