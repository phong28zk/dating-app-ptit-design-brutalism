import { cn } from "@/lib/cn";
import Image from "next/image";
import { Check } from "lucide-react";

type Size = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size;
  online?: boolean;
  verified?: boolean;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const dotSizeClasses: Record<Size, string> = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
};

const badgeSizeClasses: Record<Size, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

function getInitials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const bgColors = [
  "bg-rose-500", "bg-gold-500", "bg-rewind", "bg-chat-action", "bg-wine-400",
];

function getBgColor(name?: string) {
  if (!name) return bgColors[0];
  const idx = name.charCodeAt(0) % bgColors.length;
  return bgColors[idx];
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  online,
  verified,
  className,
}: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "relative rounded-full brutal-border-thin overflow-hidden",
          sizeClasses[size]
        )}
      >
        {src ? (
          <Image src={src} alt={alt} fill className="object-cover" />
        ) : (
          <div
            className={cn(
              "w-full h-full flex items-center justify-center text-white font-bold",
              getBgColor(name)
            )}
          >
            <span className="text-label-md">{getInitials(name)}</span>
          </div>
        )}
      </div>

      {online && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-success border-2 border-white",
            dotSizeClasses[size]
          )}
        />
      )}

      {verified && (
        <span
          className={cn(
            "absolute top-0 right-0 rounded-full bg-rewind border-2 border-white flex items-center justify-center text-white",
            badgeSizeClasses[size]
          )}
        >
          <Check className="w-[60%] h-[60%]" strokeWidth={3} />
        </span>
      )}
    </div>
  );
}
