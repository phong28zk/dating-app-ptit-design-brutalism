"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface CollapsibleSettingsSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function CollapsibleSettingsSection({
  title,
  defaultOpen = false,
  children,
}: CollapsibleSettingsSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-[3px] border-charcoal-900 rounded-xl overflow-hidden shadow-brutal-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-blush-50 transition-colors"
      >
        <span className="text-title-md font-semibold">{title}</span>
        <ChevronDown
          className={cn("w-5 h-5 text-charcoal-500 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-4 py-3 border-t-[3px] border-charcoal-900 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
