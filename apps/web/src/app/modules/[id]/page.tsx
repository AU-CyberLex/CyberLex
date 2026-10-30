import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MODULES } from "@cyberlex/content";
import { Panel } from "@cyberlex/ui";
import { Quiz } from "@/components/Quiz";
import { VideoBlock } from "@/components/VideoBlock";
import { ModuleHero } from "@/components/ModuleHero";

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const m = MODULES.find((x) => x.id === params.id);
  if (!m) return {};
  return { title: m.title, description: m.blurb };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ModuleReader({ params }: { params: { id: string } }) {
  const idx = MODULES.findIndex((x) => x.id === params.id);
  if (idx < 0) notFound();
  const m = MODULES[idx];
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];

  // give every <h3> an anchor so the sidebar can jump to it
  const sections: { id: string; title: string }[] = [];
  const body = m.body.replace(/<h3>(.*?)<\/h3>/g, (_, t: string) => {
    const id = "s-" + slug(t);
    sections.push({ id, title: t });
    return `<h3 id="${id}">${t}</h3>`;
  });

  return (
    <div>
      <Link
        href="/modules"
        className="mb-4 inline-block font-mono text-[0.8rem] no-underline"
        style={{ color: "var(--muted)" }}
      >
        ← all modules
      </Link>
      <ModuleHero
        index={idx + 1}
        total={MODULES.length}
        id={m.id}
        tag={m.tag}
        title={m.title}
        blurb={m.blurb}
        drills={m.quiz.length}
      />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <details
            className="mb-6 rounded-lg border"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
          >
            <summary className="cursor-pointer select-none px-4 py-3 text-[0.9rem] font-semibold">
              <span className="mr-2 font-mono" style={{ color: "var(--accent-ink)" }}>▶</span>
              Watch the lesson
              <span className="ml-2 font-normal" style={{ color: "var(--muted)" }}>
                — {m.video}
              </span>
            </summary>
            <div className="p-4 pt-0">
              <VideoBlock key={m.id} moduleId={m.id} title={m.video} />
            </div>
          </details>

          <article
            className="prose-cyberlex rounded-lg border p-5 sm:p-7"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
            dangerouslySetInnerHTML={{ __html: body }}
          />

          <section id="drill" className="mt-10 scroll-mt-20">
            <div className="mb-3 flex items-baseline gap-3">
              <h3 className="text-xl font-bold tracking-tight">
                <span className="font-mono" style={{ color: "var(--accent-ink)" }}>&gt;_</span> Drill
              </h3>
              <span className="text-[0.85rem]" style={{ color: "var(--muted)" }}>
                Answer all {m.quiz.length} to complete the module and bank your points.
              </span>
            </div>
            <Panel>
              <Quiz key={m.id} moduleId={m.id} quiz={m.quiz} />
            </Panel>
          </section>

          <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Module navigation">
            {prev ? (
              <Link
                href={"/modules/" + prev.id}
                className="rounded-lg border p-4 no-underline transition-colors hover:border-[color:var(--accent)]"
                style={{ background: "var(--surface)", borderColor: "var(--rule)", color: "var(--text)" }}
              >
                <span className="font-mono text-[0.72rem]" style={{ color: "var(--muted)" }}>← PREVIOUS</span>
                <div className="mt-1 text-[0.92rem] font-semibold">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={"/modules/" + next.id}
                className="rounded-lg border p-4 text-right no-underline transition-colors hover:border-[color:var(--accent)]"
                style={{ background: "var(--surface)", borderColor: "var(--rule)", color: "var(--text)" }}
              >
                <span className="font-mono text-[0.72rem]" style={{ color: "var(--accent-ink)" }}>NEXT →</span>
                <div className="mt-1 text-[0.92rem] font-semibold">{next.title}</div>
              </Link>
            )}
          </nav>
        </div>

        <aside className="hidden lg:sticky lg:top-20 lg:block">
          <div
            className="rounded-lg border p-4"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
          >
            <div className="mb-2 font-mono text-[0.72rem] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              In this module
            </div>
            <ol className="grid gap-1 text-[0.85rem]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={"#" + s.id} className="flex gap-2 py-0.5 no-underline" style={{ color: "var(--text)" }}>
                    <span className="font-mono" style={{ color: "var(--accent-ink)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#drill" className="flex gap-2 py-0.5 font-semibold no-underline" style={{ color: "var(--accent-ink)" }}>
                  <span className="font-mono">&gt;_</span> Drill
                </a>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
