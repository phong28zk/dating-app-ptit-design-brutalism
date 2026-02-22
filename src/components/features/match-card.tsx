import { cn } from "@/lib/cn";
import Image from "next/image";
import { Star } from "lucide-react";

interface Match {
  name: string;
  age: number;
  photo?: string;
  isNew?: boolean;
}

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  className?: string;
}

export function MatchCard({ match, onClick, className }: MatchCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-xl brutal-border overflow-hidden",
        "shadow-brutal-md brutal-interactive cursor-pointer block w-full",
        className
      )}
    >
      {/* Photo */}
      {match.photo ? (
        <Image
          src={match.photo}
          alt={match.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-wine-500" />
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* New badge */}
      {match.isNew && (
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-superlike brutal-border-thin flex items-center justify-center shadow-brutal-sm">
          <Star className="w-4 h-4 text-charcoal-900" fill="currentColor" />
        </div>
      )}

      {/* Name overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-label-lg text-white font-semibold">
          {match.name}, {match.age}
        </p>
      </div>
    </button>
  );
}
