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
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./AddFundingModal.css";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const clinetNames = [
  "David Butler (Current active fund)",
  "David Harvey (Existing completed fund)",
  "Haresh Shah (Current active fund)",
  "Luke Shaw",
  "Tony Stark (Current active fund)",
];

const currencies = ["GBP"];

const AddFundingModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

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
      title="Create Fund"
      destroyOnHidden
      centered
      width={screens.md ? "60vw" : "95vw"}
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
          {/* ================= ROW 1 : FORM CONTENT ================= */}
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            <Col xs={24} lg={24}>
              <div className="modal-container-col client-details-col">
                <h3>Fund Information</h3>
                <p>Please create the clients total fund</p>

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
                  {/* Title */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="transactionDate"
                      label="Transaction Date:"
                      className="responsive-date-picker"
                      rules={[{ required: true, message: "" }]}
                    >
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* First Name */}
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

                  {/* Fund Total: */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Fund Total:"
                      name="totalFund"
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
                Create Fund <FontAwesomeIcon icon={faFloppyDisk} />
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

export default AddFundingModal;
