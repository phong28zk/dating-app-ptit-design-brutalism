"use client";

import { useAppState } from "@/lib/app-state-context";
import { MatchCard } from "@/components/features/match-card";
import { Avatar } from "@/components/ui/avatar";

export function MatchesGridView() {
  const { matches, conversations, openChat } = useAppState();

  const newMatches = matches.filter((m) => m.isNew);
  const oldMatches = matches.filter((m) => !m.isNew);

  const findConvId = (profileId: string) =>
    conversations.find((c) => c.profile.id === profileId)?.id ?? "c1";

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      {/* New matches horizontal scroll */}
      {newMatches.length > 0 && (
        <section>
          <h2 className="text-headline-sm mb-3">New Matches</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-1">
            {newMatches.map((m) => (
              <button
                key={m.id}
                onClick={() => openChat(findConvId(m.profile.id))}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div className="relative">
                  <Avatar
                    src={m.profile.photos[0]}
                    name={m.profile.name}
                    size="xl"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white" />
                </div>
                <span className="text-label-md text-charcoal-700">
                  {m.profile.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* All matches grid */}
      <section>
        <h2 className="text-headline-sm mb-3">Your Matches</h2>
        <div className="grid grid-cols-2 gap-3">
          {oldMatches.map((m) => (
            <MatchCard
              key={m.id}
              match={{
                name: m.profile.name,
                age: m.profile.age,
                photo: m.profile.photos[0],
                isNew: m.isNew,
              }}
              onClick={() => openChat(findConvId(m.profile.id))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
