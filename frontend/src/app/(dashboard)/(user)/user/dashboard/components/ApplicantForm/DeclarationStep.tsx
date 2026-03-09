import { Form, Radio } from "antd";

export default function DeclarationStep() {
  return (
    <Form.Item
      label="Application Declaration"
      name="applicationDeclaration"
      rules={[{ required: true }]}
    >
      <Radio.Group>
        <Radio value="Aggree">Agree</Radio>
        <Radio value="Disagree">Disagree</Radio>
      </Radio.Group>
    </Form.Item>
  );
}
