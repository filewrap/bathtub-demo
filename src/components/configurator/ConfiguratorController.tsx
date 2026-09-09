"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CONFIGURATION,
  isTubConfiguration,
  resolve,
  toConfigurationSummary,
  type GroupKey,
  type ResolveResult,
  type TubConfiguration,
} from "./config-rules";
import { writeEnquiryHandoff } from "./enquiry-handoff";

const CONFIG_STORAGE_KEY = "nyx-atlas:tub-configuration";

type Notice = { id: number; message: string };

type ControllerValue = {
  config: TubConfiguration;
  hydrated: boolean;
  notice: Notice | null;
  setOption: <K extends GroupKey>(group: K, value: TubConfiguration[K]) => void;
  reset: () => void;
  handoff: () => void;
};

const Ctx = createContext<ControllerValue | null>(null);

/**
 * Single source of truth (Tub Configurator blueprint, ADR-001). Restores
 * from sessionStorage on mount (AC-NYX-TC-005.1), persists every change,
 * runs ConfigRules.resolve on each change and surfaces resets as a notice
 * (AC-NYX-TC-003.2), and serializes the Enquiry Handoff (AC-NYX-TC-004.2).
 */
export function ConfiguratorController({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [config, setConfig] = useState<TubConfiguration>(DEFAULT_CONFIGURATION);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONFIG_STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isTubConfiguration(parsed)) setConfig(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      /* storage unavailable */
    }
  }, [config, hydrated]);

  // Auto-clear notices.
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(t);
  }, [notice]);

  const setOption = useCallback(
    <K extends GroupKey>(group: K, value: TubConfiguration[K]) => {
      setConfig((current) => {
        const result: ResolveResult = resolve(current, group, value);
        if (result.resets.length > 0) {
          const message = result.resets.map((r) => r.reason).join(" ");
          // Defer so we do not set state for another component mid-update.
          queueMicrotask(() => setNotice({ id: Date.now(), message }));
        }
        return result.config;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setConfig(DEFAULT_CONFIGURATION);
    setNotice({ id: Date.now(), message: "Back to the beginning. The tub forgives you." });
  }, []);

  const handoff = useCallback(() => {
    writeEnquiryHandoff(toConfigurationSummary(config));
    router.push("/contact");
  }, [config, router]);

  const value = useMemo<ControllerValue>(
    () => ({ config, hydrated, notice, setOption, reset, handoff }),
    [config, hydrated, notice, setOption, reset, handoff],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConfigurator(): ControllerValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConfigurator must be used within <ConfiguratorController>");
  return ctx;
}
