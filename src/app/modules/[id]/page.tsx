import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES } from "@/data/modules";
import { Panel, SecTag } from "@/components/ui";
import { Quiz } from "@/components/Quiz";
import { VideoBlock } from "@/components/VideoBlock";

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

export default function ModuleReader({ params }: { params: { id: string } }) {
  const m = (MODULES as unknown as Array<{
    id: string; tag: string; title: string; video: string; body: string;
    quiz: Array<{ q: string; a: string[]; c: number; e: string }>;
  }>).find((x) => x.id === params.id);
  if (!m) notFound();
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/modules"
          className="rounded border px-2.5 py-1.5 text-sm no-underline"
          style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
        >
          All modules
        </Link>
        <SecTag>{m.tag}</SecTag>
      </div>
      <h2 className="max-w-[22ch] font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">
        {m.title}
      </h2>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <VideoBlock key={m.id} moduleId={m.id} title={m.video} />
          <div className="prose-cyberlex mt-6" dangerouslySetInnerHTML={{ __html: m.body }} />
        </div>
        <div className="space-y-5">
          <Panel>
            <h3 className="mb-1 font-serif text-lg font-medium">Drill</h3>
            <p className="mb-4 text-[0.85rem]" style={{ color: "var(--muted)" }}>
              Three applied questions. Answer all three to mark the module complete.
            </p>
            <Quiz key={m.id} moduleId={m.id} quiz={m.quiz} />
          </Panel>
          <Panel>
            <h3 className="mb-1 font-serif text-lg font-medium">Study note</h3>
            <p className="text-sm">
              Write the provision out by hand once, ingredient by ingredient, before you attempt
              the drill. Section-level recall is what separates a pass from a good answer in this
              subject.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
