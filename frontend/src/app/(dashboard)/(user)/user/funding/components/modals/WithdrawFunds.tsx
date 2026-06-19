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
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./ModalStyles.css";

const { Option } = Select;
const { Text, Title } = Typography;

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

const currencies = ["£"];

const WithdrawFundsModal = ({ open, onClose }: Props) => {
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
      title="Withdraw Funds"
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
              <div className="modal-container-col">
                <Form.Item
                  label="I'd like to withdraw (£):"
                  name="withdrawFunds"
                  rules={[{ required: true, message: "" }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="5,000"
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

                <Text
                  style={{
                    color: "var(--foreground)",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  When clicking request, your fund amount will be submitted for
                  review to your account manager. Please check your email for
                  our response.
                </Text>
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
                Withdraw Funds <FontAwesomeIcon icon={faFloppyDisk} />
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

export default WithdrawFundsModal;
