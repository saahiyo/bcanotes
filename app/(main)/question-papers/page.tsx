import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function QuestionPapersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <FolderOpen className="h-10 w-10 text-primary" /> Question Papers
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Previous year question papers - 2024, 2023, 2022, 2021, 2019, 2018, 2017.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Previous Year Papers</CardTitle>
            <CardDescription>Access all question papers from a Google Drive folder.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="https://drive.google.com/drive/folders/1OlrHP4Oi3LaIV-YDWiYbQRav0K-AUbfO?usp=drive_link" target="_blank">
              <Button className="w-full gap-2">
                Open Google Drive <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
