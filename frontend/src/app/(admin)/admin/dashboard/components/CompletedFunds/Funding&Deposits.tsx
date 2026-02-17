import DashboardSection from "../DashboardSection/DashboardSection";

interface QuadItem {
  title: string;
  value: string;
  description: string;
}

interface FundingDepositsProps {
  header: string;
  items: QuadItem[];
  pieData: { type: string; value: number }[];
}

const FundingDeposits = ({ header, items, pieData }: FundingDepositsProps) => {
  return (
    <DashboardSection
      header={`Funding\n&\nPayments`}
      mainStat={[
        {
          title: header,
          value: "50%",
          description: "A total of 2 of the 4 funds have been completed",
        },
      ]}
      items={items}
      pieData={pieData}
    />
  );
};

export default FundingDeposits;
