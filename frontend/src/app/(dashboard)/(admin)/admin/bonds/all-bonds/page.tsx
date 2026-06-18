import type { Metadata } from "next";
import Bonds from "./Bonds";

export const metadata: Metadata = {
  title: "Bonds",
};

export default function Page() {
  return <Bonds />;
}
