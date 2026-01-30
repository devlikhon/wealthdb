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
  Input,
  Radio,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./CreatePaymentModal.css";
import { useState } from "react";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const clinetNames = ["Mr Luke Shaw"];

const currencies = ["GBP"];

const CreatePaymentModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const [showFields, setShowFields] = useState(false);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  // 🔹 Auto-save / update handler (debounced)
  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", values);

    // TODO:
    // updateDealTicket(values)
  }, 500);

  // 🔹 Called on every field change
  const onValuesChange = (_changed: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  const onFinish = (values: any) => {
    console.log("Submit:", values);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Create Payment"
      destroyOnHidden
      centered
      width={screens.md ? "60vw" : "95vw"}
      className="deal-ticket-modal"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          paymentMethod: "BankTransfer",
          paymentStatus: "Open",
          invoiceCreateOption: "0",
        }}
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
              <div className="deal-ticket-modal-col client-details-col">
                <h3>Fund Payment Information</h3>
                <p>Please add the payment information</p>

                <Form.Item
                  label="Client Name:"
                  name="clientName"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement!
                    }
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please select..."
                  >
                    {/* Default option */}
                    <Option value="" className="deal-ticket-modal-select">
                      Please select...
                    </Option>

                    {clinetNames.map((title) => (
                      <Option
                        key={title}
                        value={title}
                        className="deal-ticket-modal-select"
                      >
                        {title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Payment Method:"
                  name="paymentMethod"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Radio.Group className="radio-group">
                    <Radio.Button value="BankTransfer">
                      Bank Transfer
                    </Radio.Button>
                    <Radio.Button value="DirectDebit">
                      Direct Debit Payment
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Row gutter={16}>
                  {/* Transaction Date */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="transactionDate"
                      label="Transaction Date:"
                      rules={[{ required: true, message: "" }]}
                    >
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Payment Total: */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Payment Total:"
                      name="totalPayment"
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

                  {/* Currency */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Currency:"
                      name="currency"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                      >
                        {/* Default option */}
                        <Option value="" className="deal-ticket-modal-select">
                          Please select...
                        </Option>

                        {currencies.map((title) => (
                          <Option
                            key={title}
                            value={title}
                            className="deal-ticket-modal-select"
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {/* Payment Status: */}
                <Form.Item
                  label="Payment Status:"
                  name="paymentStatus"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Radio.Group className="radio-group payment-status-radio">
                    <Radio.Button value="Open">Open</Radio.Button>
                    <Radio.Button value="ProofProvided">
                      Proof Provided
                    </Radio.Button>
                    <Radio.Button value="ConfirmPayment">
                      Confirm Payment
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} lg={24}>
              <div className="deal-ticket-modal-col client-details-col">
                <h3>Bank Transfer Information</h3>
                <p>Please provide all the details for the transfer</p>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Bank Name:"
                      name="bankName"
                      // rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Account Name:"
                      name="accountName"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Account Number:"
                      name="accountNumber"
                      // rules={[{ required: true, message: "" }]}
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
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Sort Code:"
                      name="sortCode"
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

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Payment Reference:"
                      name="paymentReference"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={24} lg={24}>
              <div className="deal-ticket-modal-col client-details-col">
                <div className="invoice-descriptions">
                  <div>
                    <h3>Invoice Details</h3>
                    <p>Create an invoice document for this payment</p>
                  </div>

                  <Form.Item
                    label=""
                    name="invoiceCreateOption"
                    // rules={[{ required: true, message: "" }]}
                  >
                    <Radio.Group
                      className="radio-group invoice-radio"
                      onChange={(e) => setShowFields(e.target.value === "1")}
                    >
                      <Radio.Button value="1">Yes</Radio.Button>
                      <Radio.Button value="0">No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </div>

                {showFields && (
                  <>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Invoicing Company:"
                          name="invoicingCompany"
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select
                            getPopupContainer={(triggerNode) =>
                              triggerNode.parentElement!
                            }
                            suffixIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                            placeholder="Please select..."
                          >
                            {/* Default option */}
                            <Option
                              value=""
                              className="deal-ticket-modal-select"
                            >
                              Please select...
                            </Option>

                            {clinetNames.map((title) => (
                              <Option
                                key={title}
                                value={title}
                                className="deal-ticket-modal-select"
                              >
                                {title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Invoice Number"
                          name="invoiceNumber"
                          // rules={[{ required: true, message: "" }]}
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

                    <Row gutter={16}>
                      {/* Invoice Date */}
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          name="invoiceDate"
                          label="Invoice Date:"
                          rules={[{ required: true, message: "" }]}
                        >
                          <DatePicker
                            placeholder="Select date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      {/* Administratation Fee: */}
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Administratation Fee:"
                          name="administratationFee"
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

                    <Row gutter={16}>
                      {/* Invoice Date */}
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          name="invoiceDueDate"
                          label="Invoice Due Date:"
                          rules={[{ required: true, message: "" }]}
                        >
                          <DatePicker
                            placeholder="Select date"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      {/* Administratation Fee: */}
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Payment Description:"
                          name="paymentDescription"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* Add more fields here */}
                  </>
                )}
              </div>
            </Col>
          </Row>

          {/* ================= ROW 2 : FOOTER BUTTONS ================= */}
          <Row
            wrap
            justify={screens.md ? "end" : "center"}
            gutter={[12, 16]}
            className="deal-ticket-modal-footer"
          >
            <Col>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Create Payment <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>
            </Col>

            <Col>
              <Button type="primary" onClick={onClose} className="cancel-btn">
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default CreatePaymentModal;
