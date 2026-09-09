import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { HeaderNav } from "./HeaderNav";
import { Footer } from "./Footer";

/**
 * Persistent shell rendered around every route: header, page outlet, footer.
 * Hosts ThemeProvider so theme applies globally. ConsentProvider and the
 * ConsentBanner mount here in the Privacy work order.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-lift"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col">
        <HeaderNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
