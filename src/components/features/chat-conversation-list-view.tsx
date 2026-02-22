"use client";

import { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { ChatListItem } from "@/components/features/chat-list-item";
import { Input } from "@/components/ui/input";

export function ChatConversationListView() {
  const { conversations, activeConversationId, openChat } = useAppState();
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b-[3px] border-charcoal-900 shrink-0">
        <h2 className="text-headline-sm mb-3">Messages</h2>
        <Input
          variant="search"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-body-md text-charcoal-400 text-center py-12">
            No conversations found.
          </p>
        ) : (
          filtered.map((conv) => (
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
          ))
        )}
      </div>
    </div>
  );
}
