import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Join the BCA YCMOU community to access notes, e-books, and practical solutions for free.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
