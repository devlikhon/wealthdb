import type { Metadata } from "next";
import AllCalendarAppointments from "./AllCalenderAppointments";

export const metadata: Metadata = {
  title: "All Calender Appointments",
};

export default function Page() {
  return <AllCalendarAppointments />;
}
