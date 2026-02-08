/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Row, Space, Grid, message } from "antd";
import { debounce } from "lodash";
import { useRef, useState } from "react";
import "./investmentcalculator.css";
import CalculationForm from "@/app/components/Dashboard/InvestmentCalculator/CalculationForm";
import ResultPanel from "@/app/components/Dashboard/InvestmentCalculator/ResultPanel";
import ProposalForm from "@/app/components/Dashboard/InvestmentCalculator/ProposalForm";
import CompareInvestments from "@/app/components/Dashboard/InvestmentCalculator/CompareInvestments";

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
  const [autoSaveData, setAutoSaveData] = useState<any>(null);
  const [compareList, setCompareList] = useState<any[]>([]);
  const duplicateWarnedRef = useRef<string | null>(null);

  const handleAutoSave = debounce((values: any) => {
    // console.log("Auto updating form data:", values);
    setAutoSaveData(values);
  }, 100);

  const onValuesChange = (_: any, allValues: any) => {
    handleAutoSave(allValues);
  };

  // ===== CALCULATION LOGIC =====
  const onCalculate = (values: any) => {
    const amount = Number(values.investAmount || 0);
    const termType = values.investmentLengthTerm;

    const investment = investments.find(
      (i) => i.name === values.bondInvestmentOption,
    );

    if (!investment || amount <= 0) return;

    const rate = Number(investment.rate);

    // ===== Base returns =====
    const annualReturn = (amount * rate) / 100;
    const monthlyReturn = annualReturn / 12;
    const dailyReturn = annualReturn / 365;

    let maturityDate: Date | null = null;
    let totalReturn = 0;

    // ===== CASE 1: FIXED LENGTH =====
    if (termType === "Fixed Length" && values.bondLength) {
      const months = Number(values.bondLength);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      maturityDate = new Date(today);
      maturityDate.setMonth(maturityDate.getMonth() + months);
      maturityDate.setHours(0, 0, 0, 0);

      const diffTime = maturityDate.getTime() - today.getTime();
      const diffDays = Math.max(
        Math.floor(diffTime / (1000 * 60 * 60 * 24)),
        0,
      );

      totalReturn = dailyReturn * diffDays;
    }

    // if (termType === "Fixed Length" && values.bondLength) {
    //   const months = Number(values.bondLength);

    //   maturityDate = new Date();
    //   maturityDate.setMonth(maturityDate.getMonth() + months);

    //   totalReturn = monthlyReturn * months;
    // }

    // ===== CASE 2: FIXED END DATE =====
    if (termType === "Fixed End Date" && values.maturityDate) {
      const selectedDate: Date = values.maturityDate.toDate();
      maturityDate = selectedDate;

      // Normalize both dates to midnight (IMPORTANT)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const end = new Date(selectedDate);
      end.setHours(0, 0, 0, 0);

      // Difference in FULL days (no ceil)
      const diffTime = end.getTime() - today.getTime();
      const diffDays = Math.max(
        Math.floor(diffTime / (1000 * 60 * 60 * 24)),
        0,
      );

      totalReturn = dailyReturn * diffDays;
    }

    // if (termType === "Fixed End Date" && values.maturityDate) {
    //   const selectedDate: Date = values.maturityDate.toDate();
    //   maturityDate = selectedDate;

    //   const today = new Date();
    //   const diffTime = selectedDate.getTime() - today.getTime();
    //   const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

    //   totalReturn = dailyReturn * diffDays;
    // }

    // ===== Format date =====
    if (!maturityDate) return;

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
        value: `£ ${totalReturn.toFixed(2)}`,
      },
    ]);

    setShowResult(true);
  };

  const generateCompareKey = (investment: any, results: any[]) => {
    return JSON.stringify({
      investmentId: investment.id,
      results: results.map((r) => ({
        key: r.key,
        value: r.value,
      })),
    });
  };

  const handleCompare = () => {
    if (!selectedInvestment || !resultData.length) return;

    const compareKey = generateCompareKey(selectedInvestment, resultData);

    setCompareList((prev) => {
      // ❌ block duplicate comparison
      const alreadyExists = prev.some((item) => item.compareKey === compareKey);

      if (alreadyExists) {
        if (duplicateWarnedRef.current !== compareKey) {
          message.warning("This result is already added for comparison");
          duplicateWarnedRef.current = compareKey;
        }
        return prev;
      }

      const newItem = {
        id: Date.now(),
        compareKey,
        investment: selectedInvestment,
        results: resultData,
      };

      const updated = [newItem, ...prev];

      // keep only last 5 unique
      return updated.slice(0, 6);
    });
  };

  // const onCalculate = (values: any) => {
  //   const amount = Number(values.investAmount || 0);
  //   const months = Number(values.bondLength || 0);

  //   const investment = investments.find(
  //     (i) => i.name === values.bondInvestmentOption,
  //   );

  //   if (!investment) return;

  //   const rate = Number(investment.rate);
  //   const annualReturn = (amount * rate) / 100;
  //   const monthlyReturn = annualReturn / 12;
  //   const dailyReturn = annualReturn / 365;
  //   const totalReturn = (monthlyReturn * months).toFixed(2);

  //   // ===== Calculate maturity date based on bond length =====
  //   const today = new Date();
  //   const maturityDate = new Date(today); // clone date
  //   maturityDate.setMonth(maturityDate.getMonth() + months);

  //   // Format the maturity date like "Nov 14, 2036"
  //   const formattedMaturityDate = maturityDate.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   });

  //   setSelectedInvestment(investment);

  //   setResultData([
  //     {
  //       key: "1",
  //       label: "Initial investment GBP",
  //       value: `£ ${amount.toFixed(2)}`,
  //     },
  //     {
  //       key: "2",
  //       label: "Investment daily return",
  //       value: `£ ${dailyReturn.toFixed(2)}`,
  //     },
  //     {
  //       key: "3",
  //       label: "Investment monthly return",
  //       value: `£ ${monthlyReturn.toFixed(2)}`,
  //     },
  //     {
  //       key: "4",
  //       label: "Investment annual return",
  //       value: `£ ${annualReturn.toFixed(2)}`,
  //     },
  //     {
  //       key: "5",
  //       label: "Maturity date",
  //       value: formattedMaturityDate,
  //     },
  //     {
  //       key: "6",
  //       label: "Total maturity return",
  //       value: `£ ${totalReturn}`,
  //     },
  //   ]);

  //   setShowResult(true);
  // };

  return (
    <div className="modal-container">
      {/* ================= CALCULATION FORM ================= */}
      <Form
        form={calcForm}
        layout="vertical"
        autoComplete="off"
        onValuesChange={onValuesChange}
        onFinish={onCalculate}
        initialValues={{
          currency: "GBP",
          bondLength: 1,
        }}
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
              autoSaveData={autoSaveData}
            />

            <ResultPanel
              showResult={showResult}
              selectedInvestment={selectedInvestment}
              resultData={resultData}
              onCompare={handleCompare}
            />
          </Row>

          <CompareInvestments
            data={compareList}
            onRemove={(id: number) =>
              setCompareList((prev) => prev.filter((i) => i.id !== id))
            }
            onClear={() => setCompareList([])}
          />

          {/* ================= PDF FORM ================= */}
          {showResult && <ProposalForm form={pdfForm} screens={screens} />}
        </Space>
      </Form>
    </div>
  );
};

export default InvestmentCalculator;
