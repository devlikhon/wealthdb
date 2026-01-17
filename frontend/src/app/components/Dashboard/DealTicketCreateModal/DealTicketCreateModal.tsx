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
} from "antd";
import { debounce } from "lodash";
import "./DealTicketCreateModal.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const DealTicketCreateModal = ({ open, onClose }: Props) => {
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

  // 🔹 Final submit
  const onFinish = (values: any) => {
    console.log("Final submit:", values);

    // TODO:
    // createDealTicket(values)

    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Create Deal Ticket"
      destroyOnClose
      centered
      width="95vw"
      className="deal-ticket-modal"
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            {/* CLIENT DETAILS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="deal-ticket-modal-col client-details-col">
                <h3>Client Contact Details</h3>
                <p>Please enter the client details</p>

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
                        <Option className="deal-ticket-modal-select" value="Mr">
                          Mr
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Mrs"
                        >
                          Mrs
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Miss"
                        >
                          Miss
                        </Option>
                        <Option className="deal-ticket-modal-select" value="Ms">
                          Ms
                        </Option>
                        <Option className="deal-ticket-modal-select" value="Dr">
                          Dr
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Rev"
                        >
                          Rev
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Other"
                        >
                          Other
                        </Option>
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
                  rules={[{ required: true, message: "" }]} // empty message
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
                        <Option
                          className="deal-ticket-modal-select"
                          value="Driving Licence"
                        >
                          Driving Licence
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Passport"
                        >
                          Passport
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Document Number */}
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Document Number:" name="documentNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* ADDRESS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="deal-ticket-modal-col address-details-col">
                <h3>Client Address</h3>
                <p>Please enter the clients address</p>

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
                        <Option
                          className="deal-ticket-modal-select"
                          value="Aberdeenshire"
                        >
                          Aberdeenshire
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Angus"
                        >
                          Angus
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Argyll and Bute"
                        >
                          Argyll and Bute
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Avon"
                        >
                          Avon
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Barking and Dagenham"
                        >
                          Barking and Dagenham
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Barnet"
                        >
                          Barnet
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Barnsley"
                        >
                          Barnsley
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Bath and North East Somerset"
                        >
                          Bath and North East Somerset
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Bedfordshire"
                        >
                          Bedfordshire
                        </Option>
                        <Option
                          className="deal-ticket-modal-select"
                          value="Berkshire"
                        >
                          Berkshire
                        </Option>
                        {/* ...add all other states as needed */}
                        <Option
                          className="deal-ticket-modal-select"
                          value="York"
                        >
                          York
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Postcode:" name="postcode">
                  <Input />
                </Form.Item>
              </div>
            </Col>

            {/* DEAL DETAILS */}
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="deal-ticket-modal-col deal-details-col">
                <h3>Deal Details</h3>
                <p>Please add the deal details</p>

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
                    <Option className="deal-ticket-modal-select" value="1">
                      Aviva 6.125%
                    </Option>
                    <Option className="deal-ticket-modal-select" value="2">
                      JP Morgan 8.81%
                    </Option>
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
                    <Option className="deal-ticket-modal-select" value="1">
                      Aviva 6.125%
                    </Option>
                    <Option className="deal-ticket-modal-select" value="2">
                      JP Morgan 8.81%
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
                      <Input />
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
                        <Option className="deal-ticket-modal-select" value="0">
                          T0
                        </Option>
                        <Option className="deal-ticket-modal-select" value="1">
                          T1
                        </Option>
                        <Option className="deal-ticket-modal-select" value="3">
                          T3
                        </Option>
                        <Option className="deal-ticket-modal-select" value="5">
                          T5
                        </Option>
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
                        <Option className="deal-ticket-modal-select" value="3">
                          3 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="6">
                          6 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="12">
                          12 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="24">
                          24 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="36">
                          36 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="48">
                          48 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="60">
                          60 months
                        </Option>
                        <Option className="deal-ticket-modal-select" value="72">
                          72 months
                        </Option>
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
                        <Option
                          className="deal-ticket-modal-select"
                          value="alex"
                        >
                          Alex Whitmore
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          {/* FOOTER ACTIONS */}
          <Row justify="end" gutter={12} className="deal-ticket-modal-footer">
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
