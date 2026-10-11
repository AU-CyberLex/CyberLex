"use client";
import { useState } from "react";
import { CERTS } from "@/data/certs";

type Cert = { t: string; ok: boolean; e: string };

export function CertificateBench() {
  const [idx, setIdx] = useState(0);
  const [verdict, setVerdict] = useState<string | null>(null);
  const certs = CERTS as unknown as Cert[];
  const c = certs[idx];

  const judge = (admissible: boolean) => {
    setVerdict(
      (admissible === c.ok ? "Correct. " : "Not quite. ") + c.e
    );
  };

  return (
    <div className="grid items-start gap-5 md:grid-cols-2">
      <div
        className="rounded border p-5"
        style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
      >
        <p className="text-[0.9rem]">
          Five certificates. For each, decide: does the electronic record get in? The conditions
          are section 63(2) BSA; the form is section 63(4).
        </p>
        <div className="mt-3 flex gap-2">
          {certs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIdx(i);
                setVerdict(null);
              }}
              className="h-8 w-8 rounded-full border text-sm"
              style={
                i === idx
                  ? { background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }
                  : { borderColor: "var(--rule)", background: "var(--surface-2)" }
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[0.92rem]">{c.t}</p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => judge(true)}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            Admissible
          </button>
          <button
            type="button"
            onClick={() => judge(false)}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            Inadmissible
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
      </div>
      <div className="space-y-5">
        <div
          className="rounded border p-5"
          style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
        >
          <h3 className="mb-2 font-serif text-lg font-medium">The four conditions</h3>
          <ul className="ml-4 grid list-disc gap-1.5 text-[0.9rem]">
            <li>The computer output was produced by a computer regularly used for activities with lawful control over it.</li>
            <li>Information of that kind was regularly fed into it in the ordinary course of those activities.</li>
            <li>The computer was operating properly throughout, or any malfunction did not affect the accuracy of the record.</li>
            <li>The information in the output reproduces or derives from information fed in during the ordinary course.</li>
          </ul>
          <div
            className="mt-3 rounded border-l-4 p-3 text-[0.9rem]"
            style={{ background: "var(--seal-soft)", borderColor: "var(--seal)" }}
          >
            <b>The certificate must be signed</b> by a person occupying a responsible official
            position in relation to the operation of the relevant device or the management of the
            relevant activities.
          </div>
        </div>
        <div
          className="rounded border-l-4 p-4 text-[0.9rem]"
          style={{ background: "var(--amber-soft)", borderColor: "var(--amber)" }}
        >
          <b>Line of authority.</b> <em>Anvar P.V.</em> (2014) held the certificate mandatory.{" "}
          <em>Shafhi Mohammad</em> (2018) relaxed it. <em>Arjun Panditrao Khotkar</em> (2020)
          overruled <em>Shafhi</em> and restored <em>Anvar</em>.
        </div>
      </div>
    </div>
  );
}
