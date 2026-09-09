/**
 * Build-time media manifest (Web App blueprint, Integration Contracts).
 * Consumed by the Header Hero and the Media Gallery. Every entry carries
 * intrinsic dimensions so layout space is reserved before load.
 *
 * Asset paths under /media are hand-built SVG scenes until photography and
 * film land. Drop real files at the same paths and flip the `enabled` flags.
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
  /** Short caption shown on hover and in the viewer. */
  caption: string;
};

export type HeroMedia = {
  /** Guaranteed baseline, shipped in the initial HTML. */
  poster: { src: string; width: number; height: number; alt: string };
  /** Set `enabled` once a real film exists at `sources`. */
  video: { enabled: boolean; sources: MediaSource[] };
  /** Set `enabled` once the tub GLB exists at `src`. */
  model: { enabled: boolean; src: string; alt: string };
};

export const HERO_MEDIA: HeroMedia = {
  poster: {
    src: "/media/hero/poster.svg",
    width: 1600,
    height: 1000,
    alt: "A freestanding stone tub, filled, lit by a single brass light in a dark room.",
  },
  video: {
    enabled: false,
    sources: [{ src: "/media/hero/tub.mp4", type: "video/mp4" }],
  },
  model: {
    enabled: false,
    src: "/media/hero/tub.glb",
    alt: "Rotatable 3D tub. Drag to turn it.",
  },
};

function image(id: string, width: number, height: number, alt: string, caption: string): GalleryItem {
  const src = `/media/gallery/${id}.svg`;
  return {
    id,
    type: "image",
    sources: [{ src, type: "image/svg+xml" }],
    poster: src,
    width,
    height,
    alt,
    caption,
  };
}

/**
 * Gallery. Replace SVG scenes with photography and film at the same paths.
 * The `orbit-loop` video source intentionally does not exist yet, which
 * exercises the per-item failure placeholder (AC-NYX-MG-001.6).
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  image("compact-acrylic", 1200, 900, "Compact acrylic soaking tub, brass rim catching the last light.", "Compact, acrylic"),
  image("standard-cast-iron", 1200, 1500, "Standard cast iron tub, matte black, on a dark stone floor.", "Standard, cast iron"),
  image("grand-stone-resin", 1600, 1000, "Grand stone resin tub, wide and shallow-lit, in an empty room.", "Grand, stone resin"),
  {
    id: "orbit-loop",
    type: "video",
    sources: [{ src: "/media/gallery/orbit-loop.mp4", type: "video/mp4" }],
    poster: "/media/gallery/orbit-loop.svg",
    width: 1600,
    height: 900,
    alt: "Slow orbit around a filled tub, steam drifting upward.",
    caption: "Orbit, 40 seconds",
  },
  image("chromotherapy-violet", 1200, 1200, "Underwater LEDs turning the water a deep violet.", "Chromotherapy, violet"),
  image("deep-soak-detail", 1200, 900, "Detail of a deep-soak rim, water at the brim.", "Deep soak, at the brim"),
  image("air-jets-night", 1600, 1000, "Air jets surfacing in a dark tub, seen from above.", "Air jets, from above"),
  image("heater-panel", 1200, 1500, "Inline heater control panel glowing amber.", "Inline heater, 104 F"),
];

export const GALLERY_PREVIEW_COUNT = 4;
