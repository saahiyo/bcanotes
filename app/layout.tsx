import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { CursorFollower } from "@/components/cursor-follower";
import { BackToTop } from "@/components/back-to-top";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bcanotes.tech';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BCA YCMOU - Learning Resources',
    template: '%s | BCA YCMOU',
  },
  description:
    'The ultimate learning resources portal for BCA YCMOU students. Access notes, e-books, previous year question papers, and solved practicals — 100% free.',
  keywords: [
    'BCA',
    'YCMOU',
    'BCA notes',
    'YCMOU notes',
    'BCA YCMOU notes',
    'BCA question papers',
    'BCA practicals',
    'BCA e-books',
    'YCMOU study material',
    'BCA semester notes',
    'YCMOU BCA syllabus',
  ],
  authors: [{ name: 'Saahiyo', url: 'https://github.com/saahiyo' }],
  creator: 'Saahiyo',
  publisher: 'BCA YCMOU Community',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'BCA YCMOU',
    title: 'BCA YCMOU - Learning Resources',
    description:
      'Your one-stop destination for BCA notes, e-books, previous year question papers, and solved practicals — 100% free.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCA YCMOU - Learning Resources',
    description:
      'Your one-stop destination for BCA notes, e-books, previous year question papers, and solved practicals — 100% free.',
    creator: '@saahiyo75',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CursorFollower />
            <BackToTop />
            <Toaster />
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
