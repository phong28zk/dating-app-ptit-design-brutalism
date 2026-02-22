import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-rose-500 text-white shadow-brutal-md",
  secondary: "bg-white text-charcoal-900 shadow-brutal-md",
  ghost: "bg-transparent text-charcoal-900",
  destructive: "bg-reject text-white shadow-brutal-md",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl brutal-border brutal-interactive",
        "transition-all cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 shadow-none cursor-not-allowed pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
