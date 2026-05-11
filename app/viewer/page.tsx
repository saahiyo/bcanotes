"use client";

import { use, useState, useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Download,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { PdfJsViewer } from "@/components/pdf-js-viewer";

function decodeParam(value?: string, fallback = "") {
  if (!value) return fallback;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getDriveFileId(url: string) {
  const patterns = [
    /\/file\/d\/([^/?#]+)/,
    /\/document\/d\/([^/?#]+)/,
    /\/spreadsheets\/d\/([^/?#]+)/,
    /\/presentation\/d\/([^/?#]+)/,
    /[?&]id=([^&#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function getViewerUrl(targetUrl: string) {
  const driveFileId = getDriveFileId(targetUrl);
  const isDriveUrl = targetUrl.includes("drive.google.com") || targetUrl.includes("docs.google.com");

  if (driveFileId && isDriveUrl) {
    return `https://drive.google.com/file/d/${driveFileId}/preview`;
  }

  return targetUrl;
}

function isDirectPdfUrl(targetUrl: string) {
  const isDriveUrl = targetUrl.includes("drive.google.com") || targetUrl.includes("docs.google.com");
  const cleanUrl = targetUrl.toLowerCase().split("#")[0].split("?")[0];

  return !isDriveUrl && cleanUrl.endsWith(".pdf");
}

function getDownloadUrl(targetUrl: string) {
  const driveFileId = getDriveFileId(targetUrl);

  if (driveFileId && (targetUrl.includes("drive.google.com") || targetUrl.includes("docs.google.com"))) {
    return `https://drive.google.com/uc?export=download&id=${driveFileId}`;
  }

  return targetUrl;
}

export default function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; title?: string; backUrl?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const { url, title, backUrl } = resolvedParams;
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [iframeStatusState, setIframeStatusState] = useState<{
    url: string;
    value: "loading" | "loaded" | "stalled" | "error";
  }>({ url: "", value: "loading" });
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const targetUrl = decodeParam(url);
  const displayTitle = decodeParam(title, "Document Viewer");
  const backTarget = backUrl ? decodeParam(backUrl) : null;
  const iframeUrl = useMemo(() => getViewerUrl(targetUrl), [targetUrl]);
  const downloadUrl = useMemo(() => getDownloadUrl(targetUrl), [targetUrl]);
  const shouldUsePdfJs = useMemo(() => isDirectPdfUrl(targetUrl), [targetUrl]);
  const iframeStatus =
    iframeStatusState.url === iframeUrl ? iframeStatusState.value : "loading";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIframeStatusState((currentStatus) =>
        currentStatus.url === iframeUrl && currentStatus.value === "loading"
          ? { url: iframeUrl, value: "stalled" }
          : currentStatus
      );
    }, 12000);

    return () => window.clearTimeout(timeout);
  }, [iframeUrl, iframeKey]);

  const handleBack = useCallback(() => {
    if (backTarget) {
      router.push(backTarget);
    } else {
      router.back();
    }
  }, [backTarget, router]);

  const handleIframeLoad = useCallback(() => {
    setIframeStatusState({ url: iframeUrl, value: "loaded" });
  }, [iframeUrl]);

  const handleIframeError = useCallback(() => {
    setIframeStatusState({ url: iframeUrl, value: "error" });
  }, [iframeUrl]);

  const handleReload = useCallback(() => {
    setIframeStatusState({ url: iframeUrl, value: "loading" });
    setIframeKey((currentKey) => currentKey + 1);
  }, [iframeUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [targetUrl]);

  if (!url) {
    redirect("/");
  }

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
            <Button
              variant="outline"
              size="sm"
              className="px-2"
              onClick={handleReload}
              title="Reload document"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-2"
              onClick={handleCopyLink}
              title="Copy document link"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
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
          {iframeStatus === "stalled"
            ? "Still loading? Try reload, download, or open externally."
            : "If the document does not load, click Open externally."}
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
        {shouldUsePdfJs ? (
          <PdfJsViewer
            sourceUrl={targetUrl}
            title={displayTitle}
            onOpenExternally={() => window.open(targetUrl, "_blank", "noopener,noreferrer")}
          />
        ) : (
          <iframe
            key={iframeKey}
            src={iframeUrl}
            className={`absolute inset-0 z-0 w-full h-full border-none transition-opacity duration-500 ${
              iframeStatus === "loaded" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            title={displayTitle}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {!shouldUsePdfJs && iframeStatus !== "loaded" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
          {iframeStatus === "error" || iframeStatus === "stalled" ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-medium">
                {iframeStatus === "stalled" ? "Document is taking longer than expected" : "Failed to load document"}
              </p>
              <p className="text-xs opacity-70 max-w-[280px]">
                Some providers block embedded previews. You can reload the viewer, download the file, or open it externally.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleReload}>
                  <RefreshCw className="h-4 w-4" /> Reload
                </Button>
                <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    Open externally <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    Download <Download className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied link" : "Copy link"}
              </Button>
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
        )}
      </div>
    </div>
  );
}
