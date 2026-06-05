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
  Loader2,
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

function isIframeBlocked(targetUrl: string) {
  const blockedDomains = [
    "notebook.zohopublic.in",
    "notebook.zohopublic.com",
    "github.com",
  ];
  try {
    const urlObj = new URL(targetUrl);
    return blockedDomains.some((domain) => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}

export default function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; title?: string; backUrl?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const { url, title, backUrl } = resolvedParams;
  const router = useRouter();
  const { push, back } = router;
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
  const isBlockedProvider = useMemo(() => isIframeBlocked(targetUrl), [targetUrl]);
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
      push(backTarget);
    } else {
      back();
    }
  }, [backTarget, push, back]);

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
              <ArrowLeft className="size-4" />
              Back
            </Button>
            
            <div className="size-4 w-[1px] bg-border hidden sm:block shrink-0" />
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
              <RefreshCw className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-2"
              onClick={handleCopyLink}
              title="Copy document link"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
            <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                <Download className="size-4" /> Download
              </Button>
              <Button variant="outline" size="sm" className="flex sm:hidden px-2">
                <Download className="size-4" />
              </Button>
            </Link>

            <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                Open externally <ExternalLink className="size-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex sm:hidden px-2">
                <ExternalLink className="size-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-2"
              onClick={() => setIsHeaderVisible(false)}
              title="Full screen reading mode"
            >
              <ChevronUp className="size-4" />
            </Button>
          </div>
        </div>

        {/* Warning banner — visible on all screen sizes */}
        <div className="bg-muted p-2 text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5 opacity-80 border-b">
          <AlertTriangle className="size-3 shrink-0" />
          <span>
            {iframeStatus === "stalled"
              ? "Still loading? "
              : "If the document does not load, "}
            <Link href={targetUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline hover:text-primary transition-colors">
              click here to open externally
            </Link>.
          </span>
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
          <ChevronDown className="size-4 mr-1" /> Menu
        </Button>
      </div>

      {/* Iframe container */}
      <div className={`flex-1 w-full bg-zinc-100 dark:bg-zinc-900 border-none relative transition-all duration-300 hide-cursor-area ${isHeaderVisible ? 'mt-[88px]' : 'mt-0'}`}>
        {isBlockedProvider ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ExternalLink className="size-8 text-primary" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                External View Required
              </p>
              <p className="text-sm opacity-80 max-w-[320px]">
                This provider does not allow embedding documents directly. Please open it in a new tab to view.
              </p>
              <Link href={targetUrl} target="_blank" rel="noopener noreferrer" className="mt-4">
                <Button size="lg" className="gap-2">
                  Open Document <ExternalLink className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : shouldUsePdfJs ? (
          <PdfJsViewer
            sourceUrl={targetUrl}
            title={displayTitle}
            onOpenExternally={() => window.open(targetUrl, "_blank", "noopener,noreferrer")}
          />
        ) : (
          <iframe
            key={iframeKey}
            src={iframeUrl}
            className="absolute inset-0 z-0 w-full h-full border-none"
            style={{ display: iframeStatus === "loaded" ? "block" : "none" }}
            title={displayTitle}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {!isBlockedProvider && !shouldUsePdfJs && iframeStatus !== "loaded" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
          {iframeStatus === "error" || iframeStatus === "stalled" ? (
            <div className="flex flex-col items-center space-y-6 max-w-md">
              <AlertTriangle className="size-16 text-amber-500" />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {iframeStatus === "stalled" ? "Taking Longer Than Expected" : "Unable to Preview Document"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Some hosts prevent documents from being embedded. You can reload, download the file, or open it in a new window.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 w-full pt-2">
                <div className="flex gap-3 w-full">
                  <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={handleReload}>
                    <RefreshCw className="size-4" /> Retry
                  </Button>
                  <Link href={targetUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="default" size="sm" className="w-full gap-2">
                      Open <ExternalLink className="size-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-3 w-full">
                  <Link href={downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      Download <Download className="size-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={handleCopyLink}>
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Copied" : "Copy URL"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6 max-w-md">
              <Loader2 className="size-16 text-primary animate-spin" />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">Loading Document</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Establishing a secure connection to the document host. Some providers may block embedded previews.
                </p>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
