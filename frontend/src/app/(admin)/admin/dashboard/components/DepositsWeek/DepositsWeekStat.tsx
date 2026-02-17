import DashboardSection from "../DashboardSection/DashboardSection";

interface QuadItem {
  title: string;
  value: string;
  description: string;
}

interface DepositsWeekStatProps {
  header: string;
  items: QuadItem[];
  pieData: { type: string; value: number }[];
}

const DepositsWeekStat = ({
  header,
  items,
  pieData,
}: DepositsWeekStatProps) => {
  return (
    <DashboardSection
      header={`Deposited\nAmount`}
      mainStat={[
        {
          title: header,
          value: "800 GBP",
          description: "800 GBP payments have been made this month",
        },
      ]}
      items={items}
      pieData={pieData}
    />
  );
};

export default DepositsWeekStat;
