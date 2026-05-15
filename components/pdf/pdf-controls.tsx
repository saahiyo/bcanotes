"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

type PdfControlsProps = {
  pageNumber: number;
  pageCount: number;
  scale: number;
  title: string;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
};

export function PdfControls({
  pageNumber,
  pageCount,
  scale,
  title,
  isLoading,
  onPrevious,
  onNext,
  onZoomOut,
  onZoomIn,
}: PdfControlsProps) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-2 border-b bg-background/95 px-3 py-2 text-sm shadow-sm">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0"
          onClick={onPrevious}
          disabled={pageNumber <= 1 || isLoading}
          title="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="min-w-[88px] text-center text-xs font-medium">
          {pageCount ? `${pageNumber} / ${pageCount}` : "Loading"}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0"
          onClick={onNext}
          disabled={!pageCount || pageNumber >= pageCount || isLoading}
          title="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <p className="hidden min-w-0 flex-1 truncate px-2 text-center text-xs text-muted-foreground md:block">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0"
          onClick={onZoomOut}
          disabled={scale <= 0.6}
          title="Zoom out"
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-12 text-center text-xs font-medium">{Math.round(scale * 100)}%</span>
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0"
          onClick={onZoomIn}
          disabled={scale >= 2.4}
          title="Zoom in"
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
