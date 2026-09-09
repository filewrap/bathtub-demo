import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  lede?: ReactNode;
  /** Functional mono line, e.g. real counts. Rendered under the lede. */
  meta?: ReactNode;
  className?: string;
};

/** Interior page header. Same skeleton on every route so the site reads as one place. */
export function PageHeader({ title, lede, meta, className = "" }: Props) {
  return (
    <header className={["max-w-4xl", className].join(" ")}>
      <h1 className="text-display-s text-ink">{title}</h1>
      {lede ? <p className="mt-8 max-w-2xl text-lg text-ink-muted md:text-xl">{lede}</p> : null}
      {meta ? <p className="label mt-8">{meta}</p> : null}
    </header>
  );
}
