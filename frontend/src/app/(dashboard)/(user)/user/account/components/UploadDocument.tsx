"use client";

import {
  faArrowUpFromBracket,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Form,
  Grid,
  Image,
  Row,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";

const { Title } = Typography;

const UploadDocument = () => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      // onFinish={onFinish}
      // onValuesChange={handleAutoSave}
      // onValuesChange={onValuesChange}
      // onFinish={onFinish}
      style={{ width: screens.md ? "50%" : "100%", margin: "auto" }}
    >
      <Title
        level={5}
        style={{
          color: "var(--primary-color)",
          fontWeight: 500,
          display: "block",
          padding: "5px 10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
        }}
      >
        Upload Document
      </Title>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="File Description (i.e. Passport):"
            name={[
              "identification",
              "identityVerification",
              "internationalTravelDocument",
              "file",
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: "" }]}
          >
            <Upload
              listType="picture-card"
              multiple={false}
              accept="*"
              beforeUpload={() => false} // prevent auto upload
              maxCount={1}
              showUploadList={{
                showPreviewIcon: true,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }}
              className="travel-document user-upload"
            >
              <Space
                orientation="vertical"
                size="small"
                style={{ width: "100%", alignItems: "center" }}
              >
                <Form.Item
                  noStyle
                  shouldUpdate={(prev, curr) => {
                    const prevFiles =
                      prev.identification?.identityVerification
                        ?.internationalTravelDocument?.file || [];
                    const currFiles =
                      curr.identification?.identityVerification
                        ?.internationalTravelDocument?.file || [];
                    return prevFiles.length !== currFiles.length;
                  }}
                >
                  {({ getFieldValue }) => {
                    const files = getFieldValue([
                      "identification",
                      "identityVerification",
                      "internationalTravelDocument",
                      "file",
                    ]) as UploadFile[];

                    // If no file, show placeholder
                    if (!files || files.length === 0) {
                      return (
                        <Image
                          src="/img/passport_image.jpg"
                          alt="International Travel Document"
                          preview={false}
                        />
                      );
                    }

                    // Show preview of the uploaded file
                    const file = files[0];
                    const previewUrl =
                      file.url ||
                      (file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : "");

                    return (
                      <Image
                        src={previewUrl}
                        alt={file.name || "preview"}
                        preview={false}
                        style={{
                          height: "100%",
                        }}
                      />
                    );
                  }}
                </Form.Item>

                <Button
                  icon={
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      style={{ width: "100%" }}
                    />
                  }
                  style={{ width: "100%" }}
                >
                  Upload File
                </Button>
              </Space>
            </Upload>
          </Form.Item>
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
            Save Document <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UploadDocument;
