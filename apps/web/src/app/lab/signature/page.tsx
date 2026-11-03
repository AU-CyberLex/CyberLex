
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { SIGS } from "@cyberlex/content";
import { Callout } from "@cyberlex/ui";

/* ---------------------------------------------------------
   CONSTANTS
--------------------------------------------------------- */

const LAB_PAGES = [
  { href: "/lab/integrity", label: "1. Integrity" },
  { href: "/lab/volatility", label: "2. Volatility" },
  { href: "/lab/signature", label: "3. Signature" },
] as const;

const GREEN = "#00EA64";

const BTN =
  "inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40";

const PRIMARY =
  `${BTN} border-[#00EA64] bg-[#00EA64] text-black hover:bg-[#00ce58] hover:border-[#00ce58] hover:shadow-[0_4px_16px_rgba(0,234,100,0.18)]`;

const SECONDARY =
  `${BTN} border-[#34443b] bg-[#17231c] text-[#e6f3e9] hover:border-[#00EA64] hover:bg-[#193b27] hover:text-[#00EA64]`;

const REFERENCE = [
  { bytes: "25 50 44 46", ascii: "%PDF", type: "PDF document" },
  { bytes: "50 4B 03 04", ascii: "PK..", type: "ZIP — DOCX, XLSX, APK" },
  { bytes: "FF D8 FF E0", ascii: "ÿØÿà", type: "JPEG image" },
  { bytes: "89 50 4E 47", ascii: ".PNG", type: "PNG image" },
  { bytes: "D0 CF 11 E0", ascii: "ÐÏ..", type: "Legacy Office — DOC, XLS" },
  { bytes: "52 61 72 21", ascii: "Rar!", type: "RAR archive" },
] as const;

/* ---------------------------------------------------------
   SHARED NAVIGATION
--------------------------------------------------------- */

function ChallengeNavigation() {
  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-[#d5ded8] pb-4 dark:border-[#293b30]">
      <Link
        href="/lab"
        className="mr-2 text-sm text-[#52645a] transition-colors hover:text-[#008c45] dark:text-[#a4b5aa] dark:hover:text-[#00EA64]"
      >
        ← Forensics lab
      </Link>

      {LAB_PAGES.map((page) => {
        const active = page.href === "/lab/signature";

        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              active
                ? "border-[#00c957] bg-[#00EA64] text-black shadow-sm"
                : "border-[#d5ded8] bg-white text-[#26352c] hover:border-[#00c957] hover:bg-[#e0fbea] hover:text-[#008c45] dark:border-[#34443b] dark:bg-[#17231c] dark:text-[#dce9df] dark:hover:border-[#00EA64] dark:hover:bg-[#193b27] dark:hover:text-[#00EA64]"
            }`}
          >
            {page.label}
          </Link>
        );
      })}

      <span className="ml-auto hidden font-mono text-[0.65rem] tracking-wider text-[#718078] sm:block dark:text-[#82988a]">
        CYBERLEX / FORENSICS
      </span>
    </nav>
  );
}

/* ---------------------------------------------------------
   SECTION LABEL
--------------------------------------------------------- */

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-xs font-bold text-[#00a94b] dark:text-[#00EA64]">
        {number}
      </span>

      <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#465b4d] dark:text-[#a8bcad]">
        {children}
      </span>

      <div className="h-px flex-1 bg-[#d5ded8] dark:bg-[#34443b]" />
    </div>
  );
}

/* ---------------------------------------------------------
   INFORMATION CARD
--------------------------------------------------------- */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#d5ded8] px-4 py-4 sm:border-b-0 sm:border-r dark:border-[#34443b]">
      <p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-wider text-[#63756a] dark:text-[#9aafa0]">
        {label}
      </p>

      <p className="text-sm font-bold tracking-wide text-[#14251a] dark:text-[#e4f0e7]">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   PAGE
--------------------------------------------------------- */

export default function SignatureCheckPage() {
  const [sel, setSel] = useState(0);

  // File index -> true means extension is genuine.
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = "Signature check — CyberLex";
  }, []);

  const total = SIGS.length;
  const s = SIGS[sel];

  const answered = Object.keys(answers).length;

  const correct = SIGS.filter(
    (file, index) =>
      answers[index] !== undefined &&
      answers[index] === file.ok
  ).length;

  const claim = answers[sel];

  const isAnswered = claim !== undefined;
  const isRight = isAnswered && claim === s.ok;

  const answer = (genuine: boolean) => {
    setAnswers((previous) =>
      previous[sel] !== undefined
        ? previous
        : { ...previous, [sel]: genuine }
    );
  };

  const reset = () => {
    setAnswers({});
    setSel(0);
  };

  const dumpHead =
    "Offset  " + "Hex".padEnd(s.hex.length + 2) + "ASCII";

  const dumpRow =
    "000000  " + s.hex + "  " + s.asc;

  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-7 sm:px-8">

      {/* -------------------------------------------------
          NAVIGATION
      ------------------------------------------------- */}

      <ChallengeNavigation />

      {/* -------------------------------------------------
          PAGE HEADER
      ------------------------------------------------- */}

      <header className="mb-9 mt-8">

        <div className="mb-4 flex flex-wrap items-center gap-2">

          <span className="rounded-sm bg-[#d9fbe6] px-2 py-1 font-mono text-[0.68rem] font-bold tracking-wider text-[#00883e] dark:bg-[#103c25] dark:text-[#00EA64]">
            DIGITAL FORENSICS
          </span>

          <span className="text-[#a0aea5]">/</span>

          <span className="font-mono text-[0.68rem] font-semibold tracking-wider text-[#64756a] dark:text-[#9aafa0]">
            CHALLENGE 03
          </span>

        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <h1 className="border-l-[5px] border-[#00EA64] pl-4 font-serif text-3xl font-bold tracking-tight text-[#111c15] sm:text-4xl dark:text-white">
              Signature check
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52645a] sm:text-base dark:text-[#a8b9ad]">
              Investigate seized files by examining their magic
              numbers. Identify disguised file extensions and
              determine whether the file type can be trusted.
            </p>

          </div>

          <div className="flex items-center gap-2">

            <span className="inline-flex items-center gap-2 rounded-md border border-[#00bd55] bg-[#dcfce7] px-3 py-2 font-mono text-xs font-semibold text-[#00883e] dark:bg-[#103c25] dark:text-[#00EA64]">
              <span className="h-2 w-2 rounded-full bg-[#00EA64]" />
              EASY
            </span>

            <span className="rounded-md border border-[#d5ded8] px-3 py-2 font-mono text-xs font-semibold text-[#52645a] dark:border-[#34443b] dark:text-[#c3d2c7]">
              40 XP
            </span>

          </div>

        </div>

        {/* INFORMATION STRIP */}

        <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-lg border border-[#d5ded8] bg-white sm:grid-cols-4 dark:border-[#34443b] dark:bg-[#142019]">

          <StatCard
            label="TECHNIQUE"
            value="Magic numbers"
          />

          <StatCard
            label="SEIZED FILES"
            value={`${total} FILES`}
          />

          <StatCard
            label="METHOD"
            value="HEADER ANALYSIS"
          />

          <div className="px-4 py-4">
            <p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-wider text-[#63756a] dark:text-[#9aafa0]">
              PROGRESS
            </p>

            <p className="text-sm font-bold text-[#14251a] dark:text-[#e4f0e7]">
              {answered}/{total} CHECKED
            </p>
          </div>

        </div>

      </header>

      {/* -------------------------------------------------
          MAIN CONTENT
      ------------------------------------------------- */}

      <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr]">

        {/* LEFT: CHALLENGE */}

        <section className="min-w-0">

          <SectionLabel number="01">
            THE CHALLENGE
          </SectionLabel>

          <div className="rounded-lg border border-[#d5ded8] bg-white p-5 sm:p-6 dark:border-[#34443b] dark:bg-[#142019]">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d9fbe6] font-mono text-lg font-bold text-[#00883e] dark:bg-[#103c25] dark:text-[#00EA64]">
                #
              </div>

              <div>
                <h2 className="text-base font-bold text-[#17251b] dark:text-white">
                  Can you trust the file?
                </h2>

                <p className="mt-1 text-xs text-[#65776b] dark:text-[#9aafa0]">
                  Digital evidence investigation
                </p>
              </div>

            </div>

            <div className="space-y-4 text-sm leading-7 text-[#52645a] dark:text-[#b3c2b7]">

              <p>
                A file extension is simply a label assigned to a
                file. The actual file type is identified by its
                internal signature, also called a magic number.
              </p>

              <p>
                Renaming an image to a .docx extension does not
                change its actual format. A forensic investigator
                can inspect the first few bytes of the file to
                identify its real type.
              </p>

              <p>
                Your task is to examine all {total} seized files,
                inspect their first sixteen bytes and decide
                whether each extension is genuine or spoofed.
              </p>

            </div>

            {/* IMPORTANT CONCEPT */}

            <div className="mt-6">

              <h3 className="mb-3 text-sm font-bold text-[#17251b] dark:text-white">
                Common file signatures
              </h3>

              <div className="overflow-x-auto rounded-md border border-[#d5ded8] dark:border-[#34443b]">

                <table className="w-full border-collapse text-left text-[0.76rem]">

                  <thead>
                    <tr className="bg-[#edf2ee] dark:bg-[#202e25]">

                      {["BYTES", "ASCII", "FILE TYPE"].map((heading) => (
                        <th
                          key={heading}
                          className="border-b border-r border-[#d5ded8] px-2 py-3 font-mono text-[0.65rem] font-bold tracking-wider text-[#465b4d] last:border-r-0 dark:border-[#34443b] dark:text-[#b4c6b8]"
                        >
                          {heading}
                        </th>
                      ))}

                    </tr>
                  </thead>

                  <tbody>

                    {REFERENCE.map((item) => (

                      <tr
                        key={item.bytes}
                        className="transition-colors hover:bg-[#e0fbea] dark:hover:bg-[#193b27]"
                      >

                        <td className="border-b border-r border-[#d5ded8] px-2 py-2.5 font-mono text-[#087b3d] dark:border-[#34443b] dark:text-[#00EA64]">
                          {item.bytes}
                        </td>

                        <td className="border-b border-r border-[#d5ded8] px-2 py-2.5 font-mono text-[#26382c] dark:border-[#34443b] dark:text-[#d9e8dd]">
                          {item.ascii}
                        </td>

                        <td className="border-b border-[#d5ded8] px-2 py-2.5 text-[#52645a] dark:border-[#34443b] dark:text-[#b3c2b7]">
                          {item.type}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="mt-6">

              <Callout tone="law">
                <b>Cross-examination.</b> &ldquo;Did your forensic tool
                identify this file by its extension or by its
                header signature, and is that distinction recorded
                in your report?&rdquo;
              </Callout>

            </div>

          </div>

        </section>

        {/* RIGHT: INTERACTIVE WORKSPACE */}

        <section className="min-w-0">

          <SectionLabel number="02">
            INTERACTIVE WORKSPACE
          </SectionLabel>

          <div className="overflow-hidden rounded-lg border border-[#263b2e] bg-[#0b1510] text-[#e5f2e8] shadow-[0_12px_35px_rgba(0,0,0,0.12)]">

            {/* TERMINAL HEADER */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263b2e] bg-[#111e16] px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#063d20] font-mono text-lg font-bold text-[#00EA64]">
                  &gt;_
                </div>

                <div>

                  <h2 className="text-sm font-bold text-white">
                    File signature inspector
                  </h2>

                  <p className="mt-1 font-mono text-[0.63rem] tracking-wider text-[#779282]">
                    EXHIBIT 003 / MAGIC NUMBER ANALYSIS
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="rounded-full border border-[#17613a] bg-[#092b19] px-3 py-1 font-mono text-[0.63rem] text-[#00EA64]">
                  ● ENGINE READY
                </span>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-md border border-[#344b3a] bg-[#18271d] px-3 py-2 text-xs font-semibold text-[#d9e8dd] transition-all hover:border-[#00EA64] hover:bg-[#193b27] hover:text-[#00EA64]"
                >
                  ↺ Reset
                </button>

              </div>

            </div>

            <div className="space-y-5 p-4 sm:p-5">

              {/* FILE LIST */}

              <div>

                <div className="mb-3 flex items-center justify-between">

                  <span className="font-mono text-[0.68rem] font-bold tracking-wider text-[#a8c1af]">
                    SEIZED FILES
                  </span>

                  <span className="font-mono text-[0.65rem] text-[#718c79]">
                    {answered}/{total} ANALYSED
                  </span>

                </div>

                <ul className="grid gap-2">

                  {SIGS.map((file, index) => {

                    const a = answers[index];
                    const done = a !== undefined;
                    const right = done && a === file.ok;
                    const active = index === sel;

                    return (

                      <li key={file.n}>

                        <button
                          type="button"
                          onClick={() => setSel(index)}
                          aria-current={active ? "true" : undefined}
                          className={`group flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition-all duration-200 ${
                            active
                              ? "border-[#00EA64] bg-[#103b22] shadow-[0_0_12px_rgba(0,234,100,0.08)]"
                              : "border-[#293b2e] bg-[#121e16] hover:border-[#00EA64] hover:bg-[#193b27]"
                          }`}
                        >

                          <span
                            className={`flex h-6 w-6 flex-none items-center justify-center rounded-sm border font-mono text-xs transition-colors ${
                              done && right
                                ? "border-[#00EA64] bg-[#00EA64] text-black"
                                : done
                                  ? "border-[#ef6262] bg-[#351d1d] text-[#ff7777]"
                                  : active
                                    ? "border-[#00EA64] text-[#00EA64]"
                                    : "border-[#405346] text-[#a4b6a9] group-hover:border-[#00EA64] group-hover:text-[#00EA64]"
                            }`}
                          >
                            {!done ? index + 1 : right ? "✓" : "✗"}
                          </span>

                          <span className={`min-w-0 flex-1 break-all font-mono text-sm transition-colors ${
                            active
                              ? "text-[#00EA64]"
                              : "text-[#dce9df] group-hover:text-[#00EA64]"
                          }`}>
                            {file.n}
                          </span>

                          <span className="font-mono text-[0.65rem] text-[#779282]">
                            {active ? "SELECTED" : done ? "CHECKED" : ""}
                          </span>

                        </button>

                      </li>

                    );

                  })}

                </ul>

              </div>

              {/* FILE HEADER DUMP */}

              <div>

                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                  <span className="font-mono text-[0.68rem] font-bold tracking-wider text-[#a8c1af]">
                    FILE HEADER
                  </span>

                  <span className="font-mono text-[0.65rem] text-[#00EA64]">
                    {s.n}
                  </span>

                </div>

                <div className="overflow-hidden rounded-md border border-[#304438] bg-[#0e1912]">

                  <div className="flex items-center gap-1.5 border-b border-[#263b2e] bg-[#17241b] px-3 py-2">

                    <span className="h-2 w-2 rounded-full bg-[#ff6259]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd44]" />
                    <span className="h-2 w-2 rounded-full bg-[#00ca62]" />

                    <span className="ml-2 font-mono text-[0.65rem] text-[#779282]">
                      {s.n}
                    </span>

                  </div>

                  <div className="overflow-x-auto p-4">

                    <pre
                      className="min-w-max font-mono text-[0.76rem] leading-7 text-[#d9e9dc]"
                      aria-label={`First sixteen bytes of ${s.n}`}
                    >
                      <span className="text-[#779282]">
                        {dumpHead}
                      </span>

                      {"\n"}

                      <span className="text-[#779282]">
                        000000
                      </span>

                      {"  "}

                      <span className="text-[#00EA64]">
                        {s.hex}
                      </span>

                      {"  "}

                      <span className="text-[#d9e9dc]">
                        {s.asc}
                      </span>

                    </pre>

                  </div>

                </div>

              </div>

              {/* ANSWER AREA */}

              <div>

                <p className="mb-3 font-mono text-[0.68rem] font-bold tracking-wider text-[#a8c1af]">
                  INVESTIGATOR DECISION
                </p>

                <p className="mb-4 text-sm leading-6 text-[#d5e2d8]">
                  Does the extension match what the header says?
                </p>

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => answer(true)}
                    className={`rounded-md border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                      isAnswered && s.ok
                        ? "border-[#00EA64] bg-[#103b22] text-[#00EA64]"
                        : "border-[#344b3a] bg-[#18271d] text-[#dce9df] hover:border-[#00EA64] hover:bg-[#103b22] hover:text-[#00EA64] hover:shadow-[0_0_12px_rgba(0,234,100,0.12)]"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    ✓ Extension is genuine
                  </button>

                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => answer(false)}
                    className={`rounded-md border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                      isAnswered && !s.ok
                        ? "border-[#ff6262] bg-[#351d1d] text-[#ff7777]"
                        : "border-[#344b3a] bg-[#18271d] text-[#dce9df] hover:border-[#ff7777] hover:bg-[#351d1d] hover:text-[#ff7777]"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    ✕ Extension is spoofed
                  </button>

                </div>

              </div>

              {/* FEEDBACK */}

              <div role="status" aria-live="polite">

                {isAnswered && (

                  <div className={`rounded-md border p-4 ${
                    isRight
                      ? "border-[#176c3a] bg-[#10351e]"
                      : "border-[#713535] bg-[#301b1b]"
                  }`}>

                    <div className="flex items-center gap-2">

                      <span className={`text-lg font-bold ${
                        isRight ? "text-[#00EA64]" : "text-[#ff7777]"
                      }`}>
                        {isRight ? "✓" : "✕"}
                      </span>

                      <p className={`text-sm font-bold ${
                        isRight ? "text-[#00EA64]" : "text-[#ff7777]"
                      }`}>
                        {isRight
                          ? "Correct identification!"
                          : "Incorrect identification"}
                      </p>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#dce9df]">

                      {isRight
                        ? "Good investigation. You correctly identified the file signature."
                        : s.ok
                          ? "Careful! The file extension is genuine. The header matches the claimed file type."
                          : "The extension is spoofed. The internal header reveals a different file type."}

                    </p>

                    <div className="mt-3 border-t border-[#45634d] pt-3">

                      <p className="font-mono text-xs text-[#00EA64]">
                        ACTUAL FILE TYPE: {s.v}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#b5c8ba]">
                        {s.e}
                      </p>

                    </div>

                  </div>

                )}

              </div>

              {/* NEXT FILE */}

              {isAnswered && sel < total - 1 && (

                <button
                  type="button"
                  onClick={() => setSel(sel + 1)}
                  className={`${PRIMARY} w-full`}
                >
                  Next file →
                </button>

              )}

              {isAnswered && sel === total - 1 && (

                <div className="rounded-md border border-[#176c3a] bg-[#10351e] p-3 text-center">

                  <p className="text-sm font-semibold text-[#00EA64]">
                    All files have been examined.
                  </p>

                  <p className="mt-1 text-xs text-[#b5c8ba]">
                    Check your final investigation results below.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

      </div>

      {/* -------------------------------------------------
          RESULTS SECTION
      ------------------------------------------------- */}

      <section className="mt-10">

        <SectionLabel number="03">
          INVESTIGATION RESULTS
        </SectionLabel>

        <div className="rounded-lg border border-[#d5ded8] bg-white p-5 sm:p-6 dark:border-[#34443b] dark:bg-[#142019]">

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

            <div>

              <h2 className="text-base font-bold text-[#17251b] dark:text-white">
                Investigation progress
              </h2>

              <p className="mt-1 text-xs text-[#65776b] dark:text-[#9aafa0]">
                Track your file verification accuracy.
              </p>

            </div>

            <span className="font-mono text-sm font-bold text-[#00883e] dark:text-[#00EA64]">
              {correct}/{total} CORRECT
            </span>

          </div>

          {/* PROGRESS BAR */}

          <div
            className="h-2 overflow-hidden rounded-full bg-[#e3ebe5] dark:bg-[#263b2e]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={answered}
            aria-label="Files analysed"
          >

            <div
              className="h-full rounded-full bg-[#00EA64] transition-all duration-500"
              style={{
                width: `${(answered / total) * 100}%`,
              }}
            />

          </div>

          <div className="mt-3 flex justify-between font-mono text-[0.65rem] text-[#718078] dark:text-[#9aafa0]">

            <span>{answered} FILES ANALYSED</span>

            <span>{total - answered} REMAINING</span>

          </div>

          <div role="status" aria-live="polite" className="mt-5">

            {answered < total ? (

              <div className="rounded-md border border-[#d5ded8] bg-[#f4f7f4] p-4 dark:border-[#34443b] dark:bg-[#1a2920]">

                <p className="text-sm font-semibold text-[#26382c] dark:text-[#dce9df]">
                  Investigation in progress
                </p>

                <p className="mt-1 text-sm text-[#65776b] dark:text-[#9aafa0]">
                  Analyse all {total} seized files to reveal your
                  final score. You have correctly identified {correct} so far.
                </p>

              </div>

            ) : (

              <div className={`rounded-md border p-4 ${
                correct === total
                  ? "border-[#00bd55] bg-[#dcfce7] dark:border-[#176c3a] dark:bg-[#10351e]"
                  : "border-[#d5ded8] bg-[#f4f7f4] dark:border-[#34443b] dark:bg-[#1a2920]"
              }`}>

                <p className={`text-lg font-bold ${
                  correct === total
                    ? "text-[#00883e] dark:text-[#00EA64]"
                    : "text-[#17251b] dark:text-white"
                }`}>
                  {correct === total
                    ? "✓ Investigation completed successfully!"
                    : "Investigation completed"}
                </p>

                <p className="mt-2 text-sm text-[#52645a] dark:text-[#b3c2b7]">
                  You correctly identified {correct} out of {total} files.
                </p>

                <p className="mt-2 font-mono text-sm font-bold text-[#00883e] dark:text-[#00EA64]">
                  FINAL SCORE: {correct}/{total}
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className={`${PRIMARY} mt-4`}
                >
                  ↺ Try again
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* -------------------------------------------------
          FOOTER
      ------------------------------------------------- */}

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#d5ded8] pt-5 dark:border-[#34443b]">

        <span className="font-mono text-[0.65rem] tracking-wider text-[#718078] dark:text-[#9aafa0]">
          CYBERLEX · DIGITAL FORENSICS
        </span>

        <Link
          href="/lab/volatility"
          className="text-sm font-semibold text-[#26382c] transition-colors hover:text-[#00883e] dark:text-[#dce9df] dark:hover:text-[#00EA64]"
        >
          ← Previous challenge: Volatility
        </Link>

      </footer>

    </main>
  );
}
