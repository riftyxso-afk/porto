import type { Metadata } from "next";
import { PlaygroundDashboard } from "@/components/playground/PlaygroundDashboard";

export const metadata: Metadata = {
  title: "Playground — I Wayan Radea",
  description:
    "Type a name and watch it sign itself in WebGL, then fold into a holographic card you can download as a PNG.",
};

export default function PlaygroundPage() {
  return (
    // pb-28 reserves the strip the fixed dock sits in, so the card stays
    // reachable instead of scrolling under it.
    <main className="min-h-dvh w-full px-4 pt-6 pb-28 sm:px-6 sm:pt-10">
      <PlaygroundDashboard />
    </main>
  );
}