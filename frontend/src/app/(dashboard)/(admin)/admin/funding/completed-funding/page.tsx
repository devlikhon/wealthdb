import type { Metadata } from "next";
import CompletedFunding from "./CompletedFunding";

export const metadata: Metadata = {
  title: "Completed Funding",
};

export default function Page() {
  return <CompletedFunding />;
}
