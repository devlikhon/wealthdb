import type { Metadata } from "next";
import AdminDashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <AdminDashboard />;
}
