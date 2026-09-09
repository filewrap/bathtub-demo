import type { CSSProperties } from "react";
import {
  DEPTH_INCHES,
  SIZE_INCHES,
  type MaterialId,
  type TubConfiguration,
} from "@/components/configurator/config-rules";

type Props = {
  config: TubConfiguration;
  /** Steam, ripples, jets, breathing glow. Off for thumbnails. */
  animate?: boolean;
  /** Accessible description. Omit to mark decorative. */
  label?: string;
  className?: string;
  /** Unique per instance so SVG defs never collide. */
  id: string;
};

const MATERIAL_VAR: Record<MaterialId, string> = {
  acrylic: "acrylic",
  "cast-iron": "iron",
  "stone-resin": "stone",
};

const W = 800;
const H = 520;
const CX = 400;

/**
 * Hand-built SVG tub, side elevation, lit by one brass source. Every visual
 * reads the configuration: length scales the basin, width scales the rim
 * ellipse, depth scales the wall, material sets the finish, hydrotherapy
 * adds jets, the heater warms the water and adds a brass unit, chromotherapy
 * lights the water violet. All colors come from tokens via CSS variables.
 * Server-renderable; animation is pure CSS.
 */
export function LiveTub({ config, animate = true, label, className = "", id }: Props) {
  const { length, width } = SIZE_INCHES[config.size];
  const depth = DEPTH_INCHES[config.depth];

  const halfW = 250 * (length / 72);
  const rimRy = 30 * (width / 36);
  const wall = 70 + 120 * (depth / 20);
  const top = 272 - wall / 2;
  const base = top + wall;
  const inset = halfW * 0.09;
  const L = CX - halfW;
  const R = CX + halfW;

  const led = config.chromotherapy === "underwater-led";
  const warm = config.heater === "inline";
  const jets =
    config.hydrotherapy === "none" ? 0 : config.hydrotherapy === "combination" ? 10 : 6;
  const waterVar = led ? "--water-led" : warm ? "--water-warm" : "--water-still";
  const glowVar = led ? "--color-cosmic-violet" : "--color-accent";

  const m = MATERIAL_VAR[config.material];
  const vars = {
    "--tub-top": `var(--tub-${m}-top)`,
    "--tub-body": `var(--tub-${m}-body)`,
    "--tub-rim": `var(--tub-${m}-rim)`,
  } as CSSProperties;

  const body = [
    `M ${L} ${top}`,
    `L ${L + inset} ${base - 34}`,
    `Q ${L + inset + 10} ${base} ${L + inset + 44} ${base}`,
    `L ${R - inset - 44} ${base}`,
    `Q ${R - inset - 10} ${base} ${R - inset} ${base - 34}`,
    `L ${R} ${top}`,
    "Z",
  ].join(" ");

  const innerRx = halfW * 0.9;
  const innerRy = rimRy * 0.72;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      style={vars}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="55%" r="50%">
          <stop offset="0" style={{ stopColor: `rgb(var(${glowVar}))`, stopOpacity: led ? 0.55 : 0.32 }} />
          <stop offset="0.55" style={{ stopColor: `rgb(var(${glowVar}))`, stopOpacity: led ? 0.16 : 0.08 }} />
          <stop offset="1" style={{ stopColor: `rgb(var(${glowVar}))`, stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style={{ stopColor: "rgb(var(--tub-body))" }} />
          <stop offset="0.5" style={{ stopColor: "rgb(var(--tub-top))", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "rgb(var(--tub-body))" }} />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: `rgb(var(${waterVar}))`, stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "rgb(var(--color-stage-deep))" }} />
        </linearGradient>
        <radialGradient id={`${id}-sheen`} cx="30%" cy="20%" r="70%">
          <stop offset="0" style={{ stopColor: "rgb(var(--color-ink))", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "rgb(var(--color-ink))", stopOpacity: 0 }} />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Light source behind the tub. */}
      <ellipse
        cx={CX}
        cy={top + wall * 0.55}
        rx={halfW * 1.5}
        ry={wall * 1.25}
        fill={`url(#${id}-glow)`}
        className={animate ? "glow-breathe" : undefined}
      />

      {/* Floor shadow. */}
      <ellipse
        cx={CX}
        cy={base + 28}
        rx={halfW * 1.08}
        ry={16}
        style={{ fill: "rgb(var(--color-stage-deep))", opacity: 0.85 }}
      />

      {/* Steam, rising from the surface. */}
      {animate
        ? [-70, 10, 80].map((dx, i) => (
            <ellipse
              key={dx}
              cx={CX + dx}
              cy={top - 6}
              rx={58}
              ry={16}
              filter={`url(#${id}-blur)`}
              className="steam"
              style={{
                fill: "rgb(var(--color-ink))",
                animationDelay: `${i * 3.2}s`,
                transformOrigin: `${CX + dx}px ${top}px`,
              }}
            />
          ))
        : null}

      {/* Feet. */}
      <rect x={L + inset + 54} y={base - 6} width={30} height={24} rx={5} style={{ fill: "rgb(var(--tub-body))" }} />
      <rect x={R - inset - 84} y={base - 6} width={30} height={24} rx={5} style={{ fill: "rgb(var(--tub-body))" }} />

      {/* Basin wall. */}
      <path d={body} fill={`url(#${id}-body)`} />
      <path d={body} fill={`url(#${id}-sheen)`} />

      {/* Rim. */}
      <ellipse cx={CX} cy={top} rx={halfW} ry={rimRy} style={{ fill: "rgb(var(--tub-top))" }} />

      {/* Water. */}
      <ellipse cx={CX} cy={top + 3} rx={innerRx} ry={innerRy} fill={`url(#${id}-water)`} />
      {led ? (
        <ellipse
          cx={CX}
          cy={top + 3}
          rx={innerRx * 0.6}
          ry={innerRy * 0.5}
          filter={`url(#${id}-blur)`}
          style={{ fill: "rgb(var(--color-cosmic-violet))", opacity: 0.6 }}
        />
      ) : null}

      {/* Ripples. */}
      {animate
        ? [0, 1.8, 3.6].map((delay) => (
            <ellipse
              key={delay}
              cx={CX}
              cy={top + 3}
              rx={innerRx}
              ry={innerRy}
              fill="none"
              strokeWidth={1}
              className="ripple"
              style={{ stroke: "rgb(var(--color-ink))", animationDelay: `${delay}s` }}
            />
          ))
        : null}

      {/* Jets around the inner wall. */}
      {Array.from({ length: jets }).map((_, i) => {
        const a = (i / jets) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={CX + Math.cos(a) * innerRx * 0.78}
            cy={top + 3 + Math.sin(a) * innerRy * 0.62}
            r={3.5}
            className={animate ? "jet" : undefined}
            style={{
              fill: "rgb(var(--color-ink))",
              opacity: 0.55,
              animationDelay: `${(i / jets) * 1.9}s`,
            }}
          />
        );
      })}

      {/* Rim edge highlight. */}
      <ellipse
        cx={CX}
        cy={top}
        rx={halfW}
        ry={rimRy}
        fill="none"
        strokeWidth={1.5}
        style={{ stroke: "rgb(var(--tub-rim))", opacity: 0.9 }}
      />
      <path
        d={`M ${L + 6} ${top + 8} L ${L + inset + 4} ${base - 40}`}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        style={{ stroke: "rgb(var(--color-ink))", opacity: 0.14 }}
      />

      {/* Inline heater unit. */}
      {warm ? (
        <g>
          <circle cx={R - 2} cy={top + wall * 0.55} r={9} style={{ fill: "rgb(var(--tub-body))" }} />
          <circle
            cx={R - 2}
            cy={top + wall * 0.55}
            r={4}
            className={animate ? "jet" : undefined}
            style={{ fill: "rgb(var(--color-accent))", opacity: 0.95 }}
          />
        </g>
      ) : null}
    </svg>
  );
}
