"use client";

import { useAppState, USER_PHOTO } from "@/lib/app-state-context";
import { LeftSidebarContent } from "@/components/layout/left-sidebar-content";
import { RightPanelContent } from "@/components/layout/right-panel-content";
import { BottomNav } from "@/components/layout/bottom-nav";
import { DiscoverSwipeView } from "@/components/features/discover-swipe-view";
import { MatchesGridView } from "@/components/features/matches-grid-view";
import { ChatConversationListView } from "@/components/features/chat-conversation-list-view";
import { ChatActiveConversationView } from "@/components/features/chat-active-conversation-view";
import { ProfileSettingsView } from "@/components/features/profile-settings-view";
import { MatchCelebrationDialog } from "@/components/features/match-celebration-dialog";

function MainContent() {
  const { activeView, activeConversationId } = useAppState();

  if (activeView === "discover") return <DiscoverSwipeView />;
  if (activeView === "matches") return <MatchesGridView />;
  if (activeView === "settings") return <ProfileSettingsView />;

  // chat view: mobile shows conversation or list; desktop shows active conversation in center
  if (activeView === "chat") {
    return (
      <>
        {/* Mobile: show active conversation if selected, else list */}
        <div className="md:hidden h-full">
          {activeConversationId
            ? <ChatActiveConversationView />
            : <ChatConversationListView />}
        </div>
        {/* Desktop: active conversation in center (list is in left sidebar) */}
        <div className="hidden md:block h-full">
          <ChatActiveConversationView />
        </div>
      </>
    );
  }

  return null;
}

export function ResponsiveAppShell() {
  const { activeView, activeConversationId, conversations, setActiveView, matchNotification, dismissMatch, openChat } = useAppState();

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const newMatchCount = 3; // from mock matches

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_320px]">
      {/* Left sidebar — hidden on mobile */}
      <aside className="hidden md:flex flex-col border-r-[3px] border-charcoal-900 h-screen overflow-hidden">
        <LeftSidebarContent />
      </aside>

      {/* Main center panel */}
      <main className="h-screen overflow-y-auto pb-20 md:pb-0 flex flex-col">
        <MainContent />
      </main>

      {/* Right detail panel — desktop only (always shows profile/details) */}
      <aside className="hidden lg:flex flex-col border-l-[3px] border-charcoal-900 h-screen overflow-y-auto bg-white">
        <RightPanelContent />
      </aside>

      {/* Bottom nav — mobile only */}
      <div className="md:hidden">
        <BottomNav
          activeTab={activeView}
          onTabChange={setActiveView}
          matchCount={newMatchCount}
          chatCount={totalUnread}
        />
      </div>

      {/* Match celebration overlay */}
      <MatchCelebrationDialog
        open={!!matchNotification}
        userPhoto={USER_PHOTO}
        matchName={matchNotification?.matchedProfile.name ?? ""}
        matchPhoto={matchNotification?.matchedProfile.photos[0] ?? ""}
        onSendMessage={() => {
          if (matchNotification) {
            openChat(matchNotification.conversationId);
          }
          dismissMatch();
        }}
        onKeepSwiping={dismissMatch}
      />
    </div>
  );
}
