import { cn } from "@/lib/cn";
import { Check, MapPin } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  age: number;
  verified?: boolean;
  school?: string;
  location?: string;
  className?: string;
}

export function ProfileHeader({
  name,
  age,
  verified,
  school,
  location,
  className,
}: ProfileHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-headline-lg">
          {name}, {age}
        </h1>
        {verified && (
          <span className="w-6 h-6 rounded-full bg-rewind flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </span>
        )}
      </div>

      {school && (
        <p className="text-body-md text-charcoal-700">{school}</p>
      )}

      {location && (
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-charcoal-500 shrink-0" />
          <p className="text-body-sm text-charcoal-500">{location}</p>
        </div>
      )}
    </div>
  );
}
