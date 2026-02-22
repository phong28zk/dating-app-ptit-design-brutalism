"use client";

import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/icon-button";
import { Undo2, X, Heart, Star, MessageCircle } from "lucide-react";

interface ActionBarProps {
  onRewind?: () => void;
  onReject?: () => void;
  onLike?: () => void;
  onSuperLike?: () => void;
  onChat?: () => void;
  className?: string;
}

export function ActionBar({
  onRewind,
  onReject,
  onLike,
  onSuperLike,
  onChat,
  className,
}: ActionBarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-3",
        "rounded-full bg-charcoal-900/80 backdrop-blur-lg",
        "border-2 border-white/10 shadow-brutal-xl",
        className
      )}
    >
      <IconButton size="sm" variant="default" onClick={onRewind} aria-label="Rewind">
        <Undo2 className="w-4 h-4" />
      </IconButton>

      <IconButton size="md" variant="reject" onClick={onReject} aria-label="Reject">
        <X className="w-5 h-5" />
      </IconButton>

      <IconButton
        size="lg"
        variant="like"
        onClick={onLike}
        aria-label="Like"
        className="ring-4 ring-rose-500/30"
      >
        <Heart className="w-7 h-7" fill="white" />
      </IconButton>

      <IconButton size="md" variant="superlike" onClick={onSuperLike} aria-label="Super Like">
        <Star className="w-5 h-5" fill="currentColor" />
      </IconButton>

      <IconButton size="sm" variant="chat" onClick={onChat} aria-label="Chat">
        <MessageCircle className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
