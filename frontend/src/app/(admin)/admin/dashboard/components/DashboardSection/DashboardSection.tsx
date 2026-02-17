import { Card, Row, Col, Typography } from "antd";
import StatCard from "../StatCard";
import DashboardPie from "../DashboardPie/DashboardPie";

const { Title, Text } = Typography;

interface QuadItem {
  title: string;
  value: string;
  description: string;
}

interface DashboardSectionProps {
  header: string;
  mainStat?: QuadItem[]; // optional main stat card
  items?: QuadItem[]; // smaller stats
  pieData?: { type: string; value: number }[]; // optional pie chart
}

const DashboardSection = ({
  header,
  mainStat = [],
  items = [],
  pieData,
}: DashboardSectionProps) => {
  return (
    <Card
      size="small"
      title={<div style={{}}>{header}</div>}
      styles={{
        header: {
          textAlign: "center",
          width: "100%",
          fontSize: 16,
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border-color)",
        },
      }}
      style={{
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
        background: "var(--background)",
        border: "1px solid var(--border-color)",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        {/* Pie Chart */}
        {pieData && (
          <Col xs={24} md={10}>
            <DashboardPie data={pieData} title={header} height={350} />
          </Col>
        )}

        {/* Stats */}
        <Col xs={24} md={pieData ? 14 : 24}>
          {mainStat.length > 0 && (
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {mainStat.map((item, index) => (
                <Col xs={24} key={index}>
                  <StatCard
                    title={item.title}
                    value={item.value}
                    description={item.description}
                  />
                </Col>
              ))}
            </Row>
          )}
          {/* {mainStat && (
            <Row style={{ marginBottom: 16 }}>
              <Col xs={24}>
                <StatCard
                  title={mainStat.title}
                  value={mainStat.value}
                  description={mainStat.description}
                />
              </Col>
            </Row>
          )} */}

          {items.length > 0 && (
            <Row gutter={[16, 16]}>
              {items.map((item, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    size="small"
                    variant="borderless"
                    // styles={{
                    //   body: {
                    //     background: "var(--secondary-color)",
                    //     color: "var(--foreground) !important",
                    //   },
                    // }}
                    style={{
                      boxShadow: "0 1px 5px var(--secondary-color)",
                      background: "var(--secondary-color)",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </Text>
                    <Title
                      level={5}
                      style={{ margin: "5px 0", color: "var(--foreground)" }}
                    >
                      {item.value}
                    </Title>
                    <Text style={{ color: "var(--foreground)" }}>
                      {item.description}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardSection;
