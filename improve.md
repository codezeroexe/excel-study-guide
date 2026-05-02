# UI/UX Improvement Plan — ChatGPT-Style Monochromatic Design

## Current State
- Next.js 16.2.4 + Tailwind CSS 4
- Multi-color subject tones (green/blue/purple/amber/rose)
- Sidebar + main content layout exists
- Geist font, basic dark/light toggle (Sun/Moon icon)
- Theme toggle already functional in header (`AppShell.tsx:219-226`)

---

## 1. Monochromatic Color System

Replace `subject-ui.tsx` multi-color tones with single neutral palette:

### Light Mode
- Background: `#ffffff`
- Surfaces: `#fafafa`
- Text: `#171717`
- Borders: `#e5e5e5`
- Muted: `#737373`

### Dark Mode
- Background: `#0a0a0a`
- Surfaces: `#171717`
- Text: `#fafafa`
- Borders: `#262626`
- Muted: `#a3a3a3`

### Subtle Accent (Single Color)
- Accent: `slate-500/600` for interactive elements, active states, focus rings
- No multi-color subject tones — all subjects use same neutral styling

---

## 2. ChatGPT-Like Layout Refinements

### Sidebar
- Narrow width: `w-60` (240px) instead of `w-72`
- Fully rounded corners on collapse/expand
- `backdrop-blur` header with transparency
- Remove subject color badges — use neutral grays only
- Active state: left border accent (2px slate-500)

### Content Area
- Message-style content cards: `rounded-2xl`, max-w-3xl centered
- Subtle `shadow-sm` on cards
- Chat-like thread UI for module list
- Compact rows with ample padding

### Header
- Sticky with blur: `backdrop-blur-md bg-white/90 dark:bg-neutral-950/90`
- Minimal height: `h-12` (48px)
- Breadcrumb-style nav: `Subject > Module Title`

---

## 3. Typography & Spacing

### Font
- Switch Geist → **Inter** (Google Fonts) for ChatGPT feel
- Keep Geist Mono for code blocks

### Headings
- Tighter tracking: `tracking-tight`
- `font-semibold`
- Colors: `text-neutral-900 dark:text-neutral-50`

### Body
- `text-sm leading-7`
- Generous paragraph spacing: `space-y-6`
- Muted text: `text-neutral-500 dark:text-neutral-400`

### Code
- Monospace with `bg-neutral-100 dark:bg-neutral-900` chips
- `rounded-md px-1.5 py-0.5`

---

## 4. Interactive Elements

### Buttons
- Ghost style default
- `hover:bg-neutral-100 dark:hover:bg-neutral-900`
- Active: `bg-neutral-200 dark:bg-neutral-800`

### Links
- No underline
- `hover:text-neutral-900 dark:hover:text-neutral-50`
- Transition: `transition-colors duration-150`

### Scrollbars
- 4px thin
- Thumb: `neutral-300/600`
- Auto-hide with CSS

---

## 5. New Features

### 5.1 Theme Toggle Enhancement
- **Add System theme option** (matches OS preference)
- Dropdown style: Light / Dark / System
- Store preference: `localStorage.setItem('study-guide-theme', 'system'|'light'|'dark')`
- Respect `prefers-color-scheme` when set to System

### 5.2 Command Palette (Cmd+K)
- Quick jump to any module
- Like ChatGPT's GPT switcher
- Fuzzy search through all subjects/modules
- Keyboard navigation (↑↓, Enter, Esc)
- Create: `components/CommandPalette.tsx`

### 5.3 Progress Indicators
- Subtle checkmarks per completed module
- Progress bar per subject in sidebar
- Show: `X / Y modules completed`
- Create: `components/ProgressBadge.tsx`

### 5.4 Breadcrumb Navigation
- `Subject > Module Title` in header
- Clickable segments
- Create: `components/Breadcrumb.tsx`

### 5.5 Smooth Page Transitions
- CSS `transition-opacity duration-200` on route change
- Optional: Framer Motion for advanced transitions

### 5.6 Reading Mode Toggle
- Distraction-free view (hides sidebar, centers content)
- Keyboard shortcut: `Ctrl+Shift+R`
- Button in header

---

## 6. Component Updates

| File | Change |
|------|--------|
| `src/app/globals.css` | New monochromatic CSS variables, remove color tones |
| `src/lib/subject-ui.tsx` | Delete multi-color tones, single `accent` style |
| `src/components/AppShell.tsx` | ChatGPT-style sidebar, command palette, breadcrumbs, theme dropdown |
| `src/app/layout.tsx` | Switch to Inter font, update metadata |
| `src/app/page.tsx` | Message-style cards, centered max-width |
| `src/app/[subject]/page.tsx` | Chat thread UI for modules |
| `src/app/[subject]/module/[id]/page.tsx` | Reading mode, progress tracking |

---

## 7. Files to Create

1. **`src/components/CommandPalette.tsx`**
   - Cmd+K quick nav
   - Fuzzy search through subjects/modules
   - Keyboard shortcuts

2. **`src/components/ProgressBadge.tsx`**
   - Sidebar progress per subject
   - Checkmark indicators

3. **`src/components/Breadcrumb.tsx`**
   - Header navigation path
   - Clickable segments

4. **`src/lib/theme.ts`**
   - Centralized monochromatic color tokens
   - Theme utility functions

5. **`src/components/ReadingMode.tsx`**
   - Distraction-free toggle
   - Full-width content

---

## 8. Implementation Order

1. Update `globals.css` with new monochromatic variables
2. Simplify `subject-ui.tsx` (remove color tones)
3. Update `layout.tsx` (Inter font)
4. Enhance `AppShell.tsx` (theme dropdown, breadcrumbs)
5. Create new components (CommandPalette, ProgressBadge, Breadcrumb)
6. Update page layouts (`page.tsx`, `[subject]/page.tsx`)
7. Add reading mode toggle
8. Test dark/light/system themes
9. Verify monochromatic design across all pages

---

## 9. Success Criteria

- [ ] No colored subject tones (green/blue/purple/amber/rose) visible
- [ ] Theme toggle cycles through Light → Dark → System
- [ ] Cmd+K opens command palette
- [ ] Sidebar shows progress per subject
- [ ] Breadcrumb navigation in header
- [ ] Inter font loaded and applied
- [ ] ChatGPT-like spacing and card styles
- [ ] Smooth transitions between pages
- [ ] Reading mode hides sidebar and centers content
