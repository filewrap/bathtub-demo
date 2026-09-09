import { HERO_MEDIA } from "@/lib/media-manifest";

/**
 * Guaranteed baseline and load placeholder (AC-NYX-HH-003.3, 003.5). Fills
 * the reserved media box. Rendered server-side so it is in the initial HTML.
 */
export function HeroStaticPoster({ className = "" }: { className?: string }) {
  const { src, width, height, alt } = HERO_MEDIA.poster;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG poster; no optimization needed
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      decoding="async"
      fetchPriority="high"
      className={["h-full w-full object-cover", className].join(" ")}
    />
  );
}
