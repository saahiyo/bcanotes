import type { Metadata } from "next";
import { NoticesClient } from "@/components/notices-client";

export const metadata: Metadata = {
  title: "Updates & Announcements | BCA YCMOU",
  description:
    "Official bulletin board and updates page for BCA YCMOU students. Find exam timetables, notes additions, practical file uploads, and other essential announcements.",
};

export default function NoticesPage() {
  return <NoticesClient />;
}
