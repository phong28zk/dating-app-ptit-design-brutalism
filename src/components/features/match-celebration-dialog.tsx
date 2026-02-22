"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchCelebrationDialogProps {
  open: boolean;
  userPhoto: string;
  matchName: string;
  matchPhoto: string;
  onSendMessage: () => void;
  onKeepSwiping: () => void;
}

/** Confetti particle config */
const CONFETTI_COLORS = ["#E8446A", "#F5A623", "#5B1A3A", "#FF8FA3", "#FFD700"];
const CONFETTI_COUNT = 24;

function ConfettiParticle({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = `${Math.random() * 100}%`;
  const delay = Math.random() * 0.4;
  const size = 6 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{ left, top: "40%", width: size, height: size, backgroundColor: color }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -(150 + Math.random() * 200), 400],
        x: [-40 + Math.random() * 80, -60 + Math.random() * 120],
        opacity: [1, 1, 0],
        rotate: [rotation, rotation + 360 + Math.random() * 360],
        scale: [1, 1.2, 0.5],
      }}
      transition={{ duration: 1.8 + Math.random() * 0.6, delay, ease: "easeOut" }}
    />
  );
}

export function MatchCelebrationDialog({
  open,
  userPhoto,
  matchName,
  matchPhoto,
  onSendMessage,
  onKeepSwiping,
}: MatchCelebrationDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-wine-900/80 backdrop-blur-md" />

          {/* Confetti layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>

          {/* Dialog content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 text-center max-w-xs"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
          >
            {/* Heart icon pulse */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heart className="w-12 h-12 text-rose-400 fill-rose-400 drop-shadow-lg" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-display-md text-white font-black tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              It&apos;s a Match!
            </motion.h2>

            <p className="text-body-md text-white/70">
              You and {matchName} liked each other
            </p>

            {/* Photos side by side */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* User photo */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-white shadow-brutal-md">
                <Image src={userPhoto} alt="You" fill className="object-cover" sizes="96px" />
              </div>

              {/* Heart connector */}
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400 shrink-0" />

              {/* Match photo */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-white shadow-brutal-md">
                <Image src={matchPhoto} alt={matchName} fill className="object-cover" sizes="96px" />
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col gap-3 w-full mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button size="lg" className="w-full" onClick={onSendMessage}>
                Send Message
              </Button>
              <Button variant="ghost" className="w-full text-white/80" onClick={onKeepSwiping}>
                Keep Swiping
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
