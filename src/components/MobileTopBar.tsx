"use no memo";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { Pulse } from "./Pulse";
import { Chevron } from "./Chevron";

type Props = {
  activeSlug: string;
  className?: string;
};

export function MobileTopBar({ activeSlug, className }: Props) {
  const active =
    projects.find((p) => p.slug === activeSlug) ?? projects[0];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleNav = (slug: string) => {
    document
      .getElementById(slug)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-10 border-b border-hair bg-paper/90 backdrop-blur ${className ?? ""}`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[14px] font-semibold tracking-[-0.02em] text-ink">
          haoran wen
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-hair px-4 py-2 text-[12px] text-ink"
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <span className="text-[10px] text-soft">{active.num}</span>
            <span>{active.name}</span>
            {active.building && <Pulse size={10} />}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted"
            >
              <Chevron size={10} />
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 max-h-[calc(100vh-64px)] w-[200px] overflow-y-auto rounded-lg border border-hair bg-paper py-2 shadow-lg shadow-black/5"
                role="menu"
              >
                {projects.map((p) => {
                  const isActive = p.slug === activeSlug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => handleNav(p.slug)}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                      role="menuitem"
                    >
                      <span
                        className={`min-w-4 text-[11px] ${
                          isActive ? "text-ink" : "text-soft"
                        }`}
                      >
                        {p.num}
                      </span>
                      <span>{p.name}</span>
                      {isActive && p.building && (
                        <span className="ml-auto text-ink">
                          <Pulse size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="mt-2 flex flex-col gap-2 border-t border-hair px-4 pt-2 text-[11px] leading-relaxed text-muted">
                  <span>new york city, ny</span>
                  <a
                    href="mailto:hran.wen@gmail.com"
                    className="self-start border-b border-hair pb-px text-ink"
                  >
                    email
                  </a>
                  <a
                    href="https://github.com/haoranwen0"
                    target="_blank"
                    rel="noreferrer"
                    className="self-start border-b border-hair pb-px text-ink"
                  >
                    github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/haoran-wen/"
                    target="_blank"
                    rel="noreferrer"
                    className="self-start border-b border-hair pb-px text-ink"
                  >
                    linkedin
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
