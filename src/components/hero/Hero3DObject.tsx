"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_MEDIA } from "@/lib/media-manifest";
import { HeroStaticPoster } from "./HeroStaticPoster";

type Props = {
  onError: () => void;
};

/**
 * Top tier (AC-NYX-HH-002.1 to 002.4). The model-viewer bundle is imported
 * only when this tier is chosen. Poster shows until the model loads; any
 * failure (bundle or model) is reported so the controller can demote.
 */
export function Hero3DObject({ onError }: Props) {
  const [libReady, setLibReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setLibReady(true);
      })
      .catch(() => {
        if (!cancelled) onError();
      });
    return () => {
      cancelled = true;
    };
  }, [onError]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !libReady) return;
    const onLoad = () => setModelReady(true);
    const onErr = () => onError();
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onErr);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onErr);
    };
  }, [libReady, onError]);

  return (
    <>
      <HeroStaticPoster
        className={[
          "absolute inset-0 transition-opacity duration-slow ease-gravity",
          modelReady ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      {libReady ? (
        <model-viewer
          ref={viewerRef}
          src={HERO_MEDIA.model.src}
          alt={HERO_MEDIA.model.alt}
          camera-controls=""
          disable-zoom=""
          disable-pan=""
          touch-action="pan-y"
          interaction-prompt="none"
          shadow-intensity="0.6"
          exposure="0.9"
          loading="eager"
          className="absolute inset-0 h-full w-full"
          style={{ backgroundColor: "transparent" }}
        />
      ) : null}
    </>
  );
}
