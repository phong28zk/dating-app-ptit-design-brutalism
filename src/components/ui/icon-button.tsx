import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "reject" | "like" | "superlike" | "rewind" | "chat" | "default";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-10 h-10",
  md: "w-13 h-13",
  lg: "w-16 h-16",
};

const variantClasses: Record<Variant, string> = {
  reject: "bg-reject text-white",
  like: "bg-like text-white",
  superlike: "bg-superlike text-charcoal-900",
  rewind: "bg-rewind text-white",
  chat: "bg-chat-action text-white",
  default: "bg-white text-charcoal-900",
};

export function IconButton({
  size = "md",
  variant = "default",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full brutal-border shadow-brutal-sm brutal-interactive",
        "transition-all cursor-pointer",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
