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

const { Text } = Typography;

const CompareInvestments = ({ data, onRemove, onClear }: any) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  if (!data.length) return null;

  return (
    <Row className="modal-container-col client-details-col compare-investments">
      <Col xs={24} md={24}>
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <h3>Compare Investments</h3>
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
                bordered
                actions={[
                  <Button
                    type="primary"
                    className="submit-btn"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                  <Flex justify="space-between" align="center">
                    <Image
                      alt={item.investment.name}
                      src={item.investment.img}
                      width={80}
                      preview={false}
                    />
                    <Text strong>{item.investment.name}</Text>
                  </Flex>

                  {item.results.map((r: any) => (
                    <Row key={r.key} justify="space-between">
                      <Text>{r.label}</Text>
                      <Text strong>{r.value}</Text>
                    </Row>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default CompareInvestments;
