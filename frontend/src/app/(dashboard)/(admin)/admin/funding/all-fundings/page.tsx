import type { Metadata } from "next";
import AllFundings from "./AllFundings";

export const metadata: Metadata = {
  title: "Open Funding",
};

export default function Page() {
  return <AllFundings />;
}
