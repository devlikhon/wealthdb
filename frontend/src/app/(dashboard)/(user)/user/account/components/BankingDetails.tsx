/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import "../../dashboard/dashboard.css";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

const { Title } = Typography;

const BankingDetails = () => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { user, applicants, updateApplicant } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  // console.log("Current User:", currentUser.settlement.existingBankAccount);

  const handleAutoSave = useMemo(
    () =>
      debounce(async (values: any) => {
        if (!currentUser?._id) return;

        const payload = {
          settlement: {
            existingBankAccount: {
              type: "bankAccountDetails",
              ...values.settlement?.existingBankAccount,
            },
          },
        };

        console.log("Auto updating form data:", payload);
      }, 800),
    [currentUser?._id],
  );

  const onValuesChange = async (_: any, allValues: any) => {
    try {
      await form.validateFields();
      handleAutoSave(allValues);
    } catch {
      // ignore invalid state
    }
  };

  const onFinish = async (values: any) => {
    const payload = {
      settlement: {
        existingBankAccount: {
          type: "bankAccountDetails",
          ...values.settlement.existingBankAccount, // ✅ correct
        },
      },
    };

    await updateApplicant(currentUser._id, payload);
  };

  useEffect(() => {
    if (currentUser?.settlement?.existingBankAccount) {
      const existing = currentUser.settlement.existingBankAccount;

      if (existing.type === "bankAccountDetails") {
        form.setFieldsValue({
          settlement: {
            existingBankAccount: {
              bankAccountDetails: existing.bankAccountDetails,
            },
          },
        });
      }

      if (existing.type === "emailBankAccountDetails") {
        form.setFieldsValue({
          settlement: {
            existingBankAccount: {
              bankAccountDetails: {
                accountName: "",
                bankName: "",
                branch: "",
                sortCode: undefined,
                accountNumber: undefined,
              },
            },
          },
        });
      }
    }

    return () => {
      handleAutoSave.cancel();
    };
  }, [currentUser, form, handleAutoSave]);

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Title
        level={5}
        style={{
          color: "var(--primary-color)",
          fontWeight: 500,
          display: "block",
          padding: "5px 10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
        }}
      >
        Banking Details
      </Title>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Account Name:"
            name={[
              "settlement",
              "existingBankAccount",
              "bankAccountDetails",
              "accountName",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Bank Name:"
            name={[
              "settlement",
              "existingBankAccount",
              "bankAccountDetails",
              "bankName",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Branch:"
            name={[
              "settlement",
              "existingBankAccount",
              "bankAccountDetails",
              "branch",
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Sort Code:"
            name={[
              "settlement",
              "existingBankAccount",
              "bankAccountDetails",
              "sortCode",
            ]}
          >
            <InputNumber
              placeholder="12-34-56"
              style={{ width: "100%" }}
              controls={false} // no arrows
              min={0}
              stringMode
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Account Number:"
            name={[
              "settlement",
              "existingBankAccount",
              "bankAccountDetails",
              "accountNumber",
            ]}
            rules={[{ required: true, message: "" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              controls={false} // no arrows
              min={0}
              stringMode
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        wrap
        justify={screens.md ? "end" : "center"}
        gutter={[12, 16]}
        className="modal-container-footer"
      >
        <Col>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Update Bank Details <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BankingDetails;
