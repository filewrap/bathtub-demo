/**
 * Build-time media manifest (Web App blueprint, Integration Contracts).
 * Consumed by the Header Hero and the Media Gallery. Every entry carries
 * intrinsic dimensions so layout space is reserved before load.
 *
 * Asset paths under /media are placeholders until final assets land.
 */

export type MediaSource = {
  src: string;
  type: string;
};

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  /** Image: responsive candidates. Video: source encodings. */
  sources: MediaSource[];
  /** Still shown before load and as the video poster. */
  poster: string;
  width: number;
  height: number;
  alt: string;
};

export type HeroMedia = {
  /** Guaranteed baseline, shipped in the initial HTML. */
  poster: { src: string; width: number; height: number; alt: string };
  video: { sources: MediaSource[] };
  model: {
    /** glTF/GLB URL. Placeholder sample until the tub model is produced. */
    src: string;
    alt: string;
  };
};

export const HERO_MEDIA: HeroMedia = {
  poster: {
    src: "/media/hero/poster.svg",
    width: 1600,
    height: 1000,
    alt: "A freestanding tub glowing faintly in a dark room.",
  },
  video: {
    // Placeholder path. Missing until the hero video is produced; the
    // controller demotes to the poster when it fails to load.
    sources: [{ src: "/media/hero/tub.mp4", type: "video/mp4" }],
  },
  model: {
    // Placeholder sample model so the 3D tier is exercisable before the tub
    // GLB exists. Replace with /media/hero/tub.glb when available.
    src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    alt: "Rotatable 3D preview. Drag to turn it.",
  },
};

function image(
  id: string,
  width: number,
  height: number,
  alt: string,
): GalleryItem {
  const src = `/media/gallery/${id}.svg`;
  return {
    id,
    type: "image",
    sources: [{ src, type: "image/svg+xml" }],
    poster: src,
    width,
    height,
    alt,
  };
}

/**
 * Placeholder gallery. Replace SVGs with real photography and video. The
 * `orbit-loop` video source intentionally does not exist yet, which
 * exercises the per-item failure placeholder (AC-NYX-MG-001.6).
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  image("compact-acrylic", 1200, 900, "Compact acrylic soaking tub, brass rim catching the last light."),
  image("standard-cast-iron", 1200, 1500, "Standard cast iron tub, matte black, on a dark stone floor."),
  image("grand-stone-resin", 1600, 1000, "Grand stone resin tub, wide and shallow-lit, in an empty room."),
  {
    id: "orbit-loop",
    type: "video",
    sources: [{ src: "/media/gallery/orbit-loop.mp4", type: "video/mp4" }],
    poster: "/media/gallery/orbit-loop.svg",
    width: 1600,
    height: 900,
    alt: "Slow orbit around a filled tub, steam drifting upward.",
  },
  image("chromotherapy-violet", 1200, 1200, "Underwater LEDs turning the water a deep violet."),
  image("deep-soak-detail", 1200, 900, "Detail of a deep-soak rim, water at the brim."),
  image("air-jets-night", 1600, 1000, "Air jets surfacing in a dark tub, seen from above."),
  image("heater-panel", 1200, 1500, "Inline heater control panel glowing amber."),
];

export const GALLERY_PREVIEW_COUNT = 4;
