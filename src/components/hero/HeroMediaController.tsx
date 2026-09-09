"use client";

import { useCallback, useEffect, useState } from "react";
import {
  demote,
  pickTier,
  resolveCapability,
  type HeroMediaCapability,
  type HeroTier,
} from "./capability";
import { Hero3DObject } from "./Hero3DObject";
import { HeroVideo } from "./HeroVideo";
import { HeroStaticPoster } from "./HeroStaticPoster";

/**
 * Owns tier selection (Header Hero blueprint, ADR-001). Renders the poster on
 * the server so it is in the initial HTML, resolves `HeroMediaCapability`
 * once on mount, mounts exactly one tier, and demotes on load failure:
 * 3D -> video -> poster.
 */
export function HeroMediaController() {
  const [capability, setCapability] = useState<HeroMediaCapability | null>(null);
  const [tier, setTier] = useState<HeroTier>("poster");

  useEffect(() => {
    const c = resolveCapability();
    setCapability(c);
    setTier(pickTier(c));
  }, []);

  const handleError = useCallback(() => {
    setTier((t) => demote(t));
  }, []);

  return (
    <div
      className="absolute inset-0"
      data-hero-tier={tier}
      aria-hidden={tier !== "3d" ? "true" : undefined}
    >
      {tier === "3d" && capability ? (
        <Hero3DObject onError={handleError} />
      ) : tier === "video" && capability ? (
        <HeroVideo
          prefersReducedMotion={capability.prefersReducedMotion}
          onError={handleError}
        />
      ) : (
        <HeroStaticPoster className="absolute inset-0" />
      )}
    </div>
  );
}
