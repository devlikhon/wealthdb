/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Flex,
  Radio,
  Image,
  DatePicker,
  Card,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const currencies = ["GBP"];

type Investment = {
  id: number;
  name: string;
  rate: string;
  date: string;
  img: string;
};

type CalculationFormProps = {
  calcForm: any;
  setShowResult: (val: boolean) => void;
  investments: Investment[];
  autoSaveData: any;
};

const CalculationForm = ({
  calcForm,
  setShowResult,
  investments,
  autoSaveData,
}: CalculationFormProps) => {
  // console.log("Auto-save data:", autoSaveData.investmentLengthTerm);
  const investmentLengthTerm = autoSaveData?.investmentLengthTerm;
  // const investmentLengthTerm = Form.useWatch("investmentLengthTerm", calcForm);

  // Default to "Fixed Length" if nothing is selected yet
  const term = investmentLengthTerm || "Fixed Length";

  return (
    <Col xs={24} lg={12}>
      <Card
        // className="modal-container-col client-details-col"
        style={{ background: "var(--secondary-color)" }}
        variant="borderless"
      >
        <h3 style={{ marginBottom: 10, color: "var(--foreground)" }}>
          Calculation Details
        </h3>

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
                <Option className="modal-select" value="">
                  Please select...
                </Option>
                {currencies.map((c) => (
                  <Option className="modal-select" key={c} value={c}>
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
                <Option className="modal-select" value="">
                  Please select...
                </Option>
                <Option className="modal-select" value="Fixed Length">
                  Fixed Length
                </Option>
                <Option className="modal-select" value="Fixed End Date">
                  Fixed End Date
                </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            {term === "Fixed Length" && (
              <Form.Item label="Bond Length (Months):" name="bondLength">
                <InputNumber
                  style={{ width: "100%" }}
                  controls={false}
                  min={0}
                  stringMode
                />
              </Form.Item>
            )}
            {term === "Fixed End Date" && (
              <Form.Item label="Maturity Date:" name="maturityDate">
                <DatePicker
                  placeholder="Select date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}
          </Col>
        </Row>

        {/* INVESTMENT OPTIONS */}
        <Card
          // className="modal-container-col client-details-col"
          style={{ background: "var(--secondary-color)" }}
          variant="borderless"
          // bodyStyle={{ padding: 0 }}
          styles={{
            body: { padding: 0 },
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "var(--foreground)" }}>
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
            style={{ marginBottom: 0 }}
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
                      <Image
                        src={item.img}
                        alt={item.name}
                        style={{
                          maxWidth: 75,
                          width: "100%",
                          height: 45,
                          objectFit: "contain",
                        }}
                        preview={false}
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
                      <div className="investment-item-label">Maturity Date</div>
                      <div className="investment-item-detail">{item.date}</div>
                    </Flex>
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Card>

        {/* CLEAR + CALCULATE */}
        <Row
          justify="end"
          gutter={12}
          className="modal-container-footer"
          style={{ marginTop: 20 }}
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
            <Button type="primary" htmlType="submit" className="submit-btn">
              Calculate
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default CalculationForm;
