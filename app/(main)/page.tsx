import Link from "next/link";
import { ArrowRight, BookOpen, FileText, FolderOpen, Library, Code2, Database, Terminal, Cpu, Monitor, Braces, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlobMascot } from "@/components/blob-mascot";
import { StatsCounter } from "@/components/stats-counter";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-muted/30 relative overflow-hidden">
        
        {/* Floating background icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Code2 className="absolute top-[10%] left-[10%] md:left-[15%] h-12 w-12 text-blue-500/20 animate-float-slow -rotate-12" />
          <Database className="absolute top-[25%] right-[5%] md:right-[15%] h-16 w-16 text-green-500/20 animate-float-medium rotate-12" />
          <Terminal className="absolute bottom-[30%] left-[5%] md:left-[20%] h-14 w-14 text-purple-500/20 animate-float-fast rotate-6" />
          <Cpu className="absolute bottom-[15%] right-[10%] md:right-[25%] h-10 w-10 text-orange-500/20 animate-float-slow -rotate-6" />
          <Monitor className="absolute top-[40%] left-[8%] md:left-[5%] h-8 w-8 text-pink-500/20 animate-float-medium" />
          <Braces className="absolute top-[15%] right-[25%] h-10 w-10 text-yellow-500/20 animate-float-fast rotate-45" />
        </div>

        {/* Mascot - absolutely positioned, completely out of content flow */}
        <div className="absolute top-8 sm:top-12 md:top-16 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <BlobMascot className="w-28 sm:w-36 md:w-44 h-auto pointer-events-auto hidden sm:block" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal className="space-y-4 relative z-10">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4 animate-float-slow">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" /> The ultimate hub for YCMOU students
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
                BCA YCMOU <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#4285f4] to-[#1a73e8] bg-clip-text text-transparent">Learning Resources</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                Your one-stop destination for BCA notes, e-books, previous year question papers, and solved practicals.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="space-x-4 pt-4">
              <Link href="/notes">
                <Button size="lg" className="h-12 px-8 text-base gap-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                </Button>
              </Link>
            </ScrollReveal>
          </div>
          
          {/* Infinite feature slider */}
          <ScrollReveal delay={0.4}>
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
          </ScrollReveal>

        </div>
      </section>

      <StatsCounter />

      <section className="w-full py-16 md:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Everything you need to <span className="bg-gradient-to-r from-[#4285f4] to-[#1a73e8] bg-clip-text text-transparent">excel</span>.
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Access carefully curated study materials designed specifically for the YCMOU syllabus. 
                No distractions, just straight to the point resources.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Notes Card */}
            <ScrollReveal delay={0.1} className="h-full">
              <Link href="/notes" className="group h-full block">
                <Card className="h-full relative overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors ring-1 ring-blue-500/20">
                      <FileText className="h-7 w-7 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2">Subject Notes</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Comprehensive, high-quality notes for Semester 1 to 6. Broken down unit by unit for easy studying.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ScrollReveal>

            {/* E-Books Card */}
            <ScrollReveal delay={0.2} className="h-full">
              <Link href="/books" className="group h-full block">
                <Card className="h-full relative overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-500/30">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors ring-1 ring-purple-500/20">
                      <Library className="h-7 w-7 text-purple-600 dark:text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2">Digital E-Books</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Official and reference online textbooks covering the entire BCA YCMOU curriculum.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ScrollReveal>

            {/* Question Papers Card */}
            <ScrollReveal delay={0.3} className="h-full">
              <Link href="/question-papers" className="group h-full block">
                <Card className="h-full relative overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-500/5 hover:border-green-500/30">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-green-500/10 blur-3xl group-hover:bg-green-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition-colors ring-1 ring-green-500/20">
                      <FolderOpen className="h-7 w-7 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2">Previous Papers</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      A massive archive of PYQs from 2017 to 2024 to help you understand exam patterns.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ScrollReveal>

            {/* Practicals Card */}
            <ScrollReveal delay={0.4} className="h-full">
              <Link href="/practicals" className="group h-full block">
                <Card className="h-full relative overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/30">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors ring-1 ring-orange-500/20">
                      <BookOpen className="h-7 w-7 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2">Solved Practicals</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Complete, verified solutions for lab practicals spanning all six semesters.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
