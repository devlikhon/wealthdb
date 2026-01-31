/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Row, Space, Grid } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import "./investmentcalculator.css";
import CalculationForm from "@/app/components/Dashboard/InvestmentCalculator/CalculationForm";
import ResultPanel from "@/app/components/Dashboard/InvestmentCalculator/ResultPanel";
import ProposalForm from "@/app/components/Dashboard/InvestmentCalculator/ProposalForm";

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

const InvestmentCalculator = () => {
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

    // ===== Calculate maturity date based on bond length =====
    const today = new Date();
    const maturityDate = new Date(today); // clone date
    maturityDate.setMonth(maturityDate.getMonth() + months);

    // Format the maturity date like "Nov 14, 2036"
    const formattedMaturityDate = maturityDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

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
        value: formattedMaturityDate,
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
            <CalculationForm
              calcForm={calcForm}
              setShowResult={setShowResult}
              investments={investments}
            />

            <ResultPanel
              showResult={showResult}
              selectedInvestment={selectedInvestment}
              resultData={resultData}
            />
          </Row>

          {/* ================= PDF FORM ================= */}
          {showResult && <ProposalForm form={pdfForm} screens={screens} />}
        </Space>
      </Form>
    </div>
  );
};

export default InvestmentCalculator;
