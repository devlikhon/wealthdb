import { Form, Input } from "antd";

export default function SettlementStep() {
  return (
    <>
      <Form.Item
        label="Bank Name"
        name={[
          "settlement",
          "existingBankAccount",
          "accountDetails",
          "bankName",
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
