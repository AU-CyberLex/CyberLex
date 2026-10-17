import type { Metadata } from "next";
import { CaseDeck } from "@/components/CaseDeck";

export const metadata: Metadata = {
  title: "Landmark authorities",
  description:
    "Twelve judgments that carry most of the weight in an Indian cyber law paper — tap a card to reveal the holding.",
};

export default function CasesPage() {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">
        Landmark authorities
      </h2>
      <p className="mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
        Tap a card to reveal the holding. These twelve carry most of the weight in an Indian cyber
        law paper.
      </p>
      <CaseDeck />
    </div>
  );
}
