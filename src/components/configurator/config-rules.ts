/**
 * ConfigRules (Tub Configurator blueprint): option catalog, defaults,
 * dependency rules, and capacity derivation. Pure module, no React.
 */

export type SizeId = "compact" | "standard" | "grand";
export type MaterialId = "acrylic" | "cast-iron" | "stone-resin";
export type HydrotherapyId = "none" | "water-jets" | "air-jets" | "combination";
export type HeaterId = "off" | "inline";
export type ChromotherapyId = "off" | "underwater-led";
export type DepthId = "standard" | "deep-soak";

export type TubConfiguration = {
  size: SizeId;
  material: MaterialId;
  hydrotherapy: HydrotherapyId;
  heater: HeaterId;
  chromotherapy: ChromotherapyId;
  depth: DepthId;
};

export type GroupKey = keyof TubConfiguration;

export type Option<Id extends string = string> = {
  id: Id;
  label: string;
  detail: string;
};

export type OptionGroup<K extends GroupKey = GroupKey> = {
  key: K;
  label: string;
  intro: string;
  options: readonly Option<TubConfiguration[K]>[];
};

export const SIZE_INCHES: Record<SizeId, { length: number; width: number }> = {
  compact: { length: 60, width: 30 },
  standard: { length: 66, width: 32 },
  grand: { length: 72, width: 36 },
};

export const DEPTH_INCHES: Record<DepthId, number> = {
  standard: 14,
  "deep-soak": 20,
};

export const GROUPS: readonly [
  OptionGroup<"size">,
  OptionGroup<"material">,
  OptionGroup<"hydrotherapy">,
  OptionGroup<"heater">,
  OptionGroup<"chromotherapy">,
  OptionGroup<"depth">,
] = [
  {
    key: "size",
    label: "Size",
    intro: "How much room you need to stop existing in.",
    options: [
      { id: "compact", label: "Compact", detail: "60 in. Fits the room. Fits you, mostly." },
      { id: "standard", label: "Standard", detail: "66 in. The sensible amount of oblivion." },
      { id: "grand", label: "Grand", detail: "72 in. You could lose a small guest in here." },
    ],
  },
  {
    key: "material",
    label: "Material",
    intro: "What the dark is made of.",
    options: [
      { id: "acrylic", label: "Acrylic", detail: "High-gloss, light (70 to 110 lb), easy to install." },
      { id: "cast-iron", label: "Cast Iron", detail: "250 to 500 lb. Holds heat like a grudge." },
      { id: "stone-resin", label: "Stone Resin", detail: "Premium, matte, quietly expensive." },
    ],
  },
  {
    key: "hydrotherapy",
    label: "Hydrotherapy",
    intro: "Whether the water does anything, or just holds you.",
    options: [
      { id: "none", label: "None", detail: "Soaking only. Stillness is a feature." },
      { id: "water-jets", label: "Water Jets", detail: "6 to 13 jets. Firm, directed, insistent." },
      { id: "air-jets", label: "Air Jets", detail: "10 to 30 jets. Soft, everywhere, like being fizzy." },
      { id: "combination", label: "Combination", detail: "Both. For people who cannot decide, correctly." },
    ],
  },
  {
    key: "heater",
    label: "Heater",
    intro: "Whether the warmth outlasts you.",
    options: [
      { id: "off", label: "Off", detail: "The water cools. So does the day." },
      { id: "inline", label: "Inline Heater", detail: "500 to 1000 W. Holds 98 to 104 F indefinitely." },
    ],
  },
  {
    key: "chromotherapy",
    label: "Chromotherapy",
    intro: "Light, but underwater, where it belongs.",
    options: [
      { id: "off", label: "Off", detail: "Dark water. Honest." },
      { id: "underwater-led", label: "Underwater LED", detail: "6 to 7 colors. Pick your own dusk." },
    ],
  },
  {
    key: "depth",
    label: "Depth",
    intro: "How far down you intend to go.",
    options: [
      { id: "standard", label: "Standard", detail: "14 in. Shoulders above the surface, if you insist." },
      { id: "deep-soak", label: "Deep Soak", detail: "20 in. Everything below the chin is someone else's problem." },
    ],
  },
];

export const DEFAULT_CONFIGURATION: TubConfiguration = {
  size: "standard",
  material: "acrylic",
  hydrotherapy: "none",
  heater: "off",
  chromotherapy: "off",
  depth: "standard",
};

/** Dependency rules. Heater and chromotherapy need a pump (any hydrotherapy). */
export function hasPump(c: TubConfiguration): boolean {
  return c.hydrotherapy !== "none";
}

export type OptionAvailability = {
  disabled: boolean;
  reason?: string;
};

/**
 * Availability of an option given the current configuration
 * (AC-NYX-TC-003.1). The inline heater is presented as independent (it does
 * not need a pump), so nothing in Heater is disabled. Underwater LED needs
 * the powered circuit that comes with a pump.
 */
export function availability<K extends GroupKey>(
  c: TubConfiguration,
  group: K,
  optionId: TubConfiguration[K],
): OptionAvailability {
  if (group === "chromotherapy" && optionId === "underwater-led" && !hasPump(c)) {
    return {
      disabled: true,
      reason: "Needs a powered circuit. Pick any hydrotherapy first.",
    };
  }
  return { disabled: false };
}

export type ResolveResult = {
  config: TubConfiguration;
  /** Options that were reset to a default because they became incompatible. */
  resets: { group: GroupKey; from: string; to: string; reason: string }[];
};

/**
 * Apply a change and resolve any incompatibilities by resetting the
 * offending option to its default (AC-NYX-TC-003.2).
 */
export function resolve<K extends GroupKey>(
  current: TubConfiguration,
  group: K,
  value: TubConfiguration[K],
): ResolveResult {
  const next: TubConfiguration = { ...current, [group]: value };
  const resets: ResolveResult["resets"] = [];

  if (!hasPump(next) && next.chromotherapy === "underwater-led") {
    resets.push({
      group: "chromotherapy",
      from: next.chromotherapy,
      to: DEFAULT_CONFIGURATION.chromotherapy,
      reason: "Chromotherapy switched off: it needs the pump you just removed.",
    });
    next.chromotherapy = DEFAULT_CONFIGURATION.chromotherapy;
  }

  return { config: next, resets };
}

export function isTubConfiguration(value: unknown): value is TubConfiguration {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return GROUPS.every((g) =>
    (g.options as readonly Option[]).some((o) => o.id === v[g.key]),
  );
}

/**
 * Estimated water capacity in US gallons from Size and Depth
 * (AC-NYX-TC-002.2). Interior volume approximated as an ellipsoid-ish basin:
 * 0.55 x L x W x fill depth, converted at 231 in^3 per gallon, with a
 * +/- 12% band for basin shape.
 */
export function capacityRange(c: TubConfiguration): { min: number; max: number } {
  const { length, width } = SIZE_INCHES[c.size];
  const depth = DEPTH_INCHES[c.depth];
  const fill = depth - 2; // overflow sits ~2 in below the rim
  const cubicInches = 0.55 * length * width * fill;
  const gallons = cubicInches / 231;
  return {
    min: Math.round(gallons * 0.88),
    max: Math.round(gallons * 1.12),
  };
}

export function optionLabel<K extends GroupKey>(group: K, id: TubConfiguration[K]): string {
  const g = GROUPS.find((x) => x.key === group);
  const o = (g?.options as readonly Option[] | undefined)?.find((x) => x.id === id);
  return o?.label ?? String(id);
}

/** Human-readable summary for the Enquiry Handoff (Contact Page contract). */
export function toConfigurationSummary(c: TubConfiguration): string {
  const cap = capacityRange(c);
  const { length, width } = SIZE_INCHES[c.size];
  return [
    `Size: ${optionLabel("size", c.size)} (${length} x ${width} in)`,
    `Material: ${optionLabel("material", c.material)}`,
    `Hydrotherapy: ${optionLabel("hydrotherapy", c.hydrotherapy)}`,
    `Heater: ${optionLabel("heater", c.heater)}`,
    `Chromotherapy: ${optionLabel("chromotherapy", c.chromotherapy)}`,
    `Depth: ${optionLabel("depth", c.depth)} (${DEPTH_INCHES[c.depth]} in)`,
    `Estimated capacity: ${cap.min} to ${cap.max} gal`,
  ].join("\n");
}
