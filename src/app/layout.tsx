import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-body">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
