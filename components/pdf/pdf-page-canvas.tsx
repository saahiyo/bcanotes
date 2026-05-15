"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

type RenderTask = {
  cancel: () => void;
  promise: Promise<unknown>;
};

export function PdfPageCanvas({
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
        
        // Batch style assignments to avoid multiple reflows
        Object.assign(canvas.style, {
          width: `${Math.floor(viewport.width)}px`,
          height: `${Math.floor(viewport.height)}px`,
        });

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
