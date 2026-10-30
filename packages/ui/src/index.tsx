import type { ReactNode } from "react";

export function SectionHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-5 mt-12 flex items-baseline gap-4 first:mt-0">
      <h2 className="flex-none font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">{title}</h2>
      <span className="h-px flex-1" style={{ background: "var(--rule)" }} />
      {note ? (
        <span className="flex-none text-[0.82rem]" style={{ color: "var(--muted)" }}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded border p-5"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      {children}
    </div>
  );
}

export function Callout({
  tone = "amber",
  children,
}: {
  tone?: "amber" | "law" | "fx";
  children: ReactNode;
}) {
  const styles =
    tone === "law"
      ? { background: "var(--accent-soft)", borderColor: "var(--accent)" }
      : tone === "fx"
        ? { background: "var(--forensic-soft)", borderColor: "var(--forensic)" }
        : { background: "var(--amber-soft)", borderColor: "var(--amber)" };
  return (
    <div className="rounded border-l-4 p-4 text-[0.9rem]" style={styles}>
      {children}
    </div>
  );
}

export function SecTag({ children }: { children: ReactNode }) {
  return (
    <span
      className="whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.78rem]"
      style={{ color: "var(--accent-ink)", borderColor: "var(--accent-ink)", background: "var(--surface)" }}
    >
      {children}
    </span>
  );
}
