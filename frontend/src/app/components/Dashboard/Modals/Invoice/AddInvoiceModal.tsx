/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  DatePicker,
  AutoComplete,
  Space,
  Flex,
  InputNumber,
  Typography,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../ModalStyles/ModalStyles.css";
import { formatSortCode } from "@/app/components/utils/SortCode/formatSortCode";

const { Option } = Select;
const { Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const clinetNames = [
  "Beth Potter Ltd - David Butler",
  "David Harvey",
  "Haresh Shah",
  "Luke Shaw",
  "Tony Stark",
];

const invoicingCompanies = [
  "Company Invoice 001",
  "Company Invoice 002",
  "Company Invoice 003",
  "Company Invoice 004",
];

const currencies = ["£"];

const AddInvoiceModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

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

  /* 🔹 Autocomplete search */
  const handleParticipantSearch = debounce(async (value: string) => {
    if (!value || value.length < 3) return [];

    // 🔁 API call placeholder
    return [
      { value: "John Smith", id: 12 },
      { value: "Alex Whitmore", id: 3 },
    ];
  }, 400);

  const onFinish = (values: any) => {
    console.log("Submit:", values);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Add Invoice"
      destroyOnHidden
      centered
      width="95vw"
      className="modal-container"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          invoiceStatus: "Open",
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
            {/* LEFT COLUMN */}
            <Col xs={24} lg={12}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                  }}
                >
                  Invoice Information
                </Title>

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
                    <Option value="" className="modal-select">
                      Please select...
                    </Option>

                    {clinetNames.map((title) => (
                      <Option
                        key={title}
                        value={title}
                        className="modal-select"
                      >
                        {title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoicing Company:"
                      name="invoicingCompany"
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
                        <Option value="" className="modal-select">
                          Please select...
                        </Option>

                        {invoicingCompanies.map((title) => (
                          <Option
                            key={title}
                            value={title}
                            className="modal-select"
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Number:"
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Date:"
                      name="invoiceDate"
                      rules={[{ required: true, message: "" }]}
                    >
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Due Date:"
                      name="invoiceDueDate"
                      rules={[{ required: true, message: "" }]}
                    >
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Total:"
                      name="invoiceTotal"
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Currency:"
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
                        <Option value="" className="modal-select">
                          Please select...
                        </Option>

                        {currencies.map((title) => (
                          <Option
                            key={title}
                            value={title}
                            className="modal-select"
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Invoice Status:"
                      name="invoiceStatus"
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
                        <Option value="" className="modal-select">
                          Please select...
                        </Option>

                        {["Open", "Paid", "Deleted"].map((title) => (
                          <Option
                            key={title}
                            value={title}
                            className="modal-select"
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Administratation Fee:"
                      name="administratationFee"
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

                <Form.Item
                  label="Link Invoice to Fund Payment:"
                  name="linkInvoiceToFundPayment:"
                >
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement!
                    }
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please select..."
                  >
                    {/* Default option */}
                    <Option value="" className="modal-select">
                      Please select...
                    </Option>

                    {/* {currencies.map((title) => (
                      <Option
                        key={title}
                        value={title}
                        className="modal-select"
                      >
                        {title}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>
              </div>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} lg={12}>
              <Flex
                vertical
                justify="space-between"
                style={{ height: "100%", rowGap: 16 }}
              >
                <div className="modal-container-col">
                  <Title
                    level={5}
                    style={{
                      color: "var(--foreground)",
                      fontWeight: 500,
                    }}
                  >
                    Banking Information
                  </Title>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Bank Name:"
                        name="bankName"
                        // rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Account Name:" name="accountName">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Account Number:"
                        name="accountNumber"
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
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Sort Code:"
                        name="sortCode"
                        rules={[
                          { required: true, message: "" },
                          {
                            pattern: /^\d{2}-\d{2}-\d{2}$/,
                            message: "Format must be 12-34-56",
                          },
                        ]}
                        getValueFromEvent={(e) =>
                          formatSortCode(e.target.value)
                        }
                      >
                        <Input placeholder="12-34-56" maxLength={8} />
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
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Payment Reference:"
                        name="paymentReference"
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Payment Description:"
                        name="paymentDescription"
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
                          <Option value="" className="modal-select">
                            Please select...
                          </Option>

                          {[
                            "Advisory",
                            "AV 7441",
                            "Consulting",
                            "Consulting Services",
                            "XS01387 WAGNER",
                          ].map((title) => (
                            <Option
                              key={title}
                              value={title}
                              className="modal-select"
                            >
                              {title}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                {/* ================= ROW 2 : FOOTER BUTTONS ================= */}
                <Row
                  justify="end"
                  gutter={12}
                  className="deal-ticket-modal-footer"
                >
                  <Col>
                    <Button
                      type="primary"
                      onClick={onClose}
                      className="cancel-btn"
                    >
                      <FontAwesomeIcon icon={faCircleLeft} /> Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn"
                    >
                      Create Invoice <FontAwesomeIcon icon={faCircleRight} />
                    </Button>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default AddInvoiceModal;
