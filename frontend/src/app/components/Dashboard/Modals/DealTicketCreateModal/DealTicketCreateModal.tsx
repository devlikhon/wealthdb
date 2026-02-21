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
  message,
  Space,
  InputNumber,
  Typography,
} from "antd";
import { debounce } from "lodash";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import "../ModalStyles/ModalStyles.css";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import axios from "axios";
import { useEffect } from "react";

const { Option } = Select;
const { Text, Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  ticket?: any; // optional for edit mode
}

const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Rev", "Other"];
const identificationTypes = ["Driving Licence", "Passport"];
const states = [
  "Aberdeenshire",
  "Angus",
  "Argyll and Bute",
  "Avon",
  "Barking and Dagenham",
  "Barnet",
  "Barnsley",
  "Bath and North East Somerset",
  "Bedfordshire",
  "Berkshire",
  "York",
];
const securities = ["Aviva 6.125%", "JP Morgan 8.81%"];
const settlementPeriods = ["T0", "T1", "T3", "T5"];
const durationOptions = [
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
  { value: 24, label: "24 months" },
  { value: 36, label: "36 months" },
  { value: 48, label: "48 months" },
  { value: 60, label: "60 months" },
  { value: 72, label: "72 months" },
];

const DealTicketCreateModal = ({ open, onClose, ticket }: Props) => {
  const [form] = Form.useForm();
  const { user, fetchTickets, updateTicket } = useGlobal();

  const isEditMode = !!ticket;

  const clientName = Form.useWatch("clientName", form);

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

  useEffect(() => {
    if (ticket && open) {
      form.setFieldsValue({
        ...ticket.clientContact,
        ...ticket.clientAddress,
        ...ticket.dealDetails,
      });
    }
  }, [ticket, open]);

  // 🔹 Final submit
  const onFinish = async (values: any) => {
    try {
      const payload = {
        clientContact: {
          clientName: values.clientName,
          title: values.title,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          identificationType: values.identificationType,
          documentNumber: Number(values.documentNumber),
        },
        clientAddress: {
          houseNumberOrName: values.houseNumberOrName,
          streetName: values.streetName,
          suburb: values.suburb,
          state: values.state,
          postcode: Number(values.postcode),
        },
        dealDetails: {
          clientName: values.clientName,
          security: values.security,
          seller: values.seller,
          tradeAmount: Number(values.tradeAmount),
          settlementPeriod: values.settlementPeriod,
          investmentLength: values.investmentLength,
          representative: user?.email,
        },
      };

      if (isEditMode) {
        // ✅ UPDATE
        await updateTicket(ticket._id, payload);
        // message.success("Deal Ticket Updated Successfully ✅");
      } else {
        // ✅ CREATE (your existing logic)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
          payload,
          { withCredentials: true },
        );

        message.success(res.data.message || "Ticket Created Successfully ✅");
      }

      form.resetFields();
      await fetchTickets();
      onClose();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Operation Failed ❌");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      // title="Create Deal Ticket"
      title={isEditMode ? "Edit Deal Ticket" : "Create Deal Ticket"}
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
      >
        <Space orientation="vertical" size={24} style={{ width: "100%" }}>
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            {/* CLIENT DETAILS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Client Contact Details
                </Title>
                <Text
                  style={{
                    color: "var(--foreground)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  Please enter the client details
                </Text>

                <Form.Item label="Client Name:" name="clientName">
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  {/* Title */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Title:"
                      name="title"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Select"
                      >
                        {titles.map((title) => (
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

                  {/* First Name */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="First Name:"
                      name="firstName"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* Last Name */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Last Name:"
                      name="lastName"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Email Address:"
                  name="email"
                  rules={[
                    { required: true, message: "" },
                    { type: "email", message: "" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  {/* Identification Type */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Identification Type:"
                      name="identificationType"
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please Select..."
                      >
                        {identificationTypes.map((i) => (
                          <Option key={i} value={i} className="modal-select">
                            {i}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Document Number */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Document Number:" name="documentNumber">
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
              </div>
            </Col>

            {/* ADDRESS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Client Address
                </Title>
                <Text
                  style={{
                    color: "var(--foreground)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  Please enter the clients address
                </Text>

                <Form.Item
                  label="House number or name:"
                  name="houseNumberOrName"
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Street name:" name="streetName">
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  {/* Suburb */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Suburb:" name="suburb">
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* State / County */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="State:" name="state">
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please Select..."
                      >
                        {states.map((state) => (
                          <Option
                            key={state}
                            value={state}
                            className="modal-select"
                          >
                            {state}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Postcode:" name="postcode">
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
              </div>
            </Col>

            {/* DEAL DETAILS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Deal Details
                </Title>
                <Text
                  style={{
                    color: "var(--foreground)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  Please add the deal details
                </Text>

                <Form.Item
                  label="Security:"
                  name="security"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement!
                    }
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please Select..."
                  >
                    {securities.map((security) => (
                      <Option
                        key={security}
                        value={security}
                        className="modal-select"
                      >
                        {security}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Seller:" name="seller">
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement!
                    }
                    suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    placeholder="Please Select..."
                  >
                    <Option
                      key={clientName}
                      value={clientName}
                      className="modal-select"
                    >
                      {clientName}
                    </Option>
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  {/* Trade Amount */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Trade Amount:"
                      name="tradeAmount"
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

                  {/* Settlement Period */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Settlement Period:"
                      name="settlementPeriod"
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please Select..."
                      >
                        {settlementPeriods.map((period) => (
                          <Option
                            key={period}
                            value={period}
                            className="modal-select"
                          >
                            {period}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16} className="clear-fix">
                  {/* Investment Length */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Investment Length:"
                      name="investmentLength"
                      rules={[
                        {
                          required: true,
                          message: "",
                        },
                      ]}
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please Select..."
                      >
                        {durationOptions.map((item) => (
                          <Option
                            key={item.value}
                            value={item.value}
                            className="modal-select"
                          >
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Representative */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Representative"
                      name="representative"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentElement!
                        }
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please Select..."
                      >
                        <Option className="modal-select" value="alex">
                          {/* Alex Whitmore */}
                          {user?.name}
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          {/* FOOTER ACTIONS */}
          <Row justify="end" gutter={12} className="modal-container-footer">
            <Col>
              <Button className="cancel-btn" type="primary" onClick={onClose}>
                <FontAwesomeIcon icon={faCircleLeft} />
                Cancel
              </Button>
            </Col>
            <Col>
              <Button className="submit-btn" type="primary" htmlType="submit">
                Save Deal Sheet
                <FontAwesomeIcon icon={faCircleRight} />
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default DealTicketCreateModal;
