import Link from "next/link";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Service – BCA YCMOU",
  description: "Terms of service for the BCA YCMOU unofficial learning resources portal.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-sm">Last updated: April 2026</p>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Acceptance of Terms</h2>
          <p>
            By accessing and using BCA YCMOU (&quot;the Website&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Nature of the Platform</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>This is an <strong>unofficial</strong>, community-driven educational resource portal. It is not affiliated with, endorsed by, or officially connected to YCMOU (Yashwantrao Chavan Maharashtra Open University).</li>
            <li>The platform serves as a curated collection of study materials including notes, e-books, question papers, and practicals for BCA students.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Educational Use Only</h2>
          <p>
            All resources provided on this platform are intended solely for personal educational purposes. Users are encouraged to use these materials as supplementary study aids alongside official university coursework.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Content &amp; Copyright</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The study materials shared on this platform are contributed by the community for educational purposes.</li>
            <li>If you are a copyright holder and believe that content on this website infringes your rights, please <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link> and we will promptly remove the material in question.</li>
            <li>We respect intellectual property and make every effort to give proper attribution where applicable.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">User Contributions</h2>
          <p>
            When you contribute materials through our platform or GitHub repository, you confirm that you have the right to share those materials and grant us permission to make them available to other students through the Website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Disclaimer of Warranties</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The Website and its content are provided on an <strong>&quot;as is&quot;</strong> basis without any guarantees of accuracy, completeness, or reliability.</li>
            <li>We do not guarantee that the resources will always be available, error-free, or up to date with the latest university syllabus.</li>
            <li>We are not responsible for any academic decisions made based on materials found on this platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
          <p>
            BCA YCMOU and its contributors shall not be held liable for any direct, indirect, or consequential damages arising from the use of this Website or its content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Changes to These Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the Website after changes constitutes acceptance of the new terms. Significant changes will be reflected with an updated revision date on this page.
          </p>
        </section>
      </article>
    </div>
  );
}
