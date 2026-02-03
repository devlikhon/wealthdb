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
  Grid,
} from "antd";

const { Text } = Typography;

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
        <div className="modal-container-col address-details-col">
          <h3 style={{ marginBottom: 10, textAlign: "center" }}>Your Result</h3>

          {!showResult && (
            <div className="details-box">
              <Text strong>To get your result you need to:</Text>
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
                  <List.Item>
                    {index + 1}. {item}
                  </List.Item>
                )}
              />
            </div>
          )}

          {showResult && selectedInvestment && (
            <Card className="result-box" bordered>
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
                    <h3 style={{ fontWeight: 300 }}>
                      {selectedInvestment.name}
                    </h3>
                    <h3 style={{ fontSize: "32px" }}>
                      {selectedInvestment.rate}%
                    </h3>
                  </Flex>

                  {/* ===== TITLE ROW ===== */}
                  <Row
                    justify="center"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#fff",
                      padding: 10,
                    }}
                  >
                    <Col>
                      <h3>Your investment will be worth:</h3>
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
                  />
                </Col>
              </Row>

              {/* ===== ACTION BUTTON ===== */}
              <Row justify="center">
                <Button
                  type="primary"
                  className="submit-btn"
                  style={{ width: "max-content", marginTop: 20 }}
                  onClick={onCompare}
                >
                  Compare Investment
                </Button>
              </Row>
            </Card>
          )}
        </div>
      </Flex>
    </Col>
  );
};

export default ResultPanel;
