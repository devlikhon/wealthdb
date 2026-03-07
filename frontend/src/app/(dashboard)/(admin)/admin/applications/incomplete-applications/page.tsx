import type { Metadata } from "next";
import IncompleteApplications from "./IncompleteApplications";

export const metadata: Metadata = {
  title: "Incomplete Applications",
};

export default function Page() {
  return <IncompleteApplications />;
}
