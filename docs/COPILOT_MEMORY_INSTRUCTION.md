# GitHub Copilot Instruction — "Memory" UI Component

## Purpose

This file contains an explicit, developer-friendly instruction set for GitHub Copilot (or any developer) to implement a "Memory" UI component for the Skyrider site. The component should be simple, friendly, modern and animated. It must not use the default pink/purple colour palette.

## High-level goals

- Simple, friendly and readable design — suitable for students and parents.
- No use of default pink or purple tones anywhere in the component palette.
- Smooth, modern animations for state transitions (enter/exit, hover, selection) while respecting reduced-motion preferences.
- Accessible: keyboard focusable, proper ARIA attributes, high-contrast text.
- Reusable: component props should allow different sizes and content.

## When to use

Use the Memory component for small pieces of UI that store and display short user- or result-related content, e.g. a saved search card, recent looked-up results, or small notes.

## Design constraints

- Color palette: avoid pinks/purples. Prefer a neutral + one accent palette.
  - Neutral: slate/gray scale (example tokens: slate-50..900)
  - Accent: teal/emerald or indigo/sky (pick one) — e.g. Tailwind's `emerald` or `sky` scales.
  - Success: `emerald-600` / `emerald-700`
  - Accent hover: slightly darker accent shade
  - Text: `slate-900` for headings, `slate-700` for body
- Spacing and typography: simple, generous padding, 14–16px base font, 20–24px for headings if present.
- Corners: subtle (4–8px) radius for friendly look.
- Elevation: subtle shadow for cards (e.g., `shadow-sm` -> `shadow-md` on hover).
- Motion: short, snappy transitions (120ms–240ms) for hover/press; 300–400ms for enter/exit. Use spring for feel via Framer Motion.
- Motion-reduction: respect user preference `prefers-reduced-motion` and provide a non-animated fallback.

## Accessibility

- Keyboard: component must be reachable with Tab; actionable areas should be buttons or links with correct semantics.
- Focus: visible focus ring (use offset ring with accessible contrast). Use `:focus-visible` styles.
- Screen readers: provide `aria-label` and `role` where needed. If the card is interactive, use `role="button"` and `aria-pressed` if toggleable.
- Color contrast: ensure text over background meets WCAG AA (4.5:1 for normal text). Validate with a7 or similar tools.

## API / Props (TypeScript-friendly)

interface MemoryProps {
id?: string | number
title?: string
subtitle?: string
content?: string // short text or HTML-safe string
accent?: 'emerald' | 'sky' | 'indigo' // default 'emerald'
size?: 'sm' | 'md' | 'lg' // sizing variants
onClick?: () => void // optional
removable?: boolean // shows a small remove button
className?: string
}

## Implementation notes (recommended stack)

- Framework: React + TypeScript (Next.js app)
- Styling: Tailwind CSS utility classes and design tokens. Keep classes small via a small wrapper helper (`cn` / `clsx`).
- Animations: Framer Motion for enter/exit/hover effects. Use variants for `initial`/`animate`/`exit`.
- Component composition: small subcomponents for Header, Body, ActionRow, RemoveButton.
- Storybook: add stories for default, hover, selected, removable, and reduced-motion.
- Tests: unit tests with React Testing Library (focus/firing click handlers) and a snapshot story test for the Storybook story.

## Example behavior (UX)

- Default: shows title, subtitle (optional), a short content preview and a small timestamp icon.
- Hover: slight lift (translateY -4px) + shadow increase + accent glow; accent color used for small tag or left border.
- Click (if clickable): subtle scale (0.98) on press (use tap animation) and run `onClick`.
- Remove: small icon button on top-right (visible on hover or always if removable) with accessible label.
- Empty / placeholder: show subtle dashed box with centered friendly copy and an action to 'Add memory'.

## Animation examples (Framer Motion variants)

- variants = {
  hidden: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.3 } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.18 } }
  }

Hover/tap micro-interactions:

- hover: scale: 1.01, translateY: -2, boxShadow: '0 6px 18px rgba(0,0,0,0.08)'
- tap: scale: 0.98

Reduced motion support:

- If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip motion and render immediate state changes.

## Files and tests to add

- src/components/Memory/Memory.tsx (component)
- src/components/Memory/Memory.module.css (if needed) or keep Tailwind-only
- src/components/Memory/Memory.stories.tsx (Storybook)
- src/components/Memory/Memory.test.tsx (RTL tests)
- Optional: src/components/Memory/index.ts

## Acceptance criteria

1. Component renders correctly with given props and matches Storybook visual snapshot.
2. No pink or purple colors appear in component styles (verify palette tokens or inspect computed styles).
3. Keyboard accessible: Tab to the item, Enter/Space activates onClick.
4. Motion respects reduced-motion preference.
5. Unit tests pass for interactive behavior (click, remove, focus).

## Developer hints for Copilot prompts

- "Create a React TypeScript `Memory` component using Tailwind and Framer Motion. Use `emerald` as the accent. Respect prefers-reduced-motion. Include removable option and accessible focus."
- "Write a Storybook story for the Memory component with default/removable/empty variants."
- "Write RTL tests for the Memory component verifying keyboard focus and click behavior."

## Notes

- Keep the visual language calm and neutral; avoid flashy colors. If you need an accent, use teal/sky/indigo in moderate saturation.
- If you need a design token file, place it under `src/styles/tokens.ts` with exported color names (no pink/purple tokens).

If you want, I can scaffold the component + Storybook stories + tests now. Tell me whether to scaffold in the Next.js repo using Tailwind + Framer Motion, or to output a standalone component package.
