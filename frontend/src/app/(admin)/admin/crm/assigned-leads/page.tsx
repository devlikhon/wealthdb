import type { Metadata } from "next";
import AssignedLeads from "./AssignedLeads";

export const metadata: Metadata = {
  title: "Assigned Leads",
};

export default function Page() {
  return <AssignedLeads />;
}
