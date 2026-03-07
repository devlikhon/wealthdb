import type { Metadata } from "next";
import CompletedApplications from "./CompletedApplications";

export const metadata: Metadata = {
  title: "Completed Applications",
};

export default function Page() {
  return <CompletedApplications />;
}
