/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Steps, Form, Button, Space, Card, Flex, Row, Col, Grid } from "antd";
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

export default function ApplicantStepperForm() {
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

    let updatedValues = { ...allValues };

    if (allValues?.individualAccount) {
      updatedValues.individualAccount = {
        ...allValues.individualAccount,
        phones,
      };
    }

    // normalize identification
    updatedValues = await normalizeIdentification(updatedValues);

    handleAutoSave(updatedValues);
  };

  const onFinish = async () => {
    const allValues = form.getFieldsValue(true);

    let updatedValues = { ...allValues };

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
  };

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
      content: <AdditionalInformationStep />,
    },

    {
      title: "Settlement",
      content: <SettlementStep />,
    },

    {
      title: "Declaration",
      content: <DeclarationStep />,
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
}
