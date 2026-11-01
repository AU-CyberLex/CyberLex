
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sha256Hex } from "@cyberlex/core";
import { Callout } from "@cyberlex/ui";

const LAB_PAGES = [
  { href: "/lab/integrity", label: "Integrity" },
  { href: "/lab/volatility", label: "Volatility" },
  { href: "/lab/signature", label: "Signature" },
] as const;

const DEFAULT_TEXT =
  "Statement of the complainant, recorded 11 March 2026.";

type Result = {
  text: string;
  hash: string | null;
};

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#00EA64] bg-[#00EA64] px-5 py-3 text-sm font-bold text-black shadow-[0_2px_0_#008f3e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00ce58] hover:shadow-[0_4px_0_#008f3e] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0";

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all duration-200 hover:border-[#00EA64] hover:bg-[#00EA64]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00EA64]";

function SectionLabel({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {number && (
        <span className="font-mono text-xs font-bold text-[#00a84b]">
          {number}
        </span>
      )}
      <h2
        className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]"
        style={{ color: "var(--muted)" }}
      >
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: "var(--rule)" }} />
    </div>
  );
}

function ChallengeNavigation() {
  return (
    <nav
      aria-label="Forensics lab challenges"
      className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-4"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/lab"
          className="text-sm font-medium transition-colors hover:text-[#00a84b]"
          style={{ color: "var(--muted)" }}
        >
          ← Forensics lab
        </Link>

        <span style={{ color: "var(--rule)" }}>/</span>

        <div className="flex flex-wrap items-center gap-1">
          {LAB_PAGES.map((page, index) => {
            const active = page.href === "/lab/integrity";

            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#00EA64] text-black shadow-sm"
                    : "hover:bg-[#00EA64]/10 hover:text-[#00a84b]"
                }`}
                style={{
                  color: active ? "#000" : "var(--muted)",
                }}
              >
                {index + 1}. {page.label}
              </Link>
            );
          })}
        </div>
      </div>

      <span
        className="hidden font-mono text-[0.68rem] uppercase tracking-wider sm:block"
        style={{ color: "var(--muted)" }}
      >
        CYBERLEX / FORENSICS
      </span>
    </nav>
  );
}

export default function IntegrityCheckPage() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [result, setResult] = useState<Result | null>(null);
  const [seizureHash, setSeizureHash] = useState<string | null>(null);
  const [sawMismatch, setSawMismatch] = useState(false);

  useEffect(() => {
    document.title = "Integrity check — CyberLex";
  }, []);

  useEffect(() => {
    let live = true;

    sha256Hex(text).then((hash) => {
      if (live) {
        setResult({ text, hash });
      }
    });

    return () => {
      live = false;
    };
  }, [text]);

  const hash: string | null | undefined =
    result && result.text === text ? result.hash : undefined;

  useEffect(() => {
    if (
      seizureHash !== null &&
      typeof hash === "string" &&
      hash !== seizureHash
    ) {
      setSawMismatch(true);
    }
  }, [hash, seizureHash]);

  const recorded = seizureHash !== null;

  const restored =
    sawMismatch &&
    typeof hash === "string" &&
    hash === seizureHash;

  const objectives = [
    {
      label: "Record the seizure hash",
      description: "Save the original evidence fingerprint.",
      completed: recorded,
    },
    {
      label: "Detect evidence tampering",
      description: "Modify the exhibit and identify the mismatch.",
      completed: sawMismatch,
    },
    {
      label: "Verify evidence restoration",
      description: "Restore the original content and confirm the match.",
      completed: restored,
    },
  ];

  const completedCount = objectives.filter(
    (objective) => objective.completed
  ).length;

  const status:
    | "match"
    | "mismatch"
    | "unavailable"
    | "computing"
    | null =
    seizureHash === null
      ? null
      : hash === undefined
        ? "computing"
        : hash === null
          ? "unavailable"
          : hash === seizureHash
            ? "match"
            : "mismatch";

  const record = () => {
    if (typeof hash !== "string") return;

    setSeizureHash(hash);
    setSawMismatch(false);
  };

  const reset = () => {
    setText(DEFAULT_TEXT);
    setSeizureHash(null);
    setSawMismatch(false);
  };

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 pb-16 pt-7 sm:px-8 lg:px-10">
      <ChallengeNavigation />

      {/* Challenge heading */}
      <header className="mb-9">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className="rounded-sm bg-[#00EA64]/15 px-2 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-[#008c40]"
          >
            Digital forensics
          </span>
          <span style={{ color: "var(--muted)" }}>/</span>
          <span
            className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Challenge 01
          </span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-1.5 rounded-full bg-[#00EA64]" />
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Integrity check
              </h1>
            </div>

            <p
              className="mt-4 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              Can you prove that digital evidence has remained
              unchanged since seizure? Use cryptographic hashing
              to investigate evidence tampering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-[#00b950] bg-[#00EA64]/10 px-3 py-2 font-mono text-xs font-bold text-[#008c40]">
              ● EASY
            </span>
            <span
              className="rounded-md border px-3 py-2 font-mono text-xs font-semibold"
              style={{
                borderColor: "var(--rule)",
                color: "var(--muted)",
              }}
            >
              40 XP
            </span>
          </div>
        </div>

        {/* Challenge metadata */}
        <div
          className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-4"
          style={{
            borderColor: "var(--rule)",
            background: "var(--rule)",
          }}
        >
          {[
            { label: "ALGORITHM", value: "SHA-256" },
            { label: "OBJECTIVES", value: "03 TASKS" },
            { label: "TOPIC", value: "TAMPER DETECTION" },
            { label: "PROGRESS", value: `${completedCount}/3 DONE` },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-4 transition-colors hover:bg-[#00EA64]/10"
              style={{ background: "var(--surface)" }}
            >
              <p
                className="font-mono text-[0.65rem] font-semibold tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {item.label}
              </p>
              <p className="mt-2 text-sm font-bold tracking-wide">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* Main workspace */}
      <div className="grid items-start gap-7 lg:grid-cols-[0.83fr_1.17fr]">
        {/* Problem description */}
        <section className="min-w-0">
          <SectionLabel number="01">THE CHALLENGE</SectionLabel>

          <div
            className="rounded-lg border p-5 sm:p-6"
            style={{
              background: "var(--surface)",
              borderColor: "var(--rule)",
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00EA64]/15 text-xl font-bold text-[#008c40]">
                #
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Can you trust the evidence?
                </h2>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  Digital evidence investigation
                </p>
              </div>
            </div>

            <div
              className="space-y-4 text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              <p>
                A hash function transforms data of any size into
                a fixed-length digital fingerprint. Even changing
                a single character produces a completely different
                hash.
              </p>

              <p>
                Investigators calculate a hash when electronic
                evidence is seized and calculate it again before
                presenting it in court. Matching hashes provide
                evidence that the contents have remained unchanged
                between those two points.
              </p>

              <p>
                Your task is to record the original hash, modify
                the exhibit, identify the mismatch and restore
                the original content.
              </p>
            </div>

            <div className="my-6">
              <Callout tone="fx">
                <b>Why SHA-256?</b> Older forensic reports may use
                MD5 or SHA-1. Both have known collision weaknesses.
                SHA-256 provides a stronger cryptographic integrity
                check.
              </Callout>
            </div>

            <div className="border-t pt-5" style={{ borderColor: "var(--rule)" }}>
              <SectionLabel number="02">IMPORTANT DISTINCTIONS</SectionLabel>

              <ul className="space-y-3">
                {[
                  "A hash does not establish who created the file.",
                  "A hash does not establish when the file was created.",
                  "A hash does not establish whether the seizure was lawful.",
                  "A hash only verifies content against a previously recorded digest.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="group flex items-start gap-3 rounded-md p-2 transition-all duration-200 hover:bg-[#00EA64]/10"
                  >
                    <span className="mt-0.5 font-mono text-xs font-bold text-[#009b46]">
                      0{index + 1}
                    </span>
                    <span
                      className="text-sm leading-6"
                      style={{ color: "var(--muted)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cross examination */}
          <div
            className="mt-5 rounded-lg border-l-4 border-[#00EA64] p-5"
            style={{ background: "var(--accent-soft)" }}
          >
            <p className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-[#008c40]">
              ⚖ CROSS-EXAMINATION
            </p>
            <p className="text-sm leading-7">
              &ldquo;At what precise time was the first hash
              generated, and who had physical access to the
              device before that computation?&rdquo;
            </p>
          </div>
        </section>

        {/* Interactive workspace */}
        <section className="min-w-0">
          <SectionLabel number="03">INTERACTIVE WORKSPACE</SectionLabel>

          <div className="overflow-hidden rounded-lg border border-[#29342e] bg-[#0d1511] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            {/* Dark terminal header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26372d] bg-[#111d16] px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#00EA64]/15 font-mono text-lg font-bold text-[#00EA64]">
                  &gt;_
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Evidence verification
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] tracking-wider text-[#91a59a]">
                    EXHIBIT_001 / SHA256_ENGINE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-[#28543a] bg-[#00EA64]/10 px-2.5 py-1 font-mono text-[0.65rem] text-[#00EA64]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00EA64]" />
                  ENGINE READY
                </span>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-md border border-[#34443a] px-3 py-2 text-xs font-semibold text-[#c6d4ca] transition-all hover:border-[#00EA64] hover:bg-[#00EA64]/10 hover:text-[#00EA64]"
                >
                  ↺ Reset
                </button>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-5">
              {/* Evidence editor */}
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <label
                    htmlFor="integrity-exhibit"
                    className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#b2c3b8]"
                  >
                    Evidence content
                  </label>
                  <span className="font-mono text-[0.65rem] text-[#71877a]">
                    EDITABLE / UTF-8
                  </span>
                </div>

                <div className="overflow-hidden rounded-md border border-[#304238] bg-[#101b15] transition-colors focus-within:border-[#00EA64] focus-within:ring-1 focus-within:ring-[#00EA64]/30">
                  <div className="flex items-center gap-2 border-b border-[#304238] px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 font-mono text-[0.65rem] text-[#71877a]">
                      seized_evidence.txt
                    </span>
                  </div>

                  <div className="flex">
                    <div className="select-none border-r border-[#304238] px-3 py-4 font-mono text-xs leading-7 text-[#536b5b]">
                      01
                    </div>
                    <textarea
                      id="integrity-exhibit"
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      spellCheck={false}
                      className="min-h-[140px] w-full resize-y bg-transparent p-4 font-mono text-[0.8rem] leading-7 text-[#d3e7d9] outline-none placeholder:text-[#536b5b]"
                      placeholder="Enter evidence content..."
                    />
                  </div>
                </div>

                <p className="mt-2 text-[0.68rem] text-[#71877a]">
                  Tip: Change even one character to simulate evidence tampering.
                </p>
              </div>

              {/* Current hash */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#b2c3b8]">
                    Current SHA-256
                  </span>
                  <span className="rounded-sm bg-[#00EA64]/10 px-2 py-1 font-mono text-[0.62rem] text-[#00EA64]">
                    256 BITS
                  </span>
                </div>

                <div className="min-h-[62px] break-all rounded-md border border-[#304238] bg-[#101b15] p-3 font-mono text-[0.75rem] leading-6 text-[#00EA64]">
                  {hashLabel(hash)}
                </div>
              </div>

              {/* Reference hash */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#b2c3b8]">
                    Reference / seizure hash
                  </span>
                  <span className="font-mono text-[0.62rem] text-[#71877a]">
                    {recorded ? "RECORDED" : "NOT RECORDED"}
                  </span>
                </div>

                <div className="min-h-[62px] break-all rounded-md border border-dashed border-[#304238] bg-[#101b15] p-3 font-mono text-[0.75rem] leading-6 text-[#9bb0a0]">
                  {seizureHash ?? "No reference hash recorded yet."}
                </div>
              </div>

              {hash === null && (
                <p className="text-xs leading-5 text-[#ff7777]">
                  SHA-256 requires a secure context. Open this page over HTTPS or localhost.
                </p>
              )}

              {/* Record hash */}
              <button
                type="button"
                disabled={typeof hash !== "string"}
                onClick={record}
                className={`${PRIMARY_BUTTON} w-full`}
              >
                Record seizure hash <span aria-hidden="true">→</span>
              </button>

              {/* Verification result */}
              <div role="status" aria-live="polite">
                {status !== null && (
                  <div
                    className="rounded-md border p-4 transition-all duration-300"
                    style={{
                      borderColor:
                        status === "match"
                          ? "#00EA64"
                          : status === "mismatch"
                            ? "#ef6464"
                            : "#b6a15d",
                      background:
                        status === "match"
                          ? "rgba(0,234,100,0.09)"
                          : status === "mismatch"
                            ? "rgba(239,100,100,0.09)"
                            : "rgba(182,161,93,0.09)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full font-bold"
                        style={{
                          color:
                            status === "match"
                              ? "#00EA64"
                              : status === "mismatch"
                                ? "#ff7777"
                                : "#e2c779",
                          background:
                            status === "match"
                              ? "rgba(0,234,100,0.12)"
                              : status === "mismatch"
                                ? "rgba(239,100,100,0.12)"
                                : "rgba(182,161,93,0.12)",
                        }}
                      >
                        {status === "match"
                          ? "✓"
                          : status === "mismatch"
                            ? "✕"
                            : "!"}
                      </span>

                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{
                            color:
                              status === "match"
                                ? "#00EA64"
                                : status === "mismatch"
                                  ? "#ff7777"
                                  : "#e2c779",
                          }}
                        >
                          {status === "match" && "INTEGRITY VERIFIED"}
                          {status === "mismatch" && "INTEGRITY COMPROMISED"}
                          {status === "unavailable" && "HASH UNAVAILABLE"}
                          {status === "computing" && "VERIFYING EVIDENCE..."}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#b2c3b8]">
                          {status === "match" &&
                            "The current record matches the reference hash."}
                          {status === "mismatch" &&
                            "The evidence has changed since the reference hash was recorded."}
                          {status === "unavailable" &&
                            "SHA-256 is unavailable in this browser context."}
                          {status === "computing" &&
                            "Calculating the current evidence fingerprint."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#26372d] bg-[#111d16] px-4 py-3 font-mono text-[0.65rem] text-[#71877a]">
              <span>CYBERLEX_FORENSIC_ENGINE</span>
              <span>SHA256 / READY</span>
            </div>
          </div>

          {/* Objectives */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <SectionLabel number="04">MISSION PROGRESS</SectionLabel>
              <span className="flex-none rounded-md bg-[#00EA64]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#008c40]">
                {completedCount}/3
              </span>
            </div>

            <div
              className="mb-5 h-2 overflow-hidden rounded-full"
              style={{ background: "var(--rule)" }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={completedCount}
              aria-label="Objectives completed"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedCount / 3) * 100}%`,
                  background: "#00EA64",
                  boxShadow: "0 0 12px rgba(0,234,100,0.35)",
                }}
              />
            </div>

            <div className="space-y-3">
              {objectives.map((objective, index) => (
                <div
                  key={objective.label}
                  className="group flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00b950] hover:bg-[#00EA64]/[0.06] hover:shadow-sm"
                  style={{
                    borderColor: objective.completed
                      ? "#00b950"
                      : "var(--rule)",
                    background: objective.completed
                      ? "var(--accent-soft)"
                      : "var(--surface)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-md border font-mono text-xs font-bold transition-all"
                    style={{
                      borderColor: objective.completed
                        ? "#00EA64"
                        : "var(--rule)",
                      background: objective.completed
                        ? "#00EA64"
                        : "transparent",
                      color: objective.completed
                        ? "#000"
                        : "var(--muted)",
                    }}
                  >
                    {objective.completed ? "✓" : `0${index + 1}`}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">
                      {objective.label}
                    </p>
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: "var(--muted)" }}
                    >
                      {objective.description}
                    </p>
                  </div>

                  <span
                    className="flex-none rounded-sm px-2 py-1 font-mono text-[0.62rem] font-bold uppercase"
                    style={{
                      color: objective.completed
                        ? "#008c40"
                        : "var(--muted)",
                      background: objective.completed
                        ? "rgba(0,234,100,0.13)"
                        : "var(--surface-2)",
                    }}
                  >
                    {objective.completed ? "Passed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>

            {completedCount === 3 && (
              <div
                className="mt-5 rounded-lg border border-[#00b950] bg-[#00EA64]/10 p-5"
                role="status"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00EA64] text-xl font-bold text-black">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#008c40]">
                      Challenge completed!
                    </p>
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: "var(--muted)" }}
                    >
                      You have successfully recorded, detected and restored the digital evidence.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
        style={{
          borderColor: "var(--rule)",
          color: "var(--muted)",
        }}
      >
        <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
          CYBERLEX · DIGITAL FORENSICS
        </span>

        <Link
          href="/lab/volatility"
          className="group inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:border-[#00EA64] hover:bg-[#00EA64] hover:text-black"
          style={{
            borderColor: "var(--rule)",
            color: "var(--text)",
          }}
        >
          Next challenge: Volatility
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </footer>
    </main>
  );
}

function hashLabel(value: string | null | undefined): string {
  if (value === undefined) return "Computing SHA-256...";
  if (value === null) return "Unavailable in this context";
  return value;
}
