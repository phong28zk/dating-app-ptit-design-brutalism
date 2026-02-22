import { cn } from "@/lib/cn";
import Image from "next/image";
import { Check, MapPin } from "lucide-react";

interface Profile {
  name: string;
  age: number;
  photos: string[];
  verified?: boolean;
  school?: string;
  distance?: string;
}

interface ProfileCardProps {
  profile: Profile;
  currentPhotoIndex?: number;
  className?: string;
}

export function ProfileCard({ profile, currentPhotoIndex = 0, className }: ProfileCardProps) {
  const photo = profile.photos[currentPhotoIndex] ?? profile.photos[0];

  return (
    <div
      className={cn(
        "relative aspect-[3/4] rounded-2xl brutal-border-heavy overflow-hidden",
        "shadow-brutal-xl",
        className
      )}
    >
      {/* Photo */}
      {photo && (
        <Image
          src={photo}
          alt={`${profile.name}'s photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      )}

      {/* Placeholder bg if no photo */}
      {!photo && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-wine-500" />
      )}

      {/* Photo dots */}
      {profile.photos.length > 1 && (
        <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 px-4">
          {profile.photos.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all",
                i === currentPhotoIndex
                  ? "bg-white flex-[2]"
                  : "bg-white/50 flex-1"
              )}
            />
          ))}
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Profile info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-headline-md text-white">
            {profile.name}, {profile.age}
          </h2>
          {profile.verified && (
            <span className="w-5 h-5 rounded-full bg-rewind flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
          )}
        </div>
        {profile.school && (
          <p className="text-body-md text-white/80">{profile.school}</p>
        )}
        {profile.distance && (
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-white/60" />
            <p className="text-body-sm text-white/60">{profile.distance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
