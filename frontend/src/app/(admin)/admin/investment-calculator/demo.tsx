/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  InputNumber,
  Space,
  Flex,
  Radio,
  Typography,
  List,
  Card,
  Image,
  Table,
  Grid,
} from "antd";
import { debounce } from "lodash";
import { faChevronDown, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./investmentcalculator.css";

const { Option } = Select;
const { Text } = Typography;

const investments = [
  {
    id: 1,
    name: "Aviva",
    rate: "6.125",
    date: "Nov 14, 2036",
    img: "/img/aviva.jpg",
  },
  {
    id: 2,
    name: "JP Morgan",
    rate: "8.81",
    date: "Jun 21, 2031",
    img: "/img/jp-morgan.jpg",
  },
];

const currencies = ["GBP"];

const columns = [
  {
    dataIndex: "label",
    render: (text: string) => <Text>{text}</Text>,
  },
  {
    dataIndex: "value",
    align: "right" as const,
    width: 120,
    render: (text: string) => <Text>{text}</Text>,
  },
];

const OK = () => {
  const [calcForm] = Form.useForm();
  const [pdfForm] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);

  const handleAutoSave = debounce((values: any) => {
    console.log("Auto updating form data:", values);
  }, 500);

  const onValuesChange = (_: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  // ===== CALCULATION LOGIC =====
  const onCalculate = (values: any) => {
    const amount = Number(values.investAmount || 0);
    const months = Number(values.bondLength || 0);

    const investment = investments.find(
      (i) => i.name === values.bondInvestmentOption,
    );

    if (!investment) return;

    const rate = Number(investment.rate);
    const annualReturn = (amount * rate) / 100;
    const monthlyReturn = annualReturn / 12;
    const dailyReturn = annualReturn / 365;
    const totalReturn = (monthlyReturn * months).toFixed(2);

    setSelectedInvestment(investment);

    setResultData([
      {
        key: "1",
        label: "Initial investment GBP",
        value: `£ ${amount.toFixed(2)}`,
      },
      {
        key: "2",
        label: "Investment daily return",
        value: `£ ${dailyReturn.toFixed(2)}`,
      },
      {
        key: "3",
        label: "Investment monthly return",
        value: `£ ${monthlyReturn.toFixed(2)}`,
      },
      {
        key: "4",
        label: "Investment annual return",
        value: `£ ${annualReturn.toFixed(2)}`,
      },
      {
        key: "5",
        label: "Maturity date",
        value: investment.date,
      },
      {
        key: "6",
        label: "Total maturity return",
        value: `£ ${totalReturn}`,
      },
    ]);

    setShowResult(true);
  };

  return (
    <div className="modal-container">
      {/* ================= CALCULATION FORM ================= */}
      <Form
        form={calcForm}
        layout="vertical"
        autoComplete="off"
        onValuesChange={onValuesChange}
        onFinish={onCalculate}
        initialValues={{ currency: "GBP", bondLength: 1 }}
      >
        <Space orientation="vertical" size={24} style={{ width: "100%" }}>
          <Row
            gutter={[
              { xs: 0, sm: 12, md: 16, lg: 24 },
              { xs: 12, sm: 16, md: 16, lg: 24 },
            ]}
          >
            {/* LEFT COLUMN */}
            <Col xs={24} lg={12}>
              <div className="modal-container-col client-details-col">
                <h3 style={{ marginBottom: 10 }}>Calculation Details</h3>

                {/* --- your existing inputs (unchanged) --- */}
                {/* (content omitted here for brevity, unchanged from your code) */}

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Amount to invest (£):"
                      name="investAmount"
                      rules={[{ required: true, message: "" }]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        controls={false} // no arrows
                        min={0}
                        stringMode
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "Tab",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Investment Currency:" name="currency">
                      <Select
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                      >
                        <Option value="">Please select...</Option>
                        {currencies.map((c) => (
                          <Option key={c} value={c}>
                            {c}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Investment Length Term:"
                      name="investmentLengthTerm"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Select
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        placeholder="Please select..."
                      >
                        <Option value="">Please select...</Option>
                        <Option value="Fixed Length">Fixed Length</Option>
                        <Option value="Fixed End Date">Fixed End Date</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Bond Length (Months):" name="bondLength">
                      <InputNumber
                        style={{ width: "100%" }}
                        controls={false} // no arrows
                        min={0}
                        stringMode
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "Tab",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* INVESTMENT OPTIONS */}
                <div className="modal-container-col client-details-col">
                  <h3 style={{ marginBottom: "15px" }}>
                    Bond Investment Options:
                  </h3>

                  <Form.Item
                    name="bondInvestmentOption"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Radio.Group className="radio-group">
                      {investments.map((item) => {
                        const id = Number(item.id);

                        return (
                          <Radio.Button
                            key={id}
                            value={item.name}
                            className="investment-item"
                          >
                            <Flex justify="space-between" align="center">
                              <img
                                src={item.img}
                                alt={item.name}
                                style={{ maxWidth: 75 }}
                              />
                              <h2>
                                {item.rate}
                                <span>%</span>
                              </h2>
                            </Flex>

                            <Flex
                              vertical
                              align="center"
                              style={{ rowGap: 8, marginTop: 10 }}
                            >
                              <div className="investment-name">{item.name}</div>
                              <div className="investment-item-label">
                                Maturity Date
                              </div>
                              <div className="investment-item-detail">
                                {item.date}
                              </div>
                            </Flex>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Row
                  justify="end"
                  gutter={12}
                  className="modal-container-footer"
                  style={{ marginTop: 15 }}
                >
                  <Col>
                    <Button
                      type="primary"
                      className="cancel-btn"
                      onClick={() => {
                        calcForm.resetFields();
                        setShowResult(false);
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn"
                    >
                      Calculate
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} lg={12}>
              <Flex
                vertical
                justify="space-between"
                style={{ height: "100%", rowGap: 16 }}
              >
                <div className="modal-container-col address-details-col">
                  <h3 style={{ marginBottom: 10, textAlign: "center" }}>
                    Your Result
                  </h3>

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
                              src="/img/aviva.jpg"
                              preview={false}
                              alt="Aviva"
                              width={100}
                            />
                            <h3 style={{ fontWeight: 300 }}>Aviva</h3>
                            <h3 style={{ fontSize: "32px" }}>6.125%</h3>
                          </Flex>

                          {/* ===== TITLE ROW ===== */}
                          <Row
                            justify="center"
                            style={{
                              backgroundColor: "var(--primary-color)",
                              color: "#fff",
                              padding: 20,
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
                        >
                          Compare Investment
                        </Button>
                      </Row>
                    </Card>
                  )}
                </div>
              </Flex>
            </Col>
          </Row>

          {/* ================= PDF FORM ================= */}
          {showResult && selectedInvestment && (
            <Form form={pdfForm} layout="vertical" autoComplete="off">
              <Row className="modal-container-col client-details-col">
                <Col xs={24} md={24}>
                  <Space
                    direction="vertical"
                    size={12}
                    style={{ width: "100%" }}
                  >
                    <h3
                      style={{
                        width: "100%",
                        maxWidth: screens.md ? "65%" : "100%",
                        margin: "auto",
                      }}
                    >
                      Generate Investment Proposal
                    </h3>

                    <Card
                      style={{
                        width: "100%",
                        maxWidth: screens.md ? "65%" : "100%",
                        margin: "auto",
                      }}
                      bordered
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Client Name:"
                            name="clientName"
                            rules={[{ required: true, message: "" }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Contact Number:"
                            name="contactNumber"
                            rules={[
                              { required: true, message: "" },
                              {
                                pattern: /^\+?[0-9]{8,15}$/,
                                message: "",
                              },
                            ]}
                          >
                            <Input
                              // inputMode="numeric"
                              inputMode="tel"
                              onKeyDown={(e) => {
                                if (
                                  !/[0-9]/.test(e.key) &&
                                  ![
                                    "Backspace",
                                    "Delete",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "Tab",
                                  ].includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} md={24}>
                          <Form.Item
                            label="Email Address:"
                            name="email"
                            rules={[
                              { required: true, message: "" },
                              { type: "email", message: "" },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Button
                        type="primary"
                        htmlType="submit"
                        className="submit-btn"
                        // style={{ width: "max-content" }}
                      >
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          style={{ fontSize: 20 }}
                        />{" "}
                        Create Proposal Document
                      </Button>
                    </Card>
                  </Space>
                </Col>
              </Row>
            </Form>
          )}
        </Space>
      </Form>
    </div>
  );
};

export default OK;
