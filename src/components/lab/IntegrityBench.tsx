"use client";
import { useEffect, useState } from "react";
import { sha256Hex } from "@/lib/hash";

export function IntegrityBench() {
  const [text, setText] = useState("Statement of the complainant, recorded 11 March 2026.");
  const [hash, setHash] = useState("—");
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    sha256Hex(text).then((h) => live && setHash(h));
    return () => {
      live = false;
    };
  }, [text]);

  return (
    <div className="grid items-start gap-5 md:grid-cols-2">
      <div
        className="rounded border p-5"
        style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
      >
        <p className="mb-3 text-[0.9rem]">
          A hash function turns any quantity of data into a fixed-length value. Change one bit of
          the input and roughly half the output bits flip. Type anything below and watch the
          digest change completely. Then set it as the seizure hash and make a small edit.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="Sample data to hash"
          className="min-h-[80px] w-full rounded border p-2.5 font-mono text-[0.82rem]"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--rule)",
            color: "var(--text)",
          }}
        />
        <div className="mt-3 font-mono text-[0.74rem] break-all">
          <div
            className="grid grid-cols-[7rem_1fr] gap-2 border-t border-dotted py-2"
            style={{ borderColor: "var(--rule)" }}
          >
            <i className="not-italic" style={{ color: "var(--muted)" }}>
              SHA-256
            </i>
            <span>{hash}</span>
          </div>
          <div
            className="grid grid-cols-[7rem_1fr] gap-2 border-t border-dotted py-2"
            style={{ borderColor: "var(--rule)" }}
          >
            <i className="not-italic" style={{ color: "var(--muted)" }}>
              Reference
            </i>
            <span>{ref ?? "not set"}</span>
          </div>
        </div>
        <div className="mt-3">
          <button
            type="button"
            onClick={async () => setRef(await sha256Hex(text))}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            Record this as the seizure hash
          </button>
        </div>
        {ref !== null && (
          <div
            className="mt-3 rounded border p-2.5 text-[0.86rem]"
            style={
              hash === ref
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
            {hash === ref
              ? "Match. The record is unchanged since it was recorded."
              : "Mismatch. Something in this record has changed since the reference hash was taken."}
          </div>
        )}
      </div>
      <div className="space-y-5">
        <div
          className="rounded border-l-4 p-4 text-[0.9rem]"
          style={{ background: "var(--forensic-soft)", borderColor: "var(--forensic)" }}
        >
          <b>MD5 and SHA-1 are still in the case files.</b> Older Indian forensic reports use MD5.
          Both algorithms have demonstrated collisions. SHA-256 is the current standard.
        </div>
        <div
          className="rounded border p-5"
          style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
        >
          <h3 className="mb-2 font-serif text-lg font-medium">What a hash does not prove</h3>
          <ul className="ml-4 grid list-disc gap-1.5 text-[0.9rem]">
            <li>It does not prove who created the file or who wrote its contents.</li>
            <li>It does not prove the date. Timestamps live in the filesystem metadata.</li>
            <li>It does not prove the seizure itself was lawful.</li>
            <li>
              A hash computed <em>after</em> the device left the investigator&apos;s control proves
              only that nothing changed since that later moment.
            </li>
          </ul>
          <div
            className="mt-3 rounded border-l-4 p-3 text-[0.9rem]"
            style={{ background: "var(--seal-soft)", borderColor: "var(--seal)" }}
          >
            <b>Cross-examination.</b> &ldquo;At what precise time was the first hash generated,
            and who else had physical access to the device between seizure and that
            computation?&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}
