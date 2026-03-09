/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Radio, Typography } from "antd";

const { Text, Title } = Typography;

export default function AccountTypeStep({ setAccountType }: any) {
  return (
    <div className="modal-container-col" style={{ paddingBottom: 0 }}>
      <Title
        level={5}
        style={{
          color: "var(--foreground)",
          fontWeight: 500,
        }}
      >
        Account information
      </Title>

      <Form.Item
        label="Select your account type:"
        name="accountType"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Radio.Group
          className="radio-group payment-status-radio"
          onChange={(e) => setAccountType(e.target.value)}
        >
          <Radio.Button value="Individual">Individual Account</Radio.Button>
          <Radio.Button value="Joint">Joint Account</Radio.Button>
          <Radio.Button value="Company">Company Account</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
