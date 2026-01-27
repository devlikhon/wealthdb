/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        values,
        { withCredentials: true },
      );

      message.success(res.data.message || "Logged in successfully!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Not authorized!");
    } finally {
      setLoading(false);
    }
  };

  // const onFinish = async (values: any) => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
  //       values,
  //       { withCredentials: true },
  //     );

  //     message.success(res.data.message || "Logged in successfully!");

  //     // 🔥 THIS is the fix
  //     window.location.href = "/admin/dashboard";
  //   } catch (err: any) {
  //     message.error(err.response?.data?.message || "Not authorized!");
  //     setLoading(false);
  //   }
  // };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="login-form"
      onFieldsChange={() => {
        const hasErrors = form
          .getFieldsError()
          .some(({ errors }) => errors.length);

        const allTouched = form.isFieldsTouched(true);

        setDisabled(!allTouched || hasErrors);
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input placeholder="Please type email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder="Please type password" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        disabled={disabled}
        className={`login-btn ${disabled ? "login-btn--disabled" : ""}`}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
