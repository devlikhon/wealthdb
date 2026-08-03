/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Modal,
  Typography,
  Space,
  Button,
  Descriptions,
  Grid,
  Divider,
} from "antd";
import dayjs from "dayjs";
import "./ApplicantDetailsModal.css";
import React from "react";

const { Title, Text } = Typography;

interface Phone {
  countryCode: string;
  number: string;
  type: string;
  isPrimary: boolean;
}

interface Officer {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  roleInCompany: string;
}

const ApplicantDetailsModal = ({
  open,
  onClose,
  applicant,
  onApprove,
  onReject,
}: any) => {
  if (!applicant) return null;

  // console.log("Applicant from modal", applicant.individualAccount);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const account = applicant.individualAccount || applicant.jointAccount;
  const companyAccount = applicant.companyAccount;

  const phones: Phone[] = account?.phones || [];
  const officers: Officer[] = applicant.companyOfficers || [];

  return (
    <Modal
      className="applicant-modal-container"
      open={open}
      footer={null}
      destroyOnHidden
      centered
      onCancel={onClose}
      width={screens.md ? "60vw" : "95vw"}
      title={
        <>
          <Title
            level={4}
            style={{ marginBottom: 0, color: "var(--primary-color)" }}
          >
            Applicant Details
          </Title>
          <Text style={{ color: "var(--foreground)", fontWeight: 400 }}>
            You can review all informations of applicants and can reject or
            approve.
          </Text>
        </>
      }
    >
      {/* 🔹 Applicant Info */}

      <Space orientation="vertical" size={16} style={{ width: "100%" }}>
        <Descriptions
          title={
            <Title
              level={5}
              style={{ marginBottom: 0, color: "var(--primary-color)" }}
            >
              Personal Informations
            </Title>
          }
          column={2}
          //   labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          //   contentStyle={{
          //     color: "var(--foreground)",
          //   }}
          styles={{
            label: { color: "var(--foreground)", fontWeight: 600 },
            content: { color: "var(--foreground)" },
          }}
        >
          <Descriptions.Item label="Name">
            {applicant?.title} {applicant?.firstName} {applicant?.lastName}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {applicant?.email}
          </Descriptions.Item>

          <Descriptions.Item label="Account Type">
            {applicant?.accountType}
          </Descriptions.Item>

          <Descriptions.Item label="Reference">
            {applicant?.referenceNumber}
          </Descriptions.Item>
        </Descriptions>

        {/* 🔹 Account Info */}
        {account && (
          <Descriptions
            title={
              <Title
                level={5}
                style={{ marginBottom: 0, color: "var(--primary-color)" }}
              >
                {`${applicant?.accountType} Account Informations`}
              </Title>
            }
            column={2}
            styles={{
              label: { color: "var(--foreground)", fontWeight: 600 },
              content: { color: "var(--foreground)" },
            }}
          >
            <Descriptions.Item label="Account Holder">
              {account?.title} {account?.firstName} {account?.lastName}
            </Descriptions.Item>

            <Descriptions.Item label="Date Of Birth">
              {dayjs(account?.dateOfBirth).format("DD MMM YYYY hh:mm A")}
            </Descriptions.Item>

            <Descriptions.Item label="Occupation">
              {account?.occupation}
            </Descriptions.Item>
            <Descriptions.Item label="House Number Or Name">
              {account?.houseNumberOrName}
            </Descriptions.Item>
            <Descriptions.Item label="Street Name">
              {account?.streetName}
            </Descriptions.Item>
            <Descriptions.Item label="Town">{account?.town}</Descriptions.Item>
            <Descriptions.Item label="Region">
              {account?.region}
            </Descriptions.Item>
            <Descriptions.Item label="Postcode">
              {account?.postcode}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {account?.country}
            </Descriptions.Item>

            <Descriptions.Item label="Moved In Date">
              {dayjs(account?.movedInDate).format("DD MMM YYYY hh:mm A")}
            </Descriptions.Item>

            {/* Phones */}
            {[...new Set(phones.map((p) => p.type))].map((type: string) => (
              <Descriptions.Item
                key={type}
                label={`${type.charAt(0).toUpperCase() + type.slice(1)} Phone`}
              >
                {phones
                  .filter((phone: Phone) => phone.type === type)
                  .map((phone: Phone, index: number) => (
                    <div key={index}>
                      {phone.countryCode} {phone.number}{" "}
                      {phone.isPrimary ? "(Primary)" : ""}
                    </div>
                  ))}
              </Descriptions.Item>
            ))}

            <Descriptions.Item label="Email">
              {account?.email}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Company Account */}
        {applicant.individualAccount && (
          <Descriptions
            title={
              <Title
                level={5}
                style={{ marginBottom: 0, color: "var(--primary-color)" }}
              >
                Company Account Informations
              </Title>
            }
            column={2}
            styles={{
              label: { color: "var(--foreground)", fontWeight: 600 },
              content: { color: "var(--foreground)" },
            }}
          >
            <Descriptions.Item label="Company Name">
              {companyAccount?.companyName}
            </Descriptions.Item>

            <Descriptions.Item label="Company Type">
              {companyAccount?.companyType}
            </Descriptions.Item>

            <Descriptions.Item label="Company Number">
              {companyAccount?.companyNumber}
            </Descriptions.Item>

            <Descriptions.Item label="Tax Code">
              {companyAccount?.taxCode}
            </Descriptions.Item>

            <Descriptions.Item label="Tax Code Exemption">
              {companyAccount?.taxCodeExemption}
            </Descriptions.Item>

            <Descriptions.Item label="Date Of Registration">
              {dayjs(companyAccount?.dateOfRegistration).format(
                "DD MMM YYYY hh:mm A",
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Business Activity">
              {companyAccount?.businessActivity}
            </Descriptions.Item>

            <Descriptions.Item label="Address">
              {companyAccount?.address}
            </Descriptions.Item>

            <Descriptions.Item label="StreetName">
              {companyAccount?.streetName}
            </Descriptions.Item>

            <Descriptions.Item label="Town">
              {companyAccount?.town}
            </Descriptions.Item>

            <Descriptions.Item label="Region">
              {companyAccount?.region}
            </Descriptions.Item>

            <Descriptions.Item label="Postcode">
              {companyAccount?.postcode}
            </Descriptions.Item>

            <Descriptions.Item label="Country">
              {companyAccount?.country}
            </Descriptions.Item>

            <Descriptions.Item label="Relevant Categories">
              {companyAccount?.relevantCategories}
            </Descriptions.Item>

            <Descriptions.Item label="Name Of Market Or Exchange">
              {companyAccount?.nameofMarketOrExchange}
            </Descriptions.Item>

            <Descriptions.Item label="Company Code">
              {companyAccount?.companyCode}
            </Descriptions.Item>

            <Descriptions.Item label="Listed Company Name">
              {companyAccount?.listedCompanyName}
            </Descriptions.Item>

            <Descriptions.Item label="Regulator Name">
              {companyAccount?.regulatorName}
            </Descriptions.Item>

            <Descriptions.Item label="Licence Details">
              {companyAccount?.licenceDetails}
            </Descriptions.Item>

            <Descriptions.Item label="Company Tax Classification">
              {companyAccount?.companyTaxClassification}
            </Descriptions.Item>

            {officers.map((officer, index) => (
              <React.Fragment key={index}>
                <Descriptions.Item span={2}>
                  <Title
                    level={5}
                    style={{ marginBottom: 0, color: "var(--primary-color)" }}
                  >
                    {`Company ${index + 1}`}
                  </Title>
                  {/* <Divider orientation="left">{`Company ${index + 1}`}</Divider> */}
                </Descriptions.Item>

                <Descriptions.Item label="Officer Name">
                  {officer.title} {officer.firstName} {officer.middleName || ""}{" "}
                  {officer.lastName}
                </Descriptions.Item>

                <Descriptions.Item label="Officer Role">
                  {officer.roleInCompany}
                </Descriptions.Item>
              </React.Fragment>
            ))}

            <Descriptions.Item label="Company Ownership">
              {companyAccount?.companyOwnership}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Space>

      {/* 🔹 Actions */}
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 15,
        }}
        size={10}
      >
        <Button
          onClick={onClose}
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
          onClick={onReject}
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
          onClick={onApprove}
          style={{
            padding: "6px 14px",
            background: "var(--primary-color)",
            border: "none",
            color: "var(--foreground)",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Approve
        </Button>
      </Space>
    </Modal>
  );
};

export default ApplicantDetailsModal;
