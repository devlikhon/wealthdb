/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const handlePreview = async (file: any) => {
  let src = file.url;

  if (!src) {
    src = URL.createObjectURL(file.originFileObj);
  }

  const imgWindow = window.open(src);
  imgWindow?.document.write(`<img src="${src}" style="width:100%" />`);
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // e.g., unsigned_preset

  // Replace with your Cloudinary cloud name
  const CLOUD_NAME = "dqdjxpdqh";

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // This is the real file URL
    return response.data.secure_url;
  } catch (error: any) {
    console.error("Upload failed", error.response?.data || error);
    return null;
  }
};

export const normalizeIdentification = async (values: any) => {
  const type = values?.identification?.identityVerification?.type;
  const proofOfAddressType = values?.identification?.proofOfAddress?.type;

  if (!type && !proofOfAddressType) return values;

  const identityData = values.identification?.identityVerification || {};
  const proofData = values.identification?.proofOfAddress || {};

  // console.log("identityData", values.identification.identityVerification);
  // console.log("proofData", values.identification.proofOfAddress);

  const getFile = async (fileList: any[]) => {
    if (!fileList || fileList.length === 0) return undefined;

    const item = fileList[0];
    const file = item.originFileObj;

    // ✅ New file selected by the user → upload it
    if (file && file instanceof File) {
      const fileUrl = await uploadFile(file);
      if (!fileUrl) return undefined;

      return {
        fileUrl,
        fileType: file.type,
        fileName: file.name,
      };
    }

    // ✅ No new file — this is an already-saved file being carried
    // forward unchanged (prefilled from the backend). Pass it through
    // instead of dropping it.
    if (item.url) {
      return {
        fileUrl: item.url,
        fileType: item.type || "unknown",
        fileName: item.name || "file",
      };
    }

    return undefined;
  };

  // const getFile = async (fileList: any[]) => {
  //   if (!fileList || fileList.length === 0) return undefined;

  //   const item = fileList[0];
  //   const file = item.originFileObj;

  //   if (!file || !(file instanceof File)) return undefined;

  //   const fileUrl = await uploadFile(file);

  //   if (!fileUrl) return undefined;

  //   return {
  //     fileUrl,
  //     fileType: file.type,
  //     fileName: file.name,
  //   };
  // };

  const updatedIdentity: any = {
    ...identityData,
    type,
  };

  const updatedProof: any = {
    ...proofData,
    type: proofOfAddressType,
  };

  // ----------------
  // Identity Verification
  // ----------------

  if (type === "internationalTravelDocument") {
    updatedIdentity.internationalTravelDocument = await getFile(
      identityData?.internationalTravelDocument?.file,
    );
  }

  if (type === "drivingLicence") {
    updatedIdentity.drivingLicence = {
      frontPart: await getFile(identityData?.drivingLicence?.frontPart),
      backPart: await getFile(identityData?.drivingLicence?.backPart),
    };
  }

  if (type === "emailIdentification") {
    updatedIdentity.emailIdentification = "I will email my proof of identity";
  }

  // 🔹 remove unused fields
  if (type === "internationalTravelDocument") {
    delete updatedIdentity.drivingLicence;
    delete updatedIdentity.emailIdentification;
  }

  if (type === "drivingLicence") {
    delete updatedIdentity.internationalTravelDocument;
    delete updatedIdentity.emailIdentification;
  }

  if (type === "emailIdentification") {
    delete updatedIdentity.internationalTravelDocument;
    delete updatedIdentity.drivingLicence;
  }

  // ----------------
  // Proof of Address
  // ----------------

  if (proofOfAddressType === "utilityBill") {
    updatedProof.utilityBill = await getFile(proofData?.utilityBill?.file);
  }

  if (proofOfAddressType === "emailProofOfAddress") {
    updatedProof.emailProofOfAddress = "I will email my proof of address";
  }

  // 🔹 remove unused fields

  if (proofOfAddressType === "utilityBill") {
    delete updatedProof.emailProofOfAddress;
  }

  if (proofOfAddressType === "emailProofOfAddress") {
    delete updatedProof.utilityBill;
  }

  return {
    ...values,
    identification: {
      ...values.identification,
      identityVerification: updatedIdentity,
      proofOfAddress: updatedProof,
    },
  };
};

// fileList={passportFileList}
// onChange={({ fileList }) => {
//   setPassportFileList(fileList);
//   form.setFieldValue(
//     [
//       "identification",
//       "identityVerification",
//       "internationalTravelDocument",
//       "file",
//     ],
//     fileList,
//   );
// }}

//  <Form.Item
//               label="Upload Passport / Travel Document"
//               name={[
//                 "identification",
//                 "identityVerification",
//                 "internationalTravelDocument",
//                 "file",
//               ]}
//               valuePropName="fileList"
//               getValueFromEvent={(e) => e.fileList}
//               rules={[{ required: true, message: "" }]}
//             >
//               <Upload
//                 multiple
//                 accept="*"
//                 beforeUpload={() => false}
//                 maxCount={1}
//               >
//                 <Button icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}>
//                   Upload Front
//                 </Button>
//               </Upload>
//             </Form.Item>

// export const uploadFile = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await axios.post("/api/v1/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

//   // backend should return the real URL
//   return response.data.fileUrl; // e.g., https://myserver.com/uploads/file.png
// };

// export const normalizeIdentification = (values: any) => {
//   const type = values?.identification?.identityVerification?.type;

//   if (!type) return values;

//   const idData = values.identification.identityVerification;

//   const getFile = async (fileList: any[]) => {
//     if (!fileList?.length) return undefined;

//     const file = fileList[0].originFileObj;
//     const fileUrl = await uploadFile(file); // real URL from backend

//     return {
//       fileUrl,
//       fileType: file.type,
//       fileName: file.name,
//     };
//   };

//   const updatedIdentity = {
//     ...idData,
//     type,
//   };

//   if (type === "internationalTravelDocument") {
//     updatedIdentity.internationalTravelDocument = getFile(
//       idData?.internationalTravelDocument?.file,
//     );
//   }

//   if (type === "drivingLicence") {
//     updatedIdentity.drivingLicence = {
//       frontPart: getFile(idData?.drivingLicence?.frontPart),
//       backPart: getFile(idData?.drivingLicence?.backPart),
//     };
//   }

//   if (type === "emailIdentification") {
//     updatedIdentity.emailIdentification = "I will email my proof of identity";
//   }

//   return {
//     ...values,
//     identification: {
//       ...values.identification,
//       identityVerification: updatedIdentity,
//     },
//   };
// };
