import type { ReactNode } from "react";

type Props = {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  /** Optional control rendered opposite the heading (start-aligned only). */
  action?: ReactNode;
  className?: string;
};

/**
 * Section header. The title carries scale, the lede carries voice. No
 * kicker, no numbering: brass is reserved for the terminal period.
 */
export function SectionHeading({ id, title, lede, align = "start", action, className = "" }: Props) {
  const centered = align === "center";
  return (
    <div
      className={[
        centered
          ? "mx-auto flex max-w-3xl flex-col items-center text-center"
          : "flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      ].join(" ")}
    >
      <div className={centered ? "" : "max-w-3xl"}>
        <h2 id={id} className="text-4xl md:text-5xl">
          {title}
        </h2>
        {lede ? <p className="mt-6 max-w-xl text-lg text-ink-muted">{lede}</p> : null}
      </div>
      {!centered && action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
