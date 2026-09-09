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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-16">
        <div className="grid gap-12">
          {GROUPS.map((g, i) => (
            <OptionGroupPanel key={g.key} group={g} index={i} />
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
