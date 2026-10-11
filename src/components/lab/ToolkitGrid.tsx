import { TOOLS } from "@/data/tools";

type Tool = { n: string; c: string; d: string; p: string; l: string };

export function ToolkitGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded border md:grid-cols-2"
      style={{ background: "var(--rule)", borderColor: "var(--rule)" }}
    >
      {(TOOLS as unknown as Tool[]).map((t) => (
        <div key={t.n} className="p-5" style={{ background: "var(--surface)" }}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-medium">{t.n}</h3>
            <span
              className="rounded-sm border px-1.5 py-0.5 font-mono text-[0.72rem]"
              style={{
                color: "var(--seal)",
                borderColor: "var(--rule)",
                background: "var(--surface)",
              }}
            >
              {t.c}
            </span>
          </div>
          <p className="text-[0.88rem]">{t.d}</p>
          <p className="mt-2 text-[0.86rem]">
            <b>Proves: </b>
            {t.p}
          </p>
          <p className="mt-1 text-[0.86rem]" style={{ color: "var(--muted)" }}>
            <b>Limit: </b>
            {t.l}
          </p>
        </div>
      ))}
    </div>
  );
}
