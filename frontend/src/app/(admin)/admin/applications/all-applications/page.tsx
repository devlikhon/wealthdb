import type { Metadata } from "next";
import AllApplications from "./AllApplications";

export const metadata: Metadata = {
  title: "All Applications",
};

export default function Page() {
  return <AllApplications />;
}
