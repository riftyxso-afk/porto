import type { Metadata } from "next";
import { RecapDashboard } from "@/components/recap/RecapDashboard";

export const metadata: Metadata = {
  title: "Benchmark Recap & Archives | I Wayan Radea",
  description:
    "Interactive catalog of 10 audited benchmark systems, 3D open worlds, and web platforms with reactive 3D folder inspection.",
};

export default function RecapPage() {
  return (
    <main className="min-h-dvh w-full">
      <RecapDashboard />
    </main>
  );
}
