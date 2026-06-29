import type { Metadata } from "next";
import FAQ from "./FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

export default function Page() {
  return <FAQ />;
}
