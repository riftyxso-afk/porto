import type { Metadata } from "next";
import { UsageDashboard } from "@/components/usage/UsageDashboard";

export const metadata: Metadata = {
  title: "Usage AI — I Wayan Radea",
  description: "Contributions, agent runs, and token usage across my AI tools.",
};

export default function UsagePage() {
  return (
    // pb-28 reserves the strip the fixed dock sits in, so the last card stays
    // reachable instead of scrolling under it.
    <main className="min-h-dvh w-full px-4 pt-6 pb-28 sm:px-6 sm:pt-10">
      <UsageDashboard />
    </main>
  );
}
