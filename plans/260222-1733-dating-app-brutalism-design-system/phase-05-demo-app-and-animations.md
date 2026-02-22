# Phase 05: Demo App & Animations

## Context Links
- [Phase 03: Mobile](./phase-03-mobile-screens.md)
- [Phase 04: Desktop](./phase-04-desktop-layout.md)

## Overview
- **Priority**: P2
- **Status**: pending
- **Effort**: 4h
- **Description**: Wire all screens into cohesive interactive demo. Add polish animations, page transitions, micro-interactions. Create rich mock data for realistic feel.

## Key Insights
- Demo should be self-contained (no backend needed)
- State management: React context + useState for demo (no Redux/Zustand needed)
- Animations: Framer Motion for page transitions, CSS for micro-interactions
- Mock data should feel real: diverse names, bios, realistic photos (placeholder URLs)

## Requirements

### Functional
- Navigate between all screens (mobile + desktop)
- Swipe cards cycle through mock profiles
- Like/pass triggers match notification
- Tap match → opens chat with pre-populated messages
- Settings form is interactive (inputs work, sections expand)
- Responsive: seamlessly switch between mobile ↔ desktop

### Non-Functional
- No external API calls
- Client-side state only
- Page transitions < 300ms
- Swipe animation spring physics feel natural
- Demo loads in < 2s on fast 3G

## Architecture

### State Management
```
AppContext {
  profiles: Profile[]         # Available profiles to swipe
  currentIndex: number        # Current card in stack
  matches: Match[]            # Liked profiles that "matched"
  conversations: Chat[]       # Chat threads
  activeView: 'discover' | 'chat' | 'settings'
  selectedChat: string | null # Active chat ID

  actions:
    swipeRight(profileId)     # Like → add to matches, advance card
    swipeLeft(profileId)      # Pass → advance card
    superLike(profileId)      # Super like → add with badge, advance
    sendMessage(chatId, text) # Add message to conversation
    setActiveView(view)       # Navigate
}
```

### Animation Specs

#### Card Swipe
```
Exit right (like):   x: 150%, rotate: 15deg, opacity: 0, duration: 400ms, spring
Exit left (pass):    x: -150%, rotate: -15deg, opacity: 0, duration: 400ms, spring
Exit up (super):     y: -150%, scale: 0.8, opacity: 0, duration: 400ms, spring
Enter (next card):   scale: 0.95 → 1.0, y: 8 → 0, opacity: 0.7 → 1.0, duration: 300ms
```

#### Page Transitions
```
Enter: opacity 0→1, y: 20→0, duration: 200ms, ease-out
Exit:  opacity 1→0, y: 0→-10, duration: 150ms, ease-in
```

#### Micro-interactions
```
Button press:   scale 1→0.95→1, duration: 150ms
Like pulse:     heart icon scale 1→1.3→1, color flash, duration: 400ms
Match popup:    scale 0→1.1→1, confetti particles, duration: 600ms
Badge count:    scale 0→1.2→1 (spring), duration: 300ms
Online dot:     pulse animation (opacity 0.5→1→0.5), infinite, 2s
Typing dots:    3 dots bouncing with stagger, infinite
```

## Related Code Files

### Files to Create
- `src/context/app-context.tsx` - Global demo state
- `src/context/app-provider.tsx` - Context provider wrapper
- `src/data/mock-profiles.ts` - 15+ detailed mock profiles
- `src/data/mock-matches.ts` - 8+ mock matches
- `src/data/mock-chats.ts` - 5+ conversations with 10+ messages each
- `src/data/mock-photos.ts` - Placeholder photo URLs
- `src/components/features/match-notification.tsx` - "It's a Match!" popup
- `src/components/features/typing-indicator.tsx` - Animated typing dots
- `src/components/features/confetti.tsx` - Confetti particles for match
- `src/components/animations/page-transition.tsx` - Framer Motion page wrapper
- `src/components/animations/fade-in.tsx` - Reusable fade-in wrapper

### Files to Modify
- `src/app/layout.tsx` - Wrap with AppProvider
- `src/app/(mobile)/discover/page.tsx` - Connect to context
- `src/app/(mobile)/matches/page.tsx` - Connect to context
- `src/app/(mobile)/chat/page.tsx` - Connect to context
- `src/app/(mobile)/chat/[id]/page.tsx` - Connect to context
- All feature components - Wire to context actions

## Implementation Steps

1. **Create mock data files**
   - 15 profiles with diverse names, ages (22-35), bios, tags
   - Use `https://i.pravatar.cc/400?img=N` for avatar placeholders
   - 8 matches with varying timestamps
   - 5 conversations with realistic message threads

2. **Build AppContext + AppProvider**
   - Initialize with mock data
   - Implement swipe/like/pass/message actions
   - Like action: 70% chance of "match" (for demo purposes)
   - Match triggers notification popup

3. **Add card swipe animations**
   - Framer Motion `AnimatePresence` for card exit/enter
   - Spring physics: `type: "spring", stiffness: 300, damping: 30`
   - Gesture: `drag: "x"`, threshold 100px for commit

4. **Add page transition wrapper**
   - Framer Motion `motion.div` with fade + slide
   - Wrap each page content

5. **Build match notification popup**
   - Full-screen overlay
   - Both profile photos side-by-side
   - "It's a Match!" headline (display-md)
   - "Send Message" + "Keep Swiping" buttons
   - Confetti animation behind

6. **Add micro-interactions to all components**
   - Button scale on press
   - Icon button hover scale
   - Badge count spring entrance
   - Online dot pulse
   - Typing indicator bounce

7. **Wire everything together**
   - Discover: swipe → context update → match check → notification
   - Matches: click → navigate to chat
   - Chat: type → send → appear in list
   - Settings: form state (local, not persisted)

8. **Test full user journey**
   - Open app → discover → swipe right → match notification → send message → chat → settings → back

## Todo List
- [ ] Create comprehensive mock data (profiles, matches, chats)
- [ ] Build AppContext with all actions
- [ ] Build AppProvider wrapper
- [ ] Add Framer Motion card swipe animations
- [ ] Build page transition component
- [ ] Build match notification popup
- [ ] Build confetti animation
- [ ] Build typing indicator
- [ ] Add micro-interactions to buttons/icons
- [ ] Wire discover screen to context
- [ ] Wire matches screen to context
- [ ] Wire chat screens to context
- [ ] Test full user journey flow
- [ ] Test responsive switching
- [ ] Performance check (60fps animations)

## Success Criteria
- Complete user journey works: discover → match → chat
- Card swipe feels natural with spring physics
- Match notification shows with confetti
- Chat messages appear in real-time (local)
- All animations run at 60fps
- No JS errors in console
- Works at mobile (375px) and desktop (1280px)

## Risk Assessment
- **Animation performance**: Too many animations can lag. Mitigation: use CSS transforms only, avoid layout-triggering properties, test on throttled CPU.
- **State complexity**: Context re-renders. Mitigation: split context (profiles, chats, ui) or use `useMemo`/`useCallback` to prevent unnecessary renders.
- **Mock data size**: Too many images slow load. Mitigation: use small placeholder images, lazy load.

## Security Considerations
- Mock data only, no PII
- No network calls

## Next Steps
- Phase 6: Export to Figma via MCP
