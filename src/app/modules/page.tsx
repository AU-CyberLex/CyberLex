import Link from "next/link";
import { MODULES } from "@/data/modules";
import { ModuleGrid } from "@/components/ModuleGrid";

export default function ModulesPage() {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">Statutory modules</h2>
      <p className="mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
        Nine concepts, each anchored to the provision that actually gets charged. Open one to read
        the ingredients, watch the lesson, and sit the drill.
      </p>
      <ModuleGrid />
      <ProvisionTable />
    </div>
  );
}

function ProvisionTable() {
  const rows: [string, string, string, string][] = [
    ["43", "Damage to computer, unauthorised access, data theft", "Civil — compensation, adjudicating officer", "Not an offence"],
    ["65", "Tampering with computer source documents", "3 years / ₹2 lakh", "Cognizable, bailable"],
    ["66", "Section 43 acts done dishonestly or fraudulently", "3 years / ₹5 lakh", "Cognizable, bailable"],
    ["66C", "Identity theft — fraudulent use of another's e-signature, password, unique ID", "3 years + ₹1 lakh", "Cognizable, bailable"],
    ["66D", "Cheating by personation using a computer resource", "3 years + ₹1 lakh", "Cognizable, bailable"],
    ["66E", "Capturing or transmitting private area images without consent", "3 years / ₹2 lakh", "Cognizable, bailable"],
    ["66F", "Cyber terrorism", "Up to imprisonment for life", "Cognizable, non-bailable"],
    ["67 / 67A / 67B", "Obscene / sexually explicit / child sexual abuse material", "3 / 5 / 5 years, enhanced on repeat", "67A and 67B non-bailable"],
    ["69, 69A, 69B", "Interception and decryption, blocking, traffic data monitoring", "7 years for non-compliance", "Executive power"],
    ["72 / 72A", "Breach of confidentiality by an official / disclosure in breach of contract", "2 / 3 years", "72A cognizable"],
    ["79", "Intermediary exemption from liability", "Safe harbour, conditional", "Defence"],
  ];
  return (
    <div className="mt-12">
      <div className="mb-5 flex items-baseline gap-4">
        <h2 className="flex-none font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">
          Where each module sits in the Act
        </h2>
        <span className="h-px flex-1" style={{ background: "var(--rule)" }} />
      </div>
      <div className="overflow-x-auto rounded border" style={{ borderColor: "var(--rule)" }}>
        <table className="w-full border-collapse text-[0.85rem]">
          <thead>
            <tr style={{ background: "var(--surface-2)" }}>
              <th className="border p-2 text-left" style={{ borderColor: "var(--rule)" }}>Provision</th>
              <th className="border p-2 text-left" style={{ borderColor: "var(--rule)" }}>Offence or subject</th>
              <th className="border p-2 text-left" style={{ borderColor: "var(--rule)" }}>Punishment</th>
              <th className="border p-2 text-left" style={{ borderColor: "var(--rule)" }}>Nature</th>
            </tr>
          </thead>
          <tbody style={{ background: "var(--surface)" }}>
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className="border p-2 font-mono" style={{ borderColor: "var(--rule)" }}>{r[0]}</td>
                <td className="border p-2" style={{ borderColor: "var(--rule)" }}>{r[1]}</td>
                <td className="border p-2" style={{ borderColor: "var(--rule)" }}>{r[2]}</td>
                <td className="border p-2" style={{ borderColor: "var(--rule)" }}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/" className="underline">Back home</Link>
      </p>
    </div>
  );
}
