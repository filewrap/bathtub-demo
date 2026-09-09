import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { button } from "@/components/ui/button";
import { HeroMediaController } from "./HeroMediaController";

/** Real ranges from the bathtub domain reference. Not marketing numbers. */
const FACTS = [
  { label: "Length", value: "60 to 72 in" },
  { label: "Capacity", value: "40 to 120 gal" },
  { label: "Held at", value: "98 to 104 F" },
];

/**
 * First-viewport hero (AC-NYX-HH-001.1 to 001.4). Server component: the
 * Brand Promise and CTA are in the initial HTML, independent of media. The
 * media layer sits behind a scrim that keeps text contrast >= 4.5:1 over
 * any tier. The tub is the page; the header floats over it.
 */
export function HeaderHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-void"
    >
      {/* Media: top band on small screens, right two thirds from md. */}
      <div className="absolute inset-x-0 top-0 h-[62svh] md:inset-0 md:left-[28%]">
        <HeroMediaController />
      </div>

      {/* Scrims. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/85 to-transparent md:bg-gradient-to-r md:from-void md:via-void/70 md:to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
      />

      <div className="container-content relative flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(var(--size-header)+1rem)] md:justify-center md:pb-0">
        <div className="max-w-4xl">
          <h1 id="hero-heading" className="text-display text-ink">
            Sink until the day forgets you<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-muted md:text-xl">
            Hand-built tubs for people who have decided that standing up is overrated.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/configure" className={button("primary", "lg")}>
              Build your tub
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href="/gallery" className={button("secondary", "lg")}>
              See the range
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-6 md:absolute md:bottom-10 md:left-1/2 md:right-0 md:mt-0 md:w-auto md:max-w-none md:translate-x-0 md:border-0 md:pt-0 lg:left-auto lg:right-10">
          {FACTS.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="label">{f.label}</dt>
              <dd className="spec mt-2 text-sm text-ink md:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
