/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  Form,
  Select,
  Row,
  Col,
  Button,
  Space,
  Grid,
  DatePicker,
  InputNumber,
  Typography,
  Input,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../../ModalStyles/ModalStyles.css";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { useEffect } from "react";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  applicants: any[];
  bond: any;
}

type InvestmentPayload = {
  bondNumber: string;
  investmentAmount: number;
  investmentCurrency: string;
  investmentLength: "Fixed Length" | "Fixed End Date";
  bondInvestmentOption: string;
  profitPercentage: number;
  bondLengthInMonths?: number;
  maturityDate?: string;
};

const currencies = ["£"];

const UpdateBondModal = ({ open, onClose, applicants, bond }: Props) => {
  const [form] = Form.useForm();

  const investmentLengthTerm = Form.useWatch("investmentLengthTerm", form);

  // Default to "Fixed Length" if nothing is selected yet
  const term = investmentLengthTerm || "Fixed Length";

  console.log("Applicants:", applicants);
  console.log("Bond:", bond);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { updateBond } = useGlobal();

  // const selectedApplicant = applicants.find(
  //   (app) => app._id === bond?.applicantId,
  // );

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  // 🔹 Auto-save / update handler (debounced)
  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", values);

    // TODO:
    // updateDealTicket(values)
  }, 500);

  // 🔹 Called on every field change
  const onValuesChange = (changed: any, allValues: any) => {
    if ("investmentLengthTerm" in changed) {
      if (changed.investmentLengthTerm === "Fixed Length") {
        form.setFieldValue("maturityDate", null);
      } else {
        form.setFieldValue("bondLength", undefined);
      }
    }

    handleAutoSave(allValues);
  };

  const onFinish = async (values: any) => {
    console.log("Submit:", values);

    // const applicantId = values.clientName;

    const payload: InvestmentPayload = {
      bondNumber: values.bondNumber,
      investmentAmount: Number(values.investmentAmount),
      investmentCurrency: values.currency || "£", // ✅ default fallback
      investmentLength: values.investmentLengthTerm,
      bondInvestmentOption: values.bondInvestmentOption,
      profitPercentage: Number(values.profitPercentage),
    };

    if (values.investmentLengthTerm === "Fixed Length") {
      payload.bondLengthInMonths = Number(values.bondLength);
    }

    if (
      values.investmentLengthTerm === "Fixed End Date" &&
      values.maturityDate
    ) {
      payload.maturityDate = values.maturityDate.toISOString();
    }

    // console.log("Before sending", applicantId, payload);

    await updateBond(bond.applicantId, bond._id, payload);

    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (!bond) return;

    form.setFieldsValue({
      //   clientName: bond.applicantId,
      clientName: `${bond.applicant.title} ${bond.applicant.firstName} ${bond.applicant.lastName}`,
      bondNumber: bond.bondNumber,
      investmentLengthTerm: bond.investmentLength,
      bondLength: bond.bondLengthInMonths,
      maturityDate: bond.maturityDate ? dayjs(bond.maturityDate) : null,
      bondInvestmentOption: bond.bondInvestmentOption,
      currency: bond.investmentCurrency,
      investmentAmount: bond.investmentAmount,
      profitPercentage: bond.profitPercentage,
    });
  }, [bond, form]);

  return (
    <Modal
      open={open}
      //   onCancel={onClose}
      onCancel={handleClose}
      footer={null}
      title="Update this bond"
      destroyOnHidden
      centered
      width={screens.md ? "60vw" : "95vw"}
      className="modal-container add-new-bond-modal"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Space orientation="vertical" size={24} style={{ width: "100%" }}>
          {/* ================= ROW 1 : FORM CONTENT ================= */}
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            <Col xs={24} lg={24}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Bond Information
                </Title>
                <Text
                  style={{
                    color: "var(--foreground)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  Please add the clients total fund
                </Text>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Client Name" name="clientName">
                      <Input readOnly />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Bond Number:"
                      name="bondNumber"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.Item label="Client Name:" name="clientName">
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement!
                    }
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    value={selectedApplicant?._id}
                    options={
                      selectedApplicant
                        ? [
                            {
                              value: selectedApplicant._id,
                              label: `${selectedApplicant.title} ${selectedApplicant.firstName} ${selectedApplicant.lastName}`,
                            },
                          ]
                        : []
                    }
                  />
                </Form.Item> */}

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Investment Length Term:"
                      name="investmentLengthTerm"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                        options={[
                          { value: "", label: "Please select..." },
                          { value: "Fixed Length", label: "Fixed Length" },
                          { value: "Fixed End Date", label: "Fixed End Date" },
                        ]}
                      />
                      {/* <Option className="modal-select" value="">
                          Please select...
                        </Option>
                        <Option className="modal-select" value="Fixed Length">
                          Fixed Length
                        </Option>
                        <Option className="modal-select" value="Fixed End Date">
                          Fixed End Date
                        </Option> */}
                      {/* </Select> */}
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    {term === "Fixed Length" && (
                      <Form.Item
                        label="Bond Length (Months):"
                        name="bondLength"
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          controls={false}
                          min={0}
                          stringMode
                        />
                      </Form.Item>
                    )}
                    {term === "Fixed End Date" && (
                      <Form.Item label="Maturity Date:" name="maturityDate">
                        <DatePicker
                          placeholder="Select date"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    )}
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Bond Name:"
                      name="bondInvestmentOption"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                      {/* <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                        options={[
                          { value: "", label: "Please select..." },
                          {
                            value: "Goldman Sachs Corp",
                            label: "Goldman Sachs Corp",
                          },
                          {
                            value: "HSBC Holdings Plc",
                            label: "HSBC Holdings Plc",
                          },
                          {
                            value: "Natwest Plc",
                            label: "Natwest Plc",
                          },
                        ]}
                      /> */}
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Investment Currency:" name="currency">
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                        options={[
                          { value: "", label: "Please select..." },
                          ...currencies.map((currency) => ({
                            value: currency,
                            label: currency,
                          })),
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  {/* Investment Amount */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Investment Amount:"
                      name="investmentAmount"
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

                  {/* Profit Percentage  */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Profit Percentage:"
                      name="profitPercentage"
                      rules={[{ required: true, message: "" }]}
                    >
                      {/* <InputNumber
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
                      /> */}
                      <InputNumber
                        style={{ width: "100%" }}
                        controls={false}
                        min={0}
                        step={0.01}
                        stringMode
                        onKeyDown={(e) => {
                          if (
                            !/[0-9.]/.test(e.key) &&
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
              </div>
            </Col>
          </Row>

          {/* ================= ROW 2 : FOOTER BUTTONS ================= */}
          <Row
            wrap
            justify={screens.md ? "end" : "center"}
            gutter={[12, 16]}
            className="modal-container-footer"
          >
            <Col>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Update Bond <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>
            </Col>

            <Col>
              <Button
                type="primary"
                onClick={handleClose}
                className="cancel-btn"
              >
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default UpdateBondModal;
