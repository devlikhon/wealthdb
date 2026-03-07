import DashboardSection from "../DashboardSection/DashboardSection";

interface QuadItem {
  title: string;
  value: string;
  description: string;
}

interface ConversionRatesProps {
  header: string;
  items: QuadItem[];
  pieData: { type: string; value: number }[];
}

const ConversionRates = ({ header, items, pieData }: ConversionRatesProps) => {
  return (
    <DashboardSection
      header={`Conversion\nRates`}
      mainStat={[
        {
          title: header,
          value: "33%",
          description: "A total of 2 of the 6 applicants have made deposits",
        },
      ]}
      items={items}
      pieData={pieData}
    />
  );
};

export default ConversionRates;
