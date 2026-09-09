import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  /** Two-digit section index shown before the eyebrow, e.g. "02". */
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  /** Optional control rendered opposite the heading (start-aligned only). */
  action?: ReactNode;
  className?: string;
};

/**
 * Section header used by every Home section. Eyebrow carries brass; the
 * title carries scale; the lede carries voice.
 */
export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  lede,
  align = "start",
  action,
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={[
        centered
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex flex-wrap items-end justify-between gap-x-10 gap-y-6",
        className,
      ].join(" ")}
    >
      <div className={centered ? "" : "max-w-2xl"}>
        <p className={["eyebrow", centered ? "eyebrow-plain" : ""].join(" ")}>
          {index ? <span className="text-ink-faint">{index}</span> : null}
          {eyebrow}
        </p>
        <h2 id={id} className="mt-5 text-4xl md:text-5xl">
          {title}
        </h2>
        {lede ? <p className="mt-5 max-w-xl text-lg text-ink-muted">{lede}</p> : null}
      </div>
      {!centered && action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
