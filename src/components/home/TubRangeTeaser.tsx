import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  capacityRange,
  DEFAULT_CONFIGURATION,
  SIZE_INCHES,
  type SizeId,
  type TubConfiguration,
} from "@/components/configurator/config-rules";
import { LiveTub } from "@/components/tub/LiveTub";
import { SectionHeading } from "@/components/ui/SectionHeading";

const RANGE: { id: SizeId; name: string; line: string; material: TubConfiguration["material"] }[] = [
  { id: "compact", name: "Compact", line: "Fits the room. Fits you, mostly.", material: "acrylic" },
  { id: "standard", name: "Standard", line: "The sensible amount of oblivion.", material: "cast-iron" },
  { id: "grand", name: "Grand", line: "You could lose a small guest in here.", material: "stone-resin" },
];

/**
 * Tub Range teaser (AC-NYX-003.1). Three sizes matching the configurator's
 * Size group, each drawn live at true relative scale with its real
 * dimensions and derived capacity. Each card enters the configurator.
 */
export function TubRangeTeaser() {
  return (
    <section aria-labelledby="range-heading" className="reveal container-content py-20 md:py-32">
      <SectionHeading
        id="range-heading"
        title="Every tub is a small, private galaxy."
        lede="Pick the one you want to disappear into."
      />
      <ul role="list" className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
        {RANGE.map((tub) => {
          const config: TubConfiguration = { ...DEFAULT_CONFIGURATION, size: tub.id, material: tub.material };
          const { length, width } = SIZE_INCHES[tub.id];
          const cap = capacityRange(config);
          return (
            <li key={tub.id} className="min-w-0">
              <Link
                href="/configure"
                className="card group flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-slow ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
              >
                <div className="stage relative aspect-[4/3] w-full">
                  <LiveTub
                    id={`range-${tub.id}`}
                    config={config}
                    animate={false}
                    className="absolute inset-0 h-full w-full transition-transform duration-drift ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent/0 transition-colors duration-slow ease-out group-hover:bg-accent/5"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-3xl text-ink">{tub.name}</h3>
                    <span className="spec text-xs text-ink-faint">
                      {length} x {width} in
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-ink-muted">{tub.line}</p>
                  <dl className="mt-8 flex items-end justify-between border-t border-line pt-5">
                    <div>
                      <dt className="label">Capacity</dt>
                      <dd className="spec mt-1 text-sm text-ink">
                        {cap.min} to {cap.max} gal
                      </dd>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-base ease-out group-hover:text-accent">
                      Build this one
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="transition-transform duration-base ease-out group-hover:translate-x-0.5"
                      />
                    </span>
                  </dl>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
