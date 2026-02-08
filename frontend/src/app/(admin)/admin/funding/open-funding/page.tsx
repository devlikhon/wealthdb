import type { Metadata } from "next";
import OpenFunding from "./OpenFunding";

export const metadata: Metadata = {
  title: "Open Funding",
};

export default function Page() {
  return <OpenFunding />;
}
