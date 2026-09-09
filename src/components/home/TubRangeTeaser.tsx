import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RANGE = [
  {
    id: "compact",
    name: "Compact",
    size: "60 in",
    line: "Fits the room. Fits you, mostly.",
  },
  {
    id: "standard",
    name: "Standard",
    size: "66 in",
    line: "The sensible amount of oblivion.",
  },
  {
    id: "grand",
    name: "Grand",
    size: "72 in",
    line: "You could lose a small guest in here.",
  },
] as const;

/**
 * Tub Range teaser (AC-NYX-003.1). Three sizes matching the configurator's
 * Size group; each card enters the configurator.
 */
export function TubRangeTeaser() {
  return (
    <section aria-labelledby="range-heading" className="container-content py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 id="range-heading" className="text-3xl md:text-4xl">
          Every tub is a small, private galaxy.
        </h2>
        <p className="mt-4 text-ink-muted">Pick the one you want to disappear into.</p>
      </div>
      <ul role="list" className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {RANGE.map((tub, i) => (
          <li key={tub.id}>
            <Link
              href="/configure"
              className="group flex h-full flex-col justify-between rounded-lg border border-line bg-surface p-6 shadow-soft transition-all duration-base ease-gravity hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
            >
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl">{tub.name}</h3>
                  <span className="text-sm text-ink-faint">{tub.size}</span>
                </div>
                <div
                  aria-hidden="true"
                  className="mt-6 h-2 rounded-full bg-surface-overlay"
                  style={{ width: `${55 + i * 20}%` }}
                >
                  <div className="h-full w-1/3 rounded-full bg-accent/70 shadow-glow" />
                </div>
                <p className="mt-6 text-ink-muted">{tub.line}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-base ease-gravity group-hover:text-accent">
                Build this one
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
