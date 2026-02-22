# Research: Design System Foundations

## M3 Material Design 3 Specs

### Shape Tokens (Border Radius)
| Token | Value |
|-------|-------|
| None | 0dp |
| Extra Small | 4dp |
| Small | 8dp |
| Medium | 12dp |
| Large | 16dp |
| Extra Large | 28-32dp |
| Full | 9999px (pill) |

### Elevation Levels (CSS Box Shadow)
- **Level 0**: none
- **Level 1**: `0 1px 4px 0 rgba(0,0,0,0.37)`
- **Level 2**: `0 2px 2px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.3)`
- **Level 3**: `0 11px 7px 0 rgba(0,0,0,0.19), 0 13px 25px 0 rgba(0,0,0,0.3)`
- **Level 4**: `0 14px 12px 0 rgba(0,0,0,0.17), 0 20px 40px 0 rgba(0,0,0,0.3)`
- **Level 5**: `0 17px 17px 0 rgba(0,0,0,0.15), 0 27px 55px 0 rgba(0,0,0,0.3)`

### Type Scale
| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display Large | 57px | 400 | 64px |
| Display Medium | 45px | 400 | 52px |
| Display Small | 36px | 400 | 44px |
| Headline Large | 32px | 400 | 40px |
| Headline Medium | 28px | 400 | 36px |
| Headline Small | 24px | 400 | 32px |
| Title Large | 22px | 400 | 28px |
| Title Medium | 16px | 500 | 24px |
| Title Small | 14px | 500 | 20px |
| Body Large | 16px | 400 | 24px |
| Body Medium | 14px | 400 | 20px |
| Body Small | 12px | 400 | 16px |
| Label Large | 14px | 500 | 20px |
| Label Medium | 12px | 500 | 16px |
| Label Small | 11px | 500 | 16px |

---

## Neo-Brutalism CSS Patterns

### Core Characteristics
- **Thick borders**: 2-4px solid black outlines
- **Hard shadows**: Solid color, offset 4-8px, no blur (e.g., `4px 4px 0 #000`)
- **Bold typography**: 700-900 weight headlines, chunky sans-serif
- **Flat colors**: No gradients, high saturation, 2-3 primary colors
- **Generous padding**: 24-32px margins/padding
- **Raw aesthetic**: Intentionally unpolished, 90s web nostalgia

### Soft Brutalism (Our Hybrid)
Combines neo-brutalism with rounded forms:
- Keep thick borders + hard shadows
- Add M3-inspired border-radius (16-28px)
- Pill shapes for buttons/tags
- Warm color palette vs stark black/white
- Maintain the chunky, bold feel with softer edges

### Key CSS Values for Neo-Brutalism
```css
/* Borders */
border: 3px solid var(--border-color);

/* Hard Shadow (signature element) */
box-shadow: 4px 4px 0 var(--shadow-color);
box-shadow: 6px 6px 0 var(--shadow-color); /* elevated */
box-shadow: 8px 8px 0 var(--shadow-color); /* high */

/* Typography */
font-weight: 800; /* headlines */
letter-spacing: -0.02em; /* tight tracking */

/* Hover states */
transform: translate(-2px, -2px);
box-shadow: 6px 6px 0 var(--shadow-color);
```

---

## Dating App UX Patterns

### Card Stack (Tinder/Bumble)
- Stack of 2-3 visible cards with depth offset
- Swipe left (reject), right (like), up (super like)
- Thumb-friendly gesture zones
- Photo takes 70-80% of card
- Name, age, distance at bottom overlay

### Interaction Bar (Bumble-style)
- 5 circular buttons in pill container
- Sizes: small (40px), medium (52px), large (64px center)
- Icons: undo, X, heart/checkmark, star, chat
- Neumorphic/elevated styling

### Profile Details (Hinge-style)
- Tags/badges for attributes (height, exercise, education, etc.)
- Bio section with prompts
- Verified badge on avatar
- Location + distance

### Desktop Layout (Bumble Web)
- 3-column: sidebar (300px) | center (flex) | right panel (300px)
- Left: conversations list with avatar, name, preview, timestamp
- Center: large photo card with action buttons
- Right: profile details with tags
- Chat replaces center+right on conversation open

### Bottom Navigation (Mobile)
- 4 tabs: Discover, Matches, Chat, Profile/Settings
- Active state with filled icon + label
- Badge counts on Matches/Chat

---

## Figma MCP Integration

### Available Tools
1. `get_design_context` - Get code from Figma node
2. `get_screenshot` - Screenshot Figma node
3. `get_metadata` - XML structure of nodes
4. `get_variable_defs` - Design token variables
5. `generate_figma_design` - Push web page/UI to Figma
6. `add_code_connect_map` - Map Figma node to code component

### Code-to-Figma Workflow
1. Build components in code
2. Run dev server (localhost)
3. Use `generate_figma_design` to capture pages
4. Push to existing Figma file via fileKey
5. Map components with `add_code_connect_map`

### Target Figma File
- URL: https://www.figma.com/design/AALK8LV5x6un6MIJMklHL2/Untitled?node-id=0-1
- fileKey: `AALK8LV5x6un6MIJMklHL2`
- nodeId: `0:1`

---

## Next.js 15 + Tailwind v4 Setup

### Init Command
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Tailwind v4 Key Changes
- CSS-first config: `@import "tailwindcss"` + `@theme {}` directive
- No more `tailwind.config.js` (optional for plugins)
- Automatic content detection
- Native CSS engine (5x faster builds)
- 70% smaller production CSS

### Design Token Integration
```css
@import "tailwindcss";

@theme {
  --color-primary: #E8446A;
  --color-surface: #FFF5F0;
  --radius-lg: 16px;
  --shadow-brutal: 4px 4px 0 var(--color-border);
}
```

### Project Structure
```
src/
  app/           # Next.js app router
  components/    # Reusable UI components
    ui/          # Primitive components
    layout/      # Layout components
    features/    # Feature-specific components
  lib/           # Utilities, hooks, types
  styles/        # Global CSS, theme
  data/          # Mock data
```

---

## Sources
- [M3 Shape](https://m3.material.io/styles/shape)
- [M3 Elevation](https://m3.material.io/styles/elevation)
- [M3 Typography](https://m3.material.io/styles/typography/type-scale-tokens)
- [M3 Box Shadow CSS](https://studioncreations.com/blog/material-design-3-box-shadow-css-values/)
- [NN/G Neobrutalism](https://www.nngroup.com/articles/neobrutalism/)
- [Neo-brutalism CSS lib](https://github.com/Walikuperek/Neo-brutalism-CSS)
- [Figma MCP Guide](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
