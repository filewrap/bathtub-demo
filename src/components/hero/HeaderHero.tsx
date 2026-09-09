import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_MEDIA } from "@/lib/media-manifest";
import { HeroMediaController } from "./HeroMediaController";

/**
 * First-viewport hero (AC-NYX-HH-001.1 to 001.4). Server component: the
 * Brand Promise and CTA are in the initial HTML, independent of media. The
 * media box is a reserved, aspect-locked layer behind a scrim that keeps
 * text contrast >= 4.5:1 over any tier.
 */
export function HeaderHero() {
  const { width, height } = HERO_MEDIA.poster;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-line bg-void"
    >
      {/* Reserved media box. Height is locked by aspect ratio on wide screens
          and by min-height on narrow ones, so media never shifts layout. */}
      <div
        className="relative min-h-[36rem] w-full md:min-h-0"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <HeroMediaController />

        {/* Scrim: guarantees legibility over 3D, video, or poster. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/30 md:via-void/70 md:to-void/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent"
        />

        <div className="container-content pointer-events-none absolute inset-0 flex items-center">
          <div className="pointer-events-auto max-w-2xl py-16">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              NYX Atlas
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-5xl text-ink md:text-6xl"
            >
              Sink until the day forgets you.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted md:text-xl">
              Hand-built tubs for people who have decided that standing up is
              overrated.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/configure"
                className="inline-flex h-tap items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-ink shadow-glow transition-transform duration-base ease-gravity hover:-translate-y-px"
              >
                Build your tub
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex h-tap items-center rounded-md border border-line-strong bg-void/40 px-6 text-sm text-ink transition-colors duration-base ease-gravity hover:border-accent hover:text-accent"
              >
                See the range
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
