import { IntegrityBench } from "@/components/lab/IntegrityBench";
import { VolatilityBench } from "@/components/lab/VolatilityBench";
import { SignatureBench } from "@/components/lab/SignatureBench";
import { CustodyBench } from "@/components/lab/CustodyBench";
import { CertificateBench } from "@/components/lab/CertificateBench";
import { ToolkitGrid } from "@/components/lab/ToolkitGrid";
import { SectionHeading } from "@/components/ui";

export default function LabPage() {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">Forensics lab</h2>
      <p className="mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
        Six workbenches covering the procedural ground a cyber law practitioner is expected to
        know. Each one ends with the cross-examination question it prepares you to ask.
      </p>

      <div className="mt-8">
        <SectionHeading title="1 · Integrity workbench" note="Hashing, SHA-256, tamper detection" />
        <IntegrityBench />
      </div>

      <div className="mt-8">
        <SectionHeading title="2 · Order of volatility" note="RFC 3227 · what to collect first" />
        <VolatilityBench />
      </div>

      <div className="mt-8">
        <SectionHeading title="3 · File signature inspector" note="Magic numbers vs. extensions" />
        <SignatureBench />
      </div>

      <div className="mt-8">
        <SectionHeading title="4 · Chain of custody builder" note="Seizure to production" />
        <CustodyBench />
      </div>

      <div className="mt-8">
        <SectionHeading title="5 · Certificate clinic" note="Section 63 BSA · admissible or not" />
        <CertificateBench />
      </div>

      <div className="mt-8">
        <SectionHeading title="6 · Toolkit reference" note="What each report can and cannot prove" />
        <p className="mb-4 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
          You are being trained to read and challenge forensic reports, not to operate the tools.
          For each one, learn the evidential claim it supports and the limit a competent opponent
          will press on.
        </p>
        <ToolkitGrid />
      </div>
    </div>
  );
}
