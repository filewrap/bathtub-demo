"use client";

import { useEffect, useState } from "react";

/**
 * The visitor's local clock, in the header. Late hours are the brand's
 * home, so the line under the time says whether it is dark enough yet.
 * Renders a neutral placeholder until mounted so server and client match.
 */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  const [late, setLate] = useState(false);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });
    const tick = () => {
      const now = new Date();
      setTime(fmt.format(now));
      const h = now.getHours();
      setLate(h >= 21 || h < 5);
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={["label flex items-center gap-2 text-ink-muted", className].join(" ")}>
      <span
        aria-hidden="true"
        className={["h-1.5 w-1.5 rounded-full", late ? "bg-accent animate-pulse" : "bg-ink-faint"].join(" ")}
      />
      <span className="spec">{time ?? "--:--"}</span>
      <span className="hidden text-ink-faint xl:inline">{time ? (late ? "Late enough." : "Not yet dark.") : ""}</span>
    </p>
  );
}
