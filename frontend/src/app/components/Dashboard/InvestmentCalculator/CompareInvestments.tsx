/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";

import {
  Card,
  Row,
  Col,
  Image,
  Button,
  Typography,
  Space,
  Flex,
  Grid,
} from "antd";
import { DeleteOutlined, ClearOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const CompareInvestments = ({ data, onRemove, onClear }: any) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  if (!data.length) return null;

  return (
    <Card
      variant="borderless"
      style={{ background: "var(--secondary-color)" }}
      className="compare-investments"
    >
      <Col xs={24} md={24}>
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Title
            level={5}
            style={{ margin: 0, color: "var(--foreground)", fontWeight: 500 }}
          >
            Compare Investments
          </Title>
          <Button
            type="primary"
            className="submit-btn"
            icon={<ClearOutlined />}
            onClick={onClear}
          >
            Clear All
          </Button>
        </Space>

        <Row gutter={[16, 16]} style={{ marginTop: screens.md ? 0 : 20 }}>
          {data.map((item: any) => (
            <Col xs={24} md={12} lg={8} key={item.id}>
              <Card
                variant="borderless"
                style={{ background: "var(--primary-color)" }}
                actions={[
                  <Button
                    type="primary"
                    className="submit-btn remove-btn"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemove(item.id)}
                    style={{
                      borderRadius: 0,
                    }}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <Space
                  orientation="vertical"
                  size={8}
                  style={{ width: "100%" }}
                >
                  <Flex justify="space-between" align="center">
                    <Image
                      alt={item.investment.name}
                      src={item.investment.img}
                      width={80}
                      preview={false}
                    />
                    <Text strong style={{ color: "var(--foreground)" }}>
                      {item.investment.name}
                    </Text>
                  </Flex>

                  {item.results.map((r: any) => (
                    <Row key={r.key} justify="space-between">
                      <Text style={{ color: "var(--foreground)" }}>
                        {r.label}
                      </Text>
                      <Text strong style={{ color: "var(--foreground)" }}>
                        {r.value}
                      </Text>
                    </Row>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Card>
  );
};

export default CompareInvestments;
