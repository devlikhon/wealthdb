import type { Metadata } from "next";
import Funding from "./Funding";

export const metadata: Metadata = {
  title: "Funding",
};

export default function Page() {
  return <Funding />;
}
