import { Form, Select } from "antd";

const { Option } = Select;

export default function AdditionalInformationStep() {
  return (
    <>
      <Form.Item
        label="Source of Funds"
        name={["additionalInformation", "sourceOfFunds"]}
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="Savings">Savings</Option>
          <Option value="Income">Income</Option>
        </Select>
      </Form.Item>
    </>
  );
}
