"use client";

import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Grid, Input, Row, Typography } from "antd";
import "../../dashboard/dashboard.css";

const { Text } = Typography;

const ChangePassword = () => {
  const [form] = Form.useForm();

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const { changePassword } = useGlobal();

  const onFinish = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      form.resetFields(); // optional UX improvement
    } catch {}
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      // onFinish={onFinish}
      // onValuesChange={handleAutoSave}
      // onValuesChange={onValuesChange}
      onFinish={onFinish}
    >
      <Text
        style={{
          color: "var(--foreground)",
          display: "block",
          fontSize: "1em",
          lineHeight: "1.25em",
          padding: "5px 10px",
          background: "#54595f3d",
          borderLeft: "4px solid var(--primary-color)",
          marginBottom: 8,
        }}
      >
        Password must be at least 8 characters long.
      </Text>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "" },
              { min: 8, message: "Minimum 8 characters" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message:
                  "Must include uppercase, lowercase, number & special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row
        wrap
        justify={screens.md ? "end" : "center"}
        gutter={[12, 16]}
        className="modal-container-footer"
      >
        <Col>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Update Password <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
