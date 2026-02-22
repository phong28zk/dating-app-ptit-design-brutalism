"use client";

import { cn } from "@/lib/cn";
import { SlidersHorizontal } from "lucide-react";

interface Filter {
  id: string;
  label: string;
  active: boolean;
}

interface FilterBarProps {
  filters: Filter[];
  onToggle: (id: string) => void;
  className?: string;
}

export function FilterBar({ filters, onToggle, className }: FilterBarProps) {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto scrollbar-none pb-1", className)}>
      {/* Filter icon button */}
      <button
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full brutal-border bg-white shadow-brutal-sm brutal-interactive"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>

      {/* Filter chips */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onToggle(filter.id)}
          className={cn(
            "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-label-md transition-all",
            "brutal-border-thin brutal-interactive",
            filter.active
              ? "bg-rose-500 text-white border-rose-500"
              : "bg-white text-charcoal-900"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
