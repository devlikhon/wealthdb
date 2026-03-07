import type { Metadata } from "next";
import PastCalendarAppointments from "./PastCalenderAppointments";

export const metadata: Metadata = {
  title: "Past Calender Appointments",
};

export default function Page() {
  return <PastCalendarAppointments />;
}
