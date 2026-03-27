import type { Metadata } from "next";
import Account from "./Account";

export const metadata: Metadata = {
  title: "Account Details",
};

export default function Page() {
  return <Account />;
}
