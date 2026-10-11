"use client";
import { useState } from "react";
import { SIGS } from "@/data/sigs";

type Sig = { n: string; hex: string; asc: string; v: string; ok: boolean; e: string };

export function SignatureBench() {
  const [idx, setIdx] = useState(0);
  const [verdict, setVerdict] = useState<string | null>(null);
  const s = (SIGS as unknown as Sig[])[idx];

  return (
    <div
      className="rounded border p-5"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <p className="text-[0.9rem]">
        Extensions lie; headers do not. Pick a seized file, read its first sixteen bytes, and say
        whether the extension can be trusted.
      </p>
      <div className="mt-3 flex max-w-md flex-col gap-2">
        <label className="text-[0.82rem]" style={{ color: "var(--muted)" }} htmlFor="sig-pick">
          Seized file
        </label>
        <select
          id="sig-pick"
          value={idx}
          onChange={(e) => {
            setIdx(+e.target.value);
            setVerdict(null);
          }}
          className="rounded border px-2.5 py-2 text-sm"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--rule)",
            color: "var(--text)",
          }}
        >
          {(SIGS as unknown as Sig[]).map((g, i) => (
            <option key={g.n} value={i}>
              {g.n}
            </option>
          ))}
        </select>
      </div>
      <div
        className="mt-3 rounded border p-3 font-mono text-[0.8rem] break-all"
        style={{ background: "var(--surface-2)", borderColor: "var(--rule)" }}
      >
        <div>bytes: {s.hex}</div>
        <div>ascii: {s.asc}</div>
        <div>reads as: {s.v}</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setVerdict(
              s.ok
                ? "Correct. " + s.e
                : "That is what the extension claims — but the header says otherwise. " + s.e
            )
          }
          className="rounded border px-3 py-2 text-sm"
          style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
        >
          Extension is genuine
        </button>
        <button
          type="button"
          onClick={() =>
            setVerdict(
              !s.ok
                ? "Correct. " + s.e
                : "Careful — this one is genuine. " + s.e
            )
          }
          className="rounded border px-3 py-2 text-sm"
          style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
        >
          Extension is spoofed
        </button>
      </div>
      {verdict && (
        <div
          className="mt-3 rounded border p-2.5 text-[0.85rem]"
          style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
        >
          {verdict}
        </div>
      )}
      <p className="mt-3 text-[0.85rem]" style={{ color: "var(--muted)" }}>
        Cross-examination: &ldquo;Did you verify the file signature independently of the extension
        before attributing this file to the accused?&rdquo;
      </p>
    </div>
  );
}
