import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – BCA YCMOU",
  description: "Sign in to your BCA YCMOU account to manage your profile and access personalized resources.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
