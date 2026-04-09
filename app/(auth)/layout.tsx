"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
