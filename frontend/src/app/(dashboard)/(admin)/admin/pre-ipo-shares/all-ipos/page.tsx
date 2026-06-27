import type { Metadata } from "next";
import IPOS from "./IPOS";

export const metadata: Metadata = {
  title: "IPOS",
};

export default function Page() {
  return <IPOS />;
}
