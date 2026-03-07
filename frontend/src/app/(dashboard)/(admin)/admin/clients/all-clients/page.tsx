import type { Metadata } from "next";
import AllClients from "./AllClients";

export const metadata: Metadata = {
  title: "All Clients",
};

export default function Page() {
  return <AllClients />;
}
