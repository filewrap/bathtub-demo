import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

/**
 * Display: Fraunces, a soft-serif with optical sizing and a wonky italic.
 * Body: Inter. Both self-hosted by next/font, exposed as CSS variables that
 * tokens.css consumes via --font-display / --font-body.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      className={`${fraunces.variable} ${inter.variable}`}
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
