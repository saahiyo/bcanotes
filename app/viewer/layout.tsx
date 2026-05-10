import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Viewer",
  description: "View a BCA YCMOU resource document.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
