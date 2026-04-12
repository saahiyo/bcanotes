"use client";

import { useToasts, dismissToast, type ToastVariant } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const iconMap: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styleMap: Record<ToastVariant, { border: string; icon: string; bg: string }> = {
  success: {
    border: "border-green-500/30",
    icon: "text-green-500",
    bg: "bg-green-500/5",
  },
  error: {
    border: "border-red-500/30",
    icon: "text-red-500",
    bg: "bg-red-500/5",
  },
  info: {
    border: "border-blue-500/30",
    icon: "text-blue-500",
    bg: "bg-blue-500/5",
  },
};

export function Toaster() {
  const { toasts } = useToasts();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col-reverse items-center gap-3 pointer-events-none w-full max-w-md px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const Icon = iconMap[t.variant];
          const styles = styleMap[t.variant];

          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`
                pointer-events-auto w-full flex items-start gap-3 p-4 rounded-xl
                border ${styles.border} ${styles.bg}
                bg-background/90 backdrop-blur-xl shadow-2xl shadow-black/10
              `}
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                <Icon className={`h-5 w-5 ${styles.icon}`} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.description}</p>
                )}
              </div>

              {/* Dismiss */}
              <button
                onClick={() => dismissToast(t.id)}
                className="shrink-0 p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
