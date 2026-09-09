/**
 * Button recipe. One source for every call to action so radii, heights,
 * hover lift, pressed state, and disabled state stay identical across the
 * site. Use with <button> or <Link>.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-[transform,color,background-color,border-color,box-shadow] duration-base ease-gravity " +
  "active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink shadow-glow hover:-translate-y-px",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:bg-surface-raised hover:text-ink",
};

const SIZE: Record<ButtonSize, string> = {
  md: "h-tap px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

export function button(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [BASE, VARIANT[variant], SIZE[size], extra].filter(Boolean).join(" ");
}
