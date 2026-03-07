import type { Metadata } from "next";
import Leaderboard from "./LeaderBoard";

export const metadata: Metadata = {
  title: "Sales Leaderboard",
};

export default function Page() {
  return <Leaderboard />;
}
