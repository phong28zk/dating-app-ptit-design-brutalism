# Phase 03: Mobile Screens

## Context Links
- [Phase 02: Components](./phase-02-design-system-components.md)
- [Dating App UX Research](./research/research-design-system-foundations.md#dating-app-ux-patterns)

## Overview
- **Priority**: P1
- **Status**: pending
- **Effort**: 8h
- **Description**: Build 4 mobile screens using Phase 2 components. Mobile-first (375px-768px). Touch-optimized with swipe gestures.

## Key Insights
- Swipe card: use CSS transforms + touch events, not heavy animation lib
- Framer Motion for card stack physics (spring animations)
- Bottom nav persists across all screens, use layout route
- Chat screen has two sub-views: list and conversation

## Requirements

### Functional
- Discover: Card stack with swipe left/right/up + action bar
- Matches: Grid of matched profiles (2 columns)
- Chat: Conversation list + individual chat view
- Settings: Profile edit with collapsible sections
- Bottom nav with active state + badge counts

### Non-Functional
- 60fps swipe animations
- Lazy load images
- Skeleton loading states
- Touch gestures feel native (spring physics)

## Architecture

### Route Structure
```
src/app/
  (mobile)/                    # Route group for mobile layout
    layout.tsx                 # Bottom nav + safe area padding
    discover/
      page.tsx                 # Card stack + action bar
    matches/
      page.tsx                 # Match grid
    chat/
      page.tsx                 # Chat list
      [id]/
        page.tsx               # Chat conversation
    settings/
      page.tsx                 # Profile settings
```

### Screen Specifications

#### 1. Discover Screen (`discover/page.tsx`)
```
Layout:
  - Filter bar at top (location, age range)
  - Card stack (2-3 cards visible with depth offset)
  - Action bar fixed at bottom (above bottom nav)

Card Stack Behavior:
  - Top card: full size, interactive
  - Card behind: scaled 0.95, translated down 8px, opacity 0.7
  - Third card: scaled 0.9, translated down 16px, opacity 0.4
  - Swipe right → like animation (card flies right, heart pulse)
  - Swipe left → pass animation (card flies left, X fade)
  - Swipe up → super like (card flies up, star burst)
  - Tap card → expand to full profile detail

Profile Card Content:
  - Full-bleed photo (swipeable photo carousel within card)
  - Bottom gradient overlay with: Name, Age, Verified badge
  - Distance tag
  - "See more" hint arrow
```

#### 2. Matches Screen (`matches/page.tsx`)
```
Layout:
  - Section header "New Matches" with count badge
  - Horizontal scroll row of new (unread) matches (avatar circles)
  - Section header "Your Matches"
  - 2-column grid of match cards

Match Card:
  - Square aspect ratio, rounded-2xl
  - Photo fill + gradient bottom
  - Name overlay at bottom
  - Online dot indicator
  - Tap → navigate to chat
```

#### 3. Chat Screen (`chat/page.tsx` + `chat/[id]/page.tsx`)
```
Chat List:
  - Search bar at top
  - List of ChatListItems
  - Each item: avatar (online dot) + name + last message preview + timestamp
  - Unread indicator (bold text + count badge)
  - Tap → navigate to chat/[id]

Chat Conversation:
  - Header: back arrow + avatar + name + online status
  - Messages area (scrollable, grouped by date)
  - Sent: right-aligned, bg-rose-500, text-white, rounded-2xl (brutal shadow)
  - Received: left-aligned, bg-white, text-charcoal, rounded-2xl (brutal shadow)
  - ChatInputBar at bottom: text field + emoji + attach + send
  - "typing..." indicator
```

#### 4. Settings Screen (`settings/page.tsx`)
```
Layout:
  - Profile header: large avatar (editable) + name + age
  - Edit Profile button
  - Collapsible sections:
    1. About Me (bio textarea, prompts)
    2. My Basics (tags: height, exercise, education, etc.)
    3. Work & Education (job title, company, school)
    4. Preferences (age range, distance, gender)
    5. Account (email, phone, delete account)
  - Log Out button at bottom (destructive variant)
```

## Related Code Files

### Files to Create
- `src/app/(mobile)/layout.tsx`
- `src/app/(mobile)/discover/page.tsx`
- `src/app/(mobile)/matches/page.tsx`
- `src/app/(mobile)/chat/page.tsx`
- `src/app/(mobile)/chat/[id]/page.tsx`
- `src/app/(mobile)/settings/page.tsx`
- `src/components/features/card-stack.tsx` - Swipe card stack logic
- `src/components/features/swipeable-card.tsx` - Individual swipe card with gesture
- `src/components/features/photo-carousel.tsx` - Multi-photo swiper within card
- `src/components/features/collapsible-section.tsx` - Settings accordion
- `src/hooks/use-swipe-gesture.ts` - Touch/mouse swipe detection hook
- `src/data/mock-profiles.ts` - Mock profile data
- `src/data/mock-matches.ts` - Mock match data
- `src/data/mock-chats.ts` - Mock chat messages
- `src/lib/types.ts` - TypeScript interfaces (Profile, Match, Message, etc.)

### Dependencies to Install
```bash
npm install framer-motion
```

## Implementation Steps

1. **Create TypeScript types** (`src/lib/types.ts`)
   - `Profile`: id, name, age, photos[], bio, tags, location, verified, distance
   - `Match`: id, profile, matchedAt, lastMessage, unread
   - `Message`: id, senderId, text, timestamp, type (text/image/gif)
   - `ChatConversation`: id, match, messages[]

2. **Create mock data** files with 10+ realistic profiles, 5+ matches, 3+ conversations

3. **Create swipe gesture hook** (`use-swipe-gesture.ts`)
   - Track touch/mouse start, move, end
   - Calculate direction + velocity
   - Return: { swipeDirection, offset, isDragging, handlers }

4. **Build card stack** (`card-stack.tsx`)
   - Render 3 cards with depth transforms
   - Integrate swipe gesture hook
   - Animate card exit + next card promotion
   - Emit events: onLike, onPass, onSuperLike

5. **Build mobile layout** (`(mobile)/layout.tsx`)
   - BottomNav component
   - Safe area padding (env(safe-area-inset-bottom))
   - Route-aware active tab detection

6. **Build Discover screen** - Card stack + action bar + filter bar

7. **Build Matches screen** - Horizontal scroll + grid

8. **Build Chat screens** - List + conversation with auto-scroll

9. **Build Settings screen** - Collapsible sections + form inputs

10. **Test on mobile viewport** (375px width in devtools)

## Todo List
- [ ] Create TypeScript interfaces
- [ ] Create mock data (profiles, matches, chats)
- [ ] Install framer-motion
- [ ] Build useSwipeGesture hook
- [ ] Build CardStack component
- [ ] Build SwipeableCard component
- [ ] Build PhotoCarousel component
- [ ] Build CollapsibleSection component
- [ ] Create mobile layout with BottomNav
- [ ] Build Discover screen
- [ ] Build Matches screen
- [ ] Build Chat list screen
- [ ] Build Chat conversation screen
- [ ] Build Settings screen
- [ ] Test all screens at mobile viewport
- [ ] Verify swipe gestures work on touch

## Success Criteria
- All 4 tabs navigate correctly via bottom nav
- Card swipe feels smooth at 60fps
- Photo carousel within cards works
- Chat messages scroll correctly, input stays fixed
- Settings sections expand/collapse
- Active tab highlighted in bottom nav
- Badge counts show on Matches/Chat tabs

## Risk Assessment
- **Swipe performance**: Complex transforms on mobile. Mitigation: use CSS transforms (GPU-accelerated), avoid layout thrashing.
- **Touch event conflicts**: Swipe vs scroll vs carousel. Mitigation: directional lock - horizontal swipe = card action, vertical swipe = scroll.
- **Image loading**: Many photos. Mitigation: `next/image` with lazy loading + blur placeholder.

## Security Considerations
- Mock data only, no real user data
- Chat input: sanitize display (React handles XSS by default)

## Next Steps
- Phase 4: Desktop layout (can run in parallel)
- Phase 5: Wire mobile + desktop together as demo
