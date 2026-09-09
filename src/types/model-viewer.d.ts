import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  poster?: string;
  alt?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
  "camera-controls"?: boolean | "";
  "disable-zoom"?: boolean | "";
  "disable-pan"?: boolean | "";
  "disable-tap"?: boolean | "";
  "touch-action"?: string;
  "interaction-prompt"?: "auto" | "none";
  "camera-orbit"?: string;
  "shadow-intensity"?: string | number;
  exposure?: string | number;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
