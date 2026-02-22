"use client";

import { useState } from "react";

// UI Primitives
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Toast } from "@/components/ui/toast";

// Layout
import { BottomNav } from "@/components/layout/bottom-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";

// Features
import { ActionBar } from "@/components/features/action-bar";
import { ProfileCard } from "@/components/features/profile-card";
import { MatchCard } from "@/components/features/match-card";
import { ChatListItem } from "@/components/features/chat-list-item";
import { ChatMessage } from "@/components/features/chat-message";
import { ChatInputBar } from "@/components/features/chat-input-bar";
import { ProfileTagGrid } from "@/components/features/profile-tag-grid";
import { ProfileHeader } from "@/components/features/profile-header";
import { FilterBar } from "@/components/features/filter-bar";

import { Heart, Star, Zap } from "lucide-react";

// --- Mock Data ---
const mockProfile = {
  name: "Linh Nguyen",
  age: 22,
  photos: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=533&fit=crop",
  ],
  verified: true,
  school: "PTIT University",
  distance: "2 km away",
};

const mockMatches = [
  { name: "Lan", age: 21, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", isNew: true },
  { name: "Mai", age: 23, photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop", isNew: false },
  { name: "Thu", age: 24, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", isNew: true },
  { name: "Hoa", age: 20, photo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop", isNew: false },
];

const mockConversations = [
  { id: "1", name: "Lan Anh", lastMessage: "Haha yeah that sounds fun!", time: "2m", unreadCount: 3 },
  { id: "2", name: "Mai Tran", lastMessage: "See you tomorrow!", time: "1h", unreadCount: 0 },
  { id: "3", name: "Thu Ha", lastMessage: "What's your favorite food?", time: "3h", unreadCount: 1 },
];

const mockTags = [
  { icon: "height", label: "Height", value: "165 cm" },
  { icon: "exercise", label: "Exercise", value: "Often" },
  { icon: "education", label: "Education", value: "Bachelor's" },
  { icon: "drinking", label: "Drinking", value: "Socially" },
  { icon: "smoking", label: "Smoking", value: "Never" },
  { icon: "looking for", label: "Looking for", value: "Relationship" },
  { icon: "star sign", label: "Star Sign", value: "Libra" },
];

const mockFilters = [
  { id: "nearby", label: "Nearby", active: true },
  { id: "new", label: "New", active: false },
  { id: "online", label: "Online Now", active: false },
  { id: "verified", label: "Verified", active: true },
  { id: "age-20s", label: "20s", active: false },
  { id: "university", label: "University", active: false },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-headline-sm mb-6 pb-2 border-b-[3px] border-charcoal-900">{title}</h2>
      {children}
    </section>
  );
}

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<"discover" | "matches" | "chat" | "settings">("discover");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeConv, setActiveConv] = useState("1");
  const [filters, setFilters] = useState(mockFilters);
  const [messages, setMessages] = useState([
    { content: "Hey! I saw you like coffee too ☕", time: "10:30", isSent: false },
    { content: "Yes! Do you know any good spots nearby?", time: "10:31", isSent: true },
    { content: "There's a great place on Le Loi street!", time: "10:32", isSent: false },
  ]);

  const toggleFilter = (id: string) => {
    setFilters((prev) => prev.map((f) => f.id === id ? { ...f, active: !f.active } : f));
  };

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { content: msg, time: "Now", isSent: true }]);
  };

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto pb-32 md:pb-10">
      <div className="mb-12">
        <h1 className="text-display-sm mb-2">Soft Brutalism</h1>
        <p className="text-body-lg text-charcoal-500">Component Showcase — PTIT Dating App</p>
      </div>

      {/* 1. Button */}
      <Section title="1. Button">
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Section>

      {/* 2. IconButton */}
      <Section title="2. IconButton">
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton variant="default" size="sm"><Heart className="w-4 h-4" /></IconButton>
          <IconButton variant="like" size="md"><Heart className="w-5 h-5" fill="white" /></IconButton>
          <IconButton variant="reject" size="md"><Star className="w-5 h-5" /></IconButton>
          <IconButton variant="superlike" size="md"><Star className="w-5 h-5" fill="currentColor" /></IconButton>
          <IconButton variant="rewind" size="md"><Zap className="w-5 h-5" /></IconButton>
          <IconButton variant="chat" size="lg"><Heart className="w-7 h-7" /></IconButton>
        </div>
      </Section>

      {/* 3. Avatar */}
      <Section title="3. Avatar">
        <div className="flex flex-wrap gap-6 items-end">
          <Avatar size="sm" name="Linh Nguyen" />
          <Avatar size="md" name="Mai Tran" online />
          <Avatar size="lg" name="Thu Ha" verified />
          <Avatar size="xl" name="Hoa Le" online verified />
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
            alt="Profile"
            online
          />
        </div>
      </Section>

      {/* 4. Badge */}
      <Section title="4. Badge">
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default Tag</Badge>
          <Badge variant="active">Active Tag</Badge>
          <Badge variant="outline">Outline Tag</Badge>
          <Badge variant="default" icon={Heart}>With Icon</Badge>
          <Badge variant="active" icon={Star}>Verified</Badge>
        </div>
      </Section>

      {/* 5. Card */}
      <Section title="5. Card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4"><p className="text-body-md">Default card with content inside.</p></Card>
          <Card variant="elevated" className="p-4"><p className="text-body-md">Elevated card with larger shadow.</p></Card>
          <Card variant="interactive" className="p-4"><p className="text-body-md">Interactive card — hover me!</p></Card>
        </div>
      </Section>

      {/* 6. Input */}
      <Section title="6. Input">
        <div className="flex flex-col gap-4 max-w-md">
          <Input placeholder="Default input..." />
          <Input variant="search" placeholder="Search profiles..." />
        </div>
      </Section>

      {/* 7. Dialog */}
      <Section title="7. Dialog">
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="It's a Match!">
          <p className="text-body-md text-charcoal-700 mb-4">
            You and Linh both liked each other. Start a conversation!
          </p>
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1" onClick={() => setDialogOpen(false)}>Send Message</Button>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Later</Button>
          </div>
        </Dialog>
      </Section>

      {/* 8. Toast */}
      <Section title="8. Toast">
        <Button onClick={() => setShowToast(true)}>Show Toast</Button>
        {showToast && (
          <Toast
            message="You have a new match! Check it out."
            variant="success"
            onDismiss={() => setShowToast(false)}
          />
        )}
      </Section>

      {/* 9. BottomNav */}
      <Section title="9. BottomNav (visible on mobile)">
        <div className="relative h-24 bg-blush-100 rounded-xl brutal-border overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <div className="relative">
              <BottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                matchCount={5}
                chatCount={12}
              />
            </div>
          </div>
          <p className="text-label-sm text-charcoal-500 p-3">Active: {activeTab}</p>
        </div>
      </Section>

      {/* 10. SidebarNav */}
      <Section title="10. SidebarNav (visible on desktop md+)">
        <div className="h-80 rounded-xl brutal-border overflow-hidden">
          <SidebarNav
            user={{ name: "Minh Tuan" }}
            conversations={mockConversations}
            activeConversationId={activeConv}
            onConversationClick={setActiveConv}
          />
        </div>
      </Section>

      {/* 11. ThreeColumnLayout - referenced in description only, shown as static demo */}
      <Section title="11. ThreeColumnLayout">
        <div className="brutal-border rounded-xl overflow-hidden h-32 flex text-label-sm text-charcoal-500">
          <div className="w-36 border-r-[3px] border-charcoal-900 p-3 bg-white hidden md:block">Sidebar (288px)</div>
          <div className="flex-1 p-3 bg-blush-50">Main (1fr)</div>
          <div className="w-32 border-l-[3px] border-charcoal-900 p-3 bg-white hidden lg:block">Detail (320px)</div>
        </div>
      </Section>

      {/* 12. ActionBar */}
      <Section title="12. ActionBar">
        <div className="flex justify-center py-4 bg-gradient-to-b from-rose-400 to-wine-500 rounded-xl">
          <ActionBar
            onRewind={() => alert("rewind")}
            onReject={() => alert("reject")}
            onLike={() => alert("like")}
            onSuperLike={() => alert("superlike")}
            onChat={() => alert("chat")}
          />
        </div>
      </Section>

      {/* 13. ProfileCard */}
      <Section title="13. ProfileCard">
        <div className="max-w-xs">
          <ProfileCard profile={mockProfile} currentPhotoIndex={0} />
        </div>
      </Section>

      {/* 14. MatchCard */}
      <Section title="14. MatchCard">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg">
          {mockMatches.map((m) => (
            <MatchCard key={m.name} match={m} onClick={() => alert(`Clicked ${m.name}`)} />
          ))}
        </div>
      </Section>

      {/* 15. ChatListItem */}
      <Section title="15. ChatListItem">
        <div className="brutal-border rounded-xl overflow-hidden max-w-md">
          {mockConversations.map((c) => (
            <ChatListItem
              key={c.id}
              name={c.name}
              lastMessage={c.lastMessage}
              time={c.time}
              unreadCount={c.unreadCount}
              isActive={c.id === activeConv}
              onClick={() => setActiveConv(c.id)}
            />
          ))}
        </div>
      </Section>

      {/* 16. ChatMessage */}
      <Section title="16. ChatMessage">
        <div className="flex flex-col gap-3 max-w-sm bg-blush-50 p-4 rounded-xl brutal-border">
          {messages.map((msg, i) => (
            <ChatMessage key={i} content={msg.content} time={msg.time} isSent={msg.isSent} />
          ))}
        </div>
      </Section>

      {/* 17. ChatInputBar */}
      <Section title="17. ChatInputBar">
        <div className="brutal-border rounded-xl overflow-hidden max-w-md">
          <ChatInputBar onSend={handleSend} placeholder="Type a message..." />
        </div>
      </Section>

      {/* 18. ProfileTagGrid */}
      <Section title="18. ProfileTagGrid">
        <ProfileTagGrid tags={mockTags} />
      </Section>

      {/* 19. ProfileHeader */}
      <Section title="19. ProfileHeader">
        <ProfileHeader
          name="Linh Nguyen"
          age={22}
          verified
          school="PTIT University — Computer Science"
          location="Hanoi, Vietnam · 2 km away"
        />
      </Section>

      {/* 20. FilterBar */}
      <Section title="20. FilterBar">
        <FilterBar filters={filters} onToggle={toggleFilter} />
      </Section>
    </main>
  );
}
