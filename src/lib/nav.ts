export type NavItem = {
  href: string;
  label: string;
};

/** Primary navigation. Shared by HeaderNav and Footer (AC-NYX-001.1, 001.5). */
export const PRIMARY_NAV: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/configure", label: "Configure" },
  { href: "/contact", label: "Contact" },
] as const;

/** True when `pathname` is the page `href` points at (or a child of it). */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
