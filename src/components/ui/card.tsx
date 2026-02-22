import { cn } from "@/lib/cn";
import { type ReactNode, type HTMLAttributes } from "react";

type Variant = "default" | "elevated" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  default: "shadow-brutal-md",
  elevated: "shadow-brutal-lg",
  interactive: "shadow-brutal-md brutal-interactive cursor-pointer",
};

export function Card({ variant = "default", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl brutal-border overflow-hidden",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
