# Planner Report: Dating App Brutalism Design System

**Date**: 2026-02-22
**Plan**: `/home/sandro8/dating-app-ptit-design-brutalism/plans/260222-1733-dating-app-brutalism-design-system/`

## Summary
Created comprehensive 6-phase implementation plan for a dating app with "Soft Brutalism" design system (neo-brutalist structure + M3 rounded corners + warm romantic palette).

## Research Conducted
- M3 Material Design 3: shape tokens (4-9999px radius scale), elevation (5 CSS box-shadow levels), type scale (15 tokens from 11-57px)
- Neo-Brutalism CSS: thick 2-4px borders, solid offset shadows (4-8px, no blur), bold 700-900 weight type, flat high-contrast colors
- Dating app UX: Tinder/Bumble/Hinge swipe patterns, 5-button action bar, card stack physics, 3-column desktop layout
- Figma MCP: `generate_figma_design` for code-to-Figma capture, `add_code_connect_map` for component linking
- Next.js 15 + Tailwind v4: CSS-first `@theme {}` config, automatic content detection, 5x faster builds

## Phases

| # | Phase | Effort | Key Deliverable |
|---|-------|--------|-----------------|
| 1 | Bootstrap & Design Tokens | 4h | Next.js 15 project + Tailwind v4 theme with all tokens |
| 2 | Design System Components | 8h | 20 components (8 primitives, 3 layout, 9 features) |
| 3 | Mobile Screens | 8h | 4 mobile screens with swipe gestures + bottom nav |
| 4 | Desktop Layout | 6h | 3-column responsive layout (Bumble-style) |
| 5 | Demo App & Animations | 4h | Interactive demo with mock data + Framer Motion |
| 6 | Figma MCP Export | 2h | Push all screens/tokens to Figma file |
| **Total** | | **32h** | |

## Design Decisions
1. **Color palette**: Shifted from green to warm romantic (rose/wine/blush/gold/charcoal)
2. **"Soft Brutalism"**: Thick borders + hard shadows BUT with 12-28px border-radius
3. **Fonts**: Space Grotesk (display, 700-800) + Inter (body, 400-500)
4. **No external UI lib**: Pure Tailwind v4 + custom CSS for full control
5. **Responsive strategy**: Single layout with CSS Grid column visibility (not separate routes)
6. **State**: React Context for demo (no Redux/Zustand -- YAGNI)

## Dependency Chain
```
Phase 1 → Phase 2 → Phase 3 ─┐
                    Phase 4 ─┤→ Phase 5 → Phase 6
                              │
                    (parallel) │
```

## Files Created
- `plan.md` - Overview (under 80 lines)
- `phase-01-project-bootstrap-and-design-tokens.md`
- `phase-02-design-system-components.md`
- `phase-03-mobile-screens.md`
- `phase-04-desktop-layout.md`
- `phase-05-demo-app-and-animations.md`
- `phase-06-figma-mcp-export.md`
- `research/research-design-system-foundations.md`

## Unresolved Questions
1. **Placeholder images**: Should we use pravatar.cc, unsplash, or local placeholder images for mock profiles? (pravatar assumed for now)
2. **Dark mode**: Deferred to post-MVP. User to confirm if needed in initial build.
3. **Figma file access**: Need to verify MCP auth has edit permission on file `AALK8LV5x6un6MIJMklHL2` before Phase 6.
4. **Icon library**: Plan assumes Lucide React. User may prefer Heroicons or custom SVGs.
5. **Font licensing**: Space Grotesk is OFL (free). Confirm user is OK with this choice vs brand-specific font.
