"use client";

import { DEPTH_INCHES, SIZE_INCHES } from "./config-rules";
import { LiveTub } from "@/components/tub/LiveTub";
import { useConfigurator } from "./ConfiguratorController";

/**
 * Visual reflecting the current configuration (AC-NYX-TC-002.3, 002.4).
 * Size scales the basin, depth scales its height, material sets the finish,
 * chromotherapy lights the water, hydrotherapy adds jets, heater warms the
 * water. The tub breathes. All colors come from tokens.
 */
export function ConfiguratorPreview() {
  const { config } = useConfigurator();
  const { length, width } = SIZE_INCHES[config.size];
  const depth = DEPTH_INCHES[config.depth];

  return (
    <div className="stage card relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
      <div className="breathe absolute inset-0 p-4">
        <LiveTub
          id="cfg-tub"
          config={config}
          className="h-full w-full transition-all duration-slow ease-out"
          label={`Tub preview: ${length} by ${width} inches, ${depth} inches deep.`}
        />
      </div>
      <dl className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <div>
          <dt className="label">Footprint</dt>
          <dd className="spec mt-1 text-sm text-ink">
            {length} x {width} in
          </dd>
        </div>
        <div className="text-right">
          <dt className="label">Depth</dt>
          <dd className="spec mt-1 text-sm text-ink">{depth} in</dd>
        </div>
      </dl>
    </div>
  );
}
