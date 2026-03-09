import { Form, Input, Row, Col } from "antd";

export default function IndividualAccountStep() {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name={["jointAccount", "firstName"]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Last Name"
            name={["jointAccount", "lastName"]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Occupation"
        name={["jointAccount", "occupation"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
