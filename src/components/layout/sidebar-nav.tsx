"use client";

import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/avatar";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

interface SidebarUser {
  name: string;
  avatar?: string;
}

interface SidebarNavProps {
  user: SidebarUser;
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationClick: (id: string) => void;
}

export function SidebarNav({
  user,
  conversations,
  activeConversationId,
  onConversationClick,
}: SidebarNavProps) {
  return (
    <aside className="hidden md:flex flex-col w-72 h-screen bg-white border-r-[3px] border-charcoal-900 overflow-y-auto shrink-0">
      {/* User profile */}
      <div className="p-4 border-b-[3px] border-charcoal-900">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.name} size="md" online />
          <div>
            <p className="text-title-md font-semibold">{user.name}</p>
            <p className="text-label-sm text-charcoal-500">Online</p>
          </div>
        </div>
      </div>

      {/* Match Queue label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-label-lg text-charcoal-500 uppercase tracking-wider">Match Queue</p>
      </div>

      {/* Conversations */}
      <div className="flex flex-col flex-1">
        {conversations.map((conv) => {
          const isActive = conv.id === activeConversationId;
          return (
            <button
              key={conv.id}
              onClick={() => onConversationClick(conv.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-charcoal-900/10",
                "hover:bg-blush-50",
                isActive && "bg-blush-100 border-l-4 border-l-rose-500"
              )}
            >
              <Avatar src={conv.avatar} name={conv.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={cn("text-title-sm truncate", conv.unreadCount && "font-bold")}>
                    {conv.name}
                  </p>
                  <span className="text-label-sm text-charcoal-500 shrink-0 ml-1">{conv.time}</span>
                </div>
                <p className="text-body-sm text-charcoal-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount !== undefined && conv.unreadCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
