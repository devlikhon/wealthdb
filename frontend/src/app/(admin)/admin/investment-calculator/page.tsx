import type { Metadata } from "next";
import InvestmentCalculator from "./InvestmentCalculator";

export const metadata: Metadata = {
  title: "Investment Calculator",
};

export default function Page() {
  return <InvestmentCalculator />;
}
