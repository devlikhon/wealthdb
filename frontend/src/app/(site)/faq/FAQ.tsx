"use client";

import { Grid, Typography, Collapse, Col, Row } from "antd";
import {
  CaretRightOutlined,
  CaretDownOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./FAQ.css";

const { Panel } = Collapse;

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const leftFaq = [
  {
    key: "1",
    question: "How do I access my online account?",
    answer:
      "Simply visit our login page and enter your registered email and password to access your account dashboard securely.",
  },
  {
    key: "2",
    question: "What should I do if I forget my password?",
    answer:
      "Click on “Forgot Email or Password?” on the login page and follow the steps to reset your credentials via your registered email.",
  },
  {
    key: "3",
    question: "What investment options are available?",
    answer:
      "We offer a range of options including bonds, pre‑IPO accounts, and managed portfolios tailored to your financial goals.",
  },
  {
    key: "4",
    question: "How can I track my investment performance?",
    answer:
      "Your dashboard provides real‑time updates on total investments, interest earned, and recent transactions.",
  },
];

const rightFaq = [
  {
    key: "5",
    question: "How is my personal information protected?",
    answer:
      "We use advanced encryption and multi‑layer security protocols to ensure your data remains confidential and secure.",
  },
  {
    key: "6",
    question: "Can I update my personal details online?",
    answer: `Yes, you can update your contact information and preferences directly from the “Account Details” section after logging in.`,
  },
  {
    key: "7",
    question: "How can I contact customer support?",
    answer: (
      <>
        You can reach us via email at{" "}
        <a
          href="mailto:admin@privatewealth-db.co.uk"
          style={{ color: "var(--primary-color)" }}
        >
          admin@privatewealth-db.co.uk
        </a>{" "}
        or visit our Contact Us page for assistance.
      </>
    ),
  },
  {
    key: "8",
    question: "What should I do if I notice unusual activity on my account?",
    answer:
      "Immediately contact our support team to review and secure your account. We’ll guide you through verification and safety steps.",
  },
];

const FAQ = () => {
  const screens = useBreakpoint();
  return (
    <div
      style={{
        margin: "0 auto",
        padding: screens.lg
          ? "40px 60px" // Desktop (>= 992px)
          : screens.md
            ? "30px 60px" // Tablet (768px - 991px)
            : "20px",
        height: "100%",
        minHeight: screens.lg ? "80vh" : "auto",
        width: screens.lg ? "85%" : "100%",
      }}
    >
      <Title
        level={3}
        style={{
          color: "var(--foreground)",
          marginBottom: 20,
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Frequently Asked Questions
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Collapse
            accordion
            ghost
            expandIconPlacement="end"
            expandIcon={({ isActive }) =>
              isActive ? <DownOutlined /> : <RightOutlined />
            }
          >
            {leftFaq.map((faq) => (
              <Panel header={faq.question} key={faq.key}>
                {faq.answer}
              </Panel>
            ))}
          </Collapse>
        </Col>

        <Col xs={24} md={12}>
          <Collapse
            accordion
            ghost
            expandIconPlacement="end"
            expandIcon={({ isActive }) =>
              isActive ? <DownOutlined /> : <RightOutlined />
            }
          >
            {rightFaq.map((faq) => (
              <Panel header={faq.question} key={faq.key}>
                {faq.answer}
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default FAQ;
