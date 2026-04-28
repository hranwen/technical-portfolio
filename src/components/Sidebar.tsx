import { projects } from "../data/projects";
import { Pulse } from "./Pulse";

type SidebarProps = {
  activeSlug: string;
  className?: string;
};

export function Sidebar({ activeSlug, className }: SidebarProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    document
      .getElementById(slug)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className={`h-screen flex-col gap-8 overflow-hidden border-r border-hair px-6 py-8 text-[14px] ${className ?? ""}`}
    >
      <div>
        <div className="text-[15px] font-semibold leading-tight tracking-[-0.02em] text-ink">
          haoran wen
        </div>
      </div>

      <div>
        <div className="mb-4 text-[12px] uppercase tracking-[0.04em] text-muted">
          // index
        </div>
        <nav className="flex flex-col gap-2">
          {projects.map((p) => {
            const active = p.slug === activeSlug;
            return (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                onClick={(e) => handleClick(e, p.slug)}
                className={`grid grid-cols-[26px_1fr_18px] items-center gap-2 py-2 text-[13px] transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`text-[12px] ${active ? "text-ink" : "text-soft"}`}
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
        new york city, ny
        <br />
        <a
          href="mailto:hran.wen@gmail.com"
          className="border-b border-hair pb-px text-ink hover:border-ink"
        >
          email
        </a>
        {" · "}
        <a
          href="https://github.com/haoranwen0"
          target="_blank"
          rel="noreferrer"
          className="border-b border-hair pb-px text-ink hover:border-ink"
        >
          github
        </a>
        {" · "}
        <a
          href="https://www.linkedin.com/in/haoran-wen/"
          target="_blank"
          rel="noreferrer"
          className="border-b border-hair pb-px text-ink hover:border-ink"
        >
          linkedin
        </a>
      </div>
    </aside>
  );
}
