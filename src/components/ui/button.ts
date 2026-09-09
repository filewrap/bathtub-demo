/**
 * Button recipe. One source for every call to action so radii, heights,
 * hover lift, pressed state, and disabled state stay identical across the
 * site. Use with <button> or <Link>. Text never wraps to two lines.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[transform,color,background-color,border-color,box-shadow] duration-base ease-out " +
  "active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink shadow-glow hover:-translate-y-px",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:bg-surface-raised hover:text-ink",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-tap px-6 text-sm",
  lg: "h-[3.5rem] px-8 text-base",
};

export function button(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [BASE, VARIANT[variant], SIZE[size], extra].filter(Boolean).join(" ");
}

/** Square icon button, same voice as `secondary`. */
export const iconButton =
  "inline-flex h-tap w-tap shrink-0 items-center justify-center rounded-full border border-line text-ink-muted " +
  "transition-[color,border-color,background-color] duration-base ease-out hover:border-line-strong hover:text-ink";
