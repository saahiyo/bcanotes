"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertTriangle, X, ArrowRight, Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: string;
  important?: boolean;
  createdAt: any;
}

export function ImportantAlert() {
  const [importantNotice, setImportantNotice] = useState<Notice | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const noticesRef = collection(db, "notices");
    // Fetch latest 10 notices to find the latest important one (avoids requiring Firestore composite index)
    const q = query(noticesRef, orderBy("createdAt", "desc"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const noticesList: Notice[] = [];
      snapshot.forEach((doc) => {
        noticesList.push({ id: doc.id, ...doc.data() } as Notice);
      });

      // Find the most recent notice marked as important
      const latestImportant = noticesList.find((n) => n.important === true);

      if (latestImportant) {
        // Check if user has already dismissed this specific notice
        const isDismissed = localStorage.getItem(`dismissed-notice-${latestImportant.id}`);
        if (!isDismissed) {
          setImportantNotice(latestImportant);
          // Small delay before slide-in for natural feel
          const timer = setTimeout(() => setIsOpen(true), 1500);
          return () => clearTimeout(timer);
        } else {
          setIsOpen(false);
          setImportantNotice(null);
        }
      } else {
        setIsOpen(false);
        setImportantNotice(null);
      }
    }, (err) => {
      console.error("Error fetching important alert:", err);
    });

    return unsubscribe;
  }, []);

  const handleDismiss = () => {
    if (importantNotice) {
      localStorage.setItem(`dismissed-notice-${importantNotice.id}`, "true");
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && importantNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Centered Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-500/30 bg-background/90 dark:bg-card/90 p-6 shadow-2xl backdrop-blur-md ring-1 ring-red-500/10 z-10"
          >
            {/* Ambient Red Glow */}
            <div className="absolute -top-10 -right-10 size-28 rounded-full bg-red-500/10 blur-xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="size-4" />
                  Urgent Announcement
                </span>
              </div>
              
              <button
                onClick={handleDismiss}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-foreground leading-snug">
                {importantNotice.title}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap max-h-[40vh] overflow-y-auto pr-1">
                {importantNotice.content}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t">
                <Link href="/notices" onClick={handleDismiss} className="flex-1">
                  <Button className="w-full h-9 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white border-none gap-1.5">
                    Read Details
                    <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleDismiss}
                  className="flex-1 h-9 text-xs font-medium"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
