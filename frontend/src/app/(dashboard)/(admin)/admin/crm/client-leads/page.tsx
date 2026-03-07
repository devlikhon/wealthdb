import type { Metadata } from "next";
import ClientLeads from "./ClientLeads";

export const metadata: Metadata = {
  title: "Client Leads",
};

export default function Page() {
  return <ClientLeads />;
}
