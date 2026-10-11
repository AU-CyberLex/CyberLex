import { SimGrid } from "@/components/SimGrid";

export default function SimsPage() {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">
        Branching investigations
      </h2>
      <p className="mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
        Facts unfold a step at a time. Every choice is a real decision a lawyer or investigating
        officer has to make, and the consequence follows you to the next step. There is no undo —
        that is the point.
      </p>
      <SimGrid />
    </div>
  );
}
