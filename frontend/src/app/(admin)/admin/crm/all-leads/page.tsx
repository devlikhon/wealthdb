import type { Metadata } from "next";
import AllLeads from "./AllLeads";

export const metadata: Metadata = {
  title: "All Leads",
};

export default function Page() {
  return <AllLeads />;
}
