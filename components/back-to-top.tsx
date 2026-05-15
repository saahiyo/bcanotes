"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      frame = 0;

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setIsVisible(window.scrollY > 400);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 24;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-5 scale-75 opacity-0"
      }`}
    >
      <svg className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="24"
          className="fill-none stroke-primary/10"
          strokeWidth="3"
        />
        <circle
          cx="50%"
          cy="50%"
          r="24"
          className="fill-none stroke-primary transition-[stroke-dashoffset] duration-100"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - scrollProgress)}
        />
      </svg>

      <Button
        size="icon"
        onClick={scrollToTop}
        className="flex size-12 items-center justify-center rounded-full bg-background border border-border text-foreground shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
        aria-label="Back to top"
      >
        <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1" />
      </Button>

      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-foreground text-background text-[10px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
        Back to Top
      </span>
    </div>
  );
}
