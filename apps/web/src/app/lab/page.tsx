
import type { Metadata } from "next";
import Link from "next/link";

import { CustodyBench } from "@/components/lab/CustodyBench";
import { CertificateBench } from "@/components/lab/CertificateBench";
import { ToolkitGrid } from "@/components/lab/ToolkitGrid";
import { SectionHeading } from "@cyberlex/ui";

export const metadata: Metadata = {
  title: "Forensics lab",
  description:
    "Explore interactive digital forensics challenges covering evidence integrity, order of volatility, file signatures, chain of custody, certificates and forensic tools.",
};

const challenges = [
  {
    number: "01",
    title: "Integrity check",
    description:
      "Can you prove that digital evidence has remained unchanged since seizure? Use cryptographic hashing to detect tampering and verify the integrity of electronic records.",
    difficulty: "EASY",
    topics: ["SHA-256", "TAMPER DETECTION", "40 XP"],
    href: "/lab/integrity",
    action: "Start integrity challenge",
  },
  {
    number: "02",
    title: "Volatility check",
    description:
      "Identify the correct order in which digital evidence must be collected, starting with the most volatile data, before valuable information disappears.",
    difficulty: "MEDIUM",
    topics: ["RFC 3227", "EVIDENCE PRESERVATION", "40 XP"],
    href: "/lab/volatility",
    action: "Start volatility challenge",
  },
  {
    number: "03",
    title: "Signature check",
    description:
      "Investigate seized digital files by examining their magic numbers and file headers. Identify misleading extensions and detect concealed file types.",
    difficulty: "EASY",
    topics: ["MAGIC NUMBERS", "FILE SIGNATURES", "40 XP"],
    href: "/lab/signature",
    action: "Start signature challenge",
  },
];

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-7 sm:px-8">

      {/* Introduction */}
      <header className="mb-10">
        <div
          className="mb-3 font-mono text-[0.7rem] uppercase tracking-wider"
          style={{ color: "var(--accent-ink)" }}
        >
          DIGITAL FORENSICS
        </div>

        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Forensics lab
        </h1>

        <p
          className="mt-3 max-w-2xl text-sm leading-7 sm:text-base"
          style={{ color: "var(--muted)" }}
        >
          Step into the role of a digital forensic investigator.
          Explore real-world evidence handling scenarios, examine
          digital records and understand how forensic evidence is
          preserved, verified and presented in court.
        </p>

        <p
          className="mt-3 max-w-2xl text-sm leading-7"
          style={{ color: "var(--muted)" }}
        >
          Complete three interactive challenges covering evidence
          integrity, order of volatility and file signature
          verification. Each challenge tests your understanding
          of digital forensic procedures and the legal importance
          of preserving electronic evidence.
        </p>
      </header>

      {/* Statistics */}
      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            value: "03",
            label: "CHALLENGES",
            description: "Interactive forensic exercises",
          },
          {
            value: "01",
            label: "OBJECTIVE",
            description: "Understand digital evidence preservation",
          },
          {
            value: "40+",
            label: "SKILLS",
            description: "Practical forensic concepts",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="border p-5"
            style={{
              borderColor: "var(--rule)",
              background: "var(--surface)",
            }}
          >
            <p
              className="font-mono text-2xl font-bold"
              style={{ color: "var(--accent-ink)" }}
            >
              {item.value}
            </p>

            <p className="mt-1 font-mono text-xs font-semibold">
              {item.label}
            </p>

            <p
              className="mt-1 text-xs"
              style={{ color: "var(--muted)" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Three Interactive Challenges */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <h2
            className="font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            YOUR CHALLENGES
          </h2>

          <div
            className="h-px flex-1"
            style={{ background: "var(--rule)" }}
          />
        </div>

        <div className="space-y-5">
          {challenges.map((challenge) => (
            <article
              key={challenge.number}
              className="overflow-hidden border"
              style={{
                borderColor: "var(--rule)",
                background: "var(--surface)",
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: "var(--accent-ink)" }}
                  >
                    CHALLENGE {challenge.number} / 03
                  </span>

                  <span
                    className="border px-3 py-1 font-mono text-[0.7rem]"
                    style={{
                      borderColor: "var(--accent)",
                      color: "var(--accent-ink)",
                      background: "var(--accent-soft)",
                    }}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-semibold">
                  {challenge.title}
                </h2>

                <p
                  className="mt-3 max-w-2xl text-sm leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {challenge.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {challenge.topics.map((topic) => (
                    <span
                      key={topic}
                      className="border px-3 py-1.5 font-mono text-[0.65rem]"
                      style={{
                        borderColor: "var(--rule)",
                        color: "var(--muted)",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="flex justify-end border-t px-6 py-4 sm:px-8"
                style={{
                  borderColor: "var(--rule)",
                  background: "var(--surface-2)",
                }}
              >
                <Link
                  href={challenge.href}
                  className="inline-flex items-center justify-center border border-[#00EA64] bg-[#00EA64] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#00ce58]"
                >
                  {challenge.action} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Additional Forensic Modules */}
      <section className="mt-14">
        <div className="mb-3">
          <div
            className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider"
            style={{ color: "var(--accent-ink)" }}
          >
            ADDITIONAL LEARNING MODULES
          </div>

          <h2 className="mt-2 font-serif text-2xl font-semibold">
            Explore more forensic concepts
          </h2>

          <p
            className="mt-2 max-w-2xl text-sm leading-6"
            style={{ color: "var(--muted)" }}
          >
            Go beyond the interactive challenges and explore
            additional concepts involved in handling, authenticating
            and examining digital evidence.
          </p>
        </div>

        {/* 04. Chain of Custody */}
        <div className="mt-8">
          <SectionHeading
            title="4 · Chain of custody builder"
            note="Seizure to production"
          />
          <CustodyBench />
        </div>

        {/* 05. Certificate Clinic */}
        <div className="mt-8">
          <SectionHeading
            title="5 · Certificate clinic"
            note="Section 63 BSA · admissible or not"
          />
          <CertificateBench />
        </div>

        {/* 06. Toolkit Reference */}
        <div className="mt-8">
          <SectionHeading
            title="6 · Toolkit reference"
            note="What each report can and cannot prove"
          />

          <p
            className="mb-4 max-w-[66ch] text-sm leading-6"
            style={{ color: "var(--muted)" }}
          >
            Learn to read and challenge forensic reports rather
            than simply operate forensic tools. Understand the
            evidential claims each tool supports and the
            limitations that may arise during cross-examination.
          </p>

          <ToolkitGrid />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-5"
        style={{
          borderColor: "var(--rule)",
          color: "var(--muted)",
        }}
      >
        <span className="font-mono text-[0.68rem] uppercase tracking-wider">
          CYBERLEX · DIGITAL FORENSICS
        </span>

        <span className="font-mono text-[0.68rem]">
          03 CHALLENGES · 03 ADDITIONAL MODULES
        </span>
      </footer>
    </main>
  );
}
