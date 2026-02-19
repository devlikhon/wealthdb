/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Row,
  Col,
  Flex,
  List,
  Card,
  Image,
  Table,
  Typography,
  Button,
} from "antd";

const { Title, Text } = Typography;

const columns = [
  { dataIndex: "label", render: (text: string) => <Text>{text}</Text> },
  {
    dataIndex: "value",
    align: "right" as const,
    width: 120,
    render: (text: string) => <Text>{text}</Text>,
  },
];

const ResultPanel = ({
  showResult,
  selectedInvestment,
  resultData,
  onCompare,
}: any) => {
  return (
    <Col xs={24} lg={12}>
      <Flex
        vertical
        justify="space-between"
        style={{ height: "100%", rowGap: 16 }}
      >
        <Card
          // className="modal-container-col client-details-col"
          style={{ background: "var(--secondary-color)" }}
          variant="borderless"
        >
          <Title
            level={5}
            style={{
              marginBottom: 10,
              textAlign: "center",
              color: "var(--foreground)",
              fontWeight: 500,
            }}
          >
            Your Result
          </Title>

          {!showResult && (
            <div className="details-box">
              <Text strong style={{ color: "var(--foreground)" }}>
                To get your result you need to:
              </Text>
              <List
                size="small"
                dataSource={[
                  "Enter the amount you wish to invest",
                  "Select the investment length term",
                  "Add the maturity date",
                  "Select the investment you want to invest in",
                  "Click the calculate button",
                ]}
                renderItem={(item, index) => (
                  <List.Item style={{ color: "var(--foreground)" }}>
                    {index + 1}. {item}
                  </List.Item>
                )}
              />
            </div>
          )}

          {showResult && selectedInvestment && (
            <Card
              className="result-box"
              variant="borderless"
              style={{ background: "var(--primary-color)" }}
            >
              {/* ===== ISSUER HEADER ===== */}

              <Row style={{ border: "1px solid rgba(5,5,5,0.06)" }}>
                <Col md={24}>
                  <Flex
                    vertical
                    align="center"
                    justify="center"
                    gap={4}
                    style={{ padding: 10 }}
                  >
                    <Image
                      src={selectedInvestment.img}
                      preview={false}
                      alt={selectedInvestment.name}
                      width={100}
                    />
                    <Title
                      level={5}
                      style={{
                        fontWeight: 300,
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      {selectedInvestment.name}
                    </Title>

                    <Title
                      level={3}
                      style={{
                        // fontWeight: 300,
                        color: "var(--secondary-color)",
                        margin: 0,
                      }}
                    >
                      {selectedInvestment.rate}%
                    </Title>
                  </Flex>

                  {/* ===== TITLE ROW ===== */}
                  <Row
                    justify="center"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "#fff",
                      padding: 10,
                    }}
                  >
                    <Col>
                      <Title
                        level={5}
                        style={{
                          fontWeight: 500,
                          color: "var(--foreground)",
                          margin: 0,
                        }}
                      >
                        Your investment will be worth:
                      </Title>
                    </Col>
                  </Row>

                  {/* TABLE */}
                  <Table
                    dataSource={resultData}
                    columns={columns}
                    pagination={false}
                    showHeader={false}
                    bordered={false}
                    size="small"
                    className="result-table"
                  />
                </Col>
              </Row>

              {/* ===== ACTION BUTTON ===== */}
              <Row justify="center">
                <Button
                  type="primary"
                  className="cancel-btn compare-btn"
                  style={{ width: "max-content", marginTop: 20 }}
                  onClick={onCompare}
                >
                  Compare Investment
                </Button>
              </Row>
            </Card>
          )}
        </Card>
      </Flex>
    </Col>
  );
};

export default ResultPanel;
