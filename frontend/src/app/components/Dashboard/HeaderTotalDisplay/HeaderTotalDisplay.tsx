import { Card, Col, Row, Typography } from "antd";
import type { ReactNode } from "react";

const { Text, Title } = Typography;

// Define the shape of each KPI item
export interface DisplayItem {
  icon: ReactNode;
  label: string;
  value: number | string;
}

interface HeaderTotalDisplayProps {
  items: DisplayItem[];
}

const HeaderTotalDisplay = ({ items }: HeaderTotalDisplayProps) => {
  return (
    <Row gutter={[16, 16]}>
      {items.map((item, i) => (
        <Col
          key={i}
          xs={24}
          sm={12}
          lg={6}
          style={{ display: "flex" }} // keep cards same height
        >
          <Card
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                marginBottom: 8,
                color: "var(--primary-color)",
              }}
            >
              {item.icon}
            </div>

            <Title level={3} style={{ margin: 0 }}>
              {item.value}
            </Title>

            <Text style={{ fontSize: "12px" }}>{item.label}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default HeaderTotalDisplay;
