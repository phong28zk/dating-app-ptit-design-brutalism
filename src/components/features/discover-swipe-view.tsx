"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useAppState } from "@/lib/app-state-context";
import { ProfileCard } from "@/components/features/profile-card";
import { ActionBar } from "@/components/features/action-bar";
import { FilterBar } from "@/components/features/filter-bar";
import { Heart, RotateCcw } from "lucide-react";

const INITIAL_FILTERS = [
  { id: "nearby", label: "Nearby", active: true },
  { id: "online", label: "Online Now", active: false },
  { id: "verified", label: "Verified", active: true },
  { id: "university", label: "University", active: false },
];

const SWIPE_THRESHOLD = 100;

export function DiscoverSwipeView() {
  const { profiles, currentProfileIndex, likeProfile, passProfile, superLikeProfile, nextProfile } = useAppState();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [direction, setDirection] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-20, 20]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, -20], [1, 0]);

  const toggleFilter = useCallback((id: string) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f)));
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x > SWIPE_THRESHOLD) {
        setDirection(1);
        likeProfile();
        setPhotoIndex(0);
      } else if (info.offset.x < -SWIPE_THRESHOLD) {
        setDirection(-1);
        passProfile();
        setPhotoIndex(0);
      }
    },
    [likeProfile, passProfile]
  );

  const handleLike = useCallback(() => { setDirection(1); likeProfile(); setPhotoIndex(0); }, [likeProfile]);
  const handlePass = useCallback(() => { setDirection(-1); passProfile(); setPhotoIndex(0); }, [passProfile]);
  const handleSuper = useCallback(() => { setDirection(1); superLikeProfile(); setPhotoIndex(0); }, [superLikeProfile]);
  const handleRewind = useCallback(() => { setDirection(0); nextProfile(); setPhotoIndex(0); }, [nextProfile]);

  const remaining = profiles.slice(currentProfileIndex);
  const current = remaining[0];
  const behind = remaining[1];

  return (
    <div className="flex flex-col h-full">
      {/* Filter bar */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <FilterBar filters={filters} onToggle={toggleFilter} />
      </div>

      {/* Card stack */}
      <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
        {!current ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-blush-100 brutal-border flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <p className="text-headline-sm">You&apos;ve seen everyone!</p>
            <p className="text-body-md text-charcoal-500">Check back later for new profiles.</p>
          </div>
        ) : (
          <div className="relative w-full max-w-sm mx-auto" style={{ height: "min(70vh, 520px)" }}>
            {/* Card behind */}
            {behind && (
              <div
                className="absolute inset-0 scale-95 opacity-70"
                style={{ zIndex: 1 }}
              >
                <ProfileCard
                  profile={behind}
                  currentPhotoIndex={0}
                  className="h-full"
                />
              </div>
            )}

            {/* Top card — draggable */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute inset-0"
                style={{ x, rotate, zIndex: 2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                exit={{ x: direction * 600, rotate: direction * 20, opacity: 0, transition: { duration: 0.3 } }}
              >
                {/* Like indicator */}
                <motion.div
                  className="absolute top-6 left-6 z-10 px-3 py-1 rounded-lg bg-like border-[3px] border-white rotate-[-15deg]"
                  style={{ opacity: likeOpacity }}
                >
                  <span className="text-label-lg text-white font-black tracking-wider">LIKE</span>
                </motion.div>

                {/* Pass indicator */}
                <motion.div
                  className="absolute top-6 right-6 z-10 px-3 py-1 rounded-lg bg-reject border-[3px] border-white rotate-[15deg]"
                  style={{ opacity: passOpacity }}
                >
                  <span className="text-label-lg text-white font-black tracking-wider">NOPE</span>
                </motion.div>

                <ProfileCard
                  profile={current}
                  currentPhotoIndex={photoIndex}
                  className="h-full cursor-grab active:cursor-grabbing"
                />

                {/* Photo tap zones */}
                <div className="absolute inset-0 flex" style={{ zIndex: 5 }}>
                  <div className="flex-1 h-full" onClick={() => setPhotoIndex((i) => Math.max(0, i - 1))} />
                  <div className="flex-1 h-full" onClick={() => setPhotoIndex((i) => Math.min(current.photos.length - 1, i + 1))} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Action bar */}
      {current && (
        <div className="shrink-0 flex justify-center py-4 pb-6">
          <ActionBar
            onRewind={handleRewind}
            onReject={handlePass}
            onLike={handleLike}
            onSuperLike={handleSuper}
            onChat={() => {}}
          />
        </div>
      )}

      {!current && (
        <div className="shrink-0 flex justify-center py-4 pb-6">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 rounded-full brutal-border bg-white text-body-md hover:bg-blush-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
