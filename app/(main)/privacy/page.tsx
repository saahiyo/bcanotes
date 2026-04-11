import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy – BCA YCMOU",
  description: "Privacy policy for the BCA YCMOU unofficial learning resources portal.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-sm">Last updated: April 2026</p>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p>
            BCA YCMOU is an unofficial, community-driven resource portal for BCA students of YCMOU. We are committed to protecting your privacy. This policy explains what data we collect and how we use it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Form Data:</strong> When you use our contact form, we collect your name, email address, and message content. This data is processed through Web3Forms and sent to our email.</li>
            <li><strong>Analytics:</strong> We use Vercel Analytics to collect anonymous, aggregated usage data such as page views and visitor counts. No personally identifiable information is collected through analytics.</li>
            <li><strong>Cookies:</strong> We use essential cookies only to remember your theme preference (dark/light mode). We do not use tracking cookies or advertising cookies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your inquiries submitted through the contact form.</li>
            <li>To improve the website experience based on anonymous usage patterns.</li>
            <li>We do <strong>not</strong> sell, trade, or share your personal data with third parties.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel:</strong> Hosting and anonymous analytics.</li>
            <li><strong>Web3Forms:</strong> Contact form submission processing.</li>
            <li><strong>Google Drive:</strong> Hosting of educational resources (notes, books, papers).</li>
          </ul>
          <p>Each of these services has their own privacy policies which we encourage you to review.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Data Retention</h2>
          <p>
            Contact form submissions are retained in our email inbox and are deleted when no longer needed. We do not maintain a database of user information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
          <p>
            You may request deletion of any data submitted through our contact form by reaching out to us via the <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.
          </p>
        </section>
      </article>
    </div>
  );
}
