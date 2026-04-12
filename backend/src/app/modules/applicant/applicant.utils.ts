/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculateInvestment = (values: any) => {
  const amount = Number(values.investmentAmount || 0);
  const rate = Number(values.profitPercentage);

  // ===== Base returns =====
  const annualReturn = (amount * rate) / 100;
  const monthlyReturn = annualReturn / 12;
  const dailyReturn = annualReturn / 365;

  let maturityDate: Date | null = null;
  let totalReturn = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (values.investmentLength === 'Fixed Length') {
    const months = Number(values.bondLengthInMonths);

    maturityDate = new Date(today);
    maturityDate.setMonth(maturityDate.getMonth() + months);
    maturityDate.setHours(0, 0, 0, 0);

    const diffTime = maturityDate.getTime() - today.getTime();
    const diffDays = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

    // totalReturn = dailyReturn * diffDays;
    totalReturn = Number((dailyReturn * diffDays).toFixed(2));
  }

  if (values.investmentLength === 'Fixed End Date') {
    const end = new Date(values.maturityDate);
    end.setHours(0, 0, 0, 0);

    maturityDate = end;

    // Difference in FULL days (no ceil)
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

    // totalReturn = dailyReturn * diffDays;
    totalReturn = Number((dailyReturn * diffDays).toFixed(2));
  }

  return {
    annualReturn,
    monthlyReturn: Number(monthlyReturn.toFixed(2)),
    dailyReturn: Number(dailyReturn.toFixed(2)),
    totalReturn,
    maturityDate,
  };
};

export const calculateAvailableForWithdraw = (investment: any) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maturity = new Date(investment.maturityDate);
  maturity.setHours(0, 0, 0, 0);

  const isMatured = today >= maturity;

  const investmentAmount = investment.investmentAmount || 0;
  const totalReturn = investment.totalReturn || 0;
  const withdrawn = investment.withdrawnAmount || 0;

  // ❌ BEFORE MATURITY → NOTHING CAN BE WITHDRAWN
  if (!isMatured) {
    // return 0;
    throw new Error('Withdrawal is only allowed after maturity date!');
  }

  // ✅ AFTER MATURITY → FULL BALANCE AVAILABLE
  const totalFunds = investmentAmount + totalReturn;

  return Number((totalFunds - withdrawn).toFixed(2));
};

// export const calculateAvailableForWithdraw = (investment: any) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const maturity = new Date(investment.maturityDate);
//   maturity.setHours(0, 0, 0, 0);

//   const isMatured = today >= maturity;

//   const investmentAmount = investment.investmentAmount || 0;
//   const totalReturn = investment.totalReturn || 0;
//   const withdrawn = investment.withdrawnAmount || 0;

//   // ✅ BEFORE maturity → only capital
//   if (!isMatured) {
//     return Number((investmentAmount - withdrawn).toFixed(2));
//   }

//   // ✅ AFTER maturity → capital + profit
//   const totalFunds = investmentAmount + totalReturn;

//   return Number((totalFunds - withdrawn).toFixed(2));
// };
