"use client";

import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { ChatMessage } from "@/components/features/chat-message";
import { ChatInputBar } from "@/components/features/chat-input-bar";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Message } from "@/lib/dating-app-types";

let msgCounter = 100;

export function ChatActiveConversationView() {
  const { conversations, activeConversationId, setActiveView } = useAppState();
  const conv = conversations.find((c) => c.id === activeConversationId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>(conv?.messages ?? []);

  // Sync when conversation changes
  useEffect(() => {
    if (conv) setLocalMessages(conv.messages);
  }, [activeConversationId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSend = (content: string) => {
    const msg: Message = {
      id: `m${++msgCounter}`,
      content,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      type: "text",
    };
    setLocalMessages((prev) => [...prev, msg]);
  };

  if (!conv) {
    return (
      <div className="flex items-center justify-center h-full text-charcoal-400 text-body-md">
        Select a conversation to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b-[3px] border-charcoal-900 bg-white shrink-0">
        <button
          onClick={() => setActiveView("chat")}
          className="md:hidden p-1.5 rounded-lg hover:bg-blush-50 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Avatar src={conv.avatar} name={conv.name} size="sm" online={conv.online} />
        <div className="flex-1 min-w-0">
          <p className="text-title-md font-semibold truncate">{conv.name}</p>
          <p className="text-label-sm text-charcoal-500">
            {conv.online ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 bg-blush-50">
        {localMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={msg.content}
            time={msg.time}
            isSent={msg.isSent}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t-[3px] border-charcoal-900">
        <ChatInputBar onSend={handleSend} placeholder={`Message ${conv.name}...`} />
      </div>
    </div>
  );
}
