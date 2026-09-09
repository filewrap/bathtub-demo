import type { ClientName } from "@/lib/client-names";
import styles from "./MarqueeRow.module.css";

type Props = {
  names: readonly ClientName[];
  direction: "left" | "right";
  /** Seconds for one full loop. */
  durationSeconds?: number;
  label: string;
};

/**
 * One continuously drifting row (Customers Atlas blueprint, ADR-001).
 * Pure CSS transform on a duplicated track so the loop is seamless
 * (AC-NYX-CA-001.3). Direction via animation-direction (001.2). Pauses on
 * hover (hover-capable devices) and focus-within (002.2). Under
 * prefers-reduced-motion the CSS module renders a static wrapped list
 * (002.1). Row is focusable so keyboard users can pause and read.
 */
export function MarqueeRow({ names, direction, durationSeconds = 60, label }: Props) {
  const items = names.map((n) => (
    <li key={n} className={styles.name}>
      {n}
    </li>
  ));

  return (
    <div
      className={[styles.row, direction === "right" ? styles.reverse : ""].join(" ")}
      tabIndex={0}
      role="group"
      aria-label={`${label}. Hover or focus to pause.`}
      style={{ ["--marquee-duration" as string]: `${durationSeconds}s` } as React.CSSProperties}
    >
      <div className={styles.track}>
        <ul className={styles.copy} role="list">
          {items}
        </ul>
        <ul className={[styles.copy, styles.duplicate].join(" ")} aria-hidden="true">
          {items}
        </ul>
      </div>
    </div>
  );
}
