import type { Metadata } from "next";
import PaidInvoices from "./PaidInvoices";

export const metadata: Metadata = {
  title: "Paid Invoices",
};

export default function Page() {
  return <PaidInvoices />;
}
