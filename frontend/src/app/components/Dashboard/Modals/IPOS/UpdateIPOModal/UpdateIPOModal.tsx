/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  Form,
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
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../ModalStyles/ModalStyles.css";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { useEffect } from "react";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  ipo: any;
}

type IPOPayload = {
  stockTicker: string;
  stockName: string;
  sharesIssued: number;
  sharesPrice: number;
  sharesType: string;
  marketListed: string;
  startDate?: string;
  maturityDate: string;
};

const UpdateIPOModal = ({ open, onClose, ipo }: Props) => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { updateIPO } = useGlobal();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", values);
  }, 500);

  const onValuesChange = (_changed: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  const onFinish = async (values: any) => {
    const payload: IPOPayload = {
      stockTicker: values.stockTicker,
      stockName: values.stockName,
      sharesIssued: Number(values.sharesIssued),
      sharesPrice: Number(values.sharesPrice),
      sharesType: values.sharesType,
      marketListed: values.marketListed,
      maturityDate: values.maturityDate.toISOString(),
    };

    if (values.startDate) {
      payload.startDate = values.startDate.toISOString();
    }

    await updateIPO(ipo.applicantId, ipo._id, payload);

    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (!ipo) return;

    form.setFieldsValue({
      clientName: `${ipo.applicant.title} ${ipo.applicant.firstName} ${ipo.applicant.lastName}`,
      stockTicker: ipo.stockTicker,
      stockName: ipo.stockName,
      sharesIssued: ipo.sharesIssued,
      sharesPrice: ipo.sharesPrice,
      sharesType: ipo.sharesType,
      marketListed: ipo.marketListed,
      startDate: ipo.startDate ? dayjs(ipo.startDate) : null,
      maturityDate: ipo.maturityDate ? dayjs(ipo.maturityDate) : null,
    });
  }, [ipo, form]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Update this IPO"
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
                  IPO Information
                </Title>
                <Text
                  style={{
                    color: "var(--foreground)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  Update the client&apos;s IPO shares
                </Text>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Client Name" name="clientName">
                      <Input readOnly />
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
                      label="Shares Type:"
                      name="sharesType"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Market Listed:"
                      name="marketListed"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
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

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Start Date:" name="startDate">
                      <DatePicker
                        placeholder="Select date"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Maturity Date:"
                      name="maturityDate"
                      rules={[{ required: true, message: "" }]}
                    >
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

          <Row
            wrap
            justify={screens.md ? "end" : "center"}
            gutter={[12, 16]}
            className="modal-container-footer"
          >
            <Col>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Update IPO <FontAwesomeIcon icon={faFloppyDisk} />
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

export default UpdateIPOModal;
