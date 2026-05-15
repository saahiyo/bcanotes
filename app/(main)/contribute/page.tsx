import type { Metadata } from "next";
import { HowItWorks } from "@/components/contribute/how-it-works";
import { DirectUpload } from "@/components/contribute/direct-upload";
import { LinkSubmission } from "@/components/contribute/link-submission";

export const metadata: Metadata = {
  title: "Contribute | BCA YCMOU",
  description: "Help build the ultimate BCA YCMOU archive. Share your notes, books, or question papers and help hundreds of students.",
};

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col gap-y-4 mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Contribute</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Help build the ultimate archive. Share your Google Drive link and help hundreds of BCA students prep for their exams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Info Column (Compact) */}
        <div className="lg:col-span-1 space-y-6">
          <HowItWorks />
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <DirectUpload />
          <LinkSubmission />
        </div>
      </div>
    </div>
  );
}
