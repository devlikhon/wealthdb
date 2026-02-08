import type { Metadata } from "next";
import ProspectLeads from "./ProspectLeads";

export const metadata: Metadata = {
  title: "Prospect Leads",
};

export default function Page() {
  return <ProspectLeads />;
}
