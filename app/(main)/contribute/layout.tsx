import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute Resources – BCA YCMOU",
  description: "Share your notes, question papers, and practical solutions to help the BCA YCMOU student community.",
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
