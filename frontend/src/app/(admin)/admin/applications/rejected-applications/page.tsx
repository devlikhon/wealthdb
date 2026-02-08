import type { Metadata } from "next";
import RejectedApplications from "./RejectedApplications";

export const metadata: Metadata = {
  title: "Rejected Applications",
};

export default function Page() {
  return <RejectedApplications />;
}
