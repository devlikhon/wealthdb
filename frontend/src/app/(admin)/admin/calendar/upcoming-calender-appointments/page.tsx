import type { Metadata } from "next";
import UpcomingCalenderAppointments from "./UpcomingCalenderAppointments";

export const metadata: Metadata = {
  title: "Scheduled Calender Appointments",
};

export default function Page() {
  return <UpcomingCalenderAppointments />;
}
