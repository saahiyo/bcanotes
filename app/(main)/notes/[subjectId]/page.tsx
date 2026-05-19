import type { Metadata } from "next";
import { subjectsData } from "@/data/subjects";
import { notFound } from "next/navigation";
import { generateUnitSlug } from "@/lib/unit-slug";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export const revalidate = 86400;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bcanotes.tech";

export async function generateStaticParams() {
  return Object.keys(subjectsData).map((subjectId) => ({
    subjectId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ subjectId: string }> }): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = subjectsData[subjectId];

  if (!subject) {
    return { title: "Subject Not Found" };
  }

  const pageTitle = `${subject.title} Notes – BCA YCMOU`;
  const pageDescription = `Read unit-wise ${subject.title} notes for BCA YCMOU. ${subject.units.length} units covering the complete syllabus. Free to access.`;
  const canonicalUrl = `${siteUrl}/notes/${subjectId}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `${subject.title} Notes`,
      `${subject.title} BCA`,
      "BCA Notes",
      "BCA YCMOU",
      `${subject.title} PDF`,
      "YCMOU study material",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "BCA YCMOU",
      type: "article",
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function SubjectNotesPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjectsData[subjectId];

  if (!subject) {
    notFound();
  }

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${subject.title} – BCA YCMOU`,
    description: `Comprehensive unit-wise study notes for ${subject.title} in the BCA YCMOU curriculum.`,
    provider: {
      "@type": "Organization",
      name: "BCA YCMOU",
      url: siteUrl,
    },
    educationalLevel: "Undergraduate",
    numberOfCredits: subject.units.length,
    hasCourseInstance: subject.units.map((unit, idx) => ({
      "@type": "CourseInstance",
      name: unit.title,
      url: `${siteUrl}/notes/${subjectId}/${generateUnitSlug(unit.title)}`,
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center text-sm text-muted-foreground flex-wrap gap-1">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/notes" className="hover:text-foreground transition-colors">Notes</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <span className="text-foreground font-medium">{subject.title}</span>
            </li>
          </ol>
        </nav>

        <div className="mb-8">
          <Link href="/notes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="mr-2 size-4" />
            Back to Notes
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight flex items-center gap-3">
                <FileText className="size-8 text-primary" />
                {subject.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Study materials and unit-wise notes. {subject.units.length} units covering the complete syllabus.
              </p>
            </div>
            {subject.downloadLink && (
              <Link href={subject.downloadLink} target="_blank">
                <Button size="lg" className="gap-2 w-full md:w-auto">
                  <Download className="size-4" />
                  Download Full PDF
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {subject.units.map((unit, index) => {
            const unitSlug = generateUnitSlug(unit.title);
            const unitHref = `/notes/${subjectId}/${unitSlug}`;

            return (
              <Card key={unit.link} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold">{unit.title}</h3>
                </div>
                <Link href={unitHref} className="shrink-0">
                  <Button variant="outline" className="w-full sm:w-auto gap-2">
                    View Notes <ExternalLink className="size-4" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
