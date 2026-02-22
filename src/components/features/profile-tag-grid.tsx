import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import {
  Ruler, Dumbbell, GraduationCap, Wine, Cigarette,
  Heart, Baby, Star
} from "lucide-react";

interface ProfileTag {
  icon: string;
  label: string;
  value: string;
}

interface ProfileTagGridProps {
  tags: ProfileTag[];
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  height: Ruler,
  exercise: Dumbbell,
  education: GraduationCap,
  drinking: Wine,
  smoking: Cigarette,
  "looking for": Heart,
  kids: Baby,
  "star sign": Star,
};

export function ProfileTagGrid({ tags, className }: ProfileTagGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const Icon = iconMap[tag.icon.toLowerCase()] ?? Star;
        return (
          <Badge key={`${tag.label}-${tag.value}`} icon={Icon} variant="default">
            {tag.value}
          </Badge>
        );
      })}
    </div>
  );
}
