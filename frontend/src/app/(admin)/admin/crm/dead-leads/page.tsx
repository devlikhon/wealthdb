import type { Metadata } from "next";
import DeadLeads from "./DeadLeads";

export const metadata: Metadata = {
  title: "Dead Leads",
};

export default function Page() {
  return <DeadLeads />;
}
