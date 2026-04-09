import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, FileText, Folder, AlertCircle } from "lucide-react";
import Link from "next/link";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

async function getDriveFiles(): Promise<DriveFile[] | null> {
  const FOLDER_ID = '1PJIN67vUUCQXwkfzh1OBmyxMsKtP2-EQ';
  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

  if (!API_KEY) {
    return null; // Signals that API key is missing
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&fields=files(id,name,mimeType,webViewLink)&orderBy=folder,name&key=${API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) {
      console.error("Failed to fetch from Google Drive API:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching Google Drive API:", error);
    return null;
  }
}

export default async function PracticalsPage() {
  const files = await getDriveFiles();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" /> Solved Practicals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          All solved practicals, Semester 1 to Semester 6.
        </p>
      </div>

      {!files ? (
        // Fallback view if API key is missing or API fails
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-warning border">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">API Key Needed</span>
              </div>
              <CardTitle>Google Drive Setup</CardTitle>
              <CardDescription className="text-xs">
                Missing <code>GOOGLE_DRIVE_API_KEY</code> in environment variables. Showing fallback link.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="https://drive.google.com/drive/folders/1PJIN67vUUCQXwkfzh1OBmyxMsKtP2-EQ" target="_blank">
                <Button className="w-full gap-2">
                  Open Google Drive Folder <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : files.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <Folder className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <CardTitle className="text-xl mb-2">Folder is Empty</CardTitle>
          <CardDescription>No practical files were found in this Google Drive folder.</CardDescription>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => {
            const isFolder = file.mimeType === "application/vnd.google-apps.folder";
            
            return (
              <a 
                key={file.id} 
                href={file.webViewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group h-full flex"
              >
                <Card className="w-full transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer overflow-hidden flex flex-col">
                  <CardHeader className="p-4 flex flex-row items-start gap-4 space-y-0 bg-muted/10 flex-grow">
                    <div className="mt-1 transition-transform duration-200 group-hover:scale-110">
                      {isFolder ? (
                        <Folder className="h-8 w-8 text-blue-500" fill="currentColor" fillOpacity={0.2} />
                      ) : (
                        <FileText className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <CardTitle className="text-base font-semibold leading-tight line-clamp-2" title={file.name}>
                        {file.name}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {isFolder ? 'Folder' : 'File'}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
