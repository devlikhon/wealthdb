"use client";

import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./RightSide.css";

const { Content } = Layout;

interface RightSideProps {
  children: React.ReactNode;
}

const RightSide: React.FC<RightSideProps> = ({ children }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const londonDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateTime);

  const londonTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(dateTime);

  return (
    <Layout className="main-content-container">
      <div className="header-information-bar">
        <Row justify="end" align="middle" className="header-information-row">
          <Col className="header-item">
            <EnvironmentOutlined className="header-item-icon" />
            Europe/London
          </Col>

          <Col className="header-item">
            <CalendarOutlined className="header-item-icon" />
            {londonDate}
          </Col>

          <Col className="header-item">
            <ClockCircleOutlined className="header-item-icon" />
            {londonTime}
          </Col>

          <Col className="header-item">
            <UserOutlined className="header-item-icon" />
            alex.whitmore@avivaonlineportal.com
          </Col>
        </Row>
      </div>

      <Content>{children}</Content>
    </Layout>
  );
};

export default RightSide;
