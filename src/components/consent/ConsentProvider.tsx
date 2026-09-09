"use client";

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
  CONSENT_STORAGE_KEY,
  isConsentChoice,
  readStoredConsent,
  writeStoredConsent,
  type ConsentChoice,
} from "./consent";

type ConsentContextValue = {
  /** `undefined` before hydration, `null` when no choice recorded. */
  choice: ConsentChoice | null | undefined;
  /** True only when hydrated and the choice is "accept". The single gate. */
  isNonEssentialAllowed: boolean;
  setChoice: (choice: ConsentChoice) => void;
  /** Clears the recorded choice so the banner shows again. */
  resetChoice: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Single enforcement point for non-essential cookies and analytics
 * (Privacy & Cookie Consent, ADR-001). Essential storage (theme, consent
 * itself) is exempt. Nothing non-essential may run unless
 * `isNonEssentialAllowed` is true.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ConsentChoice | null | undefined>(
    undefined,
  );

  useEffect(() => {
    setChoiceState(readStoredConsent());
  }, []);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== CONSENT_STORAGE_KEY) return;
      setChoiceState(isConsentChoice(e.newValue) ? e.newValue : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Mirror the choice to the document so CSS or third-party loaders can read it.
  useEffect(() => {
    if (choice === undefined) return;
    if (choice === null) document.documentElement.removeAttribute("data-consent");
    else document.documentElement.setAttribute("data-consent", choice);
  }, [choice]);

  const setChoice = useCallback((next: ConsentChoice) => {
    writeStoredConsent(next);
    setChoiceState(next);
  }, []);

  const resetChoice = useCallback(() => {
    writeStoredConsent(null);
    setChoiceState(null);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      choice,
      isNonEssentialAllowed: choice === "accept",
      setChoice,
      resetChoice,
    }),
    [choice, setChoice, resetChoice],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within <ConsentProvider>");
  return ctx;
}
