"use no memo";

import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import { Sidebar } from "../components/Sidebar";
import { MobileTopBar } from "../components/MobileTopBar";
import { TopStrip } from "../components/TopStrip";
import { Hero } from "../components/Hero";
import { Project } from "../components/Project";
import { ScrollArea } from "../components/ui/ScrollArea";
import { projects } from "../data/projects";
import { useScrollSpy } from "../hooks/useScrollSpy";

const slugs = projects.map((p) => p.slug);

export function Home() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeSlug = useScrollSpy(slugs, viewportRef);

  return (
    <MotionConfig reducedMotion="never">
      <div className="flex h-screen flex-col overflow-hidden sm:grid sm:grid-cols-[280px_1fr]">
        <Sidebar activeSlug={activeSlug} className="hidden sm:flex" />
        <MobileTopBar activeSlug={activeSlug} className="sm:hidden" />
        <ScrollArea
          viewportRef={viewportRef}
          className="min-h-0 flex-1 sm:h-screen sm:flex-none"
        >
          <main className="max-w-270 px-4 sm:px-16">
            <TopStrip />
            <Hero />
            <section>
              {projects.map((p, i) => (
                <Project key={p.slug} project={p} index={i} />
              ))}
            </section>
            <div className="h-24" />
          </main>
        </ScrollArea>
      </div>
    </MotionConfig>
  );
}
