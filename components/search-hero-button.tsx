"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchHeroButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      className="h-10 sm:h-12 px-5 sm:px-6 text-sm sm:text-base gap-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-border hover:bg-muted/50 group"
      onClick={() => window.dispatchEvent(new Event("open-search"))}
    >
      <Search className="size-4 text-primary group-hover:scale-110 transition-transform" />
      <span>Search Notes (Ctrl+K)</span>
    </Button>
  );
}
