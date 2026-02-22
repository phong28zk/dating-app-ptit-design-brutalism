"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

interface ChatInputBarProps {
  onSend: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function ChatInputBar({ onSend, placeholder = "Type a message...", className }: ChatInputBarProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn(
      "bg-white border-t-[3px] border-charcoal-900 px-4 py-3",
      "flex items-center gap-2",
      className
    )}>
      <button className="w-10 h-10 flex items-center justify-center text-charcoal-500 hover:text-charcoal-900 transition-colors shrink-0">
        <Paperclip className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "flex-1 px-4 py-2.5 rounded-full brutal-border bg-blush-50 text-body-md",
          "focus:outline-none focus:ring-2 focus:ring-rose-500/50",
          "placeholder:text-charcoal-500"
        )}
      />

      <button className="w-10 h-10 flex items-center justify-center text-charcoal-500 hover:text-charcoal-900 transition-colors shrink-0">
        <Smile className="w-5 h-5" />
      </button>

      <IconButton
        size="sm"
        variant={value.trim() ? "like" : "default"}
        onClick={handleSend}
        disabled={!value.trim()}
        aria-label="Send message"
        className={cn(!value.trim() && "opacity-50 cursor-not-allowed")}
      >
        <Send className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
