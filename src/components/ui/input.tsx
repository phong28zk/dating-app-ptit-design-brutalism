import { cn } from "@/lib/cn";
import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";

type Variant = "default" | "search";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  containerClassName?: string;
}

export function Input({
  variant = "default",
  className,
  containerClassName,
  ...props
}: InputProps) {
  if (variant === "search") {
    return (
      <div className={cn("relative flex items-center", containerClassName)}>
        <Search className="absolute left-4 w-4 h-4 text-charcoal-500 pointer-events-none" />
        <input
          className={cn(
            "w-full pl-10 pr-4 py-3 rounded-full brutal-border bg-white text-body-md",
            "focus:outline-none focus:ring-2 focus:ring-rose-500/50 placeholder:text-charcoal-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      className={cn(
        "w-full px-4 py-3 rounded-xl brutal-border bg-white text-body-md",
        "focus:outline-none focus:ring-2 focus:ring-rose-500/50 placeholder:text-charcoal-500",
        className
      )}
      {...props}
    />
  );
}
