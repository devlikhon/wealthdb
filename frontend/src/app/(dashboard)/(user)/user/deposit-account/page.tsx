import type { Metadata } from "next";
import DepositAccount from "./DepositAccount";

export const metadata: Metadata = {
  title: "Deposit Account",
};

export default function Page() {
  return <DepositAccount />;
}
