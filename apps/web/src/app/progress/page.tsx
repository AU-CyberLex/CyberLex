import type { Metadata } from "next";
import { ProgressView } from "@/components/ProgressView";

export const metadata: Metadata = {
  title: "Your progress",
  description: "Drill scores and module completion — stored in this browser only.",
};

export default function ProgressPage() {
  return <ProgressView />;
}
