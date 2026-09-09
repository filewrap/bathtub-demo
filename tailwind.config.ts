import type { Config } from "tailwindcss";

/**
 * Tailwind consumes the NYX Atlas design tokens defined as CSS custom
 * properties in `src/styles/tokens.css`. Components reference these utilities
 * (e.g. `bg-surface`, `text-ink`, `text-accent`) and never hardcode hex values.
 * See Web App blueprint, ADR-003.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      void: "rgb(var(--color-void) / <alpha-value>)",
      surface: {
        DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
        raised: "rgb(var(--color-surface-raised) / <alpha-value>)",
        overlay: "rgb(var(--color-surface-overlay) / <alpha-value>)",
      },
      ink: {
        DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
        faint: "rgb(var(--color-ink-faint) / <alpha-value>)",
      },
      line: {
        DEFAULT: "rgb(var(--color-line) / <alpha-value>)",
        strong: "rgb(var(--color-line-strong) / <alpha-value>)",
      },
      cosmic: {
        blue: "rgb(var(--color-cosmic-blue) / <alpha-value>)",
        violet: "rgb(var(--color-cosmic-violet) / <alpha-value>)",
        indigo: "rgb(var(--color-cosmic-indigo) / <alpha-value>)",
      },
      accent: {
        DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
        ink: "rgb(var(--color-accent-ink) / <alpha-value>)",
      },
      focus: "rgb(var(--color-focus) / <alpha-value>)",
      danger: "rgb(var(--color-danger) / <alpha-value>)",
      success: "rgb(var(--color-success) / <alpha-value>)",
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
    },
    fontSize: {
      xs: ["var(--text-xs)", { lineHeight: "var(--leading-normal)" }],
      sm: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
      base: ["var(--text-base)", { lineHeight: "var(--leading-relaxed)" }],
      lg: ["var(--text-lg)", { lineHeight: "var(--leading-relaxed)" }],
      xl: ["var(--text-xl)", { lineHeight: "var(--leading-snug)" }],
      "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-snug)" }],
      "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-tight)" }],
      "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-tight)" }],
      "5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-none)" }],
      "6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-none)" }],
    },
    spacing: {
      0: "0",
      px: "1px",
      0.5: "var(--space-0-5)",
      1: "var(--space-1)",
      1.5: "var(--space-1-5)",
      2: "var(--space-2)",
      3: "var(--space-3)",
      4: "var(--space-4)",
      5: "var(--space-5)",
      6: "var(--space-6)",
      8: "var(--space-8)",
      10: "var(--space-10)",
      12: "var(--space-12)",
      16: "var(--space-16)",
      20: "var(--space-20)",
      24: "var(--space-24)",
      32: "var(--space-32)",
      tap: "var(--size-tap)",
    },
    borderRadius: {
      none: "0",
      sm: "var(--radius-sm)",
      DEFAULT: "var(--radius-md)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      soft: "var(--shadow-soft)",
      lift: "var(--shadow-lift)",
      glow: "var(--shadow-glow)",
    },
    transitionDuration: {
      fast: "var(--motion-fast)",
      base: "var(--motion-base)",
      slow: "var(--motion-slow)",
      drift: "var(--motion-drift)",
    },
    transitionTimingFunction: {
      gravity: "var(--ease-gravity)",
      drift: "var(--ease-drift)",
    },
    extend: {
      maxWidth: {
        content: "var(--size-content)",
      },
    },
  },
  plugins: [],
};

export default config;
