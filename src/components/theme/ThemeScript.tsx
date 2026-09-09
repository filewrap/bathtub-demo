import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme";

/**
 * Blocking inline script that sets `[data-theme]` on <html> before first paint
 * so there is no flash of the wrong theme (ADR-002). Mirrors `resolveTheme`.
 * Must render inside <head> and before any stylesheet-dependent content.
 */
export function ThemeScript() {
  const code = `(function(){try{var k=${JSON.stringify(
    THEME_STORAGE_KEY,
  )};var s=localStorage.getItem(k);var t=(s==="dark"||s==="light")?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":${JSON.stringify(
    DEFAULT_THEME,
  )});document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(
    DEFAULT_THEME,
  )});}})();`;

  return (
    // eslint-disable-next-line react/no-danger
    <script id="nyx-theme-init" dangerouslySetInnerHTML={{ __html: code }} />
  );
}
