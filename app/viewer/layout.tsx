import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Viewer – BCA YCMOU",
  description: "View BCA YCMOU study materials, notes, and question papers online with our integrated document viewer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
