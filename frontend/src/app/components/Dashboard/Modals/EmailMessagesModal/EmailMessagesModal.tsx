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
  Flex,
  Upload,
  Typography,
  Card,
} from "antd";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faFilePdf,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../ModalStyles/ModalStyles.css";

const { Option } = Select;

const { Text, Title, Link } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const domains = [
  "Open Email (wealthmanagement-aviva.com)",
  "Client Frontend (avivaonlineportal.com)",
];

const senders = [
  "Alex Whitmore (alex.whitmore@wealthmanagement-aviva.com)",
  "James Patterson (admin@wealthmanagement-aviva.com)",
  "James Vokins (james.vokins@wealthmanagement-aviva.com)",
  "Oliver Welch (oliver.welch@wealthmanagement-aviva.com)",
];

const signatures = ["Include Signature", "No Signature"];

const documents = [
  {
    name: "Aviva XS0138717441 6.125 - 50K",
    subtitle: "Aviva XS0138717441 6.125 - 50K",
    url: "/client-documents/brochures/XS0138717441_Aviva_6125_50.pdf",
  },
  {
    name: "Aviva XS0138717441 6.125 - 20K",
    subtitle: "Aviva XS0138717441 6.125 - 20K",
    url: "/client-documents/brochures/XS0138717441_Aviva_6125_20.pdf",
  },
  {
    name: "JP Morgan XS0624807698 8.81 - 250K",
    subtitle: "JP Morgan XS0624807698 8.81 - 250K",
    url: "/client-documents/brochures/XS0624807698_JPMorgan_881_250.pdf",
  },
  {
    name: "JP Morgan XS0624807698 8.81 - 100K",
    subtitle: "JP Morgan XS0624807698 8.81 - 100K",
    url: "/client-documents/brochures/XS0624807698_JPMorgan_881_100.pdf",
  },
];

const EmailMessagesModal = ({ open, onClose }: Props) => {
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
      title="Send Email Message"
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
            <Col xs={24} sm={24} md={12} lg={16}>
              <div className="modal-container-col">
                <Title
                  level={5}
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                  }}
                >
                  Compose Email
                </Title>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Domain:"
                      name="senderDomain"
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

                        {domains.map((item) => {
                          const domain = item.match(/\((.*?)\)/)?.[1];
                          return (
                            <Option
                              key={domain}
                              value={domain}
                              className="modal-select"
                            >
                              {item}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Sender:"
                      name="sender"
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

                        {senders.map((item) => {
                          const sender = item.match(/\((.*?)\)/)?.[1];
                          return (
                            <Option
                              key={sender}
                              value={sender}
                              className="modal-select"
                            >
                              {item}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Recipient Email:"
                      name="recipient"
                      rules={[
                        { required: true, message: "" },
                        { type: "email", message: "" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Subject:"
                      name="emailType"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Attachments"
                      name="attachments"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e?.fileList}
                    >
                      <Upload multiple accept="*" beforeUpload={() => false}>
                        <Button icon={<FontAwesomeIcon icon={faPlus} />}>
                          Choose File
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Signature:"
                      name="signature"
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

                        {signatures.map((title) => (
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

                <Form.Item
                  label="Email Body:"
                  name="emailBody"
                  // rules={[{ required: true, message: "" }]}
                >
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onChange={(_, editor) => {
                      const data = editor.getData();
                      form.setFieldValue("emailBody", data);
                    }}
                  /> */}
                  <CKEditor
                    editor={ClassicEditor as any}
                    config={{
                      toolbar: [
                        "heading",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "link",
                        "undo",
                        "redo",
                      ],
                      heading: {
                        options: [
                          {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                          },
                          {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                          },
                          {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                          },
                          {
                            model: "heading3",
                            view: "h3",
                            title: "Heading 3",
                            class: "ck-heading_heading3",
                          },
                          {
                            model: "heading4",
                            view: "h4",
                            title: "Heading 4",
                            class: "ck-heading_heading4",
                          },
                          {
                            model: "heading5",
                            view: "h5",
                            title: "Heading 5",
                            class: "ck-heading_heading5",
                          },
                          {
                            model: "heading6",
                            view: "h6",
                            title: "Heading 6",
                            class: "ck-heading_heading6",
                          },
                        ],
                      },
                    }}
                    onChange={(_: any, editor: { getData: () => any }) => {
                      form.setFieldValue("emailBody", editor.getData());
                    }}
                  />
                </Form.Item>

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
                      Send Email <FontAwesomeIcon icon={faCircleRight} />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} sm={24} md={12} lg={8}>
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
                    Company Brochures
                  </Title>

                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: "100%" }}
                  >
                    {documents.map((doc, idx) => (
                      <Card
                        key={idx}
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: "1px solid var(--border-color)",
                        }}
                        bodyStyle={{
                          padding: "10px 20px",
                        }}
                        onClick={() => window.open(doc.url, "_blank")}
                      >
                        <Flex align="center" gap={8}>
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            style={{
                              color: "var(--foreground)",
                              fontSize: 24,
                            }}
                          />
                          <Space direction="vertical" size={2}>
                            <Text
                              strong
                              style={{
                                color: "var(--foreground)",
                              }}
                            >
                              {doc.name}
                            </Text>
                            <Text
                              style={{
                                color: "var(--foreground)",
                              }}
                            >
                              {doc.subtitle}
                            </Text>
                            <Link href={doc.url} target="_blank">
                              View document
                            </Link>
                          </Space>
                        </Flex>

                        {/* <Row align="middle" gutter={12} wrap={false}>
                          <Col md={2}>
                            <FontAwesomeIcon
                              icon={faFilePdf}
                              style={{
                                color: "rgb(231, 76, 60)",
                                fontSize: 24,
                              }}
                            />
                          </Col>
                          <Col md={22}>
                            <Space direction="vertical" size={2}>
                              <Text strong>{doc.name}</Text>
                              <Text>{doc.subtitle}</Text>
                              <Link href={doc.url} target="_blank">
                                View document
                              </Link>
                            </Space>
                          </Col>
                        </Row> */}
                      </Card>
                    ))}
                  </Space>
                </div>
              </Flex>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  );
};

export default EmailMessagesModal;
