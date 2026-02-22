"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useAppState } from "@/lib/app-state-context";
import { ProfileHeader } from "@/components/features/profile-header";
import { ProfileTagGrid } from "@/components/features/profile-tag-grid";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function RightPanelContent() {
  const { activeView, activeConversationId, profiles, currentProfileIndex, conversations, openChat } = useAppState();

  if (activeView === "settings") {
    return (
      <div className="flex items-center justify-center h-full text-charcoal-400 text-body-md p-6 text-center">
        Adjust your preferences in the settings panel.
      </div>
    );
  }

  // if (activeView === "chat" && activeConversationId) {
  //   const conv = conversations.find((c) => c.id === activeConversationId);
  //   if (!conv) return null;
  //   const { profile } = conv;
  //   return (
  //     <div className="flex flex-col h-full p-4 gap-4">
  //       <p className="text-label-lg text-charcoal-500 uppercase tracking-wider shrink-0">Chat Partner</p>
  //       <div className="flex flex-col items-center gap-3 py-4">
  //         <Avatar src={profile.photos[0]} name={profile.name} size="xl" online={conv.online} />
  //         <ProfileHeader name={profile.name} age={profile.age} verified={profile.verified} school={profile.school} location={profile.distance} />
  //       </div>
  //       <p className="text-body-sm text-charcoal-600 leading-relaxed">{profile.bio}</p>
  //       <ProfileTagGrid tags={profile.tags.slice(0, 4)} />
  //     </div>
  //   );
  // }

  // discover view — show current profile detail
  const profile = profiles[currentProfileIndex];
  const [photoIdx, setPhotoIdx] = useState(0);

  // Reset photo index when profile changes
  useEffect(() => { setPhotoIdx(0); }, [currentProfileIndex]);

  if (!profile) return null;

  const linkedConv = conversations.find((c) => c.profile.id === profile.id);

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto">
      <p className="text-label-lg text-charcoal-500 uppercase tracking-wider shrink-0">Profile Details</p>

      {/* Photo carousel with tap zones + dot indicators */}
      <div className="relative w-full aspect-[3/4] rounded-xl brutal-border overflow-hidden">
        <Image
          src={profile.photos[photoIdx] ?? profile.photos[0]}
          alt={`${profile.name} photo ${photoIdx + 1}`}
          fill
          className="object-cover"
          sizes="320px"
        />

        {/* Dot indicators */}
        {profile.photos.length > 1 && (
          <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 px-4 z-10">
            {profile.photos.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === photoIdx ? "bg-white flex-[2]" : "bg-white/50 flex-1"
                )}
              />
            ))}
          </div>
        )}

        {/* Tap zones: left = prev, right = next */}
        {profile.photos.length > 1 && (
          <div className="absolute inset-0 flex z-20">
            <button
              className="flex-1 h-full cursor-pointer"
              aria-label="Previous photo"
              onClick={() => setPhotoIdx((i) => Math.max(0, i - 1))}
            />
            <button
              className="flex-1 h-full cursor-pointer"
              aria-label="Next photo"
              onClick={() => setPhotoIdx((i) => Math.min(profile.photos.length - 1, i + 1))}
            />
          </div>
        )}
      </div>

      <ProfileHeader
        name={profile.name}
        age={profile.age}
        verified={profile.verified}
        school={profile.school}
        location={profile.distance}
      />
      <p className="text-body-sm text-charcoal-600 leading-relaxed">{profile.bio}</p>
      <ProfileTagGrid tags={profile.tags} />
      {linkedConv && (
        <Button variant="secondary" onClick={() => openChat(linkedConv.id)} className="mt-auto">
          Open Chat
        </Button>
      )}
    </div>
  );
}
