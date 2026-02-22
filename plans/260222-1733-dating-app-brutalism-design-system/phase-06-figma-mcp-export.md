# Phase 06: Figma MCP Export

## Context Links
- [Figma MCP Guide](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Claude Code to Figma Blog](https://www.figma.com/blog/introducing-claude-code-to-figma/)
- [Target Figma File](https://www.figma.com/design/AALK8LV5x6un6MIJMklHL2/Untitled?node-id=0-1)

## Overview
- **Priority**: P3
- **Status**: pending
- **Effort**: 2h
- **Description**: Export design system tokens, component designs, and demo screens to target Figma file using MCP tools.

## Key Insights
- Figma MCP `generate_figma_design` tool captures live localhost pages → pushes to Figma
- Can push to existing file via fileKey
- Code Connect maps components to Figma nodes for bi-directional sync
- Export in logical pages: Tokens, Components, Mobile Screens, Desktop Screens

## Requirements

### Functional
- Push design token reference page to Figma
- Push component showcase to Figma
- Push mobile screen captures (all 4 screens) to Figma
- Push desktop layout captures (3 views) to Figma
- Map key components via Code Connect

### Non-Functional
- Figma file organized with clear pages
- Components exported at proper scale
- Colors/fonts match design tokens

## Architecture

### Figma File Structure
```
Figma File: AALK8LV5x6un6MIJMklHL2
├── Page: Design Tokens
│   ├── Color Swatches
│   ├── Typography Scale
│   ├── Shadow Samples
│   └── Radius Samples
├── Page: Components
│   ├── Buttons (all variants)
│   ├── Cards (profile, match, chat)
│   ├── Inputs
│   ├── Avatars
│   ├── Badges
│   ├── Action Bar
│   └── Navigation
├── Page: Mobile Screens
│   ├── Discover (with card stack)
│   ├── Matches
│   ├── Chat List
│   ├── Chat Conversation
│   └── Settings
├── Page: Desktop Screens
│   ├── Desktop Discover (3-col)
│   ├── Desktop Chat (3-col)
│   └── Desktop Settings
```

### MCP Tool Usage Plan

#### Step 1: Capture Design Tokens Page
```
Tool: generate_figma_design
- Run dev server: localhost:3000/tokens (create a /tokens page)
- outputMode: existingFile
- fileKey: AALK8LV5x6un6MIJMklHL2
```

#### Step 2: Capture Component Showcase
```
Tool: generate_figma_design
- URL: localhost:3000/components (create a /components page)
- outputMode: existingFile
- fileKey: AALK8LV5x6un6MIJMklHL2
```

#### Step 3: Capture Mobile Screens
```
Tool: generate_figma_design (per screen)
- Set viewport to 375x812 (iPhone)
- Capture: /discover, /matches, /chat, /chat/1, /settings
- outputMode: existingFile
- fileKey: AALK8LV5x6un6MIJMklHL2
```

#### Step 4: Capture Desktop Screens
```
Tool: generate_figma_design (per screen)
- Set viewport to 1440x900
- Capture: /discover, /chat/1, /settings
- outputMode: existingFile
- fileKey: AALK8LV5x6un6MIJMklHL2
```

#### Step 5: Code Connect Mapping
```
Tool: add_code_connect_map
- Map key components: Button, ProfileCard, ActionBar, Avatar, Badge, BottomNav
- Link Figma nodes to src/components/ paths
- Label: React
```

## Related Code Files

### Files to Create
- `src/app/tokens/page.tsx` - Design token showcase page (for Figma capture)
- `src/app/components/page.tsx` - Component showcase page (for Figma capture)

### Files to Modify
- None (all content already exists from Phases 1-5)

## Implementation Steps

1. **Create /tokens showcase page**
   - Color palette swatches with labels
   - Typography scale examples
   - Shadow samples
   - Border radius samples
   - Spacing scale

2. **Create /components showcase page**
   - Group components by category
   - Show all variants of each
   - Include mobile action bar
   - Include navigation samples

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. **Capture tokens page to Figma**
   - Use `generate_figma_design` tool
   - Verify in Figma file

5. **Capture components page to Figma**
   - Use `generate_figma_design` tool

6. **Capture mobile screens** (375px viewport)
   - Navigate to each screen in browser
   - Capture each screen sequentially

7. **Capture desktop screens** (1440px viewport)
   - Navigate to each screen
   - Capture each screen

8. **Map Code Connect**
   - For each key component, use `add_code_connect_map`
   - Link Figma nodes to source files

9. **Verify in Figma**
   - Open Figma file
   - Check all pages populated
   - Verify visual fidelity

## Todo List
- [ ] Create /tokens showcase page
- [ ] Create /components showcase page
- [ ] Start dev server
- [ ] Capture tokens page → Figma
- [ ] Capture components page → Figma
- [ ] Capture Discover mobile screen → Figma
- [ ] Capture Matches mobile screen → Figma
- [ ] Capture Chat mobile screens → Figma
- [ ] Capture Settings mobile screen → Figma
- [ ] Capture Desktop Discover → Figma
- [ ] Capture Desktop Chat → Figma
- [ ] Capture Desktop Settings → Figma
- [ ] Map Code Connect for key components
- [ ] Verify all pages in Figma file

## Success Criteria
- Figma file has 4 organized pages (Tokens, Components, Mobile, Desktop)
- Colors in Figma match CSS token values
- Component captures are clean and recognizable
- Mobile screens captured at correct viewport (375x812)
- Desktop screens captured at correct viewport (1440x900)
- Code Connect links at least 6 key components

## Risk Assessment
- **MCP authentication**: Need valid Figma MCP connection. Mitigation: verify `mcp__plugin_figma_figma__whoami` before starting.
- **Capture fidelity**: Fonts may not render if not loaded. Mitigation: ensure fonts loaded before capture, add small delay.
- **File permissions**: May not have edit access to Figma file. Mitigation: verify access first with `get_metadata`.

## Security Considerations
- Figma API token must be configured in MCP
- Don't expose token in code
- Figma file is private by default

## Next Steps
- Project complete after successful Figma export
- Optional: iterate on designs in Figma, pull changes back via MCP
