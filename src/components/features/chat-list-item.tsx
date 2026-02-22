import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/avatar";

interface ChatListItemProps {
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function ChatListItem({
  avatar,
  name,
  lastMessage,
  time,
  unreadCount,
  isActive,
  onClick,
}: ChatListItemProps) {
  const hasUnread = unreadCount !== undefined && unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
        "border-b border-charcoal-900/10 cursor-pointer",
        "hover:bg-blush-50",
        isActive && "bg-blush-100 border-l-4 border-l-rose-500"
      )}
    >
      <Avatar src={avatar} name={name} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={cn("text-title-sm truncate", hasUnread && "font-bold text-charcoal-900")}>
            {name}
          </span>
          <span className="text-label-sm text-charcoal-500 shrink-0 ml-2">{time}</span>
        </div>
        <p className={cn(
          "text-body-sm truncate",
          hasUnread ? "text-charcoal-700" : "text-charcoal-500"
        )}>
          {lastMessage}
        </p>
      </div>

      {hasUnread && (
        <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
          {unreadCount! > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
