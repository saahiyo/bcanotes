import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Ticket,
  FileDown,
  ExternalLink,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OfficialLinks } from "@/components/official-links";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Student Toolkit | BCA YCMOU",
  description:
    "Access essential student tools — check results, download hall tickets, grab the BCA syllabus, and find official YCMOU links all in one place.",
};

const tools = [
  {
    title: "Result Checker",
    description: "Check your BCA YCMOU examination results quickly and easily.",
    icon: GraduationCap,
    href: "/tools/results",
    color: "text-blue-500 bg-blue-500/10 ring-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/5",
    hoverBorder: "hover:border-blue-500/30",
    glow: "bg-blue-500/10 group-hover:bg-blue-500/20",
    badge: "Coming Soon",
  },
  {
    title: "Hall Ticket Download",
    description: "Download your hall ticket / admit card for upcoming examinations.",
    icon: Ticket,
    href: "/tools/hall-ticket",
    color: "text-amber-500 bg-amber-500/10 ring-amber-500/20",
    hoverShadow: "hover:shadow-amber-500/5",
    hoverBorder: "hover:border-amber-500/30",
    glow: "bg-amber-500/10 group-hover:bg-amber-500/20",
    badge: "Coming Soon",
  },
  {
    title: "BCA Syllabus",
    description: "Download the complete BCA YCMOU syllabus for all semesters (PDF).",
    icon: FileDown,
    href: "https://drive.google.com/file/d/1K7ud8NAQvG7JuInIG-vIAOb88IfHnfGV/view?usp=sharing",
    color: "text-emerald-500 bg-emerald-500/10 ring-emerald-500/20",
    hoverShadow: "hover:shadow-emerald-500/5",
    hoverBorder: "hover:border-emerald-500/30",
    glow: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    external: true,
  },
];


export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-y-4 mb-12 relative">
        <div className="absolute top-[-60%] left-[-5%] size-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary w-fit">
          <Wrench className="size-3.5" />
          <span>Student Toolkit</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">Tools & Quick Links</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Essential student utilities and official YCMOU links — all in one convenient place. Check results, download hall tickets, and more.
        </p>
      </div>

      {/* Tools Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-foreground">
          Quick Tools
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const Wrapper = tool.external ? "a" : Link;
            const wrapperProps = tool.external
              ? { href: tool.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: tool.href };

            return (
              <Wrapper key={tool.title} {...(wrapperProps as any)} className="group h-full block">
                <Card
                  className={`h-full relative overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tool.hoverShadow} ${tool.hoverBorder}`}
                >
                  {/* Glow Orb */}
                  <div
                    className={`absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full blur-3xl transition-colors duration-500 ${tool.glow}`}
                  />
                  <CardHeader className="relative z-10 p-4 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between mb-3 sm:mb-5">
                      <div
                        className={`inline-flex size-10 sm:size-14 items-center justify-center rounded-xl ring-1 transition-colors ${tool.color}`}
                      >
                        <Icon className="size-5 sm:size-7 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {tool.badge && (
                        <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                      {tool.external && (
                        <ExternalLink className="size-3.5 sm:size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <CardTitle className="text-sm sm:text-xl mb-1 sm:mb-2">{tool.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      {tool.description}
                    </CardDescription>
                    <div className="flex items-center gap-1.5 mt-2 sm:mt-4 text-xs font-semibold text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      {tool.external ? "Download" : "Open"}
                      <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                </Card>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Official Links */}
      <OfficialLinks />
    </div>
  );
}
