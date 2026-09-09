export type Theme = "dark" | "light";

export const THEMES: readonly Theme[] = ["dark", "light"] as const;
export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "nyx-atlas:theme";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Theme resolution order (NYX Atlas Marketing Site, ADR-002):
 * 1. A stored choice always wins.
 * 2. Otherwise `prefers-color-scheme: light` yields Light.
 * 3. Otherwise Dark.
 *
 * Kept as a plain function so ThemeScript can inline the same logic.
 */
export function resolveTheme(
  stored: string | null,
  prefersLight: boolean,
): Theme {
  if (isTheme(stored)) return stored;
  return prefersLight ? "light" : DEFAULT_THEME;
}
