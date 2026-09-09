import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
};

/** Interior page header. Same skeleton on every route so the site reads as one place. */
export function PageHeader({ eyebrow, title, lede, className = "" }: Props) {
  return (
    <header className={["max-w-3xl", className].join(" ")}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-6 text-5xl md:text-6xl">{title}</h1>
      {lede ? <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">{lede}</p> : null}
    </header>
  );
}
