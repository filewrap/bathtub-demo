"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isTheme,
  resolveTheme,
  type Theme,
} from "./theme";

type ThemeContextValue = {
  /** Active theme. `null` until hydrated so consumers can avoid mismatches. */
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readDomTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return isTheme(attr) ? attr : DEFAULT_THEME;
}

function applyDomTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Owns the runtime `Theme`. ThemeScript has already set `[data-theme]` before
 * paint; this provider adopts that value on mount, persists changes to
 * localStorage, and follows `prefers-color-scheme` only while no stored choice
 * exists. It is a thin island so hydration cost stays low (ADR-001).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  // Adopt the pre-paint value set by ThemeScript.
  useEffect(() => {
    setThemeState(readDomTheme());
  }, []);

  // Follow the OS preference only when the visitor has not chosen.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        /* storage unavailable */
      }
      if (isTheme(stored)) return;
      const next = resolveTheme(null, e.matches);
      applyDomTheme(next);
      setThemeState(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      const next = resolveTheme(
        e.newValue,
        window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false,
      );
      applyDomTheme(next);
      setThemeState(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyDomTheme(next);
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable; theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const current = theme ?? readDomTheme();
    setTheme(current === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}
