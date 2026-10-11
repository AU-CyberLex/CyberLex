"use client";
import { useEffect, useState } from "react";
import { sha256Hex } from "@/lib/hash";
import { SecTag } from "@/components/ui";

const EVIDENCE = `[2026-03-11 22:41:07] user_ramesh: send the client list to my personal id
[2026-03-11 22:41:55] user_devi: that folder is restricted, you dont have rights
[2026-03-11 22:43:12] user_ramesh: use my admin creds - RM/882194
[2026-03-11 22:47:30] SYSTEM: export_clients_full.csv -> ramesh.k@mailfree.example`;

export function EvidenceDemo() {
  const [text, setText] = useState(EVIDENCE);
  const [seize, setSeize] = useState("computing…");
  const [now, setNow] = useState("computing…");

  useEffect(() => {
    let live = true;
    sha256Hex(EVIDENCE).then((h) => live && setSeize(h));
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    let live = true;
    sha256Hex(text).then((h) => live && setNow(h));
    return () => {
      live = false;
    };
  }, [text]);

  const intact = now === seize;

  return (
    <div
      className="overflow-hidden rounded border"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <div
        className="flex items-center justify-between gap-4 border-b px-4 py-2.5"
        style={{ background: "var(--surface-2)", borderColor: "var(--rule)" }}
      >
        <b className="font-mono text-[0.8rem] font-medium">EXHIBIT P-7 · seized_chat_log.txt</b>
        <SecTag>§63 BSA</SecTag>
      </div>
      <div className="p-4">
        <p className="mb-2.5 text-[0.85rem]" style={{ color: "var(--muted)" }}>
          This is the electronic record as produced in court. Edit a single character and watch
          what the integrity check does to your exhibit.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="Seized evidence text"
          className="min-h-[118px] w-full resize-y rounded border p-2.5 font-mono text-[0.83rem]"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--rule)",
            color: "var(--text)",
          }}
        />
        <div className="mt-3 font-mono text-[0.74rem] break-all">
          <HashRow label="Hash at seizure" value={seize} />
          <HashRow label="Hash now" value={now} />
          <HashRow label="Algorithm" value="SHA-256 (FIPS 180-4)" />
        </div>
        <div
          className="mt-3 rounded border p-2.5 text-[0.86rem]"
          style={
            intact
              ? {
                  background: "var(--forensic-soft)",
                  borderColor: "var(--forensic)",
                  color: "var(--forensic)",
                }
              : {
                  background: "var(--seal-soft)",
                  borderColor: "var(--seal)",
                  color: "var(--seal)",
                }
          }
        >
          {intact
            ? "Integrity intact. The record produced matches the record seized."
            : "Integrity failed. A single changed character produces a wholly different digest."}
        </div>
      </div>
    </div>
  );
}

function HashRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="grid grid-cols-1 gap-1 border-t border-dotted py-2 sm:grid-cols-[8.4rem_1fr]"
      style={{ borderColor: "var(--rule)" }}
    >
      <i className="not-italic" style={{ color: "var(--muted)" }}>
        {label}
      </i>
      <span>{value}</span>
    </div>
  );
}
