interface PieItem {
  type: string;
  value: number;
}

const AmountDetails = ({
  investedTotal,
  bondAmount,
  termDeposits,
}: {
  investedTotal: number;
  bondAmount: number;
  termDeposits: number;
}): PieItem[] => {
  return [
    {
      type: "Invested Total",
      value: investedTotal,
    },
    {
      type: "Bond Account",
      value: bondAmount,
    },
    {
      type: "Term Deposits",
      value: termDeposits,
    },
  ];
};

export default AmountDetails;
