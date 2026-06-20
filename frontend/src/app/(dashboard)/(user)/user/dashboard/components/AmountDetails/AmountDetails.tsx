interface PieItem {
  type: string;
  value: number;
}

const AmountDetails = ({
  totalBondInvested,
  totalIPOSharesInvested,
  // grandTotal,
}: {
  totalBondInvested: number;
  totalIPOSharesInvested: number;
  // grandTotal: number;
}): PieItem[] => {
  return [
    {
      type: "Total Bond Investment",
      value: totalBondInvested,
    },
    {
      type: "Total IPO Shares",
      value: totalIPOSharesInvested,
    },
    // {
    //   type: "Total Portfolio",
    //   value: grandTotal,
    // },
  ];
};

export default AmountDetails;
