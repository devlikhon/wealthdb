import type { Metadata } from "next";
import AllInvoices from "./AllInvoices";

export const metadata: Metadata = {
  title: "All Invoices",
};

export default function Page() {
  return <AllInvoices />;
}
