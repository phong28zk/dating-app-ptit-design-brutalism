"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Profile, Match, Conversation } from "@/lib/dating-app-types";
import { mockProfiles } from "@/data/mock-profiles";
import { mockMatches } from "@/data/mock-matches";
import { mockConversations } from "@/data/mock-conversations";

type ActiveView = "discover" | "matches" | "chat" | "settings";

/** Match notification shown in the celebration dialog */
interface MatchNotification {
  matchedProfile: Profile;
  conversationId: string;
}

interface AppState {
  activeView: ActiveView;
  activeConversationId: string | null;
  currentProfileIndex: number;
  profiles: Profile[];
  matches: Match[];
  conversations: Conversation[];
  matchNotification: MatchNotification | null;
}

interface AppActions {
  setActiveView: (view: ActiveView) => void;
  openChat: (id: string) => void;
  nextProfile: () => void;
  likeProfile: () => void;
  passProfile: () => void;
  superLikeProfile: () => void;
  dismissMatch: () => void;
}

const AppContext = createContext<(AppState & AppActions) | null>(null);

/** "You" placeholder photo for the match dialog */
const USER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop";

/** 70% chance a "like" results in a match (for demo purposes) */
const MATCH_PROBABILITY = 0.7;

let matchIdCounter = 100;

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ActiveView>("discover");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles] = useState<Profile[]>(mockProfiles);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [matchNotification, setMatchNotification] = useState<MatchNotification | null>(null);

  const openChat = useCallback((id: string) => {
    setActiveConversationId(id);
    setActiveView("chat");
  }, []);

  const nextProfile = useCallback(() => {
    setCurrentProfileIndex((i) => Math.min(i + 1, profiles.length - 1));
  }, [profiles.length]);

  /** Try to create a match from the current profile */
  const tryMatch = useCallback((profile: Profile) => {
    if (Math.random() > MATCH_PROBABILITY) return;

    const newMatchId = `match-${++matchIdCounter}`;
    const newConvId = `conv-${matchIdCounter}`;

    // Add to matches list
    const newMatch: Match = {
      id: newMatchId,
      profile,
      matchedAt: "Just now",
      isNew: true,
    };
    setMatches((prev) => [newMatch, ...prev]);

    // Create empty conversation for the new match
    const newConv: Conversation = {
      id: newConvId,
      name: profile.name,
      avatar: profile.photos[0],
      lastMessage: "You matched! Say hi 👋",
      time: "now",
      unreadCount: 0,
      online: Math.random() > 0.5,
      messages: [],
      profile,
    };
    setConversations((prev) => [newConv, ...prev]);

    // Show match celebration
    setMatchNotification({ matchedProfile: profile, conversationId: newConvId });
  }, []);

  const likeProfile = useCallback(() => {
    const profile = profiles[currentProfileIndex];
    nextProfile();
    if (profile) tryMatch(profile);
  }, [profiles, currentProfileIndex, nextProfile, tryMatch]);

  const passProfile = useCallback(() => nextProfile(), [nextProfile]);

  const superLikeProfile = useCallback(() => {
    const profile = profiles[currentProfileIndex];
    nextProfile();
    // Super-like always matches
    if (profile) {
      const newMatchId = `match-${++matchIdCounter}`;
      const newConvId = `conv-${matchIdCounter}`;
      setMatches((prev) => [{ id: newMatchId, profile, matchedAt: "Just now", isNew: true }, ...prev]);
      setConversations((prev) => [{
        id: newConvId, name: profile.name, avatar: profile.photos[0],
        lastMessage: "Super Liked! Say hi 👋", time: "now", unreadCount: 0,
        online: true, messages: [], profile,
      }, ...prev]);
      setMatchNotification({ matchedProfile: profile, conversationId: newConvId });
    }
  }, [profiles, currentProfileIndex, nextProfile]);

  const dismissMatch = useCallback(() => setMatchNotification(null), []);

  return (
    <AppContext.Provider
      value={{
        activeView,
        activeConversationId,
        currentProfileIndex,
        profiles,
        matches,
        conversations,
        matchNotification,
        setActiveView,
        openChat,
        nextProfile,
        likeProfile,
        passProfile,
        superLikeProfile,
        dismissMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/** Placeholder photo for "you" in match dialog */
export { USER_PHOTO };

export function useAppState(): AppState & AppActions {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
