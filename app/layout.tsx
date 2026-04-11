import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorFollower } from "@/components/cursor-follower";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'BCA YCMOU - Learning Resources',
  description: 'Modern learning resources portal for BCA YCMOU students. Find notes, e-books, question papers, and practicals.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CursorFollower />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
