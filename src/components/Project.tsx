"use no memo";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { Project as ProjectType } from "../data/projects";
import { Pulse } from "./Pulse";
import { Dot } from "./Dot";
import { Arrow } from "./Arrow";

type ProjectProps = {
  project: ProjectType;
  index: number;
};

const BASE_DELAY = 0.3;
const STAGGER = 0.08;

export function Project({ project, index }: ProjectProps) {
  return (
    <motion.article
      id={project.slug}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: BASE_DELAY + index * STAGGER,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="flex flex-col gap-4 border-b border-hair py-8 transition-colors hover:bg-black/2 sm:grid sm:grid-cols-[64px_1fr] sm:items-start sm:gap-6 sm:py-8"
    >
      <span className="text-[14px] text-muted sm:text-[24px]">
        {project.num}
      </span>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2 text-[20px] font-medium leading-[1.2] tracking-tight sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-[24px]">
          <span className="text-ink">{project.name}</span>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[14px] font-normal text-muted sm:ml-auto sm:text-[17px]">
              {project.year}
            </span>
            <div className="h-2 w-px bg-soft" />
            <span className="inline-flex items-center gap-2 text-[13px] font-normal tracking-[0.02em] text-muted">
              {project.building && (
                <span className="text-ink">
                  <Pulse size={16} />
                </span>
              )}
              {project.status}
            </span>
          </div>
        </div>

        <p className="max-w-180 text-[14px] leading-[1.6] text-ink sm:text-[15px] sm:leading-[1.65]">
          {project.description}
        </p>

        <div className="flex flex-wrap items-baseline gap-4 text-[13px] text-muted sm:gap-8">
          <span className="inline-flex flex-wrap items-center gap-x-2">
            {project.stack.map((tech, i) => (
              <Fragment key={tech}>
                {i > 0 && <Dot size={4} className="text-soft" />}
                <span>{tech}</span>
              </Fragment>
            ))}
          </span>
          {project.links.length > 0 && (
            <div className="ml-auto flex gap-4">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 border-b border-hair pb-px text-ink hover:border-ink"
                >
                  <Arrow size={12} className="text-muted" />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
