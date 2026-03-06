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
  Typography,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "../ModalStyles/ModalStyles.css";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { useEffect, useMemo } from "react";

const { Option } = Select;
const { Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Rev", "Other"];

const CreateApplicantModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  // const [submitting, setSubmitting] = useState(false);
  const { createApplicant } = useGlobal();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  // 🔹 Auto-save / update handler (debounced)
  const handleAutoSave = useMemo(
    () =>
      debounce((values: any) => {
        console.log("Auto updating form data:", values);
      }, 500),
    [],
  );
  // const handleAutoSave = debounce((values: any) => {
  //   console.log("Auto updating form data:", values);

  //   // TODO:
  //   // updateDealTicket(values)
  // }, 500);

  // 🔹 Called on every field change
  const onValuesChange = (_changed: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  const onFinish = async (values: any) => {
    try {
      // setSubmitting(true);

      saveToLocal(values);

      await createApplicant(values);

      clearLocal();
      form.resetFields();
      onClose();
    } catch (error) {
      // handled in createApplicant
    } finally {
      // setSubmitting(false);
    }
  };

  const LOCAL_KEY = "create_applicant_draft";

  const saveToLocal = (values: any) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(values));
    // onClose();
  };

  const getFromLocal = () => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const clearLocal = () => {
    localStorage.removeItem(LOCAL_KEY);
  };

  useEffect(() => {
    if (open) {
      const draft = getFromLocal();
      if (draft) {
        form.setFieldsValue(draft);
      }
    }
  }, [form, open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Create Applicant"
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
            {/* LEFT COLUMN */}
            <Col xs={24} lg={24}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                  }}
                >
                  Personal Information
                </Title>

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
                        placeholder="Select"
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
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
                    {/* <Form.Item
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
                    </Form.Item> */}
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
            className="modal-container-footer"
          >
            <Col>
              <Button
                type="primary"
                className="save-btn cancel-btn"
                onClick={() => {
                  const values = form.getFieldsValue();
                  saveToLocal(values);
                  onClose();
                }}
              >
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
