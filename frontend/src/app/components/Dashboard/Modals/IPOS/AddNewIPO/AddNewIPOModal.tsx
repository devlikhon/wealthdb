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

const { Text, Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  applicants: any[];
}

type IPOPayload = {
  stockTicker: string;
  stockName: string;
  sharesIssued: number;
  sharesPrice: number;
  sharesType: string;
  marketListed: string;
  maturityDate: string;
  totalReturn: number;
};

const AddNewIPOModal = ({ open, onClose, applicants }: Props) => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { addIPO } = useGlobal();

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

  const onFinish = async (values: any) => {
    console.log("Submit:", values);

    const applicantId = values.clientName;

    const payload: IPOPayload = {
      stockTicker: values.stockTicker,
      stockName: values.stockName,
      sharesIssued: Number(values.sharesIssued),
      sharesPrice: Number(values.sharesPrice),
      sharesType: values.sharesType,
      marketListed: values.marketListed,
      maturityDate: values.maturityDate.toISOString(),
      totalReturn: Number(values.totalReturn),
    };

    console.log("Before sending", applicantId, payload);

    await addIPO(applicantId, payload);

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Add a new IPO"
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
                  Pre-IPO Shares Information
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
                        options={[
                          { value: "", label: "Please select..." },
                          ...applicants?.map((app) => ({
                            value: app._id,
                            label: `${app.title} ${app.firstName} ${app.lastName}`,
                          })),
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Stock Ticker:"
                      name="stockTicker"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Stock Name:"
                      name="stockName"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Shares Issued:"
                      name="sharesIssued"
                      rules={[{ required: true, message: "" }]}
                    >
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

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Shares Price:"
                      name="sharesPrice"
                      rules={[{ required: true, message: "" }]}
                    >
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

                <Row gutter={16}>
                  {/* Shares Type */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Shares Type:"
                      name="sharesType"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* Market Listed  */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Market Listed:"
                      name="marketListed"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* Market Listed  */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Maturity Date:" name="maturityDate">
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
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
                Add IPO <FontAwesomeIcon icon={faFloppyDisk} />
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

export default AddNewIPOModal;
