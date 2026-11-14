import type { Metadata } from "next";
import { NoticesClient } from "@/components/notices-client";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Updates & Announcements",
  description:
    "Official bulletin board and updates page for BCA YCMOU students. Find exam timetables, notes additions, practical file uploads, and other essential announcements.",
  alternates: {
    canonical: `${siteUrl}/notices`,
  },
  openGraph: {
    title: "Updates & Announcements | BCA YCMOU",
    description:
      "Official bulletin board and updates page for BCA YCMOU students. Find exam timetables, notes additions, practical file uploads, and other essential announcements.",
    url: `${siteUrl}/notices`,
    siteName: "BCA YCMOU",
    type: "website",
    locale: "en_IN",
  },
};

export default function NoticesPage() {
  return <NoticesClient />;
}
