/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Steps, Form, Button, Flex, Row, Col, Grid, message } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

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
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { useRouter } from "next/navigation";

import "../../dashboard.css";

interface ApplicantStepperFormProps {
  token: string;
  applicant: any;
}

const ApplicantStepperForm = ({
  token,
  applicant,
}: ApplicantStepperFormProps) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [accountType, setAccountType] = useState<string>();
  const latestTransformedValues = useRef<any>(null);

  const { progressApplication } = useGlobal();

  const router = useRouter();

  // const currentUser = applicants.find(
  //   (applicant) => applicant.email === user?.email,
  // );

  // const token = params.token;

  // console.log("Current user", currentUser);

  // const token = currentUser?.applicationToken;

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const next = async () => {
    try {
      await form.validateFields(); // validate current fields
      setCurrent(current + 1);
    } catch (err) {
      console.log(err);
      message.error("Validation Failed");
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

  const transformFormValues = async (allValues: any) => {
    let updatedValues = { ...allValues };

    // ✅ Agreements → boolean
    const agreements = allValues?.applicationDeclaration?.agreements || [];
    updatedValues.applicationDeclaration = {
      confirmTruth: agreements.includes("confirmTruth"),
      selfCertification: agreements.includes("selfCertification"),
    };

    // ✅ Phones normalize
    if (allValues?.individualAccount) {
      const phones = (allValues.individualAccount.phones || [])
        .map((p: any, index: number) => {
          if (!p?.number) return null;

          const parsed = parsePhoneNumberFromString(`+${p.number}`);
          if (!parsed) return null;

          return {
            countryCode: `+${parsed.countryCallingCode}`,
            number: parsed.nationalNumber,
            type: index === 0 ? "home" : "mobile",
          };
        })
        .filter(Boolean); // ✅ drop the nulls

      updatedValues.individualAccount = {
        ...allValues.individualAccount,
        phones,
      };
    }

    // if (allValues?.individualAccount) {
    //   const phones =
    //     allValues.individualAccount.phones?.map((p: any, index: number) => {
    //       if (!p?.number) return null;

    //       const parsed = parsePhoneNumberFromString(`+${p.number}`);
    //       if (!parsed) return null;

    //       return {
    //         countryCode: `+${parsed.countryCallingCode}`,
    //         number: parsed.nationalNumber,
    //         type: index === 0 ? "home" : "mobile",
    //       };
    //     }) || [];

    //   updatedValues.individualAccount = {
    //     ...allValues.individualAccount,
    //     phones,
    //   };
    // }

    // ✅ Account type cleanup
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

    // ✅ Settlement cleanup
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

    // ✅ Adviser cleanup
    if (allValues?.additionalInformation?.adviserAppointement?.type === "No") {
      delete updatedValues.additionalInformation.adviserAppointement
        .adviserAppointementDetails;
    }

    // ✅ Identification normalize
    updatedValues = await normalizeIdentification(updatedValues);

    // console.log("From transform:", updatedValues);

    return updatedValues;
  };

  const onValuesChange = async (changedValues: any, allValues: any) => {
    const updatedValues = await transformFormValues(allValues);
    latestTransformedValues.current = updatedValues;
    handleAutoSave(updatedValues);
  };

  // const onValuesChange = async () => {
  //   const allValues = form.getFieldsValue(true);

  //   const updatedValues = await transformFormValues(allValues);

  //   // ✅ store latest
  //   latestTransformedValues.current = updatedValues;

  //   handleAutoSave(updatedValues);
  // };

  // const onValuesChange = async () => {
  //   const allValues = form.getFieldsValue(true);

  //   let updatedValues = { ...allValues };

  //   // normalize identification
  //   updatedValues = await normalizeIdentification(updatedValues);

  //   updatedValues = await transformFormValues(allValues);

  //   handleAutoSave(updatedValues);
  // };

  const onFinish = async () => {
    try {
      await form.validateFields();

      // ✅ Always recompute from the CURRENT form state at submit time —
      // never trust a ref that may lag behind an in-flight async update.
      const finalValues = await transformFormValues(form.getFieldsValue(true));

      if (!token) {
        message.error("Application token not found!");
        return;
      }

      await progressApplication(token, finalValues);
      router.replace("/application/submitted");
    } catch (err) {
      console.error("Submit error:", err);
      message.error("Error submitting application");
    }
  };

  // const onFinish = async () => {
  //   try {
  //     await form.validateFields();

  //     // ✅ 1. Flush pending debounce (VERY IMPORTANT)
  //     handleAutoSave.flush();

  //     // ✅ use latest auto-saved data instead of recalculating
  //     const finalValues =
  //       latestTransformedValues.current ||
  //       (await transformFormValues(form.getFieldsValue(true)));

  //     if (!token) {
  //       message.error("Application token not found!");
  //       return;
  //     }

  //     // console.log("Progress application result:", finalValues);
  //     await progressApplication(token, finalValues);
  //     // console.log("Progress application result:", result);
  //     router.replace("/application/submitted");
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //     message.error("Error submitting application");
  //   }
  // };

  useEffect(() => {
    if (!applicant) return;

    form.setFieldsValue(applicant);

    if (applicant.accountType) {
      setAccountType(applicant.accountType);
    }
  }, [applicant, form]);

  // const onFinish = async () => {
  //   try {
  //     const allValues = await form.validateFields();

  //     const updatedValues = await transformFormValues(allValues);

  //     if (!token) {
  //       message.error("Application token not found!");
  //       return;
  //     }

  //     const result = await progressApplication(token, updatedValues);
  //     console.log("Progress application result:", result);
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //     message.error("Error submitting application");
  //   }
  // };

  // const onFinish = async () => {
  //   try {
  //     const allValues = await form.validateFields();

  //     const updatedValues = await transformFormValues(allValues);

  //     if (!token) {
  //       message.error("Application token not found!");
  //       return;
  //     }

  //     await progressApplication(token, updatedValues);
  //   } catch (err) {
  //     // Validation errors automatically show in AntD
  //     console.log("Validation failed", err);
  //   }
  // };

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
          className="custom-steps"
          responsive={false}
          current={current}
          // type="navigation"
          size="small"
          orientation="horizontal"
          titlePlacement="vertical"
          // percent={50}
          ellipsis
          // status="error"
          items={[
            { title: screens.sm ? "Account Type" : "" },
            { title: screens.sm ? "Account Details" : "" },
            { title: screens.sm ? "Identification" : "" },
            { title: screens.sm ? "Additional Information" : "" },
            { title: screens.sm ? "Settlement" : "" },
            { title: screens.sm ? "Declaration" : "" },
          ]}
          style={{ width: "100%" }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={(errorInfo) => {
          //   console.log("FAILED:", errorInfo);
          // }}
          onValuesChange={onValuesChange}
          // scrollToFirstError
          // preserve
        >
          {steps[current].content}

          <Row
            wrap
            // justify={screens.md ? "space-between" : "center"}
            justify={"space-between"}
            gutter={[12, 16]}
            className="modal-container-footer"
            style={{ marginTop: 16 }}
          >
            {current > 0 && (
              <Col>
                <Button
                  type="primary"
                  onClick={prev}
                  className="save-btn cancel-btn"
                  style={{
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ fontSize: 12 }}
                  />{" "}
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
                  style={{
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                  }}
                >
                  Submit Application{" "}
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ fontSize: 12 }}
                  />
                </Button>
              </Col>
            )}

            {current < steps.length - 1 && (
              <Col>
                <Button
                  type="primary"
                  onClick={next}
                  className="cancel-btn"
                  style={{
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                  }}
                >
                  Next{" "}
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ fontSize: 12 }}
                  />
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </Flex>
    </Flex>
  );
};

export default ApplicantStepperForm;
