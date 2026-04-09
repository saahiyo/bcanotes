import Link from "next/link";
import { ArrowRight, BookOpen, FileText, FolderOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                BCA YCMOU <br className="hidden sm:inline" />
                <span className="text-primary">Learning Resources</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                Your one-stop destination for BCA notes, e-books, previous year question papers, and solved practicals.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Link href="/notes">
                <Button size="lg" className="h-12 px-8 text-base gap-2 rounded-full">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/notes" className="group">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>
                    Comprehensive notes for Semester 1 to 6.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/books" className="group">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <Library className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>E-Books</CardTitle>
                  <CardDescription>
                    Online textbooks for BCA YCMOU.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/question-papers" className="group">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <FolderOpen className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>Question Papers</CardTitle>
                  <CardDescription>
                    Previous year question papers (2017-2024).
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/practicals" className="group">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>Practicals</CardTitle>
                  <CardDescription>
                    All solved practicals, Semester 1 to 6.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
