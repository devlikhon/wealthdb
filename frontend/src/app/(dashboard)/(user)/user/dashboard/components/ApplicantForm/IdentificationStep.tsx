"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Row,
  Col,
  Typography,
  FormInstance,
  Radio,
  Upload,
  Button,
  Image,
  UploadFile,
  Space,
} from "antd";
import "react-phone-input-2/lib/style.css";

interface Props {
  form: FormInstance;
}

const { Text, Title } = Typography;

const IdentificationStep = ({ form }: Props) => {
  const verificationType = Form.useWatch(
    ["identification", "identityVerification", "type"],
    form,
  );

  const proofOfAddressType = Form.useWatch(
    ["identification", "proofOfAddress", "type"],
    form,
  );

  // const [fileList, setFileList] = useState<UploadFile[]>([
  //   {
  //     uid: "-1",
  //     name: "placeholder.png",
  //     status: "done",
  //     url: "/img/aviva.jpg",
  //   },
  // ]);

  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const [passportFileList, setPassportFileList] = useState<UploadFile[]>([
  //   {
  //     uid: "-1",
  //     name: "placeholder.png",
  //     status: "done",
  //     url: "/img/aviva.jpg",
  //   },
  // ]);

  // const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
  //   setFileList(fileList);
  // };

  return (
    <div className="modal-container-col">
      <Title
        level={4}
        style={{
          color: "var(--foreground)",
          fontWeight: 500,
          margin: 0,
        }}
      >
        Your identification
      </Title>

      <Text
        style={{
          color: "var(--foreground)",
          marginBottom: 16,
          display: "block",
        }}
      >
        In line, with our commitment to regulatory compliance and risk
        mitigation, we are required to conduct Anti-Money Laundering (AML)
        checks. To proceed, with a bond issuance promptly and efficiently we
        request the following documentation.
      </Text>

      {/* Identity verification */}
      <Row
      // style={{
      //   marginBottom: "var(--ant-form-item-margin-bottom)",
      // }}
      >
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Identity verification
          </Title>
          {/* <Text
            style={{
              color: "var(--foreground)",
              display: "block",
              fontSize: "1em",
              lineHeight: "1.25em",
              padding: "5px 10px",
              background: "#54595f3d",
              borderLeft: "4px solid var(--primary-color)",
            }}
          >
            <strong>Deutsche Bank</strong> will use the information below to
            electronically verify the identity of Investors, Trustees, Directors
            and Authorised Signatories where possible. Deutsche Bank may request
            certified ID where this is not possible. For company accounts at
            least two Directors’ or Authorised Signatories’ details are
            required, with the exception of Sole Director companies.
          </Text> */}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="We need a copy of your identification. Please select from the following:"
            name={["identification", "identityVerification", "type"]}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group
              className="user-radio-group"
              // onChange={(e) => setAccountType(e.target.value)}
            >
              {/* International Travel Document */}
              <Radio value="internationalTravelDocument">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  International Travel Document
                </Text>
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  A current passport or other identification documentation with
                  the same characteristics as a passport issued by the
                  government or United Nations for the purpose of travel.
                </Text>
              </Radio>

              {/* Driving Licence */}
              <Radio value="drivingLicence">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Driving Licence
                </Text>
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Current photocard driving licence (Front & Back).
                </Text>
              </Radio>

              {/* Email Identification */}
              <Radio value="emailIdentification">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Email Identification
                </Text>
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  I will email my proof of identity
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {/* <Row>
        <Col md={24}>
          <Form.Item
            label="Upload Passport / Travel Document"
            name={[
              "identification",
              "identityVerification",
              "internationalTravelDocument",
              "file",
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: "e" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleChange}
              multiple={false}
              accept="*"
              maxCount={1}
              showUploadList={{
                showPreviewIcon: false,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }}
              className="upload-picture"
            >
              <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
                Upload File
              </Button>
            </Upload>

            <div></div>
          </Form.Item>
        </Col>
      </Row> */}

      {verificationType === "internationalTravelDocument" && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Upload Passport / Travel Document"
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
                className="travel-document"
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
                            height: "350px",
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
                  >
                    Upload File
                  </Button>
                </Space>
              </Upload>
            </Form.Item>

            {/* <Form.Item
              label="Upload Passport / Travel Document"
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
                className="upload-picture"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
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
                      // Show placeholder only if no file uploaded yet
                      if (!files || files.length === 0) {
                        return (
                          <Image
                            src="/img/aviva.jpg"
                            alt="placeholder"
                            style={{
                              width: "100%",
                              objectFit: "cover",
                              marginBottom: 8,
                            }}
                          />
                        );
                      }
                      return null;
                    }}
                  </Form.Item>

                  <Button
                    icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
                  >
                    Upload File
                  </Button>
                </div>
              </Upload>
            </Form.Item> */}

            {/* <Form.Item
              label="Upload Passport / Travel Document"
              name={[
                "identification",
                "identityVerification",
                "internationalTravelDocument",
                "file",
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: "" }]}
            >
              {fileList.length === 0 && (
                <Image
                  src="/img/aviva.jpg"
                  alt="placeholder"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              )}
              <Upload
                listType="picture-card"
                multiple={false}
                accept="*"
                beforeUpload={() => false}
                maxCount={1}
                fileList={fileList}
                onChange={handleChange}
                showUploadList={{
                  showPreviewIcon: false,
                  showDownloadIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
                  Upload File
                </Button>
              </Upload>
            </Form.Item> */}

            {/* <Form.Item
              label="Upload Passport / Travel Document"
              name={[
                "identification",
                "identityVerification",
                "internationalTravelDocument",
                "file",
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: "" }]}
            >
              <Upload
                listType="picture-card"
                multiple={false}
                accept="*"
                beforeUpload={() => false}
                maxCount={1}
                fileList={fileList}
                onChange={handleChange}
                showUploadList={{
                  showPreviewIcon: false,
                  showDownloadIcon: false,
                  showRemoveIcon: true,
                }}
                className="upload-picture"
              >
               
                {fileList.length === 0 && (
                  <Image
                    src="/img/aviva.jpg"
                    alt="placeholder"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                )}

                <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
                  Upload File
                </Button>
              </Upload>
            </Form.Item> */}
          </Col>
        </Row>
      )}

      {verificationType === "drivingLicence" && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Driving Licence (Front Part)"
              name={[
                "identification",
                "identityVerification",
                "drivingLicence",
                "frontPart",
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
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
                className="driving-licence"
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
                          ?.drivingLicence?.frontPart || [];
                      const currFiles =
                        curr.identification?.identityVerification
                          ?.drivingLicence?.frontPart || [];
                      return prevFiles.length !== currFiles.length;
                    }}
                  >
                    {({ getFieldValue }) => {
                      const files = getFieldValue([
                        "identification",
                        "identityVerification",
                        "drivingLicence",
                        "frontPart",
                      ]) as UploadFile[];

                      // If no file, show placeholder
                      if (!files || files.length === 0) {
                        return (
                          <Image
                            src="/img/driving_licence_front.png"
                            alt="Driving Licence Front Part"
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
                            height: "270px",
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
                  >
                    Upload File
                  </Button>
                </Space>
              </Upload>

              {/* <Upload
                multiple
                accept="*"
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
                  Upload Front
                </Button>
              </Upload> */}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Driving Licence (Back Part)"
              name={[
                "identification",
                "identityVerification",
                "drivingLicence",
                "backPart",
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
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
                className="driving-licence"
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
                          ?.drivingLicence?.backPart || [];
                      const currFiles =
                        curr.identification?.identityVerification
                          ?.drivingLicence?.backPart || [];
                      return prevFiles.length !== currFiles.length;
                    }}
                  >
                    {({ getFieldValue }) => {
                      const files = getFieldValue([
                        "identification",
                        "identityVerification",
                        "drivingLicence",
                        "backPart",
                      ]) as UploadFile[];

                      // If no file, show placeholder
                      if (!files || files.length === 0) {
                        return (
                          <Image
                            src="/img/driving_licence_back.png"
                            alt="Driving Licence Back Part"
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
                            height: "270px",
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
                  >
                    Upload File
                  </Button>
                </Space>
              </Upload>

              {/* <Upload
                multiple
                accept="*"
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
                  Upload Back
                </Button>
              </Upload> */}
            </Form.Item>
          </Col>
        </Row>
      )}

      {/* Proof of Address  */}

      <Row style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} md={24}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Proof of Address
          </Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Please provide proof of your address, we can only accept one of the following:"
            name={["identification", "proofOfAddress", "type"]}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group className="user-radio-group">
              {/*  */}
              <Radio value="utilityBill">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Utility Bill
                </Text>
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Dated within the last 3 months
                </Text>
              </Radio>

              {/* Email Proof of Address */}
              <Radio value="emailProofOfAddress">
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  Email Proof of Address
                </Text>
                <Text
                  style={{
                    color: "var(--foreground)",
                    display: "block",
                  }}
                >
                  I will email my proof of address
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {proofOfAddressType === "utilityBill" && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Upload Passport / Travel Document"
              name={["identification", "proofOfAddress", "utilityBill", "file"]}
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
                className="travel-document"
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
                        prev.identification?.proofOfAddress?.utilityBill
                          ?.file || [];
                      const currFiles =
                        curr.identification?.proofOfAddress?.utilityBill
                          ?.file || [];
                      return prevFiles.length !== currFiles.length;
                    }}
                  >
                    {({ getFieldValue }) => {
                      const files = getFieldValue([
                        "identification",
                        "proofOfAddress",
                        "utilityBill",
                        "file",
                      ]) as UploadFile[];

                      // If no file, show placeholder
                      if (!files || files.length === 0) {
                        return (
                          <Image
                            src="/img/utility_bill_proof_of_address.png"
                            alt="Utility Bill"
                            preview={false}
                            style={{ backgroundColor: "#fff" }}
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
                            height: "205px",
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
                  >
                    Upload File
                  </Button>
                </Space>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row>
        <Col xs={24} sm={24} md={24}>
          <Text
            style={{
              color: "var(--foreground)",
              display: "block",
              fontSize: "1em",
              lineHeight: "1.25em",
              padding: "5px 10px",
              background: "#54595f3d",
              borderLeft: "4px solid var(--primary-color)",
            }}
          >
            If you require any assistance with completing the account opening
            process, please contact your Relationship Manager directly, who will
            be happy to assist you.
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default IdentificationStep;
