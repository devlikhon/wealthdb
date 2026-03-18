/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Steps, Form, Button, Flex, Row, Col, Grid } from "antd";
import { useMemo, useState } from "react";

import AccountTypeStep from "./AccountTypeStep";
import IndividualAccountStep from "./IndividualAccountStep";
import JointAccountStep from "./JointAccountStep";
import CompanyAccountStep from "./CompanyAccountStep";
import IdentificationStep from "./IdentificationStep";
import AdditionalInformationStep from "./AdditionalInformationStep";
import SettlementStep from "./SettlementStep";
import DeclarationStep from "./DeclarationStep";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { normalizeIdentification } from "@/app/components/utils/uploadFile/uploadFile";

const ApplicantStepperForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [accountType, setAccountType] = useState<string>();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const next = async () => {
    try {
      await form.validateFields(); // validate current fields
      setCurrent(current + 1);
    } catch (err) {
      console.log("Validation failed");
    }
  };

  // const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleAutoSave = useMemo(
    () =>
      debounce((values: any) => {
        console.log("Auto updating form data:", values);
      }, 500),
    [],
  );

  const onValuesChange = async () => {
    const allValues = form.getFieldsValue(true);

    let updatedValues = { ...allValues };

    console.log(
      "Allvalues",
      allValues?.additionalInformation?.adviserAppointement?.type,
    );

    const phones =
      allValues?.individualAccount?.phones?.map((p: any, index: number) => {
        if (!p?.number) return null;

        const parsed = parsePhoneNumberFromString(`+${p.number}`);

        if (!parsed) return null;

        return {
          countryCode: `+${parsed.countryCallingCode}`,
          number: parsed.nationalNumber,
          type: index === 0 ? "home" : "mobile",
        };
      }) || [];

    if (allValues?.individualAccount) {
      updatedValues.individualAccount = {
        ...allValues.individualAccount,
        phones,
      };
    }

    if (allValues.accountType === "Individual") {
      delete updatedValues.jointAccount;
      delete updatedValues.companyAccount;
    }

    if (allValues.accountType === "Joint") {
      delete updatedValues.individualAccount;
      delete updatedValues.companyAccount;
    }

    if (allValues.accountType === "Company") {
      delete updatedValues.individualAccount;
      delete updatedValues.jointAccount;
    }

    if (
      allValues?.settlement?.existingBankAccount?.type === "bankAccountDetails"
    ) {
      delete updatedValues.settlement.existingBankAccount
        .emailBankAccountDetails;
    }

    if (
      allValues?.settlement?.existingBankAccount?.type ===
      "emailBankAccountDetails"
    ) {
      delete updatedValues.settlement.existingBankAccount.bankAccountDetails;
    }

    if (allValues?.additionalInformation?.adviserAppointement?.type == "No") {
      delete updatedValues.additionalInformation.adviserAppointement
        .adviserAppointementDetails;
    }

    // if (
    //   allValues?.identification?.identityVerification?.type ==
    //   "internationalTravelDocument"
    // ) {
    //   delete updatedValues?.identification?.identityVerification
    //     ?.drivingLicence;
    //   delete updatedValues?.identification?.identityVerification
    //     ?.emailIdentification;
    // }

    // if (
    //   allValues?.identification?.identityVerification?.type == "drivingLicence"
    // ) {
    //   delete updatedValues?.identification?.identityVerification
    //     ?.internationalTravelDocument;
    // }

    // normalize identification
    updatedValues = await normalizeIdentification(updatedValues);

    handleAutoSave(updatedValues);
  };

  const onFinish = async () => {
    try {
      // This will trigger all Form.Item validations
      const allValues = await form.validateFields();

      // Transform the agreements array into booleans
      const agreements = allValues.applicationDeclaration.agreements || [];
      const applicationDeclaration = {
        confirmTruth: agreements.includes("confirmTruth"),
        selfCertification: agreements.includes("selfCertification"),
      };

      // Merge back with the rest of the form values
      let updatedValues = {
        ...allValues,
        applicationDeclaration,
      };

      // Process individual account phones if needed
      if (allValues?.individualAccount) {
        const phones =
          allValues?.individualAccount?.phones?.map((p: any, index: number) => {
            const parsed = parsePhoneNumberFromString(p.number);
            if (!parsed) return null;

            return {
              countryCode: `+${parsed.countryCallingCode}`,
              number: parsed.nationalNumber,
              type: index === 0 ? "home" : "mobile",
            };
          }) || [];

        updatedValues.individualAccount = {
          ...allValues.individualAccount,
          phones,
        };
      }

      updatedValues = await normalizeIdentification(updatedValues);

      console.log(updatedValues);

      // Send to backend here
    } catch (err) {
      // Validation errors automatically show in AntD
      console.log("Validation failed", err);
    }
  };

  // const onFinish = async () => {
  //   const allValues = form.getFieldsValue(true);

  //   let updatedValues = { ...allValues };

  //   if (allValues?.individualAccount) {
  //     const phones =
  //       allValues?.individualAccount?.phones?.map((p: any, index: number) => {
  //         const parsed = parsePhoneNumberFromString(p.number);
  //         if (!parsed) return null;

  //         return {
  //           countryCode: `+${parsed.countryCallingCode}`,
  //           number: parsed.nationalNumber,
  //           type: index === 0 ? "home" : "mobile",
  //         };
  //       }) || [];

  //     updatedValues.individualAccount = {
  //       ...allValues.individualAccount,
  //       phones,
  //     };
  //   }

  //   updatedValues = await normalizeIdentification(updatedValues);

  //   console.log(updatedValues);
  // };

  const steps = [
    {
      title: "Account Type",
      content: <AccountTypeStep form={form} setAccountType={setAccountType} />,
    },

    {
      title: "Account Details",
      content:
        accountType === "Individual" ? (
          <IndividualAccountStep form={form} />
        ) : accountType === "Joint" ? (
          <JointAccountStep form={form} />
        ) : (
          <CompanyAccountStep form={form} />
        ),
    },

    {
      title: "Identification",
      content: <IdentificationStep form={form} />,
    },

    {
      title: "Additional Information",
      content: <AdditionalInformationStep form={form} />,
    },

    {
      title: "Settlement",
      content: <SettlementStep form={form} />,
    },

    {
      title: "Declaration",
      content: <DeclarationStep form={form} />,
    },
  ];

  return (
    <Flex
      justify="space-between"
      align="space-between"
      vertical
      style={{
        background: "var(--secondary-color)",
        // height: "100%",
        width: "100%",
        borderRadius: 8,
        padding: 24,
        rowGap: screens.md ? 32 : 16,
      }}
    >
      <Flex
        vertical
        style={{
          width: "100%",
          rowGap: screens.md ? 32 : 16,
        }}
      >
        <Steps
          current={current}
          // type="navigation"
          size="small"
          // status="error"
          items={[
            { title: "Account Type" },
            { title: "Account Details" },
            { title: "Identification" },
            { title: "Additional Information" },
            { title: "Settlement" },
            { title: "Declaration" },
          ]}
          style={{ width: "100%" }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          preserve
        >
          {steps[current].content}
        </Form>
      </Flex>

      <Row
        wrap
        // justify={screens.md ? "space-between" : "center"}
        justify={"space-between"}
        gutter={[12, 16]}
        className="modal-container-footer"
      >
        {current > 0 && (
          <Col>
            <Button
              type="primary"
              onClick={prev}
              className="save-btn cancel-btn"
              style={{ textTransform: "capitalize", letterSpacing: "0.5px" }}
            >
              <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 12 }} />{" "}
              Previous
            </Button>
          </Col>
        )}

        {current === steps.length - 1 && (
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn"
              style={{ textTransform: "capitalize", letterSpacing: "0.5px" }}
            >
              Submit Application{" "}
              <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 12 }} />
            </Button>
          </Col>
        )}

        {current < steps.length - 1 && (
          <Col>
            <Button
              type="primary"
              onClick={next}
              className="cancel-btn"
              style={{ textTransform: "capitalize", letterSpacing: "0.5px" }}
            >
              Next{" "}
              <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 12 }} />
            </Button>
          </Col>
        )}
      </Row>
    </Flex>
  );
};

export default ApplicantStepperForm;
