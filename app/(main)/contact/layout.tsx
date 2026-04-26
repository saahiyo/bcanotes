import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us – BCA YCMOU",
  description: "Have questions or suggestions? Get in touch with the BCA YCMOU resource portal team.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
