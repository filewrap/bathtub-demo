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

export type HeroTier = "3d" | "video" | "poster";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

function readConnection(): NetworkInformationLike | undefined {
  const nav = navigator as Navigator & {
    connection?: NetworkInformationLike;
    deviceMemory?: number;
  };
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
    raw === "slow-2g" || raw === "2g" || raw === "3g" || raw === "4g"
      ? raw
      : "unknown";
  const saveData = Boolean(conn?.saveData);

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const fastEnough =
    effectiveConnectionType === "4g" || effectiveConnectionType === "unknown";

  const supports3D =
    hasWebGL() && cores >= 4 && memory >= 4 && fastEnough && !saveData;

  return { supports3D, effectiveConnectionType, saveData, prefersReducedMotion };
}

/** Tier order is 3D -> video -> poster; reduced-motion forces poster. */
export function pickTier(c: HeroMediaCapability): HeroTier {
  if (c.prefersReducedMotion) return "poster";
  if (c.supports3D) return "3d";
  const videoOk =
    !c.saveData &&
    (c.effectiveConnectionType === "4g" ||
      c.effectiveConnectionType === "3g" ||
      c.effectiveConnectionType === "unknown");
  return videoOk ? "video" : "poster";
}

export function demote(tier: HeroTier): HeroTier {
  return tier === "3d" ? "video" : "poster";
}
