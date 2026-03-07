import type { Metadata } from "next";
import UserDashboard from "./UserDashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <UserDashboard />;
}
