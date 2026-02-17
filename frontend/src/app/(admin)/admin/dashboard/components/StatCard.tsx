// StatCard.tsx
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard = ({ title, value, description }: StatCardProps) => {
  return (
    <Card
      size="small"
      variant="borderless"
      style={{
        boxShadow: "0 1px 5px var(--secondary-color)",
        background: "var(--secondary-color)",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Text type="secondary" style={{ color: "var(--foreground)" }}>
        {title}
      </Text>
      <Title level={4} style={{ margin: "5px 0", color: "var(--foreground)" }}>
        {value}
      </Title>
      <Text style={{ color: "var(--foreground)" }}>{description}</Text>
    </Card>
  );
};

export default StatCard;
