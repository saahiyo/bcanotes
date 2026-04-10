import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, ExternalLink, FileText, Folder, AlertCircle, ArrowLeft, 
  FileImage, FileVideo, FileAudio, FileArchive, FileBarChart, FileSpreadsheet,
  Clock, Database,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  size?: string;
  modifiedTime?: string;
}

const ROOT_FOLDER_ID = '1PJIN67vUUCQXwkfzh1OBmyxMsKtP2-EQ';

// Helper to format bytes to human readable sizes
function formatBytes(bytes?: string): string {
  if (!bytes) return '';
  const numBytes = parseInt(bytes, 10);
  if (isNaN(numBytes)) return '';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (numBytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(numBytes) / Math.log(1024));
  return parseFloat((numBytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i];
}

// Helper to format date
function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getFileBadgeText(name: string, mimeType: string): string {
  // First try to extract from the name
  const parts = name.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].substring(0, 5).toUpperCase(); // limit length
  }

  // If no standard extension, infer from mimeType
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("document") || mimeType.includes("word") || mimeType === "application/vnd.google-apps.document") return "DOC";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType === "application/vnd.google-apps.spreadsheet") return "SHEET";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint") || mimeType === "application/vnd.google-apps.presentation") return "SLIDE";
  if (mimeType.startsWith("image/")) return "IMG";
  if (mimeType.startsWith("video/")) return "VID";
  if (mimeType.startsWith("audio/")) return "AUD";
  if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("tar") || mimeType.includes("archive")) return "ZIP";
  
  return "FILE";
}

// Helper function to map mimeType to the appropriate icon and color
function getFileIconStyle(mimeType: string): { icon: React.ElementType, color: string } {
  if (mimeType === "application/vnd.google-apps.folder") {
    return { icon: Folder, color: "text-blue-500" };
  }
  
  if (mimeType.includes("pdf")) {
    return { icon: FileText, color: "text-red-500" };
  }
  
  if (
    mimeType.includes("document") || 
    mimeType.includes("word") || 
    mimeType === "application/vnd.google-apps.document"
  ) {
    return { icon: FileText, color: "text-blue-600" };
  }
  
  if (
    mimeType.includes("spreadsheet") || 
    mimeType.includes("excel") || 
    mimeType === "application/vnd.google-apps.spreadsheet"
  ) {
    return { icon: FileSpreadsheet, color: "text-green-600" };
  }

  if (
    mimeType.includes("presentation") || 
    mimeType.includes("powerpoint") || 
    mimeType === "application/vnd.google-apps.presentation"
  ) {
    return { icon: FileBarChart, color: "text-orange-500" };
  }

  if (mimeType.startsWith("image/")) {
    return { icon: FileImage, color: "text-purple-500" };
  }

  if (mimeType.startsWith("video/")) {
    return { icon: FileVideo, color: "text-pink-500" };
  }

  if (mimeType.startsWith("audio/")) {
    return { icon: FileAudio, color: "text-yellow-500" };
  }

  if (
    mimeType.includes("zip") || 
    mimeType.includes("rar") || 
    mimeType.includes("tar") || 
    mimeType.includes("archive")
  ) {
    return { icon: FileArchive, color: "text-stone-500" };
  }

  // Default fallback for unknown file types
  return { icon: FileText, color: "text-muted-foreground" };
}


async function getDriveFiles(folderId: string): Promise<DriveFile[] | null> {
  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

  if (!API_KEY) {
    return null; // Signals that API key is missing
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType,webViewLink,size,modifiedTime)&orderBy=folder,name&key=${API_KEY}`,
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

export default async function PracticalsPage({
  searchParams,
}: {
  searchParams: Promise<{ folderId?: string; trail?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentFolderId = resolvedParams.folderId || ROOT_FOLDER_ID;
  const isRootFolder = currentFolderId === ROOT_FOLDER_ID;
  
  let trail: { id: string; name: string }[] = [];
  if (resolvedParams.trail) {
    try {
      trail = JSON.parse(decodeURIComponent(resolvedParams.trail));
    } catch (e) {
      trail = [];
    }
  }

  if (!Array.isArray(trail) || trail.length === 0) {
    trail = [{ id: ROOT_FOLDER_ID, name: "Practicals" }];
  }

  const parentFolder = trail.length > 1 ? trail[trail.length - 2] : null;
  let backHref = "/practicals";
  if (parentFolder) {
    if (parentFolder.id === ROOT_FOLDER_ID) {
      backHref = "/practicals";
    } else {
      const parentTrail = trail.slice(0, trail.length - 1);
      backHref = `/practicals?folderId=${parentFolder.id}&trail=${encodeURIComponent(JSON.stringify(parentTrail))}`;
    }
  }

  const files = await getDriveFiles(currentFolderId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" /> Solved Practicals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          All solved practicals, Semester 1 to Semester 6.
        </p>
      </div>

      {!isRootFolder && (
        <div className="mb-6 flex flex-col gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            {trail.map((item, idx) => {
              const isLast = idx === trail.length - 1;
              const trailParam = JSON.stringify(trail.slice(0, idx + 1));
              const href = idx === 0 
                ? "/practicals" 
                : `/practicals?folderId=${item.id}&trail=${encodeURIComponent(trailParam)}`;
              
              return (
                <div key={item.id} className="flex items-center">
                  {idx > 0 && <ChevronRight className="h-4 w-4 mx-2 shrink-0" />}
                  {isLast ? (
                    <span className="text-foreground">{item.name}</span>
                  ) : (
                    <Link href={href} className="hover:text-foreground transition-colors hover:underline">
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          
          <div>
            <Link href={backHref}>
              <Button variant="ghost" className="gap-2 -ml-4 hover:bg-muted/50 rounded-full px-4">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      )}

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
              <Link href={`https://drive.google.com/drive/folders/${currentFolderId}`} target="_blank">
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
        (() => {
          const renderFilesList = (fileList: DriveFile[]) => (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {fileList.map((file) => {
                const isFolder = file.mimeType === "application/vnd.google-apps.folder";
                const { icon: FileIconComponent, color } = getFileIconStyle(file.mimeType);
                
                // Extract the badge string
                const fileBadgeStr = !isFolder ? getFileBadgeText(file.name, file.mimeType) : '';
                
                // Build viewer URL for files
                const driveViewerUrl = `https://drive.google.com/file/d/${file.id}/preview`;
                const encodedUrl = encodeURIComponent(driveViewerUrl);
                const encodedTitle = encodeURIComponent(file.name);
                const encodedBackUrl = encodeURIComponent(`/practicals${currentFolderId !== ROOT_FOLDER_ID ? `?folderId=${currentFolderId}` : ""}`);
                
                const viewerHref = `/viewer?url=${encodedUrl}&title=${encodedTitle}&backUrl=${encodedBackUrl}`;

                // If it's a folder, navigate within the app. If it's a file, open our internal viewer
                const nextTrail = [...trail, { id: file.id, name: file.name }];
                const trailParamStr = encodeURIComponent(JSON.stringify(nextTrail));
                const href = isFolder ? `/practicals?folderId=${file.id}&trail=${trailParamStr}` : viewerHref;
                
                return (
                  <Link 
                    key={file.id} 
                    href={href} 
                    className="group h-full flex"
                  >
                    <Card className="w-full transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer overflow-hidden flex flex-col h-full bg-card">
                      <CardHeader className="p-4 flex flex-row items-start gap-4 space-y-0 flex-grow">
                        <div className="mt-1 transition-transform duration-200 group-hover:scale-110 shrink-0">
                          {isFolder ? (
                            <FileIconComponent className="h-10 w-10 text-blue-500" fill="currentColor" fillOpacity={0.2} />
                          ) : (
                            <FileIconComponent className={`h-10 w-10 ${color}`} />
                          )}
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <CardTitle className="text-base font-semibold leading-tight line-clamp-2" title={file.name}>
                            {file.name}
                          </CardTitle>
                          {(fileBadgeStr || isFolder) && (
                            <CardDescription className="text-xs mt-1.5 font-medium flex gap-2 items-center">
                              {isFolder ? (
                                 <span className="inline-flex items-center rounded-sm bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 border border-blue-500/20">
                                   Folder
                                 </span>
                              ) : (fileBadgeStr &&
                                <span className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground border">
                                  {fileBadgeStr}
                                </span>
                              )}
                            </CardDescription>
                          )}
                        </div>
                      </CardHeader>
                      
                      {(!isFolder && (file.size || file.modifiedTime)) && (
                        <CardFooter className="p-3 bg-muted/20 border-t flex flex-row justify-between text-xs text-muted-foreground mt-auto">
                          <div className="flex items-center gap-1.5" title="File Size">
                            <Database className="h-3 w-3" />
                            <span>{formatBytes(file.size)}</span>
                          </div>
                          <div className="flex items-center gap-1.5" title="Last Modified">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(file.modifiedTime)}</span>
                          </div>
                        </CardFooter>
                      )}
                    </Card>
                  </Link>
                );
              })}
            </div>
          );

          if (!isRootFolder) {
            return renderFilesList(files);
          }

          // If in root folder, group by year
          const firstYear = files.filter(f => f.name.includes("Semester 1") || f.name.includes("Semester 2"));
          const secondYear = files.filter(f => f.name.includes("Semester 3") || f.name.includes("Semester 4"));
          const thirdYear = files.filter(f => f.name.includes("Semester 5") || f.name.includes("Semester 6"));
          const otherFiles = files.filter(f => !(f.name.includes("Semester 1") || f.name.includes("Semester 2") || f.name.includes("Semester 3") || f.name.includes("Semester 4") || f.name.includes("Semester 5") || f.name.includes("Semester 6")));

          return (
            <div className="flex flex-col space-y-12">
              {firstYear.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 border-b pb-2">
                    <ArrowRight className="h-5 w-5" /> 1st Year
                  </h2>
                  {renderFilesList(firstYear)}
                </section>
              )}
              
              {secondYear.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 border-b pb-2">
                    <ArrowRight className="h-5 w-5" /> 2nd Year
                  </h2>
                  {renderFilesList(secondYear)}
                </section>
              )}
              
              {thirdYear.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 border-b pb-2">
                   <ArrowRight className="h-5 w-5" /> 3rd Year
                  </h2>
                  {renderFilesList(thirdYear)}
                </section>
              )}
              
              {otherFiles.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2 border-b pb-2 text-muted-foreground">
                   Other Files
                  </h2>
                  {renderFilesList(otherFiles)}
                </section>
              )}
            </div>
          );
        })()
      )}
    </div>
  );
}
