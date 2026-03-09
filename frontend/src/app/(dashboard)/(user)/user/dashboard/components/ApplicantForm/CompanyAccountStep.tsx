import { Form, Input } from "antd";

export default function CompanyAccountStep() {
  return (
    <>
      <Form.Item
        label="Company Name"
        name={["companyAccount", "companyName"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company Number"
        name={["companyAccount", "companyNumber"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
