/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, Row, Col, Space, Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const ProposalForm = ({ pdfForm, screens }: any) => {
  return (
    <Form form={pdfForm} layout="vertical" autoComplete="off">
      <Row className="modal-container-col client-details-col">
        <Col xs={24} md={24}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
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
                <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 20 }} />{" "}
                Create Proposal Document
              </Button>
            </Card>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default ProposalForm;
