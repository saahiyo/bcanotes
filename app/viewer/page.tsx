"use client";

import { use, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, AlertTriangle, ChevronUp, ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; title?: string; backUrl?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const { url, title, backUrl } = resolvedParams;
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [iframeStatus, setIframeStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (!url) {
    redirect("/"); 
  }

  const decodeSafe = (val?: string) => val ? decodeURIComponent(val) : "Document Viewer";
  
  const targetUrl = decodeURIComponent(url);
  const displayTitle = decodeSafe(title);
  const backTarget = backUrl ? decodeURIComponent(backUrl) : null;

  // Use Google Docs Viewer for PDFs to bypass frame blocking (SAMEORIGIN)
  const isPdf = targetUrl.toLowerCase().endsWith('.pdf') || targetUrl.includes('.pdf?');
  const iframeUrl = isPdf 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(targetUrl)}&embedded=true`
    : targetUrl;

  let downloadUrl = targetUrl;
  const driveIdMatch = targetUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    downloadUrl = `https://drive.google.com/uc?export=download&id=${driveIdMatch[1]}`;
  }

  const handleBack = useCallback(() => {
    if (backTarget) {
      router.push(backTarget);
    } else {
      router.back();
    }
  }, [backTarget, router]);

  const handleIframeLoad = useCallback(() => {
    setIframeStatus("loaded");
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeStatus("error");
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
      {/* Viewer Header Overlay */}
      <div 
        className={`absolute top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur shadow-sm">
          <div className="flex items-center gap-4 overflow-hidden">
            <Button variant="ghost" size="sm" className="gap-2 shrink-0" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="h-4 w-[1px] bg-border hidden sm:block shrink-0" />
            <h1 className="text-sm font-semibold truncate max-w-[150px] sm:max-w-md lg:max-w-xl">
              {displayTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button variant="outline" size="sm" className="flex sm:hidden px-2">
                <Download className="h-4 w-4" />
              </Button>
            </Link>

            <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                Open externally <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex sm:hidden px-2">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-2"
              onClick={() => setIsHeaderVisible(false)}
              title="Full screen reading mode"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Warning banner — visible on all screen sizes */}
        <div className="bg-muted p-2 text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5 opacity-80 border-b">
          <AlertTriangle className="h-3 w-3" />
          If the document does not load, click &quot;Open externally&quot;.
        </div>
      </div>

      {/* Floating Reveal Button */}
      <div 
        className={`absolute top-2 right-4 z-50 transition-opacity duration-300 ${
          isHeaderVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Button 
          variant="secondary" 
          size="sm" 
          className="rounded-full shadow-md px-3 bg-background/80 backdrop-blur"
          onClick={() => setIsHeaderVisible(true)}
        >
          <ChevronDown className="h-4 w-4 mr-1" /> Menu
        </Button>
      </div>

      {/* Iframe container */}
      <div className={`flex-1 w-full bg-zinc-100 dark:bg-zinc-900 border-none relative transition-all duration-300 hide-cursor-area ${isHeaderVisible ? 'mt-[88px]' : 'mt-0'}`}>
        <iframe
          src={iframeUrl}
          className={`w-full h-full border-none absolute inset-0 transition-opacity duration-500 ${
            iframeStatus === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          title={displayTitle}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />

        {/* Loading / Error state behind iframe */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-muted-foreground p-4 text-center">
          {iframeStatus === "error" ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-medium">Failed to load document</p>
              <p className="text-xs opacity-70 max-w-[280px]">
                The provider may be blocking embedded views. Try opening it externally.
              </p>
              <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 mt-2">
                  Open externally <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
              <p className="text-sm font-medium">Loading document viewer...</p>
              <p className="text-xs opacity-70 mt-2 max-w-[250px]">
                If this takes too long, the provider might be blocking embedded views.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
