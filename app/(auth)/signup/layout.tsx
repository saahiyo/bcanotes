import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account – BCA YCMOU",
  description: "Join the BCA YCMOU community to access notes, e-books, and practical solutions for free.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
