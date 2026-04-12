import { useSyncExternalStore, useCallback } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

// Simple external store for toasts
let toasts: Toast[] = [];
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return toasts;
}

let idCounter = 0;

export function toast({
  title,
  description,
  variant = "info",
  duration = 4000,
}: {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}) {
  const id = String(++idCounter);
  const newToast: Toast = { id, title, description, variant };
  toasts = [...toasts, newToast];
  emitChange();

  // Auto-dismiss
  setTimeout(() => {
    dismissToast(id);
  }, duration);

  return id;
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

export function useToasts() {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const dismiss = useCallback((id: string) => dismissToast(id), []);
  return { toasts: currentToasts, dismiss };
}
