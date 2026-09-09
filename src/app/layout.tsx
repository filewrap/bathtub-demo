import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, JetBrains_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

/**
 * Display: Bodoni Moda, a high-contrast serif with optical sizing.
 * Body: Manrope. Specs and labels: JetBrains Mono. All self-hosted by
 * next/font and exposed as CSS variables consumed by tokens.css.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NYX Atlas",
    template: "%s | NYX Atlas",
  },
  description: "Bathtubs for the last light on in a dark house.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080D" },
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-theme is set pre-paint by ThemeScript; suppress the expected mismatch.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bodoni.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-body grain">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
