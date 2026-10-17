import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SIMS } from "@cyberlex/content";
import { SecTag } from "@cyberlex/ui";
import { SimRunner } from "@/components/SimRunner";

export function generateStaticParams() {
  return SIMS.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = SIMS.find((x) => x.id === params.id);
  if (!s) return {};
  return { title: s.title, description: s.blurb };
}

export default function SimPage({ params }: { params: { id: string } }) {
  const s = SIMS.find((x) => x.id === params.id);
  if (!s) notFound();
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/sims"
          className="rounded border px-2.5 py-1.5 text-sm no-underline"
          style={{ borderColor: "var(--rule)", background: "var(--surface)", color: "var(--text)" }}
        >
          All investigations
        </Link>
        <SecTag>{s.tag}</SecTag>
      </div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">{s.title}</h2>
      <p className="mb-6 mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
        {s.blurb}
      </p>
      <SimRunner key={s.id} simId={s.id} title={s.title} steps={s.steps} />
    </div>
  );
}
