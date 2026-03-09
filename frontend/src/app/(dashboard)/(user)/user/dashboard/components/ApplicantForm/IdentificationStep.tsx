import { Form, Upload } from "antd";

export default function IdentificationStep() {
  return (
    <>
      <Form.Item
        label="Passport / ID"
        name={[
          "identification",
          "identityVerification",
          "internationalTravelDocument",
        ]}
      >
        <Upload />
      </Form.Item>
    </>
  );
}