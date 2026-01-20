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
  Space,
  Grid,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "./CreateApplicantModal.css";

const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Rev", "Other"];

const CreateApplicantModal = ({ open, onClose }: Props) => {
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
      title="Create Applicant"
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
            <Col xs={24} lg={24}>
              <div className="deal-ticket-modal-col client-details-col">
                <h3>Personal Information</h3>

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
                            className="deal-ticket-modal-select"
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
                  rules={[{ required: true, message: "" }]} // empty message
                >
                  <Input placeholder="firstname@xyz.com" />
                </Form.Item>
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
              <Button type="primary" className="save-btn cancel-btn">
                Save <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Save & Send Application <FontAwesomeIcon icon={faCircleRight} />
              </Button>
            </Col>

            <Col>
              <Button type="primary" onClick={onClose} className="cancel-btn">
                <FontAwesomeIcon icon={faCircleLeft} /> Cancel
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default CreateApplicantModal;
