import { subjectsData } from "@/data/subjects";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export default async function SubjectNotesPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjectsData[subjectId];

  if (!subject) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
      <div className="mb-8">
        <Link href="/notes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              {subject.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Study materials and unit-wise notes.
            </p>
          </div>
          {subject.downloadLink && (
            <Link href={subject.downloadLink} target="_blank">
              <Button size="lg" className="gap-2 w-full md:w-auto">
                <Download className="h-4 w-4" />
                Download Full PDF
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {subject.units.map((unit, index) => (
          <Card key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/30 transition-colors">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold">{unit.title}</h3>
            </div>
            <Link href={unit.link} target="_blank" className="shrink-0">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                View Notes <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
