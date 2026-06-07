import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Result Checker | BCA YCMOU",
  description:
    "Check your BCA YCMOU examination results online. This tool will be available soon.",
};

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh] relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
          {/* Icon */}
          <div className="relative">
            <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
              <GraduationCap className="size-10 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 inline-flex size-8 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
              <Construction className="size-4 text-amber-500" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Result Checker
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
              We&apos;re building a tool to help you check your BCA YCMOU examination results quickly and conveniently. Stay tuned — it will be available soon!
            </p>
          </div>

          {/* Pulsing status indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Under Development
          </div>

          {/* Back Button */}
          <Link href="/tools">
            <Button variant="outline" className="gap-2 mt-2">
              <ArrowLeft className="size-4" />
              Back to Toolkit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
