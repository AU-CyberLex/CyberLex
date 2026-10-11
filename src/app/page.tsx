"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sha256Hex } from "@/lib/hash";
import { useStore } from "@/lib/store";
import { MODULES } from "@/data/modules";
import { Callout, Panel, SecTag, SectionHeading } from "@/components/ui";
import { EvidenceDemo } from "@/components/EvidenceDemo";

export default function HomePage() {
  const { state } = useStore();
  const doneCount = MODULES.filter((m) => state.done[m.id]).length;
  const pct = Math.round((doneCount / MODULES.length) * 100);

  return (
    <div className="space-y-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.02fr]">
        <div>
          <h1 className="mb-4 font-serif text-[clamp(2rem,5.2vw,3.15rem)] font-medium leading-[1.18]">
            Cyber law, taught the way it is litigated.
          </h1>
          <p className="mb-6 max-w-[52ch]" style={{ color: "var(--muted)" }}>
            Nine statutory modules, a working forensics lab, and three branching investigations —
            all built on Indian law: the IT Act 2000, the DPDP Act 2023, the Bharatiya Sakshya
            Adhiniyam 2023 and the BNSS 2023.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/modules"
              className="rounded border px-4 py-2 text-sm font-medium no-underline"
              style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
            >
              Start with the modules
            </Link>
            <Link
              href="/lab"
              className="rounded border px-4 py-2 text-sm no-underline"
              style={{
                borderColor: "var(--rule)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              Open the forensics lab
            </Link>
          </div>
          <div
            className="mt-7 flex flex-wrap gap-7 border-t pt-5"
            style={{ borderColor: "var(--rule)" }}
          >
            <div>
              <b className="block font-serif text-2xl font-semibold">9</b>
              <span className="text-[0.8rem]" style={{ color: "var(--muted)" }}>
                Statutory modules
              </span>
            </div>
            <div>
              <b className="block font-serif text-2xl font-semibold">6</b>
              <span className="text-[0.8rem]" style={{ color: "var(--muted)" }}>
                Forensic workbenches
              </span>
            </div>
            <div>
              <b className="block font-serif text-2xl font-semibold">3</b>
              <span className="text-[0.8rem]" style={{ color: "var(--muted)" }}>
                Branching investigations
              </span>
            </div>
            <div>
              <b className="block font-serif text-2xl font-semibold">12</b>
              <span className="text-[0.8rem]" style={{ color: "var(--muted)" }}>
                Landmark authorities
              </span>
            </div>
          </div>
        </div>
        <EvidenceDemo />
      </div>
      <HomeAbout pct={pct} />
    </div>
  );
}

function HomeAbout({ pct }: { pct: number }) {
  return (
    <section>
      <SectionHeading title="How the studio is built" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <Panel>
            <h3 className="mb-2 font-serif text-lg font-medium">
              Doctrine, then practice, then failure
            </h3>
            <p className="text-sm">
              Every module runs the same three beats. First the provision — its exact ingredients,
              punishment, and cognizability. Then a video lesson slot where your faculty recording
              sits. Then a drill where you apply it to facts that are deliberately ambiguous.
            </p>
          </Panel>
          <Panel>
            <h3 className="mb-2 font-serif text-lg font-medium">
              The forensics lab is not decoration
            </h3>
            <p className="text-sm">
              Lawyers lose electronic evidence cases on procedure, not on doctrine. The lab teaches
              the six procedural competencies a cyber law practitioner is expected to cross-examine
              on: hashing, volatility, file signatures, chain of custody, the section 63
              certificate, and the standard tools.
            </p>
          </Panel>
        </div>
        <div className="space-y-5">
          <Callout tone="law">
            <b>Jurisdiction.</b> This studio is built on Indian law. Where a provision has been
            renumbered by the 2023 criminal codes both numbers are shown, because examiners and
            reported judgments still use the old ones.
          </Callout>
          <Callout>
            <b>Verify the bare act.</b> Statutory text is amended and rules are notified
            constantly. Treat this studio as a teaching aid, never as a citable source.
          </Callout>
          <Panel>
            <h3 className="mb-2 font-serif text-lg font-medium">
              Your progress is saved on this device
            </h3>
            <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
              <i className="block h-full" style={{ width: pct + "%", background: "var(--forensic)" }} />
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              {pct}% complete
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
