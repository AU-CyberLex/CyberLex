"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/modules", label: "Modules" },
  { href: "/lab", label: "Forensics lab" },
  { href: "/sims", label: "Simulations" },
  { href: "/cases", label: "Case law" },
  { href: "/progress", label: "Progress" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { state, setState } = useStore();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-5 px-5 py-3">
        <Link href="/" className="mr-auto flex items-baseline gap-2 no-underline">
          <b className="font-serif text-[1.3rem] font-semibold tracking-tight">CyberLex</b>
          <span className="text-[0.72rem] uppercase tracking-[0.06em]" style={{ color: "var(--muted)" }}>
            Cyber law studio
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded border px-2.5 py-1.5 text-[0.86rem] no-underline"
              style={
                isActive(l.href)
                  ? {
                      color: "var(--text)",
                      background: "var(--surface-2)",
                      borderColor: "var(--rule)",
                      fontWeight: 500,
                    }
                  : { color: "var(--muted)", borderColor: "transparent" }
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() =>
            setState((s) => ({
              ...s,
              theme:
                s.theme === "dark" ||
                (!s.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "light"
                  : "dark",
            }))
          }
          className="rounded border px-2.5 py-1.5 text-[0.78rem]"
          style={{ borderColor: "var(--rule)", color: "var(--muted)" }}
          aria-label="Toggle theme"
        >
          {state.theme === "dark" ||
          (!state.theme &&
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "Light"
            : "Dark"}
        </button>
      </div>
    </header>
  );
}
