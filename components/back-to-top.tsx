"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring for the progress circle
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* Progress Ring */}
          <svg className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="24"
              className="fill-none stroke-primary/10"
              strokeWidth="3"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="24"
              className="fill-none stroke-primary"
              strokeWidth="3"
              strokeDasharray="0 1"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* Back to Top Button */}
          <Button
            size="icon"
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border text-foreground shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </Button>

          {/* Optional Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-foreground text-background text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
            Back to Top
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
