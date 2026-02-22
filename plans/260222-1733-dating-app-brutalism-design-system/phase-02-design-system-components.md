# Phase 02: Design System Components

## Context Links
- [Phase 01: Bootstrap & Tokens](./phase-01-project-bootstrap-and-design-tokens.md)
- [Research: Design System Foundations](./research/research-design-system-foundations.md)
- [NN/G Neobrutalism](https://www.nngroup.com/articles/neobrutalism/)

## Overview
- **Priority**: P1 (blocks Phases 3-5)
- **Status**: pending
- **Effort**: 8h
- **Description**: Build all reusable UI components with Soft Brutalism aesthetic. Each component supports variants, sizes, and responsive behavior.

## Key Insights
- Neo-brutalism components = thick border + hard shadow + bold color + rounded corners
- Hover/active states: translate + shadow grow/shrink for tactile feel
- Keep components composable: primitive → compound → feature
- Action bar buttons need distinct size hierarchy (small/medium/large)

## Requirements

### Functional
- All components accept `className` prop for override
- All interactive components have hover/focus/active/disabled states
- Components are client/server compatible (no unnecessary `"use client"`)
- Mobile-touch friendly: min 44px tap targets

### Non-Functional
- Each component file < 200 lines
- Zero external UI library dependency (pure Tailwind + custom CSS)
- Accessible: ARIA roles, keyboard navigation, focus rings

## Architecture

### Component Hierarchy
```
src/components/
  ui/                          # Primitives
    button.tsx                 # Button variants
    avatar.tsx                 # Avatar + online/verified badge
    badge.tsx                  # Tag/badge for profile attributes
    card.tsx                   # Base card container
    input.tsx                  # Text input, search, chat input
    icon-button.tsx            # Circular icon button (action bar)
    dialog.tsx                 # Modal dialog
    toast.tsx                  # Notification toast
  layout/                      # Layout components
    bottom-nav.tsx             # Mobile bottom navigation (4 tabs)
    sidebar-nav.tsx            # Desktop sidebar navigation
    three-column-layout.tsx    # Desktop 3-column responsive layout
  features/                    # Feature-specific compounds
    profile-card.tsx           # Swipe card with photo + info overlay
    action-bar.tsx             # 5-button interaction bar
    match-card.tsx             # Match grid item
    chat-list-item.tsx         # Chat conversation preview
    chat-message.tsx           # Individual chat bubble
    chat-input-bar.tsx         # Chat text input with actions
    profile-tag-grid.tsx       # Grid of profile attribute tags
    profile-header.tsx         # Name, age, verified, location
    filter-bar.tsx             # Discover filters
```

## Component Specifications

### 1. Button (`ui/button.tsx`)
**Variants**: primary, secondary, ghost, destructive
**Sizes**: sm (32px h), md (40px h), lg (48px h)
```
Primary:   bg-rose-500, text-white, border-thick, shadow-brutal-md
Secondary: bg-blush-50, text-charcoal-900, border-thick, shadow-brutal-md
Ghost:     bg-transparent, text-charcoal-900, border-thin
Destructive: bg-reject, text-white, border-thick, shadow-brutal-md

Hover:  translate(-2px, -2px), shadow grows
Active: translate(2px, 2px), shadow shrinks to 0
Disabled: opacity-50, no shadow, cursor-not-allowed
```

### 2. Avatar (`ui/avatar.tsx`)
**Sizes**: sm (32px), md (48px), lg (64px), xl (96px)
**Features**: online dot (green), verified badge (checkmark), border
```
Base: rounded-full, border-thick, overflow-hidden
Online: absolute green dot, bottom-right
Verified: absolute badge icon, bottom-right (replaces online if both)
```

### 3. Badge/Tag (`ui/badge.tsx`)
**Variants**: default, active, outline
```
Base: rounded-full, px-3 py-1, border-2, text-label-md
Default: bg-blush-100, text-charcoal-900, border-charcoal-900
Active:  bg-rose-500, text-white, border-rose-600
Outline: bg-transparent, text-charcoal-700, border-charcoal-500
```

### 4. Card (`ui/card.tsx`)
**Variants**: default, elevated, interactive
```
Base: rounded-2xl, border-thick, bg-white, overflow-hidden
Elevated: + shadow-brutal-lg
Interactive: hover translate + shadow grow, cursor-pointer
```

### 5. Input (`ui/input.tsx`)
**Variants**: default, search, chat
```
Base: rounded-xl, border-thick, px-4 py-3, text-body-md
Focus: ring-2 ring-rose-500, shadow-brutal-sm
Search: + search icon left, rounded-full
Chat:  + attach/emoji/send buttons, rounded-full
```

### 6. IconButton (`ui/icon-button.tsx`)
**Sizes**: sm (40px), md (52px), lg (64px)
**For**: Action bar buttons
```
Base: rounded-full, border-thick, flex items-center justify-center
Colored variants per action: reject(red), like(rose), superlike(gold), rewind(blue), chat(purple)
Hover: scale(1.1), shadow grows
Active: scale(0.95), shadow shrinks
```

### 7. Action Bar (`features/action-bar.tsx`)
**The signature interaction element**
```
Container: rounded-full, bg-charcoal-900/80, backdrop-blur-lg, px-4 py-3
           border-2 border-white/10, shadow-brutal-xl
Layout:    flex items-center justify-center gap-3
Buttons:   [rewind:sm] [reject:md] [like:lg] [superlike:md] [chat:sm]

Center (like) button elevated higher with ring effect
```

### 8. Profile Card (`features/profile-card.tsx`)
```
Container: aspect-[3/4], rounded-2xl, border-heavy, overflow-hidden, relative
Photo:     object-cover, full fill
Gradient:  absolute bottom, black gradient overlay
Info:      absolute bottom-4, left-4
           Name (headline-md, white, bold) + Age
           Distance badge
           Verified icon
```

### 9. Bottom Nav (`layout/bottom-nav.tsx`)
```
Container: fixed bottom-0, w-full, bg-white, border-t-thick
           rounded-t-2xl, shadow-brutal-lg (inverted)
Items:     4 equal columns, py-2
           Icon + label stacked
Active:    text-rose-500, icon filled
Inactive:  text-charcoal-500, icon outlined
Badge:     absolute top-0 right-0, bg-rose-500, text-white, rounded-full, min-w-5
```

### 10. Dialog (`ui/dialog.tsx`)
```
Overlay:   fixed inset-0, bg-black/50, backdrop-blur-sm, z-modal
Container: bg-white, rounded-2xl, border-heavy, shadow-brutal-xl
           max-w-md, mx-auto, p-6
Header:    headline-sm + close button
Body:      body-md, py-4
Footer:    flex gap-3, pt-4
```

### 11. Toast (`ui/toast.tsx`)
```
Container: fixed top-4 right-4, z-toast
           bg-white, rounded-xl, border-thick, shadow-brutal-md
           px-4 py-3, flex gap-3 items-center
Variants:  success (green left border), error (red), warning (gold), info (blue)
Auto-dismiss after 4s with slide-out animation
```

## Related Code Files

### Files to Create
- `src/components/ui/button.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/icon-button.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/toast.tsx`
- `src/components/layout/bottom-nav.tsx`
- `src/components/layout/sidebar-nav.tsx`
- `src/components/layout/three-column-layout.tsx`
- `src/components/features/profile-card.tsx`
- `src/components/features/action-bar.tsx`
- `src/components/features/match-card.tsx`
- `src/components/features/chat-list-item.tsx`
- `src/components/features/chat-message.tsx`
- `src/components/features/chat-input-bar.tsx`
- `src/components/features/profile-tag-grid.tsx`
- `src/components/features/profile-header.tsx`
- `src/components/features/filter-bar.tsx`

### Files to Modify
- `src/app/page.tsx` - Add component showcase

## Implementation Steps

1. **Create component directory structure**
   ```bash
   mkdir -p src/components/{ui,layout,features}
   ```

2. **Build primitives first** (ui/ folder, order matters):
   - `button.tsx` - Most reused, define variant system
   - `icon-button.tsx` - Action bar needs this
   - `avatar.tsx` - Used in cards, chat, sidebar
   - `badge.tsx` - Used in profile tags, nav badges
   - `card.tsx` - Base for profile/match/chat cards
   - `input.tsx` - Search, chat input
   - `dialog.tsx` - Settings modals
   - `toast.tsx` - Notifications

3. **Build layout components**:
   - `bottom-nav.tsx` - Mobile navigation
   - `sidebar-nav.tsx` - Desktop left panel
   - `three-column-layout.tsx` - Desktop grid container

4. **Build feature components**:
   - `action-bar.tsx` (depends on icon-button)
   - `profile-card.tsx` (depends on card, badge, avatar)
   - `match-card.tsx` (depends on card, avatar)
   - `chat-list-item.tsx` (depends on avatar)
   - `chat-message.tsx` (standalone)
   - `chat-input-bar.tsx` (depends on input, icon-button)
   - `profile-tag-grid.tsx` (depends on badge)
   - `profile-header.tsx` (depends on avatar, badge)
   - `filter-bar.tsx` (depends on badge, button)

5. **Create component showcase page** at `src/app/page.tsx`
   - Display every component with all variants
   - Group by category (primitives, layout, features)

6. **Verify build** after each component group

## Todo List
- [ ] Create directory structure
- [ ] Build Button component with all variants
- [ ] Build IconButton component
- [ ] Build Avatar component with indicators
- [ ] Build Badge/Tag component
- [ ] Build Card component
- [ ] Build Input component variants
- [ ] Build Dialog component
- [ ] Build Toast component
- [ ] Build BottomNav layout
- [ ] Build SidebarNav layout
- [ ] Build ThreeColumnLayout
- [ ] Build ActionBar feature component
- [ ] Build ProfileCard feature component
- [ ] Build MatchCard feature component
- [ ] Build ChatListItem component
- [ ] Build ChatMessage component
- [ ] Build ChatInputBar component
- [ ] Build ProfileTagGrid component
- [ ] Build ProfileHeader component
- [ ] Build FilterBar component
- [ ] Create component showcase page
- [ ] Verify all builds pass

## Success Criteria
- All components render without errors
- Each component has hover/focus/active/disabled states
- Components compose correctly together
- Showcase page displays all variants
- Touch targets >= 44px on mobile
- Build passes with zero TS/lint errors

## Risk Assessment
- **Icon library**: Need SVG icons for actions. Mitigation: use Lucide React (tree-shakable, MIT).
- **Component count**: 20 components is significant. Mitigation: keep each simple, < 200 lines, build in dependency order.
- **Action bar glassmorphism**: `backdrop-blur` has mobile perf cost. Mitigation: test on mobile, fallback to solid dark bg.

## Security Considerations
- No user data in this phase
- Sanitize any text rendered in components (React handles by default)

## Next Steps
- Install `lucide-react` for icons
- Phase 3: Compose into mobile screens
- Phase 4: Compose into desktop layout
