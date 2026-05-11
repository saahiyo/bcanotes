"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, Minus, Plus } from "lucide-react";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

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

export function PdfJsViewer({ sourceUrl, title, onOpenExternally }: PdfJsViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<PDFPageProxy | null>(null);
  const [scale, setScale] = useState(1.1);
  const [isLoadingDocument, setIsLoadingDocument] = useState(true);
  const [isRenderingPage, setIsRenderingPage] = useState(false);
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
    setPage(null);
    setPageNumber(1);

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

  useEffect(() => {
    if (!pdf) return;

    let isMounted = true;
    setIsRenderingPage(true);
    setError(null);

    pdf
      .getPage(pageNumber)
      .then((loadedPage) => {
        if (!isMounted) return;
        setPage(loadedPage);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to render this page.");
      })
      .finally(() => {
        if (isMounted) setIsRenderingPage(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pdf, pageNumber]);

  useEffect(() => {
    if (!page || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    renderTaskRef.current?.cancel();

    const viewport = page.getViewport({ scale });
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * devicePixelRatio);
    canvas.height = Math.floor(viewport.height * devicePixelRatio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    context.clearRect(0, 0, viewport.width, viewport.height);

    const renderTask = page.render({ canvasContext: context, viewport }) as RenderTask;
    renderTaskRef.current = renderTask;
    setIsRenderingPage(true);

    renderTask.promise
      .catch((renderError: unknown) => {
        if (
          renderError instanceof Error &&
          renderError.name !== "RenderingCancelledException"
        ) {
          setError("Unable to render this page.");
        }
      })
      .finally(() => {
        if (renderTaskRef.current === renderTask) {
          renderTaskRef.current = null;
          setIsRenderingPage(false);
        }
      });

    return () => {
      renderTask.cancel();
    };
  }, [page, scale]);

  const pageCount = pdf?.numPages || 0;
  const previousPage = useCallback(() => {
    setPageNumber((currentPage) => clamp(currentPage - 1, 1, pageCount || 1));
  }, [pageCount]);
  const nextPage = useCallback(() => {
    setPageNumber((currentPage) => clamp(currentPage + 1, 1, pageCount || 1));
  }, [pageCount]);
  const zoomOut = useCallback(() => {
    setScale((currentScale) => clamp(Number((currentScale - 0.15).toFixed(2)), 0.6, 2.4));
  }, []);
  const zoomIn = useCallback(() => {
    setScale((currentScale) => clamp(Number((currentScale + 0.15).toFixed(2)), 0.6, 2.4));
  }, []);

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

      <div className="relative flex-1 overflow-auto p-4">
        {(isLoadingDocument || isRenderingPage) && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/30">
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading PDF
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="mx-auto block bg-white shadow-lg"
          aria-label={title}
        />
      </div>
    </div>
  );
}
