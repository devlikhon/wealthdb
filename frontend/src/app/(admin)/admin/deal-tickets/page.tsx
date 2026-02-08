import type { Metadata } from "next";
import DealTickets from "./DealTickets";

export const metadata: Metadata = {
  title: "Deal Tickets",
};

export default function Page() {
  return <DealTickets />;
}
