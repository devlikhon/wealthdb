/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Typography,
  List,
} from "antd";
import { EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./contact.css";
import LoginIllustration from "@/app/components/SVG/LoginIllustrationSVG";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";
import parsePhoneNumberFromString from "libphonenumber-js";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

const contactItems = [
  {
    icon: <EnvironmentOutlined />,
    text: "21 Moorfields, London, EC2Y 9DB",
  },
  {
    icon: <MailOutlined />,
    text: "wealth@dwouk-db.com",
  },
];

const ContactUs = () => {
  const [form] = Form.useForm();

  const screens = useBreakpoint();

  const { sendContactMessage } = useGlobal();

  const buildPhoneObject = (phone: string) => {
    const parsed = parsePhoneNumberFromString(`+${phone}`);

    if (!parsed) {
      throw new Error("Invalid phone number!");
    }

    return {
      countryCode: `+${parsed.countryCallingCode}`,
      number: parsed.nationalNumber,
      type: "mobile",
      isPrimary: true,
    };
  };

  // const handleAutoSave = debounce((values: any) => {
  //   console.log({
  //     ...values,
  //     phone: buildPhoneObject(values.phone),
  //   });
  // }, 500);

  // 🔹 Called on every field change
  // const onValuesChange = (_changed: any, allValues: any) => {
  //   handleAutoSave(allValues);
  // };

  const onFinish = async (values: any) => {
    try {
      // ✅ 1. Flush pending debounce (VERY IMPORTANT)
      // handleAutoSave.flush();

      const payload = {
        ...values,
        phone: buildPhoneObject(values.phone),
      };

      console.log("contact payload:", payload);

      await sendContactMessage(payload);

      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: screens.lg
          ? "40px 60px" // Desktop (>= 992px)
          : screens.md
            ? "30px 60px" // Tablet (768px - 991px)
            : "20px",
        minHeight: "calc(100vh - 180px)",
        width: screens.lg ? "85%" : "100%",
      }}
    >
      <Title
        level={3}
        style={{
          color: "var(--foreground)",
          marginBottom: 20,
          fontWeight: 400,
        }}
      >
        Contact Us
      </Title>

      <Row gutter={[24, 24]}>
        {/* Left Side */}
        <Col xs={24} md={8}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 400,
              marginBottom: 10,
            }}
          >
            Support Team
          </Title>

          <List
            split={false}
            dataSource={contactItems}
            renderItem={(item) => (
              <List.Item style={{ padding: "0 0 5px 0", border: "none" }}>
                <Flex align="center" gap={12}>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontSize: 16,
                    }}
                  >
                    {item.icon}
                  </span>

                  <Text
                    style={{
                      color: "var(--foreground)",
                      fontSize: 16,
                    }}
                  >
                    {item.text}
                  </Text>
                </Flex>
              </List.Item>
            )}
          />
        </Col>

        {/* Right Side */}
        <Col xs={24} md={16} style={{ zIndex: 1 }}>
          <Title
            level={4}
            style={{
              color: "var(--foreground)",
              fontWeight: 400,
              marginBottom: 10,
            }}
          >
            Contact Form
          </Title>

          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            // onValuesChange={onValuesChange}
            // requiredMark={false}
          >
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <Input placeholder="Full Name *" />
            </Form.Item>

            <Form.Item name="phone" rules={[{ required: true, message: "" }]}>
              <PhoneInput
                country="gb"
                enableSearch
                prefix="+"
                countryCodeEditable={false}
                inputStyle={{ width: "100%" }}
                // onChange={(value) => form.setFieldValue("phone", value)}
              />
            </Form.Item>

            {/* <Form.Item name="phone" rules={[{ required: true, message: "" }]}>
              <PhoneInput
                country="gb"
                enableSearch
                prefix="+"
                countryCodeEditable={false}
                inputStyle={{ width: "100%" }}
                onChange={(value) => form.setFieldValue("phone", value)}
              />
            </Form.Item> */}

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Invalid email",
                },
              ]}
            >
              <Input placeholder="Email *" />
            </Form.Item>

            {/* <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="email">
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                
              </Col>
            </Row> */}

            <Form.Item name="message" rules={[{ required: true, message: "" }]}>
              <TextArea rows={7} placeholder="Message *" />
            </Form.Item>

            <Button
              style={{ width: 150 }}
              className="submit-btn"
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <div className="right-bg">
        <LoginIllustration />
      </div>
    </div>
  );
};

export default ContactUs;
