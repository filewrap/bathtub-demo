import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      title="Privacy Policy"
      lede="Policy content and the consent banner arrive in the Privacy work order."
    />
  );
}
