"use client";

import { cn } from "@/lib/cn";
import { Compass, Heart, MessageCircle, Settings } from "lucide-react";

type Tab = "discover" | "matches" | "chat" | "settings";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  matchCount?: number;
  chatCount?: number;
}

const tabs = [
  { id: "discover" as Tab, label: "Discover", Icon: Compass },
  { id: "matches" as Tab, label: "Matches", Icon: Heart },
  { id: "chat" as Tab, label: "Chat", Icon: MessageCircle },
  { id: "settings" as Tab, label: "Settings", Icon: Settings },
];

export function BottomNav({ activeTab, onTabChange, matchCount, chatCount }: BottomNavProps) {
  const badgeCounts: Partial<Record<Tab, number | undefined>> = {
    matches: matchCount,
    chat: chatCount,
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t-[3px] border-charcoal-900 rounded-t-2xl z-30 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const count = badgeCounts[id];
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "relative flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl transition-colors",
                isActive ? "text-rose-500" : "text-charcoal-500"
              )}
            >
              <div className="relative">
                <Icon
                  className="w-6 h-6"
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 0 : 2}
                />
                {count !== undefined && count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </div>
              <span className="text-label-sm">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
