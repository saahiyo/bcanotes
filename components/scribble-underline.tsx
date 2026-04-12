"use client";

import { motion } from "framer-motion";

export function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-2 left-0 w-full ${className}`}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8 C10 3, 20 10, 30 6 S50 2, 60 7 S80 12, 90 5 S110 3, 118 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.2, delay: 0.5, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 0.5 },
        }}
      />
      {/* Second slightly offset scribble for a messier, hand-drawn look */}
      <motion.path
        d="M3 9 C12 5, 22 11, 32 7 S52 3, 62 8 S82 11, 92 4 S112 5, 117 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{
          pathLength: { duration: 1, delay: 0.8, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 0.8 },
        }}
      />
    </motion.svg>
  );
}
