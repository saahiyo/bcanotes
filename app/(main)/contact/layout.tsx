import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions or suggestions? Get in touch with the BCA YCMOU resource portal team.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us – BCA YCMOU",
    description: "Have questions or suggestions? Get in touch with the BCA YCMOU resource portal team.",
    url: `${siteUrl}/contact`,
    siteName: "BCA YCMOU",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
