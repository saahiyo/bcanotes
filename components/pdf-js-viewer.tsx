"use client";

import { useCallback, useEffect, useRef, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { PdfPageCanvas } from "./pdf/pdf-page-canvas";
import { PdfControls } from "./pdf/pdf-controls";

type PdfJsViewerProps = {
  sourceUrl: string;
  title: string;
  onOpenExternally: () => void;
};

type State = {
  pdf: PDFDocumentProxy | null;
  pageNumber: number;
  scale: number;
  isLoadingDocument: boolean;
  renderingPageCount: number;
  error: string | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; pdf: PDFDocumentProxy }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "SET_PAGE"; pageNumber: number }
  | { type: "SET_SCALE"; scale: number }
  | { type: "RENDER_START" }
  | { type: "RENDER_END" };

const initialState: State = {
  pdf: null,
  pageNumber: 1,
  scale: 1.1,
  isLoadingDocument: true,
  renderingPageCount: 0,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...initialState, isLoadingDocument: true };
    case "LOAD_SUCCESS":
      return { ...state, pdf: action.pdf, isLoadingDocument: false, error: null };
    case "LOAD_ERROR":
      return { ...state, error: action.error, isLoadingDocument: false };
    case "SET_PAGE":
      return { ...state, pageNumber: action.pageNumber };
    case "SET_SCALE":
      return { ...state, scale: action.scale };
    case "RENDER_START":
      return { ...state, renderingPageCount: state.renderingPageCount + 1 };
    case "RENDER_END":
      return { ...state, renderingPageCount: Math.max(0, state.renderingPageCount - 1) };
    default:
      return state;
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PdfJsViewer({ sourceUrl, title, onOpenExternally }: PdfJsViewerProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pageContainerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pdf, pageNumber, scale, isLoadingDocument, renderingPageCount, error } = state;

  const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(sourceUrl)}`;

  useEffect(() => {
    let isMounted = true;
    let loadingTask: { destroy: () => void; promise: Promise<PDFDocumentProxy> } | null = null;

    dispatch({ type: "LOAD_START" });

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
        dispatch({ type: "LOAD_SUCCESS", pdf: loadedPdf });
      })
      .catch(() => {
        if (isMounted) {
          dispatch({ type: "LOAD_ERROR", error: "Unable to load this PDF in the internal viewer." });
        }
      });

    return () => {
      isMounted = false;
      loadingTask?.destroy();
    };
  }, [proxyUrl]);

  const pageCount = pdf?.numPages || 0;
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  const scrollToPage = useCallback(
    (targetPageNumber: number) => {
      const safePageNumber = clamp(targetPageNumber, 1, pageCount || 1);

      pageContainerRefs.current[safePageNumber - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      dispatch({ type: "SET_PAGE", pageNumber: safePageNumber });
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
    dispatch({ type: "SET_SCALE", scale: clamp(Number((scale - 0.15).toFixed(2)), 0.6, 2.4) });
  }, [scale]);
  const zoomIn = useCallback(() => {
    dispatch({ type: "SET_SCALE", scale: clamp(Number((scale + 0.15).toFixed(2)), 0.6, 2.4) });
  }, [scale]);
  const handleRenderStart = useCallback(() => {
    dispatch({ type: "RENDER_START" });
  }, []);
  const handleRenderEnd = useCallback(() => {
    dispatch({ type: "RENDER_END" });
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
      dispatch({ type: "SET_PAGE", pageNumber: closestPage });
    }
  }, [pageNumber]);

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-muted-foreground">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="size-6 text-red-500" />
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
      <PdfControls 
        pageNumber={pageNumber}
        pageCount={pageCount}
        scale={scale}
        title={title}
        isLoading={isLoadingDocument}
        onPrevious={previousPage}
        onNext={nextPage}
        onZoomOut={zoomOut}
        onZoomIn={zoomIn}
      />

      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-auto p-4"
        onScroll={handleScroll}
      >
        {(isLoadingDocument || renderingPageCount > 0) && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/30">
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
              <Loader2 className="size-4 animate-spin" />
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
