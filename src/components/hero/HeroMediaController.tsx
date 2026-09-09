"use client";

import { useCallback, useEffect, useState } from "react";
import { HERO_MEDIA } from "@/lib/media-manifest";
import { demote, pickTier, resolveCapability, type HeroTier } from "./capability";
import { Hero3DObject } from "./Hero3DObject";
import { HeroLiveTub } from "./HeroLiveTub";
import { HeroVideo } from "./HeroVideo";
import { HeroStaticPoster } from "./HeroStaticPoster";

/**
 * Owns tier selection (Header Hero blueprint, ADR-001). Renders the poster on
 * the server so it is in the initial HTML, resolves capability once on
 * mount, mounts exactly one tier above it, and demotes on load failure:
 * 3d -> video -> live -> poster.
 */
export function HeroMediaController() {
  const [tier, setTier] = useState<HeroTier>("poster");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const c = resolveCapability();
    setReducedMotion(c.prefersReducedMotion);
    setTier(pickTier(c, HERO_MEDIA));
  }, []);

  const handleError = useCallback(() => {
    setTier((t) => demote(t, HERO_MEDIA));
  }, []);

  return (
    <div className="absolute inset-0" data-hero-tier={tier} aria-hidden={tier !== "3d" ? "true" : undefined}>
      <HeroStaticPoster
        className={[
          "absolute inset-0 transition-opacity duration-drift ease-out",
          tier === "live" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      {tier === "3d" ? (
        <Hero3DObject onError={handleError} />
      ) : tier === "video" ? (
        <HeroVideo prefersReducedMotion={reducedMotion} onError={handleError} />
      ) : tier === "live" ? (
        <HeroLiveTub />
      ) : null}
    </div>
  );
}
