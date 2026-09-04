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
import { generateBarcode } from "@/app/components/utils/generateBarcode/generateBarcode";
import QRCode from "qrcode";
import { pdf } from "@react-pdf/renderer";
import IPOCertificate from "@/app/components/PDF/IPOCertificate";
import AddNewIPOModal from "@/app/components/Dashboard/Modals/IPOS/AddNewIPO/AddNewIPOModal";
import UpdateIPOModal from "@/app/components/Dashboard/Modals/IPOS/UpdateIPOModal/UpdateIPOModal";

const { Title } = Typography;

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

const IPOS = () => {
  // const { IPOs, loading } = useIPOs();
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIPO, setSelectedIPO] = useState<any>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { loading, deleteIPO, applicants, user } = useGlobal();

  const myApplicants = useMemo(() => {
    if (!user || applicants.length === 0) return [];

    return applicants.filter(
      (applicant) => applicant.assignedBy?.adminEmail === user.email,
    );
  }, [applicants, user]);

  // console.log("myApplicants:",myApplicants);

  const allIPOS = myApplicants.flatMap((app) =>
    (app.ipoShares || []).map((inv: any) => ({
      ...inv,
      applicantId: app._id, // ✅ was missing
      applicant: app,
    })),
  );

  // console.log("All IPOS", allIPOS);

  //   As it is data

  //   const sortedIPOS = [...allIPOS];

  //   Newest Data first

  const sortedIPOS = [...allIPOS].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  //   Oldest Data first
  //   const sortedIPOS = [...allIPOS].sort(
  //     (a, b) =>
  //       new Date(a.investedAt).getTime() - new Date(b.investedAt).getTime(),
  //   );

  const filteredData = sortedIPOS.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const handleDelete = (record: any) => {
    setSelectedIPO(record);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedIPO) return;

    // ✅ correct:
    await deleteIPO(selectedIPO.applicantId, selectedIPO._id);

    setOpenDeleteModal(false);
  };

  const generateQrCode = async (stockTicker: string) => {
    return await QRCode.toDataURL(stockTicker);
  };

  const handleDownloadCertificate = async (record: any) => {
    const barcode = await generateBarcode(record.stockTicker);

    const qrCode = await generateQrCode(record.stockTicker);

    const blob = await pdf(
      <IPOCertificate
        ipo={record}
        currentUser={record.applicant}
        barcode={barcode}
        qrCode={qrCode}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    const link = document.createElement("a");

    link.href = url;
    link.download = `Bond-${record.stockTicker}.pdf`;

    link.click();
  };

  const columns = [
    {
      title: "Client Name",
      render: (_: any, record: any) =>
        `${record.applicant.title} ${record.applicant.firstName} ${record.applicant.lastName}`,
    },
    {
      title: "Stock Ticker",
      dataIndex: "stockTicker",
    },
    {
      title: "Stock Name",
      dataIndex: "stockName",
    },
    {
      title: "Shares Issued",
      dataIndex: "sharesIssued",
    },
    {
      title: "Shares Price",
      render: (_: any, record: any) => {
        const price = record.sharesPrice;
        return `£${price}`;
      },
    },
    {
      title: "Shares Type",
      dataIndex: "sharesType",
    },
    {
      title: "Market",
      dataIndex: "marketListed",
    },
    {
      title: "Start Date",
      render: (_: any, record: any) =>
        dayjs(record.startDate).format("DD MMM YYYY"),
    },
    {
      title: "Maturity Date",
      render: (_: any, record: any) =>
        dayjs(record.maturityDate).format("DD MMM YYYY"),
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
      key: "editIPO",
      render: (_: any, record: any) => (
        <Tooltip title="Edit IPO">
          <a
            onClick={() => {
              setSelectedIPO(record);
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
      key: "deleteIPO",
      render: (_: any, record: any) => (
        <Tooltip title="Delete IPO">
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
          title="All IPOS"
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          onSearch={setSearchText}
          modals={[
            {
              title: "Create a new IPO",
              icon: <FontAwesomeIcon icon={faPlus} />,
              ModalComponent: (open, onClose) => (
                <AddNewIPOModal
                  open={open}
                  onClose={onClose}
                  applicants={myApplicants}
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
          emptyText="No IPO Holdings to display."
        />

        <UpdateIPOModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedIPO(null);
          }}
          ipo={selectedIPO}
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

export default IPOS;
