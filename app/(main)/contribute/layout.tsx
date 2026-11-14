import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute Resources",
  description: "Share your notes, question papers, and practical solutions to help the BCA YCMOU student community.",
  alternates: {
    canonical: `${siteUrl}/contribute`,
  },
  openGraph: {
    title: "Contribute Resources – BCA YCMOU",
    description: "Share your notes, question papers, and practical solutions to help the BCA YCMOU student community.",
    url: `${siteUrl}/contribute`,
    siteName: "BCA YCMOU",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
