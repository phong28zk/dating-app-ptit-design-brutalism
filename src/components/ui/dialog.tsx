"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 bg-white rounded-2xl brutal-border-heavy shadow-brutal-xl",
          "w-full max-w-md p-6",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-headline-sm">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full brutal-border-thin hover:bg-blush-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
