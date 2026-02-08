import type { Metadata } from "next";
import OpenInvoices from "./OpenInvoices";

export const metadata: Metadata = {
  title: "Open Invoices",
};

export default function Page() {
  return <OpenInvoices />;
}
