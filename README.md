# NYX Atlas

Marketing site for the NYX Atlas bathtub range. Next.js App Router, React, Tailwind CSS driven by CSS custom-property design tokens.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `src/styles/tokens.css`: design tokens (color, type, spacing, radii, shadow, motion). Dark is default; `[data-theme="light"]` flips the palette.
- `tailwind.config.ts`: maps tokens to Tailwind utilities. Components use utilities or tokens, never raw hex.
- `src/components/shell`: `AppShell`, `HeaderNav`, `Footer`, `Wordmark`.
- `src/components/theme`: `ThemeProvider`, `ThemeToggle`, `ThemeScript` (pre-paint no-flash script).
- `src/app`: routes `/`, `/gallery`, `/configure`, `/contact`, `/privacy`.

## Theme resolution

1. Stored choice in `localStorage` (`nyx-atlas:theme`) always wins.
2. Otherwise `prefers-color-scheme: light` yields Light.
3. Otherwise Dark.
