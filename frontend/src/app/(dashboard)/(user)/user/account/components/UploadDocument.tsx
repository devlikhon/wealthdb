/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { normalizeIdentification } from "@/app/components/utils/uploadFile/uploadFile";
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
// import { debounce } from "lodash";
// import { useMemo, useRef } from "react";

const { Title } = Typography;

const UploadDocument = () => {
  const [form] = Form.useForm();

  // const latestTransformedValues = useRef<any>(null);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { user, applicants, updateApplicant } = useGlobal();

  // ✅ compute currentUser dynamically whenever applicants or user changes
  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  const currentFile =
    currentUser?.identification?.identityVerification
      ?.internationalTravelDocument;

  // const handleAutoSave = useMemo(
  //   () =>
  //     debounce((values: any) => {
  //       console.log("Auto updating form data:", values);
  //     }, 500),
  //   [],
  // );

  const transformFormValues = async (allValues: any) => {
    let updatedValues = { ...allValues };

    // ✅ inject type manually
    updatedValues.identification = {
      ...updatedValues.identification,
      identityVerification: {
        ...updatedValues.identification?.identityVerification,
        type: "internationalTravelDocument",
      },
    };

    updatedValues = await normalizeIdentification(updatedValues);

    return updatedValues;
  };

  // const onValuesChange = async () => {
  //   const allValues = form.getFieldsValue(true);

  // const updatedValues = await transformFormValues(allValues);

  // console.log("From transform:", updatedValues);

  // ✅ store latest
  // latestTransformedValues.current = updatedValues;

  // handleAutoSave(updatedValues);
  // };

  const onFinish = async () => {
    try {
      await form.validateFields();

      const allValues = form.getFieldsValue(true);

      const transformed = await transformFormValues(allValues);

      await updateApplicant(currentUser._id, {
        identification: {
          identityVerification:
            transformed?.identification?.identityVerification,
        },
      });
    } catch (err) {}
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      // onValuesChange={onValuesChange}
      // style={{ width: screens.md ? "50%" : "100%", margin: "auto" }}
      style={{
        width: screens.md ? (currentFile ? "100%" : "50%") : "100%",
        margin: "auto",
      }}
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

      <Row
        gutter={[32, 16]}
        // align="middle"
      >
        {currentFile && (
          <Col xs={24} sm={24} md={12}>
            <Title
              level={5}
              style={{
                color: "var(--foreground)",
                fontWeight: 500,
              }}
            >
              Recent Document File
            </Title>

            <Image
              src={currentFile?.fileUrl}
              alt={currentFile?.fileName || "File"}
              preview={false}
              className="current-file"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </Col>
        )}

        <Col xs={24} sm={24} md={currentFile ? 12 : 24}>
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
            Update Document <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UploadDocument;
