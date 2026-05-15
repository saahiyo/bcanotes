import { UploadCloud, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <UploadCloud className="size-5" /> How it works
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3 items-start">
          <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
            <UploadCloud className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-sm">1. Upload to Drive</h3>
            <p className="text-muted-foreground text-xs">Upload your file to your Google Drive.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="size-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
            <LinkIcon className="size-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium text-sm">2. Copy Public Link</h3>
            <p className="text-muted-foreground text-xs">Set access to &quot;Anyone with the link&quot;.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
            <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-sm">3. Submit Form</h3>
            <p className="text-muted-foreground text-xs">Drop the link here and we&apos;ll add it.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
