import type { Metadata } from "next";
import EmailMessages from "./EmailMessages";

export const metadata: Metadata = {
  title: "Email Messages",
};

export default function Page() {
  return <EmailMessages />;
}
