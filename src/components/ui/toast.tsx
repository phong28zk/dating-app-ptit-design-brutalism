"use client";

import { cn } from "@/lib/cn";
import { useEffect } from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onDismiss: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  success: "border-l-4 border-l-success",
  error: "border-l-4 border-l-error",
  warning: "border-l-4 border-l-warning",
  info: "border-l-4 border-l-rewind",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

export function Toast({ message, variant = "info", onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-3",
        "bg-white rounded-xl brutal-border shadow-brutal-md px-4 py-3 min-w-[200px] max-w-sm",
        variantClasses[variant]
      )}
    >
      <span className="text-label-lg font-bold">{variantIcons[variant]}</span>
      <p className="text-body-sm flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="text-charcoal-500 hover:text-charcoal-900 text-label-sm ml-1"
      >
        ✕
      </button>
    </div>
  );
}
