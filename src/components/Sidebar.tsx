import { useState } from "react";
import { projects } from "../data/projects";
import { Pulse } from "./Pulse";

export function Sidebar() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);

  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-9 self-start border-r border-hair px-7 py-9 text-[14px]">
      <div>
        <div className="text-[15px] font-semibold leading-tight tracking-[-0.02em] text-ink">
          haoran wen
          <span className="mt-0.5 block text-[13px] font-normal text-muted">
            portfolio.2026
          </span>
        </div>
      </div>

      <div>
        <div className="mb-3 text-[12px] uppercase tracking-[0.04em] text-muted">
          // index
        </div>
        <nav className="flex flex-col gap-1">
          {projects.map((p) => {
            const active = p.slug === activeSlug;
            return (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                onClick={() => setActiveSlug(p.slug)}
                className={`grid grid-cols-[26px_1fr_18px] items-center gap-3 py-1.5 text-[13px] transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`text-[12px] ${active ? "text-ink" : "text-soft"} group-hover:text-ink`}
                >
                  {p.num}
                </span>
                <span>{p.name}</span>
                <span className="text-ink">
                  {active && p.building ? <Pulse size={14} /> : null}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto text-[12px] leading-relaxed text-muted">
        cambridge, ma
        <br />
        <a
          href="mailto:hran.wen@gmail.com"
          className="border-b border-hair pb-px text-ink hover:border-ink"
        >
          email
        </a>
        {" · "}
        <a href="#" className="border-b border-hair pb-px text-ink hover:border-ink">
          github
        </a>
        {" · "}
        <a href="#" className="border-b border-hair pb-px text-ink hover:border-ink">
          linkedin
        </a>
      </div>
    </aside>
  );
}
