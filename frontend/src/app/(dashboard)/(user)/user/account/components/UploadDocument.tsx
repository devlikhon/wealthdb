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
  Radio,
  Row,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { useEffect } from "react";

const { Title, Text } = Typography;

// Converts an already-saved backend file object into an AntD UploadFile
// so the Upload component can render it as "already uploaded" and the
// required-file validator is satisfied without forcing a re-upload.
const toFileList = (file?: {
  fileUrl: string;
  fileName: string;
}): UploadFile[] | undefined =>
  file
    ? [
        {
          uid: file.fileUrl,
          name: file.fileName,
          status: "done",
          url: file.fileUrl,
        },
      ]
    : undefined;

const UploadDocument = () => {
  const [form] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { user, applicants, updateApplicant } = useGlobal();

  const currentUser = applicants?.find(
    (applicant) => applicant.email === user?.email,
  );

  const identityVerification =
    currentUser?.identification?.identityVerification;
  const proofOfAddress = currentUser?.identification?.proofOfAddress;

  const verificationType = Form.useWatch(
    ["identification", "identityVerification", "type"],
    form,
  );
  const proofOfAddressType = Form.useWatch(
    ["identification", "proofOfAddress", "type"],
    form,
  );

  // ✅ Prefill the form with whatever the applicant already has saved —
  // this is what was missing before, so driving licence / utility bill
  // never showed up.
  useEffect(() => {
    if (!currentUser) return;

    form.setFieldsValue({
      identification: {
        identityVerification: {
          type: identityVerification?.type,
          internationalTravelDocument: {
            file: toFileList(identityVerification?.internationalTravelDocument),
          },
          drivingLicence: {
            frontPart: toFileList(
              identityVerification?.drivingLicence?.frontPart,
            ),
            backPart: toFileList(
              identityVerification?.drivingLicence?.backPart,
            ),
          },
        },
        proofOfAddress: {
          type: proofOfAddress?.type,
          utilityBill: {
            file: toFileList(proofOfAddress?.utilityBill),
          },
        },
      },
    });
  }, [currentUser, form]);

  const onFinish = async () => {
    try {
      await form.validateFields();

      const allValues = form.getFieldsValue(true);

      // ✅ No longer force-overwrite the type — respect whatever the
      // user actually selected (or already had).
      const transformed = await normalizeIdentification(allValues);

      await updateApplicant(currentUser._id, {
        identification: {
          identityVerification:
            transformed?.identification?.identityVerification,
          proofOfAddress: transformed?.identification?.proofOfAddress,
        },
      });
    } catch (err) {
      console.error("Document update failed:", err);
    }
  };

  const renderPreviewUpload = (
    namePath: (string | number)[],
    placeholder: string,
    height = "270px",
  ) => (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={(e) => e?.fileList}
      name={namePath}
      rules={[{ required: true, message: "" }]}
    >
      <Upload
        listType="picture-card"
        multiple={false}
        accept="*"
        beforeUpload={() => false}
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
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              const files = getFieldValue(namePath) as UploadFile[];

              if (!files || files.length === 0) {
                return (
                  <Image src={placeholder} alt="placeholder" preview={false} />
                );
              }

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
                  style={{ height }}
                />
              );
            }}
          </Form.Item>

          <Button
            icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
            style={{ width: "100%" }}
          >
            Upload File
          </Button>
        </Space>
      </Upload>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      style={{ width: "100%" }}
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
        Identity Verification
      </Title>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Identification type:"
            name={["identification", "identityVerification", "type"]}
            rules={[{ required: true, message: "" }]}
          >
            <Radio.Group className="user-radio-group">
              <Radio value="internationalTravelDocument">
                <Text style={{ color: "var(--foreground)" }}>
                  International Travel Document
                </Text>
              </Radio>
              <Radio value="drivingLicence">
                <Text style={{ color: "var(--foreground)" }}>
                  Driving Licence
                </Text>
              </Radio>
              <Radio value="emailIdentification">
                <Text style={{ color: "var(--foreground)" }}>
                  I will email my proof of identity
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {verificationType === "internationalTravelDocument" && (
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Title level={5} style={{ color: "var(--foreground)" }}>
              Passport / Travel Document
            </Title>
            {renderPreviewUpload(
              [
                "identification",
                "identityVerification",
                "internationalTravelDocument",
                "file",
              ],
              "/img/passport_image.jpg",
              "350px",
            )}
          </Col>
        </Row>
      )}

      {verificationType === "drivingLicence" && (
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Title level={5} style={{ color: "var(--foreground)" }}>
              Front Part
            </Title>
            {renderPreviewUpload(
              [
                "identification",
                "identityVerification",
                "drivingLicence",
                "frontPart",
              ],
              "/img/driving_licence_front.png",
            )}
          </Col>
          <Col xs={24} md={12}>
            <Title level={5} style={{ color: "var(--foreground)" }}>
              Back Part
            </Title>
            {renderPreviewUpload(
              [
                "identification",
                "identityVerification",
                "drivingLicence",
                "backPart",
              ],
              "/img/driving_licence_back.png",
            )}
          </Col>
        </Row>
      )}

      <Title
        level={5}
        style={{
          color: "var(--primary-color)",
          fontWeight: 500,
          display: "block",
          padding: "5px 10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
          marginTop: 24,
        }}
      >
        Proof of Address
      </Title>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Proof of address type:"
            name={["identification", "proofOfAddress", "type"]}
            rules={[{ required: true, message: "" }]}
          >
            <Radio.Group className="user-radio-group">
              <Radio value="utilityBill">
                <Text style={{ color: "var(--foreground)" }}>Utility Bill</Text>
              </Radio>
              <Radio value="emailProofOfAddress">
                <Text style={{ color: "var(--foreground)" }}>
                  I will email my proof of address
                </Text>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {proofOfAddressType === "utilityBill" && (
        <Row gutter={16}>
          <Col xs={24} md={12}>
            {renderPreviewUpload(
              ["identification", "proofOfAddress", "utilityBill", "file"],
              "/img/utility_bill_proof_of_address.png",
              "205px",
            )}
          </Col>
        </Row>
      )}

      <Row
        wrap
        justify={screens.md ? "end" : "center"}
        gutter={[12, 16]}
        className="modal-container-footer"
        style={{ marginTop: 16 }}
      >
        <Col>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Update Documents <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UploadDocument;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
// import { normalizeIdentification } from "@/app/components/utils/uploadFile/uploadFile";
// import {
//   faArrowUpFromBracket,
//   faFloppyDisk,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Button,
//   Col,
//   Form,
//   Grid,
//   Image,
//   Row,
//   Space,
//   Typography,
//   Upload,
//   UploadFile,
// } from "antd";
// // import { debounce } from "lodash";
// // import { useMemo, useRef } from "react";

// const { Title } = Typography;

// const UploadDocument = () => {
//   const [form] = Form.useForm();

//   // const latestTransformedValues = useRef<any>(null);

//   const { useBreakpoint } = Grid;

//   const screens = useBreakpoint();

//   const { user, applicants, updateApplicant } = useGlobal();

//   // ✅ compute currentUser dynamically whenever applicants or user changes
//   const currentUser = applicants?.find(
//     (applicant) => applicant.email === user?.email,
//   );

//   const currentFile =
//     currentUser?.identification?.identityVerification
//       ?.internationalTravelDocument;

//   // const handleAutoSave = useMemo(
//   //   () =>
//   //     debounce((values: any) => {
//   //       console.log("Auto updating form data:", values);
//   //     }, 500),
//   //   [],
//   // );

//   const transformFormValues = async (allValues: any) => {
//     let updatedValues = { ...allValues };

//     // ✅ inject type manually
//     updatedValues.identification = {
//       ...updatedValues.identification,
//       identityVerification: {
//         ...updatedValues.identification?.identityVerification,
//         type: "internationalTravelDocument",
//       },
//     };

//     updatedValues = await normalizeIdentification(updatedValues);

//     return updatedValues;
//   };

//   // const onValuesChange = async () => {
//   //   const allValues = form.getFieldsValue(true);

//   // const updatedValues = await transformFormValues(allValues);

//   // console.log("From transform:", updatedValues);

//   // ✅ store latest
//   // latestTransformedValues.current = updatedValues;

//   // handleAutoSave(updatedValues);
//   // };

//   const onFinish = async () => {
//     try {
//       await form.validateFields();

//       const allValues = form.getFieldsValue(true);

//       const transformed = await transformFormValues(allValues);

//       await updateApplicant(currentUser._id, {
//         identification: {
//           identityVerification:
//             transformed?.identification?.identityVerification,
//         },
//       });
//     } catch (err) {}
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       autoComplete="off"
//       onFinish={onFinish}
//       // onValuesChange={onValuesChange}
//       // style={{ width: screens.md ? "50%" : "100%", margin: "auto" }}
//       style={{
//         width: screens.md ? (currentFile ? "100%" : "50%") : "100%",
//         margin: "auto",
//       }}
//     >
//       <Title
//         level={5}
//         style={{
//           color: "var(--primary-color)",
//           fontWeight: 500,
//           display: "block",
//           padding: "5px 10px",
//           background: "#54595f3d",
//           borderLeft: "4px solid var(--primary-color)",
//         }}
//       >
//         Upload Document
//       </Title>

//       <Row
//         gutter={[32, 16]}
//         // align="middle"
//       >
//         {currentFile && (
//           <Col xs={24} sm={24} md={12}>
//             <Title
//               level={5}
//               style={{
//                 color: "var(--foreground)",
//                 fontWeight: 500,
//               }}
//             >
//               Recent Document File
//             </Title>

//             <Image
//               src={currentFile?.fileUrl}
//               alt={currentFile?.fileName || "File"}
//               preview={false}
//               className="current-file"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 objectFit: "cover",
//                 borderRadius: 4,
//               }}
//             />
//           </Col>
//         )}

//         <Col xs={24} sm={24} md={currentFile ? 12 : 24}>
//           <Form.Item
//             label="File Description (i.e. Passport):"
//             name={[
//               "identification",
//               "identityVerification",
//               "internationalTravelDocument",
//               "file",
//             ]}
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e?.fileList}
//             rules={[{ required: true, message: "" }]}
//           >
//             <Upload
//               listType="picture-card"
//               multiple={false}
//               accept="*"
//               beforeUpload={() => false} // prevent auto upload
//               maxCount={1}
//               showUploadList={{
//                 showPreviewIcon: true,
//                 showDownloadIcon: false,
//                 showRemoveIcon: true,
//               }}
//               className="travel-document user-upload"
//             >
//               <Space
//                 orientation="vertical"
//                 size="small"
//                 style={{ width: "100%", alignItems: "center" }}
//               >
//                 <Form.Item
//                   noStyle
//                   shouldUpdate={(prev, curr) => {
//                     const prevFiles =
//                       prev.identification?.identityVerification
//                         ?.internationalTravelDocument?.file || [];
//                     const currFiles =
//                       curr.identification?.identityVerification
//                         ?.internationalTravelDocument?.file || [];
//                     return prevFiles.length !== currFiles.length;
//                   }}
//                 >
//                   {({ getFieldValue }) => {
//                     const files = getFieldValue([
//                       "identification",
//                       "identityVerification",
//                       "internationalTravelDocument",
//                       "file",
//                     ]) as UploadFile[];

//                     // If no file, show placeholder
//                     if (!files || files.length === 0) {
//                       return (
//                         <Image
//                           src="/img/passport_image.jpg"
//                           alt="International Travel Document"
//                           preview={false}
//                         />
//                       );
//                     }

//                     // Show preview of the uploaded file
//                     const file = files[0];
//                     const previewUrl =
//                       file.url ||
//                       (file.originFileObj
//                         ? URL.createObjectURL(file.originFileObj)
//                         : "");

//                     return (
//                       <Image
//                         src={previewUrl}
//                         alt={file.name || "preview"}
//                         preview={false}
//                         style={{
//                           height: "100%",
//                         }}
//                       />
//                     );
//                   }}
//                 </Form.Item>

//                 <Button
//                   icon={
//                     <FontAwesomeIcon
//                       icon={faArrowUpFromBracket}
//                       style={{ width: "100%" }}
//                     />
//                   }
//                   style={{ width: "100%" }}
//                 >
//                   Upload File
//                 </Button>
//               </Space>
//             </Upload>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row
//         wrap
//         justify={screens.md ? "end" : "center"}
//         gutter={[12, 16]}
//         className="modal-container-footer"
//       >
//         <Col>
//           <Button type="primary" htmlType="submit" className="submit-btn">
//             Update Document <FontAwesomeIcon icon={faFloppyDisk} />
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default UploadDocument;
