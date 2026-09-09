import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const RANGE = [
  { id: "compact", index: "01", name: "Compact", length: 60, width: 30, line: "Fits the room. Fits you, mostly." },
  { id: "standard", index: "02", name: "Standard", length: 66, width: 32, line: "The sensible amount of oblivion." },
  { id: "grand", index: "03", name: "Grand", length: 72, width: 36, line: "You could lose a small guest in here." },
] as const;

const MAX_LENGTH = 72;

/** Top-down tub silhouette, drawn to true relative scale. */
function TubSilhouette({ length, width }: { length: number; width: number }) {
  const w = (length / MAX_LENGTH) * 100;
  const h = (width / MAX_LENGTH) * 100;
  const x = (100 - w) / 2;
  const y = (60 - h) / 2;
  const r = h / 2;
  return (
    <svg viewBox="0 0 100 60" className="h-auto w-full" aria-hidden="true">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        className="fill-surface-overlay stroke-line-strong transition-all duration-slow ease-gravity group-hover:stroke-accent"
        strokeWidth="0.6"
      />
      <rect
        x={x + 3}
        y={y + 3}
        width={w - 6}
        height={h - 6}
        rx={r - 3}
        className="fill-cosmic-indigo/40 transition-all duration-slow ease-gravity group-hover:fill-cosmic-violet/40"
      />
      <circle cx={x + w - 8} cy={30} r="1.2" className="fill-accent" />
    </svg>
  );
}

/**
 * Tub Range teaser (AC-NYX-003.1). Three sizes matching the configurator's
 * Size group; each card enters the configurator.
 */
export function TubRangeTeaser() {
  return (
    <section aria-labelledby="range-heading" className="reveal container-content py-20 md:py-28">
      <SectionHeading
        id="range-heading"
        index="01"
        eyebrow="The range"
        title="Every tub is a small, private galaxy."
        lede="Pick the one you want to disappear into."
      />
      <ul role="list" className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
        {RANGE.map((tub) => (
          <li key={tub.id}>
            <Link
              href="/configure"
              className="card group flex h-full flex-col p-6 transition-[transform,border-color,box-shadow] duration-base ease-gravity hover:-translate-y-1 hover:border-line-strong hover:shadow-lift md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="eyebrow eyebrow-plain">
                  <span className="text-ink-faint">{tub.index}</span>
                  {tub.name}
                </span>
                <span className="text-xs tabular-nums text-ink-faint">
                  {tub.length} x {tub.width} in
                </span>
              </div>
              <div className="my-10">
                <TubSilhouette length={tub.length} width={tub.width} />
              </div>
              <h3 className="text-3xl">{tub.name}</h3>
              <p className="mt-3 flex-1 text-ink-muted">{tub.line}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-base ease-gravity group-hover:text-accent">
                Build this one
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-gravity group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
