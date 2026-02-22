import { Match } from "@/lib/dating-app-types";
import { mockProfiles } from "./mock-profiles";

export const mockMatches: Match[] = [
  { id: "mt1", profile: mockProfiles[0], matchedAt: "2 min ago", isNew: true },
  { id: "mt2", profile: mockProfiles[1], matchedAt: "1 hour ago", isNew: true },
  { id: "mt3", profile: mockProfiles[2], matchedAt: "3 hours ago", isNew: true },
  { id: "mt4", profile: mockProfiles[3], matchedAt: "Yesterday", isNew: false },
  { id: "mt5", profile: mockProfiles[4], matchedAt: "2 days ago", isNew: false },
  { id: "mt6", profile: mockProfiles[5], matchedAt: "3 days ago", isNew: false },
  { id: "mt7", profile: mockProfiles[6], matchedAt: "1 week ago", isNew: false },
  { id: "mt8", profile: mockProfiles[7], matchedAt: "1 week ago", isNew: false },
];
