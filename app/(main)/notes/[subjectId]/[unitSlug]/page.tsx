import type { Metadata } from "next";
import { subjectsData } from "@/data/subjects";
import { findUnitBySlug, generateUnitSlug, getAllUnitParams } from "@/lib/unit-slug";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, FileText, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

export const revalidate = 86400;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bcanotes.tech";

export async function generateStaticParams() {
  return getAllUnitParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string; unitSlug: string }>;
}): Promise<Metadata> {
  const { subjectId, unitSlug } = await params;
  const result = findUnitBySlug(subjectId, unitSlug);

  if (!result) {
    return { title: "Unit Not Found" };
  }

  const { subject, unit } = result;
  const pageTitle = `${unit.title} – ${subject.title} Notes | BCA YCMOU`;
  const pageDescription = `Read ${unit.title} notes for ${subject.title}. Comprehensive BCA YCMOU study material covering the complete unit syllabus. Free to access.`;
  const canonicalUrl = `${siteUrl}/notes/${subjectId}/${unitSlug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `${subject.title} Notes`,
      `${unit.title}`,
      "BCA Notes",
      "BCA YCMOU",
      `${subject.title} PDF`,
      `BCA ${subject.title}`,
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
      title: `${unit.title} – ${subject.title}`,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function UnitNotesPage({
  params,
}: {
  params: Promise<{ subjectId: string; unitSlug: string }>;
}) {
  const { subjectId, unitSlug } = await params;
  const result = findUnitBySlug(subjectId, unitSlug);

  if (!result) {
    notFound();
  }

  const { subject, unit, unitIndex } = result;

  // Previous and next units for internal linking
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  const prevSlug = prevUnit ? generateUnitSlug(prevUnit.title) : null;
  const nextSlug = nextUnit ? generateUnitSlug(nextUnit.title) : null;

  // Build viewer URL (existing functionality preserved)
  const encodedUrl = encodeURIComponent(unit.link);
  const encodedTitle = encodeURIComponent(`${subject.title} - ${unit.title}`);
  const encodedBackUrl = encodeURIComponent(`/notes/${subjectId}/${unitSlug}`);
  const viewerHref = `/viewer?url=${encodedUrl}&title=${encodedTitle}&backUrl=${encodedBackUrl}`;

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${unit.title} – ${subject.title} Notes`,
    description: `Comprehensive BCA YCMOU study notes for ${unit.title} in ${subject.title}.`,
    author: {
      "@type": "Organization",
      name: "BCA YCMOU Community",
    },
    publisher: {
      "@type": "Organization",
      name: "BCA YCMOU",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/notes/${subjectId}/${unitSlug}`,
    },
    educationalLevel: "Undergraduate",
    learningResourceType: "Study Notes",
    inLanguage: "en",
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center text-sm text-muted-foreground flex-wrap gap-1">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/notes" className="hover:text-foreground transition-colors">Notes</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href={`/notes/${subjectId}`} className="hover:text-foreground transition-colors">
                {subject.title}
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <span className="text-foreground font-medium">{unit.title}</span>
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          href={`/notes/${subjectId}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to {subject.title}
        </Link>

        {/* Page Header with Real Content */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight flex items-center gap-3 mb-4">
            <FileText className="size-8 text-primary shrink-0" />
            {unit.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Study notes for <strong>{unit.title}</strong> from the{" "}
            <strong>{subject.title}</strong> course in the BCA YCMOU curriculum.
            These notes are designed to help you understand and revise the key
            concepts covered in this unit.
          </p>
        </div>

        {/* Main Content Card - View Notes */}
        <Card className="p-6 md:p-8 mb-8 border-primary/20 bg-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Read Notes Online</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Open the full notes for {unit.title} in our integrated viewer.
                </p>
              </div>
            </div>
            <Link href={viewerHref} className="shrink-0">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                View Notes <ExternalLink className="size-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Previous / Next Unit Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {prevUnit && prevSlug ? (
            <Link
              href={`/notes/${subjectId}/${prevSlug}`}
              className="group"
            >
              <Card className="p-4 hover:bg-muted/30 transition-colors h-full">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <ChevronLeft className="size-4" />
                  Previous Unit
                </div>
                <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {prevUnit.title}
                </p>
              </Card>
            </Link>
          ) : (
            <div />
          )}
          {nextUnit && nextSlug ? (
            <Link
              href={`/notes/${subjectId}/${nextSlug}`}
              className="group sm:text-right"
            >
              <Card className="p-4 hover:bg-muted/30 transition-colors h-full">
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
                  Next Unit
                  <ChevronRight className="size-4" />
                </div>
                <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {nextUnit.title}
                </p>
              </Card>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* All Units Internal Linking */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            All Units in {subject.title}
          </h2>
          <div className="grid gap-3">
            {subject.units.map((u, idx) => {
              const slug = generateUnitSlug(u.title);
              const isCurrent = idx === unitIndex;

              return (
                <Link
                  key={u.link}
                  href={`/notes/${subjectId}/${slug}`}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    isCurrent
                      ? "bg-primary/10 border-primary/30 text-primary font-medium"
                      : "hover:bg-muted/30 border-transparent"
                  }`}
                >
                  <span className="text-sm font-mono text-muted-foreground w-6 text-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm">{u.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
