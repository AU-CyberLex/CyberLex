"use client";
import { useStore } from "@/lib/store";
import { POINT_RULES } from "@/lib/progress";

export function ModuleHero({
  index,
  total,
  id,
  tag,
  title,
  blurb,
  drills,
}: {
  index: number;
  total: number;
  id: string;
  tag: string;
  title: string;
  blurb: string;
  drills: number;
}) {
  const { state } = useStore();
  const done = !!state.done[id];
  const best = state.scores[id];
  const maxPts = POINT_RULES.moduleComplete + drills * POINT_RULES.drillCorrect;
  const steps = [
    { label: "Learn", on: true },
    { label: "Drill", on: done || best !== undefined },
    { label: "Complete", on: done },
  ];
  return (
    <section
      className="relative overflow-hidden rounded-lg border p-6 sm:p-8"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 select-none font-mono text-[11rem] font-bold leading-none opacity-[0.07]"
        style={{ color: "var(--accent)" }}
      >
        {String(index).padStart(2, "0")}
      </div>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[0.76rem]">
          <span style={{ color: "var(--accent-ink)" }}>
            &gt;_ module {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span
            className="rounded-sm border px-1.5 py-0.5"
            style={{ borderColor: "var(--accent-ink)", color: "var(--accent-ink)" }}
          >
            {tag}
          </span>
          {done && (
            <span
              className="rounded-sm px-1.5 py-0.5 font-semibold"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              ✓ COMPLETED {best !== undefined ? `· ${best}/${drills}` : ""}
            </span>
          )}
        </div>
        <h2 className="mt-3 max-w-[24ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
          {title}
        </h2>
        <p className="mt-3 max-w-[60ch] text-[0.98rem]" style={{ color: "var(--muted)" }}>
          {blurb}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ol className="flex items-center gap-2 font-mono text-[0.76rem]" aria-label="Module progress">
            {steps.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] font-semibold"
                  style={{
                    borderColor: s.on ? "var(--accent)" : "var(--rule)",
                    background: s.on ? "var(--accent)" : "transparent",
                    color: s.on ? "var(--on-accent)" : "var(--muted)",
                  }}
                >
                  {s.on ? "✓" : i + 1}
                </span>
                <span style={{ color: s.on ? "var(--text)" : "var(--muted)" }}>{s.label}</span>
                {i < steps.length - 1 && (
                  <span className="h-px w-6" style={{ background: s.on ? "var(--accent)" : "var(--rule)" }} />
                )}
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-2 font-mono text-[0.74rem]" style={{ color: "var(--muted)" }}>
            {["~3 min read", drills + " drills", "up to " + maxPts + " pts"].map((c) => (
              <span
                key={c}
                className="rounded-sm border px-2 py-0.5"
                style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
              >
                {c}
              </span>
            ))}
          </div>
          <a
            href="#drill"
            className="ml-auto rounded border px-4 py-2 text-[0.86rem] font-semibold no-underline"
            style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "var(--on-accent)" }}
          >
            Jump to drill →
          </a>
        </div>
      </div>
    </section>
  );
}
