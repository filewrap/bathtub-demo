"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_MEDIA } from "@/lib/media-manifest";
import { HeroStaticPoster } from "./HeroStaticPoster";

type Props = {
  prefersReducedMotion: boolean;
  onError: () => void;
};

/**
 * Mid tier (AC-NYX-HH-003.1, 003.2, 003.4): muted, looping, no controls.
 * Does not autoplay under reduced-motion. Poster stays underneath until the
 * first frame is ready so there is no blank flash.
 */
export function HeroVideo({ prefersReducedMotion, onError }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    el.play().catch(() => {
      /* autoplay blocked; poster remains visible, which is acceptable */
    });
  }, [prefersReducedMotion]);

  return (
    <>
      <HeroStaticPoster
        className={[
          "absolute inset-0 transition-opacity duration-slow ease-gravity",
          ready ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!prefersReducedMotion}
        poster={HERO_MEDIA.poster.src}
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => setReady(true)}
        onError={onError}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {HERO_MEDIA.video.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} onError={onError} />
        ))}
      </video>
    </>
  );
}
