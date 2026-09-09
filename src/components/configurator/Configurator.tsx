"use client";

import { GROUPS } from "./config-rules";
import { ConfiguratorController } from "./ConfiguratorController";
import { OptionGroupPanel } from "./OptionGroupPanel";
import { ConfiguratorPreview } from "./ConfiguratorPreview";
import { ConfiguratorSummary } from "./ConfiguratorSummary";

/** Assembles controller, six option groups, preview, and summary. */
export function Configurator() {
  return (
    <ConfiguratorController>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="grid gap-5">
          {GROUPS.map((g) => (
            <OptionGroupPanel key={g.key} group={g} />
          ))}
        </div>
        <div className="grid gap-5 lg:sticky lg:top-[calc(var(--size-header)+1rem)]">
          <ConfiguratorPreview />
          <ConfiguratorSummary />
        </div>
      </div>
    </ConfiguratorController>
  );
}
