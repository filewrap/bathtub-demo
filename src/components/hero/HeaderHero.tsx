import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_MEDIA } from "@/lib/media-manifest";
import { button } from "@/components/ui/button";
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
      className="starfield relative isolate overflow-hidden border-b border-line bg-void"
    >
      {/* Reserved media box. Height is locked by aspect ratio on wide screens
          and by min-height on narrow ones, so media never shifts layout. */}
      <div
        className="relative min-h-[40rem] w-full md:min-h-[36rem]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <HeroMediaController />

        {/* Scrim: guarantees legibility over 3D, video, or poster. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/20 md:via-void/70 md:to-void/0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/60 to-transparent"
        />

        <div className="container-content pointer-events-none absolute inset-0 flex items-end pb-16 md:items-center md:pb-0">
          <div className="pointer-events-auto max-w-3xl">
            <p className="eyebrow">Hand-built tubs</p>
            <h1 id="hero-heading" className="mt-6 text-6xl text-ink md:text-7xl">
              Sink until the day{" "}
              <em className="display-italic text-accent">forgets you.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink-muted md:text-xl">
              Hand-built tubs for people who have decided that standing up is
              overrated.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/configure" className={button("primary", "lg")}>
                Build your tub
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="/gallery"
                className={button("secondary", "lg", "bg-void/40 backdrop-blur")}
              >
                See the range
              </Link>
            </div>
          </div>
        </div>

        {/* Hairline scroll cue, bottom-right, desktop only. */}
        <div
          aria-hidden="true"
          className="container-content pointer-events-none absolute inset-x-0 bottom-8 hidden justify-end md:flex"
        >
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-ink-faint">
            Scroll
            <span className="block h-px w-12 bg-line-strong" />
          </span>
        </div>
      </div>
    </section>
  );
}
