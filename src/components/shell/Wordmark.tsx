import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NYX Atlas, home"
      className={[
        "inline-flex h-tap items-center gap-2 rounded-sm font-display text-xl tracking-tight text-ink",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full bg-accent shadow-glow"
      />
      <span>
        NYX <span className="text-ink-muted">Atlas</span>
      </span>
    </Link>
  );
}
