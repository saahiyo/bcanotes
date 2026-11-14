import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { CursorFollower } from "@/components/cursor-follower";
import { BackToTop } from "@/components/back-to-top";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { CommandMenu } from "@/components/command-menu";
import { siteUrl } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BCA YCMOU Notes PDF – Sem 1-6 Notes, PYQs & Practicals (Free)',
    template: '%s | BCA YCMOU',
  },
  description:
    'Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.',
  keywords: [
    'BCA',
    'YCMOU',
    'BCA notes',
    'YCMOU notes',
    'BCA YCMOU notes',
    'BCA YCMOU notes PDF',
    'UGP08 BCA syllabus',
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
    url: `${siteUrl}/`,
    siteName: 'BCA YCMOU',
    title: 'BCA YCMOU Notes PDF – Sem 1-6 Notes, PYQs & Practicals (Free)',
    description:
      'Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCA YCMOU Notes PDF – Sem 1-6 Notes, PYQs & Practicals (Free)',
    description:
      'Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.',
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
  category: 'education',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0ZS7FXJEE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0ZS7FXJEE');
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CursorFollower />
            <BackToTop />
            <Toaster />
            {children}
            <CommandMenu />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
