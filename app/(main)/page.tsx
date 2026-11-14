import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  FolderOpen,
  Library,
  Code2,
  Database,
  Terminal,
  Cpu,
  Braces,
  Sparkles,
  ClipboardPen,
  GraduationCap,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { SearchHeroButton } from "@/components/search-hero-button";
import { siteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlobMascot } from "@/components/blob-mascot";
import { StatsCounter } from "@/components/stats-counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScribbleUnderline } from "@/components/scribble-underline";
import { NoticesSection } from "@/components/notices-section";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "BCA YCMOU Notes PDF – Sem 1-6 Notes, PYQs & Practicals (Free)",
  },
  description:
    "Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "BCA YCMOU Notes PDF – Sem 1-6 Notes, PYQs & Practicals (Free)",
    description:
      "Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.",
    url: `${siteUrl}/`,
    siteName: "BCA YCMOU",
    type: "website",
    locale: "en_IN",
  },
};

const semesterSubjects = [
  {
    semester: "Semester 1",
    badge: "Foundation & C/C++",
    subjects: [
      { name: "Problem Solving Using Computers", href: "/notes/problem-solving-using-computers" },
      { name: "Programming Using C++", href: "/notes/programming-using-cpp" },
    ],
  },
  {
    semester: "Semester 2",
    badge: "Networks & Data Structures",
    subjects: [
      { name: "Computer Network", href: "/notes/computer-network" },
      { name: "Environmental Studies (E.V.S)", href: "/notes/evs" },
      { name: "Data Structures & Algorithms (D.S.A)", href: "/notes/dsa" },
    ],
  },
  {
    semester: "Semester 3",
    badge: "Core Systems & Web",
    subjects: [
      { name: "Operating System", href: "/notes/operating-system" },
      { name: "Web Technology", href: "/notes/web-technology" },
      { name: "Database Management System (DBMS)", href: "/notes/dbms" },
      { name: "Python Programming", href: "/notes/python" },
    ],
  },
  {
    semester: "Semester 4",
    badge: "Java & Software Engg.",
    subjects: [
      { name: "JAVA Programming", href: "/notes/java" },
      { name: "Software Engineering", href: "/notes/software-engineering" },
      { name: "Computer System Architecture (C.S.A)", href: "/notes/csa" },
      { name: "Financial & Investment Skills", href: "/notes/financial-and-investment-skills" },
    ],
  },
  {
    semester: "Semester 5",
    badge: "Linux & Enterprise Java",
    subjects: [
      { name: "Linux Administration", href: "/notes/linux-administration" },
      { name: "Advance JAVA", href: "/notes/advance-java" },
      { name: "Ecommerce Technology", href: "/notes/ecommerce-technology" },
      { name: "Quantitative Aptitude", href: "/notes/quantitative-aptitude" },
    ],
  },
  {
    semester: "Semester 6",
    badge: "Mobile & Web Apps",
    subjects: [
      { name: "PHP Programming", href: "/notes/php-programming" },
      { name: "Android Programming", href: "/notes/android-programming" },
      { name: "Personality & Career Skills", href: "/notes/personality-and-career-skills" },
    ],
  },
];

const faqItems = [
  {
    question: "Are these BCA YCMOU notes updated for the 2026 UGP08 syllabus pattern?",
    answer:
      "Yes. Our unit-wise notes, official e-books, and solved practicals cover core BCA subjects taught under both the YCMOU UGP08 (NEP 2020 CBCS) pattern and the standard Semester 1–6 curriculum, including C, C++, DSA, DBMS, Operating Systems, Java, Python, Linux, PHP, and Android.",
  },
  {
    question: "How can I download BCA YCMOU notes PDF for Semester 1 to 6?",
    answer:
      "Select your semester or subject in the 'BCA YCMOU Notes by Semester' grid on this page (or visit /notes). Every subject page includes direct unit-wise online reading links as well as a one-click Full Subject PDF download button.",
  },
  {
    question: "What is the YCMOU BCA (UGP08) exam pattern and passing criteria?",
    answer:
      "Each theory course in YCMOU BCA is evaluated out of 100 marks: 20 marks for Continuous Assessment (CA / Home Assignments) and 80 marks for University End-Semester Assessment (UA). Students generally need at least 40% marks in both CA and UA to pass a subject.",
  },
  {
    question: "Where can I download YCMOU BCA previous year question papers (PYQs)?",
    answer:
      "You can browse and download BCA YCMOU previous year question papers from 2017 to 2024 in our Question Papers archive (/question-papers), organized semester-wise and year-wise.",
  },
  {
    question: "Are all notes, e-books, and solved lab practicals 100% free?",
    answer:
      "Yes! BCA YCMOU (bcanotes.tech) is an open-source, student-built community portal. All unit notes, official YCMOU digital textbooks, PYQs, and lab practical solutions are completely free with no paywalls or mandatory sign-ups.",
  },
];

export default function Home() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "BCA YCMOU",
        alternateName: ["BCA YCMOU Notes", "BCA YCMOU Learning Resources", "bcanotes.tech"],
        url: `${siteUrl}/`,
        description:
          "Free BCA YCMOU notes for Semester 1–6: unit-wise PDF notes, previous year question papers 2017–2024, solved practicals and e-books. 100% free.",
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/notes?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "BCA YCMOU Community",
        url: `${siteUrl}/`,
        sameAs: ["https://github.com/saahiyo/bcanotes"],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-muted/30 relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 technical-grid pointer-events-none opacity-80 dark:opacity-50" />

        {/* Floating background icons */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Code2 className="absolute top-[10%] left-[5%] md:left-[15%] size-8 sm:size-12 text-blue-500/20 animate-float-slow -rotate-12" />
          <Database className="absolute top-[25%] right-[5%] md:right-[15%] size-10 sm:size-16 text-green-500/20 animate-float-medium rotate-12" />
          <Terminal className="absolute bottom-[30%] left-[5%] md:left-[20%] size-10 sm:size-14 text-purple-500/20 animate-float-fast rotate-6 hidden sm:block" />
          <Cpu className="absolute bottom-[15%] right-[5%] md:right-[25%] size-8 sm:size-10 text-orange-500/20 animate-float-slow -rotate-6 hidden sm:block" />
          <ClipboardPen className="absolute top-[40%] left-[5%] md:left-[5%] size-6 sm:size-8 text-pink-500/20 animate-float-medium hidden sm:block" />
          <Braces className="absolute top-[15%] right-[20%] size-8 sm:size-10 text-yellow-500/20 animate-float-fast rotate-45 hidden sm:block" />
        </div>

        {/* Mascot - absolutely positioned, completely out of content flow */}
        <div className="absolute top-8 sm:top-12 md:top-16 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <BlobMascot className="w-28 sm:w-36 md:w-44 h-auto pointer-events-auto hidden sm:block" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero text rendered immediately without opacity-0 delay for fast Mobile LCP */}
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col gap-y-4 relative z-10">
              <div className="w-fit mx-auto inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-3 animate-float-slow">
                <Sparkles className="size-4 mr-2 text-yellow-500" /> The ultimate hub for YCMOU students
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
                <span className="relative inline-block">
                  BCA
                  <ScribbleUnderline className="text-primary" />
                </span>{" "}
                YCMOU<br />
                <span className="text-primary">Notes, PYQs &amp; Solved Practicals</span>
              </h1>
              <p className="mx-auto max-w-[720px] text-muted-foreground text-base md:text-xl leading-relaxed">
                Free unit-wise PDF notes, official e-books, previous year question papers (2017–2024), and solved practicals for Semester 1 to 6.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6">
              <Link href="/notes">
                <Button size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base gap-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Browse Notes by Semester <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/question-papers">
                <Button size="lg" variant="secondary" className="h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base gap-2 rounded-full shadow-sm hover:shadow-md transition-all border border-border/80">
                  <FolderOpen className="size-4 text-primary" />
                  <span>Previous Year Papers 2017–2024</span>
                </Button>
              </Link>
              <SearchHeroButton />
            </div>

            <p className="mt-5 text-xs sm:text-sm text-muted-foreground">
              Last updated: Nov 2026 · Built by BCA YCMOU students ·{" "}
              <Link
                href="https://github.com/saahiyo/bcanotes"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Open source on GitHub
              </Link>
            </p>
          </div>

          {/* Infinite feature slider */}
          <div
            className="w-full overflow-hidden relative pt-8 sm:pt-16 mt-6 sm:mt-12 opacity-90 border-t border-border/40"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="flex w-[max-content] animate-marquee pb-4">
              {[0, 1].map((i) => (
                <div key={`marquee-group-${i}`} className="flex gap-12 sm:gap-20 px-6 sm:px-10 items-center flex-nowrap shrink-0">
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider">
                    <FileText className="size-4 sm:size-5 text-blue-500" /> 100+ PDF Notes
                  </span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider">
                    <BookOpen className="size-4 sm:size-5 text-orange-500" /> Solved Practicals
                  </span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider">
                    <FolderOpen className="size-4 sm:size-5 text-green-500" /> PYQ 2017-2024
                  </span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2.5 font-semibold text-muted-foreground text-sm sm:text-base uppercase tracking-wider">
                    <Library className="size-4 sm:size-5 text-purple-500" /> Semesters 1 to 6
                  </span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="flex items-center whitespace-nowrap gap-2 font-semibold text-primary text-sm sm:text-base uppercase tracking-wider bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
                    100% Free Forever
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      <NoticesSection />

      {/* Direct Subject Links by Semester (Sem 1 to 6) */}
      <section className="w-full py-16 md:py-24 border-t border-border/30 bg-muted/15 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center gap-y-3 text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
              <GraduationCap className="size-4" /> Semester 1 to 6 Directory
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
              BCA YCMOU Notes by <span className="text-primary">Semester</span>
            </h2>
            <p className="max-w-[720px] text-muted-foreground text-sm sm:text-base md:text-lg">
              Jump directly to any BCA subject below for unit-wise study notes and full PDF downloads across all six semesters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {semesterSubjects.map((sem) => (
              <Card key={sem.semester} className="h-full border-border/70 bg-card hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-semibold text-foreground">{sem.semester}</CardTitle>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {sem.badge}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2.5">
                    {sem.subjects.map((subj) => (
                      <li key={subj.href}>
                        <Link
                          href={subj.href}
                          className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/15"
                        >
                          <span className="flex items-center gap-2">
                            <FileText className="size-4 text-primary/80 shrink-0" />
                            <span>{subj.name} Notes</span>
                          </span>
                          <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Technical Grid */}
        <div className="absolute inset-0 technical-grid pointer-events-none opacity-30 dark:opacity-15" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center gap-y-4 text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                Everything you need to <span className="text-primary">excel</span>.
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
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors ring-1 ring-blue-500/20">
                      <FileText className="size-7 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300" />
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
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors ring-1 ring-purple-500/20">
                      <Library className="size-7 text-purple-600 dark:text-purple-500 group-hover:scale-110 transition-transform duration-300" />
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
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full bg-green-500/10 blur-3xl group-hover:bg-green-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition-colors ring-1 ring-green-500/20">
                      <FolderOpen className="size-7 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform duration-300" />
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
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500" />
                  <CardHeader className="relative z-10 p-6 md:p-8">
                    <div className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors ring-1 ring-orange-500/20">
                      <BookOpen className="size-7 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300" />
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

      {/* 2026 UGP08 Syllabus & Exam Pattern + FAQ Section */}
      <section className="w-full py-16 md:py-24 border-t border-border/30 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">
          {/* Syllabus & Exam Pattern Overview */}
          <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="flex flex-col gap-3 mb-6">
              <span className="w-fit inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <CheckCircle2 className="size-3.5" /> 2026 Syllabus &amp; Exam Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                YCMOU BCA 2026 Syllabus (Programme Code <span className="text-primary">UGP08</span>) &amp; Exam Pattern
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Yashwantrao Chavan Maharashtra Open University (YCMOU) offers the Bachelor of Computer Applications under Programme Code{" "}
                <strong className="text-foreground">UGP08</strong> (NEP 2020 Choice Based Credit System) across 6 semesters (3 years, 120+ total credits).
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-1.5">
                <h3 className="font-semibold text-foreground">Programme Structure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  6 Semesters (Sem 1–6) combining Major Core Programming, Lab Practicals, Open Electives, and Skill Enhancement Courses.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-1.5">
                <h3 className="font-semibold text-foreground">Evaluation Pattern (80 + 20)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  20 Marks Continuous Assessment (CA / Home Assignments) + 80 Marks University End-Semester Exam (UA) = 100 Marks per paper.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-1.5">
                <h3 className="font-semibold text-foreground">Passing &amp; Practicals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Minimum 40% required to pass theory and practical components. Lab journals must be completed and verified prior to practical exams.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="flex flex-col items-center text-center gap-3 mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
                <HelpCircle className="size-3.5" /> Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                Everything you need to know about BCA YCMOU notes, the UGP08 syllabus pattern, and exam preparation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 space-y-2"
                >
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    {item.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
