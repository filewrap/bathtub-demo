import type { HeroMedia } from "@/lib/media-manifest";

/**
 * `HeroMediaCapability` (Header Hero blueprint, Integration Contracts).
 * Resolved once at mount by HeroMediaController.
 */
export type EffectiveConnectionType = "slow-2g" | "2g" | "3g" | "4g" | "unknown";

export type HeroMediaCapability = {
  supports3D: boolean;
  effectiveConnectionType: EffectiveConnectionType;
  saveData: boolean;
  prefersReducedMotion: boolean;
};

/**
 * Tier ladder: 3d -> video -> live -> poster. `live` is the hand-built SVG
 * tub scene: cheap, no network, animated by CSS. 3d and video only enter the
 * ladder when the manifest marks their assets as present.
 */
export type HeroTier = "3d" | "video" | "live" | "poster";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

function readConnection(): NetworkInformationLike | undefined {
  const nav = navigator as Navigator & { connection?: NetworkInformationLike };
  return nav.connection;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function resolveCapability(): HeroMediaCapability {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const conn = readConnection();
  const raw = conn?.effectiveType;
  const effectiveConnectionType: EffectiveConnectionType =
    raw === "slow-2g" || raw === "2g" || raw === "3g" || raw === "4g" ? raw : "unknown";
  const saveData = Boolean(conn?.saveData);

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const fastEnough = effectiveConnectionType === "4g" || effectiveConnectionType === "unknown";

  const supports3D = hasWebGL() && cores >= 4 && memory >= 4 && fastEnough && !saveData;

  return { supports3D, effectiveConnectionType, saveData, prefersReducedMotion };
}

/** Reduced motion forces the static poster. */
export function pickTier(c: HeroMediaCapability, media: HeroMedia): HeroTier {
  if (c.prefersReducedMotion) return "poster";
  if (media.model.enabled && c.supports3D) return "3d";
  const videoOk =
    !c.saveData &&
    (c.effectiveConnectionType === "4g" ||
      c.effectiveConnectionType === "3g" ||
      c.effectiveConnectionType === "unknown");
  if (media.video.enabled && videoOk) return "video";
  return "live";
}

export function demote(tier: HeroTier, media: HeroMedia): HeroTier {
  if (tier === "3d") return media.video.enabled ? "video" : "live";
  if (tier === "video") return "live";
  return "poster";
}
