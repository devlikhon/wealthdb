import type { Metadata } from "next";
import AllLeadNotes from "./AllLeadNotes";

export const metadata: Metadata = {
  title: "All Lead Notes",
};

export default function Page() {
  return <AllLeadNotes />;
}
