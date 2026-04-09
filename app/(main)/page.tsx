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
                <Button size="lg" className="h-12 px-8 text-base gap-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Infinite feature slider */}
          <div 
            className="w-full overflow-hidden relative pt-16 mt-8 sm:mt-12 opacity-90 border-t border-border/40"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
            }}
          >
            <div className="flex w-[max-content] animate-marquee pb-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 sm:gap-20 px-6 sm:px-10 items-center flex-nowrap shrink-0">
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider"><FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" /> 100+ PDF Notes</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /> Solved Practicals</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider"><FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> PYQ 2017-2024</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider"><Library className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" /> Semesters 1 to 6</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2 font-bold text-primary text-sm sm:text-base uppercase tracking-wider bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">100% Free Forever</span>
                </div>
              ))}
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
