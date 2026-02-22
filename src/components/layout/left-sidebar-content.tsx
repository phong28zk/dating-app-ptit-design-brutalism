"use client";

import { useAppState } from "@/lib/app-state-context";
import { Avatar } from "@/components/ui/avatar";
import { ChatListItem } from "@/components/features/chat-list-item";
import { ArrowLeft } from "lucide-react";

export function LeftSidebarContent() {
  const { activeView, conversations, matches, activeConversationId, setActiveView, openChat } = useAppState();

  const newMatches = matches.filter((m) => m.isNew).slice(0, 6);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* User mini profile */}
      <div className="p-4 border-b-[3px] border-charcoal-900 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
            name="Minh Tuan"
            size="md"
            online
          />
          <div>
            <p className="text-title-md font-semibold">Minh Tuan</p>
            <p className="text-label-sm text-charcoal-500">Online</p>
          </div>
        </div>

        {activeView === "chat" && (
          <button
            onClick={() => setActiveView("discover")}
            className="mt-3 flex items-center gap-1.5 text-label-sm text-rose-500 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to meeting new people
          </button>
        )}
      </div>

      {/* New matches row */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <p className="text-label-lg text-charcoal-500 uppercase tracking-wider mb-3">New Matches</p>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {newMatches.map((m) => (
            <button
              key={m.id}
              onClick={() => openChat(conversations.find((c) => c.profile.id === m.profile.id)?.id ?? "c1")}
              className="flex flex-col items-center gap-1 shrink-0"
            >
              <div className="relative">
                <Avatar src={m.profile.photos[0]} name={m.profile.name} size="md" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-white" />
              </div>
              <span className="text-label-sm text-charcoal-700 max-w-[48px] truncate">{m.profile.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversations list */}
      <div className="px-4 pb-2 shrink-0">
        <p className="text-label-lg text-charcoal-500 uppercase tracking-wider">Messages</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <ChatListItem
            key={conv.id}
            avatar={conv.avatar}
            name={conv.name}
            lastMessage={conv.lastMessage}
            time={conv.time}
            unreadCount={conv.unreadCount}
            isActive={conv.id === activeConversationId}
            onClick={() => openChat(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}
