# Phase 04: Desktop Layout

## Context Links
- [Phase 02: Components](./phase-02-design-system-components.md)
- [Phase 03: Mobile Screens](./phase-03-mobile-screens.md)
- [Bumble Desktop UX](./research/research-design-system-foundations.md#dating-app-ux-patterns)

## Overview
- **Priority**: P2
- **Status**: pending
- **Effort**: 6h
- **Description**: Build responsive 3-column desktop layout (Bumble-style). Reuse mobile components, add desktop-specific layout and navigation. Desktop = 1024px+.

## Key Insights
- Desktop shows more info simultaneously (sidebar + card + details)
- Left sidebar always visible: conversations/matches
- Center panel changes: discover cards OR chat messages
- Right panel changes: profile details OR chat partner info
- Responsive: hide columns below breakpoints (tablet = 2 col, mobile = 1 col)

## Requirements

### Functional
- 3-column layout: left sidebar (300px) | center (flex) | right panel (320px)
- Left sidebar: user mini-profile, match queue, conversation list
- Center: discover card view OR chat messages
- Right: full profile details OR chat partner mini-profile
- Smooth transitions between views (discover ↔ chat)
- Desktop navigation in sidebar (no bottom nav)

### Non-Functional
- Layout uses CSS Grid for stable column sizing
- No layout shift when switching views
- Sidebar scrolls independently from center/right

## Architecture

### Route Structure
```
src/app/
  (desktop)/                   # Route group for desktop layout
    layout.tsx                 # 3-column grid + sidebar
    discover/
      page.tsx                 # Center: card + Right: profile detail
    chat/
      page.tsx                 # Center: chat messages + Right: partner info
      [id]/
        page.tsx               # Specific conversation
    settings/
      page.tsx                 # Center: settings form + Right: preview
```

### Layout Switching Strategy
- Use `useMediaQuery` hook to detect breakpoint
- `(mobile)/layout.tsx` renders for < 1024px
- `(desktop)/layout.tsx` renders for >= 1024px
- Share the same page components, different layouts wrap them
- OR: single responsive layout that shows/hides columns via CSS

**Chosen approach**: Single responsive layout with CSS column visibility. Simpler, DRY.

### Desktop Views

#### 1. Discover View (Desktop)
```
[Left Sidebar]              [Center]                    [Right Panel]
┌──────────────┐  ┌───────────────────────┐  ┌─────────────────┐
│ User Avatar  │  │ Filters (age, dist)   │  │ Profile Details  │
│ ──────────── │  │ ───────────────────── │  │ ─────────────── │
│ Match Queue  │  │                       │  │ Name, 25 ✓      │
│ (horiz row)  │  │   ┌─────────────┐    │  │ University      │
│ ──────────── │  │   │  Profile     │    │  │ "Bio text..."   │
│ Conversations│  │   │  Photo Card  │    │  │ 📍 5km away     │
│ ┌──────────┐ │  │   │  (swipeable) │    │  │ ─────────────── │
│ │ Avatar   │ │  │   │             │    │  │ Tags:           │
│ │ Name     │ │  │   └─────────────┘    │  │ [Height] [Gym]  │
│ │ Preview  │ │  │                       │  │ [Degree] [Wine] │
│ │ Time     │ │  │  [←] [✕] [★] [✓]    │  │ [Looking for]   │
│ └──────────┘ │  │                       │  │ [No kids]       │
│ ┌──────────┐ │  │                       │  │ [Star sign]     │
│ │ ...      │ │  │                       │  │                 │
│ └──────────┘ │  │                       │  │                 │
└──────────────┘  └───────────────────────┘  └─────────────────┘
```

#### 2. Chat View (Desktop)
```
[Left Sidebar]              [Center]                    [Right Panel]
┌──────────────┐  ┌───────────────────────┐  ┌─────────────────┐
│ User Avatar  │  │ ← Alex, 25    ●      │  │ Mini Profile    │
│ ──────────── │  │ ───────────────────── │  │ ─────────────── │
│ Search 🔍    │  │                       │  │ [Photo]         │
│ ──────────── │  │  "Hey! How's it      │  │ Alex, 25 ✓      │
│ Conversations│  │   going?" 👋          │  │ ─────────────── │
│ ┌──────────┐ │  │                       │  │ About           │
│ │▶Alex     │ │  │        "Great! Love  │  │ "Bio text..."   │
│ │ Hey! H...│ │  │         your bio!"   │  │ ─────────────── │
│ │ 2m ago   │ │  │                       │  │ Tags:           │
│ └──────────┘ │  │  "Thanks! Want to    │  │ [Height] [Gym]  │
│ ┌──────────┐ │  │   grab coffee?"       │  │ [Degree]        │
│ │ Sam      │ │  │                       │  │                 │
│ │ Sure!    │ │  │ ───────────────────── │  │                 │
│ │ 1h ago   │ │  │ [😊] [📎] Type...  [→]│  │                 │
│ └──────────┘ │  └───────────────────────┘  └─────────────────┘
```

#### 3. Settings View (Desktop)
```
[Left Sidebar]              [Center]
┌──────────────┐  ┌─────────────────────────────────────────┐
│ Edit Profile │  │ Profile                                 │
│ ▶Settings   │  │ ─────────────────────────────────────── │
│ Contact/FAQ  │  │ [Avatar Upload]                         │
│ Log Out      │  │ Name: [__________]                      │
│              │  │ Birthday: [__________]                   │
│              │  │                                          │
│              │  │ ▼ About Me                               │
│              │  │   Bio: [textarea]                        │
│              │  │   Prompts: [...]                         │
│              │  │                                          │
│              │  │ ▼ My Basics                              │
│              │  │   [Height ▼] [Exercise ▼] [Education ▼] │
│              │  │   [Drinking ▼] [Smoking ▼]              │
│              │  │                                          │
│              │  │ ▼ Work & Education                       │
│              │  │   Job: [__________]                      │
│              │  │   Company: [__________]                  │
│              │  │   School: [__________]                   │
└──────────────┘  └─────────────────────────────────────────┘
```

## Related Code Files

### Files to Create
- `src/components/layout/responsive-shell.tsx` - Main responsive layout shell
- `src/components/layout/left-sidebar.tsx` - Left sidebar content
- `src/components/layout/right-panel.tsx` - Right panel content
- `src/components/features/desktop-discover-view.tsx` - Desktop discover composition
- `src/components/features/desktop-chat-view.tsx` - Desktop chat composition
- `src/components/features/desktop-settings-view.tsx` - Desktop settings composition
- `src/components/features/user-mini-profile.tsx` - Sidebar user avatar/name
- `src/components/features/match-queue.tsx` - Horizontal match row
- `src/components/features/conversation-list.tsx` - Sidebar chat list
- `src/components/features/profile-detail-panel.tsx` - Right panel full profile
- `src/components/features/chat-partner-panel.tsx` - Right panel chat partner info
- `src/hooks/use-media-query.ts` - Responsive breakpoint hook

### Files to Modify
- `src/app/layout.tsx` - Wrap with responsive shell
- Reuse all mobile components from Phase 3

## Implementation Steps

1. **Create useMediaQuery hook**
   - SSR-safe (default to mobile, hydrate to actual)
   - Breakpoints: mobile (< 768), tablet (768-1023), desktop (>= 1024)

2. **Build ResponsiveShell layout**
   - CSS Grid: `grid-template-columns: 300px 1fr 320px`
   - Tablet: `grid-template-columns: 280px 1fr` (hide right panel)
   - Mobile: single column (hide sidebar, show bottom nav)

3. **Build LeftSidebar**
   - UserMiniProfile at top
   - MatchQueue (horizontal scroll row)
   - ConversationList (scrollable)
   - Settings nav links at bottom

4. **Build RightPanel**
   - Context-dependent: discover → profile details, chat → partner info
   - ProfileDetailPanel: full profile with all tags
   - ChatPartnerPanel: mini photo + about + tags

5. **Build desktop view compositions**
   - DesktopDiscoverView: filter bar + card (single, not stack) + action buttons
   - DesktopChatView: message area + input bar
   - DesktopSettingsView: form with collapsible sections (full width center)

6. **Wire routing**
   - Desktop: click conversation in sidebar → center switches to chat
   - Desktop: click back from chat → center switches to discover
   - Maintain sidebar state during navigation

7. **Test responsive transitions**
   - Resize from desktop → tablet → mobile
   - Verify column visibility at each breakpoint

## Todo List
- [ ] Create useMediaQuery hook
- [ ] Build ResponsiveShell layout
- [ ] Build LeftSidebar with sub-components
- [ ] Build UserMiniProfile
- [ ] Build MatchQueue horizontal row
- [ ] Build ConversationList
- [ ] Build RightPanel container
- [ ] Build ProfileDetailPanel
- [ ] Build ChatPartnerPanel
- [ ] Build DesktopDiscoverView
- [ ] Build DesktopChatView
- [ ] Build DesktopSettingsView
- [ ] Wire desktop routing/navigation
- [ ] Test responsive breakpoints (1024, 768, 375)
- [ ] Verify sidebar scroll independence

## Success Criteria
- 3 columns visible at 1024px+
- 2 columns at 768-1023px (sidebar + center)
- 1 column at < 768px (mobile with bottom nav)
- Sidebar conversations clickable → opens chat in center
- Profile details show in right panel during discover
- No layout shift during view transitions
- Independent scroll on each column

## Risk Assessment
- **Layout complexity**: 3-column with context switching. Mitigation: use React context for active view state, CSS Grid for layout stability.
- **Component reuse**: Mobile and desktop share components. Mitigation: components are layout-agnostic, parent wrappers handle sizing.
- **SSR hydration mismatch**: useMediaQuery returns different value on server vs client. Mitigation: render mobile-first on server, hydrate with correct layout on client.

## Security Considerations
- No additional security concerns
- Same mock data as Phase 3

## Next Steps
- Phase 5: Integrate mobile + desktop into demo app
