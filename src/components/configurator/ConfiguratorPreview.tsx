"use client";

import { DEPTH_INCHES, SIZE_INCHES } from "./config-rules";
import { useConfigurator } from "./ConfiguratorController";

const MATERIAL_FILL: Record<string, { top: string; body: string; rim: string }> = {
  acrylic: { top: "#F1EDE5", body: "#C4BEB0", rim: "#FFFDF9" },
  "cast-iron": { top: "#26293E", body: "#0D0F18", rim: "#3E425E" },
  "stone-resin": { top: "#8C8EA0", body: "#545668", rim: "#A8AABE" },
};

/**
 * Visual reflecting the current configuration (AC-NYX-TC-002.3, 002.4).
 * Size scales the basin, depth scales its height, material sets the finish,
 * chromotherapy adds an underwater glow, hydrotherapy adds jets, heater adds
 * a warm hue to the water.
 */
export function ConfiguratorPreview() {
  const { config } = useConfigurator();
  const { length, width } = SIZE_INCHES[config.size];
  const depth = DEPTH_INCHES[config.depth];

  // Map inches to SVG units inside a 400 x 260 stage.
  const rx = (length / 72) * 170;
  const ry = (width / 36) * 34;
  const h = (depth / 20) * 90;
  const cx = 200;
  const topY = 150 - h / 2;
  const fill = MATERIAL_FILL[config.material] ?? MATERIAL_FILL.acrylic;
  const led = config.chromotherapy === "underwater-led";
  const warm = config.heater === "inline";
  const waterColor = led ? "#8A6CD6" : warm ? "#3A3E80" : "#26293E";
  const jets =
    config.hydrotherapy === "none" ? 0 : config.hydrotherapy === "combination" ? 10 : 6;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-line bg-surface-raised shadow-soft"
      style={{ aspectRatio: "400 / 260" }}
      aria-label="Tub preview"
      role="img"
    >
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="cfg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={led ? "#8A6CD6" : "#E8B873"} stopOpacity={led ? 0.7 : 0.25} />
            <stop offset="1" stopColor={led ? "#8A6CD6" : "#E8B873"} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={topY + h + 14} rx={rx + 10} ry={ry * 0.6} fill="#000" opacity="0.45" />
        <ellipse
          cx={cx}
          cy={topY + h * 0.6}
          rx={rx * 1.3}
          ry={ry * 2.4}
          fill="url(#cfg-glow)"
          className="transition-all duration-slow ease-gravity"
        />
        <path
          d={`M ${cx - rx} ${topY} L ${cx - rx * 0.92} ${topY + h} Q ${cx} ${topY + h + ry * 1.4} ${cx + rx * 0.92} ${topY + h} L ${cx + rx} ${topY} Z`}
          fill={fill.body}
          className="transition-all duration-slow ease-gravity"
        />
        <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill={fill.top} className="transition-all duration-slow ease-gravity" />
        <ellipse
          cx={cx}
          cy={topY + 2}
          rx={rx * 0.88}
          ry={ry * 0.72}
          fill={waterColor}
          className="transition-all duration-slow ease-gravity"
        />
        {led ? (
          <ellipse cx={cx} cy={topY + 2} rx={rx * 0.6} ry={ry * 0.45} fill="#C6CAE2" opacity="0.55" />
        ) : null}
        {Array.from({ length: jets }).map((_, i) => {
          const a = (i / jets) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={cx + Math.cos(a) * rx * 0.7}
              cy={topY + 2 + Math.sin(a) * ry * 0.55}
              r="3"
              fill="#ECECF4"
              opacity="0.6"
            />
          );
        })}
        <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill="none" stroke={fill.rim} strokeWidth="2" />
        {warm ? (
          <circle cx={cx + rx * 0.95} cy={topY + h * 0.5} r="5" fill="#E8B873">
            <title>Inline heater</title>
          </circle>
        ) : null}
      </svg>
      <dl className="absolute bottom-3 left-3 flex gap-4 text-xs text-ink-muted">
        <div>
          <dt className="sr-only">Size</dt>
          <dd>{length} x {width} in</dd>
        </div>
        <div>
          <dt className="sr-only">Depth</dt>
          <dd>{depth} in deep</dd>
        </div>
      </dl>
    </div>
  );
}
