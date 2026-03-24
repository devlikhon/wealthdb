"use client";

import { Layout, Row, Col } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./RightSide.css";
import Clock from "../../utils/Clock/Clock";
import { useGlobal } from "@/app/Auth/GlobalProvider/GlobalProvider";

const { Content, Footer } = Layout;

interface RightSideProps {
  children: React.ReactNode;
}

const RightSide = ({ children }: RightSideProps) => {
  // const [dateTime, setDateTime] = useState(new Date());
  const dateTime = new Date();
  const { user } = useGlobal();

  // console.log("User from rightside:", user?.email);

  const londonDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateTime);

  return (
    <Layout className="main-content-container">
      {/* Header */}
      <div className="header-information-bar">
        <Row justify="end" align="middle" className="header-information-row">
          <Col className="header-item">
            <EnvironmentOutlined className="header-item-icon" /> Europe/London
          </Col>
          <Col className="header-item">
            <CalendarOutlined className="header-item-icon" /> {londonDate}
          </Col>
          <Col className="header-item">
            {/* <ClockCircleOutlined className="header-item-icon" /> {londonTime} */}
            <ClockCircleOutlined className="header-item-icon" /> <Clock />
          </Col>
          <Col className="header-item">
            <UserOutlined className="header-item-icon" /> {user?.email}
          </Col>
        </Row>
      </div>

      {/* Scrollable content */}
      <Content className="right-content-scroll">{children}</Content>

      {/* Footer */}
      <Footer className="footer-container">
        © {new Date().getFullYear()} Aviva Wealth. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default RightSide;
