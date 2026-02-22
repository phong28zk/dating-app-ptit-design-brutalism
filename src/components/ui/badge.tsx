import { cn } from "@/lib/cn";
import { type ReactNode, type ElementType } from "react";

type Variant = "default" | "active" | "outline";

interface BadgeProps {
  variant?: Variant;
  icon?: ElementType;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-blush-100 text-charcoal-900 brutal-border-thin",
  active: "bg-rose-500 text-white brutal-border-thin border-rose-500",
  outline: "bg-transparent text-charcoal-900 border-2 border-charcoal-500",
};

export function Badge({
  variant = "default",
  icon: Icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-md",
        variantClasses[variant],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
