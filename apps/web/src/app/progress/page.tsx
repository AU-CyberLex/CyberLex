import type { Metadata } from "next";
import { ProgressView } from "@/components/ProgressView";

export const metadata: Metadata = {
  title: "Your progress",
  description:
    "Points, badges, a device-local leaderboard, and export/import for progress — stored in this browser only.",
};

export default function ProgressPage() {
  return <ProgressView />;
}
