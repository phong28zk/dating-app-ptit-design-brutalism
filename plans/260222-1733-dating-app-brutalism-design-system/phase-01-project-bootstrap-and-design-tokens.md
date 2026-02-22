# Phase 01: Project Bootstrap & Design Tokens

## Context Links
- [Research: Design System Foundations](./research/research-design-system-foundations.md)
- [M3 Shape Tokens](https://m3.material.io/styles/shape)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)

## Overview
- **Priority**: P1 (blocks all other phases)
- **Status**: pending
- **Effort**: 4h
- **Description**: Initialize Next.js 15 project, configure Tailwind v4 with CSS-first theme, define all design tokens (colors, typography, spacing, radius, shadows), create base CSS utilities.

## Key Insights
- Tailwind v4 uses `@theme {}` directive in CSS instead of JS config
- Neo-brutalism shadow = solid offset, no blur: `4px 4px 0 color`
- M3 shape scale adapted: use 12-28px radius range for "soft brutalism"
- Font pairing: bold display font (Space Grotesk 700-800) + clean body (Inter 400-500)

## Requirements

### Functional
- Next.js 15 app router with TypeScript strict mode
- Tailwind v4 with custom theme tokens
- Global CSS with design system variables
- Dark mode support via CSS custom properties
- Responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

### Non-Functional
- Build time < 5s for dev, < 30s for production
- Zero runtime CSS-in-JS (Tailwind only)
- All tokens accessible via both CSS vars and Tailwind classes

## Architecture

### Design Token Hierarchy
```
@theme {
  /* Colors - Warm Romantic Palette */
  --color-rose-500: #E8446A;        /* Primary */
  --color-rose-400: #F06B8A;        /* Primary light */
  --color-rose-600: #C23355;        /* Primary dark */
  --color-wine-500: #5B1A3A;        /* Dark surface */
  --color-wine-400: #7A2B52;        /* Dark surface light */
  --color-wine-600: #3D0F27;        /* Dark surface dark */
  --color-blush-50: #FFF5F0;        /* Background */
  --color-blush-100: #FFE8DD;       /* Surface */
  --color-blush-200: #FFD4C4;       /* Surface variant */
  --color-gold-500: #F5A623;        /* Accent */
  --color-gold-400: #FFBE4D;        /* Accent light */
  --color-charcoal-900: #1A1A1A;    /* Text primary */
  --color-charcoal-700: #3D3D3D;    /* Text secondary */
  --color-charcoal-500: #6B6B6B;    /* Text tertiary */
  --color-white: #FFFFFF;

  /* Semantic Colors */
  --color-reject: #FF4757;          /* X/pass action */
  --color-like: #E8446A;            /* Heart/like action */
  --color-superlike: #F5A623;       /* Star/super-like */
  --color-rewind: #5B9BD5;          /* Undo action */
  --color-chat: #9B59B6;            /* Chat action */
  --color-success: #2ED573;
  --color-warning: #FFA502;
  --color-error: #FF4757;

  /* Border Radius - Soft Brutalism Scale */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 28px;
  --radius-full: 9999px;

  /* Shadows - Neo-Brutalist Hard Shadows */
  --shadow-brutal-sm: 2px 2px 0 var(--color-charcoal-900);
  --shadow-brutal-md: 4px 4px 0 var(--color-charcoal-900);
  --shadow-brutal-lg: 6px 6px 0 var(--color-charcoal-900);
  --shadow-brutal-xl: 8px 8px 0 var(--color-charcoal-900);
  --shadow-brutal-rose: 4px 4px 0 var(--color-rose-600);
  --shadow-brutal-gold: 4px 4px 0 var(--color-gold-500);

  /* Border */
  --border-thin: 2px solid var(--color-charcoal-900);
  --border-thick: 3px solid var(--color-charcoal-900);
  --border-heavy: 4px solid var(--color-charcoal-900);

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Z-Index Scale */
  --z-base: 0;
  --z-card: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-toast: 50;

  /* Breakpoints (reference) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Typography Scale (Adapted M3 + Brutalist)
```css
/* Display - Hero text, large numbers */
.text-display-lg { font: 800 56px/1.1 var(--font-display); letter-spacing: -0.02em; }
.text-display-md { font: 800 44px/1.1 var(--font-display); letter-spacing: -0.02em; }
.text-display-sm { font: 700 36px/1.15 var(--font-display); letter-spacing: -0.01em; }

/* Headline - Section headers */
.text-headline-lg { font: 700 32px/1.2 var(--font-display); }
.text-headline-md { font: 700 28px/1.2 var(--font-display); }
.text-headline-sm { font: 700 24px/1.25 var(--font-display); }

/* Title - Card titles, labels */
.text-title-lg { font: 600 22px/1.3 var(--font-display); }
.text-title-md { font: 600 16px/1.4 var(--font-body); }
.text-title-sm { font: 600 14px/1.4 var(--font-body); }

/* Body - Paragraphs, descriptions */
.text-body-lg { font: 400 16px/1.5 var(--font-body); }
.text-body-md { font: 400 14px/1.5 var(--font-body); }
.text-body-sm { font: 400 12px/1.5 var(--font-body); }

/* Label - Buttons, badges, captions */
.text-label-lg { font: 500 14px/1.4 var(--font-body); letter-spacing: 0.01em; }
.text-label-md { font: 500 12px/1.4 var(--font-body); letter-spacing: 0.02em; }
.text-label-sm { font: 500 11px/1.4 var(--font-body); letter-spacing: 0.02em; }
```

## Related Code Files

### Files to Create
- `src/app/layout.tsx` - Root layout with fonts, metadata
- `src/app/page.tsx` - Landing/redirect page
- `src/app/globals.css` - Global styles + Tailwind theme
- `src/lib/fonts.ts` - Font loading config (Space Grotesk + Inter)
- `src/lib/cn.ts` - className utility (clsx + twMerge)
- `tailwind.config.ts` - Minimal config (plugins only if needed)
- `tsconfig.json` - TypeScript strict config
- `next.config.ts` - Next.js config
- `.eslintrc.json` - ESLint config
- `package.json` - Dependencies

### Dependencies to Install
```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^15"
  }
}
```

## Implementation Steps

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. **Install additional deps**
   ```bash
   npm install clsx tailwind-merge
   ```

3. **Configure fonts** - Create `src/lib/fonts.ts`
   - Import Space Grotesk (display) and Inter (body) from `next/font/google`
   - Export font variables for CSS

4. **Create global CSS** - `src/app/globals.css`
   - `@import "tailwindcss"`
   - Define `@theme {}` with all design tokens
   - Add typography utility classes
   - Add brutalism utility classes (`.brutal-border`, `.brutal-shadow`, etc.)
   - Dark mode overrides via `@media (prefers-color-scheme: dark)`

5. **Create className utility** - `src/lib/cn.ts`
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
   ```

6. **Update root layout** - `src/app/layout.tsx`
   - Apply font variables to `<html>`
   - Set viewport meta for mobile
   - Add base background/text colors

7. **Create landing page** - `src/app/page.tsx`
   - Simple page showcasing all tokens (color swatches, typography, shadows, radii)
   - Serves as visual reference during development

8. **Verify build**
   ```bash
   npm run build && npm run dev
   ```

## Todo List
- [ ] Initialize Next.js 15 project
- [ ] Install clsx + tailwind-merge
- [ ] Configure Space Grotesk + Inter fonts
- [ ] Define complete @theme in globals.css
- [ ] Add typography utility classes
- [ ] Add brutalism utility classes
- [ ] Create cn() utility
- [ ] Update root layout with fonts + base styles
- [ ] Create token showcase page
- [ ] Verify dev + production build passes

## Success Criteria
- `npm run build` passes with zero errors
- `npm run dev` shows token showcase page
- All color swatches render correctly
- Typography scale is visually correct
- Brutalist shadows render as solid offset blocks
- Rounded corners match M3 scale
- Responsive breakpoints work (mobile/tablet/desktop)

## Risk Assessment
- **Tailwind v4 breaking changes**: v4 is newer, some plugins may not support. Mitigation: use CSS-first config, avoid plugin dependency.
- **Font loading**: Google Fonts may slow initial load. Mitigation: `next/font` auto-optimizes + preloads.
- **Dark mode complexity**: Can bloat tokens. Mitigation: defer dark mode to after MVP, use semantic tokens for easy swap later.

## Security Considerations
- No secrets in this phase
- Ensure no API keys committed
- `.env.local` in `.gitignore`

## Next Steps
- Phase 2: Build design system components using these tokens
