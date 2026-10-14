import type { Metadata } from "next";
import { BenchmarkDashboard } from "@/components/benchmark/BenchmarkDashboard";

export const metadata: Metadata = {
  title: "Benchmark AI — I Wayan Radea",
  description:
    "31 models ranked on the Artificial Analysis Intelligence Index, plus the two AI models I built water simulation demos against.",
};

export default function BenchmarkPage() {
  return (
    // pb-28 reserves the strip the fixed dock sits in, so the last card stays
    // reachable instead of scrolling under it.
    <main className="min-h-dvh w-full px-4 pt-6 pb-28 sm:px-6 sm:pt-10">
      <BenchmarkDashboard />
    </main>
  );
}