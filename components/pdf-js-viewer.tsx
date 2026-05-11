"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, Minus, Plus } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";

type RenderTask = {
  cancel: () => void;
  promise: Promise<unknown>;
};

type PdfJsViewerProps = {
  sourceUrl: string;
  title: string;
  onOpenExternally: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function PdfPageCanvas({
  pdf,
  pageNumber,
  scale,
  title,
  onRenderStart,
  onRenderEnd,
}: {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  title: string;
  onRenderStart: () => void;
  onRenderEnd: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let renderTask: RenderTask | null = null;
    let renderFinished = false;

    onRenderStart();

    pdf
      .getPage(pageNumber)
      .then((page) => {
        if (!isMounted || !canvasRef.current) return;

        setPageError(false);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        const viewport = page.getViewport({ scale });
        const devicePixelRatio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * devicePixelRatio);
        canvas.height = Math.floor(viewport.height * devicePixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = page.render({ canvasContext: context, viewport }) as RenderTask;
        return renderTask.promise;
      })
      .catch((renderError: unknown) => {
        if (
          renderError instanceof Error &&
          renderError.name === "RenderingCancelledException"
        ) {
          return;
        }

        if (isMounted) setPageError(true);
      })
      .finally(() => {
        if (isMounted) {
          renderFinished = true;
          onRenderEnd();
        }
      });

    return () => {
      isMounted = false;
      renderTask?.cancel();
      if (!renderFinished) {
        onRenderEnd();
      }
    };
  }, [onRenderEnd, onRenderStart, pageNumber, pdf, scale]);

  return (
    <div className="flex justify-center">
      {pageError ? (
        <div className="flex min-h-[320px] w-full max-w-3xl items-center justify-center bg-white text-sm text-red-500 shadow-lg">
          Page {pageNumber} failed to render.
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="block max-w-full bg-white shadow-lg"
          aria-label={`${title} page ${pageNumber}`}
        />
      )}
    </div>
  );
}

export function PdfJsViewer({ sourceUrl, title, onOpenExternally }: PdfJsViewerProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pageContainerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [isLoadingDocument, setIsLoadingDocument] = useState(true);
  const [renderingPageCount, setRenderingPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const proxyUrl = useMemo(
    () => `/api/pdf-proxy?url=${encodeURIComponent(sourceUrl)}`,
    [sourceUrl]
  );

  useEffect(() => {
    let isMounted = true;
    let loadingTask: { destroy: () => void; promise: Promise<PDFDocumentProxy> } | null = null;

    setIsLoadingDocument(true);
    setError(null);
    setPdf(null);
    setPageNumber(1);
    setRenderingPageCount(0);

    import("pdfjs-dist/legacy/build/pdf.mjs")
      .then((pdfjsLib) => {
        if (!isMounted) return;
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.mjs",
          import.meta.url
        ).toString();

        loadingTask = pdfjsLib.getDocument({
          url: proxyUrl,
          disableRange: true,
          disableStream: true,
        }) as { destroy: () => void; promise: Promise<PDFDocumentProxy> };

        return loadingTask.promise;
      })
      .then((loadedPdf) => {
        if (!loadedPdf || !isMounted) return;
        setPdf(loadedPdf);
        setIsLoadingDocument(false);
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load this PDF in the internal viewer.");
          setIsLoadingDocument(false);
        }
      });

    return () => {
      isMounted = false;
      loadingTask?.destroy();
    };
  }, [proxyUrl]);

  const pageCount = pdf?.numPages || 0;
  const pageNumbers = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index + 1),
    [pageCount]
  );

  const scrollToPage = useCallback(
    (targetPageNumber: number) => {
      const safePageNumber = clamp(targetPageNumber, 1, pageCount || 1);

      pageContainerRefs.current[safePageNumber - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setPageNumber(safePageNumber);
    },
    [pageCount]
  );

  const previousPage = useCallback(() => {
    scrollToPage(pageNumber - 1);
  }, [pageNumber, scrollToPage]);
  const nextPage = useCallback(() => {
    scrollToPage(pageNumber + 1);
  }, [pageNumber, scrollToPage]);
  const zoomOut = useCallback(() => {
    setScale((currentScale) => clamp(Number((currentScale - 0.15).toFixed(2)), 0.6, 2.4));
  }, []);
  const zoomIn = useCallback(() => {
    setScale((currentScale) => clamp(Number((currentScale + 0.15).toFixed(2)), 0.6, 2.4));
  }, []);
  const handleRenderStart = useCallback(() => {
    setRenderingPageCount((currentCount) => currentCount + 1);
  }, []);
  const handleRenderEnd = useCallback(() => {
    setRenderingPageCount((currentCount) => Math.max(0, currentCount - 1));
  }, []);
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const containerTop = container.getBoundingClientRect().top;
    let closestPage = pageNumber;
    let closestDistance = Number.POSITIVE_INFINITY;

    pageContainerRefs.current.forEach((pageElement, index) => {
      if (!pageElement) return;

      const distance = Math.abs(pageElement.getBoundingClientRect().top - containerTop - 16);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPage = index + 1;
      }
    });

    if (closestPage !== pageNumber) {
      setPageNumber(closestPage);
    }
  }, [pageNumber]);

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-muted-foreground">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{error}</p>
          <p className="mt-2 max-w-[320px] text-xs">
            Open the file externally or download it if the source blocks server-side loading.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onOpenExternally}>
          Open externally
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-zinc-200 dark:bg-zinc-950">
      <div className="flex min-h-12 items-center justify-between gap-2 border-b bg-background/95 px-3 py-2 text-sm shadow-sm">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={previousPage}
            disabled={pageNumber <= 1 || isLoadingDocument}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[88px] text-center text-xs font-medium">
            {pageCount ? `${pageNumber} / ${pageCount}` : "Loading"}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={nextPage}
            disabled={!pageCount || pageNumber >= pageCount || isLoadingDocument}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="hidden min-w-0 flex-1 truncate px-2 text-center text-xs text-muted-foreground md:block">
          {title}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={zoomOut}
            disabled={scale <= 0.6}
            title="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-xs font-medium">{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={zoomIn}
            disabled={scale >= 2.4}
            title="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-auto p-4"
        onScroll={handleScroll}
      >
        {(isLoadingDocument || renderingPageCount > 0) && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/30">
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading PDF
            </div>
          </div>
        )}
        <div className="mx-auto flex w-fit min-w-full flex-col gap-4 pb-6">
          {pdf &&
            pageNumbers.map((currentPageNumber) => (
              <div
                key={currentPageNumber}
                ref={(element) => {
                  pageContainerRefs.current[currentPageNumber - 1] = element;
                }}
                className="scroll-mt-4"
              >
                <PdfPageCanvas
                  pdf={pdf}
                  pageNumber={currentPageNumber}
                  scale={scale}
                  title={title}
                  onRenderStart={handleRenderStart}
                  onRenderEnd={handleRenderEnd}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
