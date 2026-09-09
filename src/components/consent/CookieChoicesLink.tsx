"use client";

import { useRouter } from "next/navigation";
import { useConsent } from "./ConsentProvider";

/**
 * Footer entry point to change a recorded choice (AC-NYX-PC-002.4). Clears
 * the stored choice so the banner reappears, then sends the visitor to the
 * Privacy Policy where the full controls live.
 */
export function CookieChoicesLink({ className = "" }: { className?: string }) {
  const { resetChoice } = useConsent();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        resetChoice();
        router.push("/privacy#cookies");
      }}
      className={className}
    >
      Cookie choices
    </button>
  );
}
