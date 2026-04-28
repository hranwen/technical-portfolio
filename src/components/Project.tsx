import type { Project as ProjectType } from "../data/projects";
import { Pulse } from "./Pulse";

type ProjectProps = {
  project: ProjectType;
  isFirst?: boolean;
};

export function Project({ project, isFirst }: ProjectProps) {
  return (
    <article
      id={project.slug}
      className={`grid grid-cols-[64px_1fr] items-start gap-5 border-b border-hair py-9 transition-colors hover:bg-black/[0.02] ${
        isFirst ? "border-t" : ""
      }`}
    >
      <span className="pt-2 text-[13px] text-muted">{project.num}</span>

      <div className="flex flex-col gap-3.5">
        <div className="flex items-baseline gap-3.5 text-[24px] font-medium leading-[1.2] tracking-[-0.025em]">
          <span className="text-ink">{project.name}</span>
          <span className="-translate-y-1.5 mx-1.5 min-w-8 flex-1 border-b border-dotted border-leader" />
          <span className="text-[17px] font-normal text-muted">
            {project.year}
          </span>
          <span className="ml-1.5 inline-flex items-center gap-2 border-l border-soft pl-4 text-[13px] font-normal tracking-[0.02em] text-muted">
            {project.building && (
              <span className="text-ink">
                <Pulse size={16} />
              </span>
            )}
            {project.status}
          </span>
        </div>

        <p className="max-w-[720px] text-[15px] leading-[1.65] text-ink">
          {project.description}
        </p>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-7 text-[13px] text-muted">
          <span>{project.stack}</span>
          <div className="ml-auto flex gap-5">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className="border-b border-hair pb-px text-ink before:mr-1 before:text-muted before:content-['↗'] hover:border-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
