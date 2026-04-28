import { Sidebar } from "./components/Sidebar";
import { TopStrip } from "./components/TopStrip";
import { Hero } from "./components/Hero";
import { Project } from "./components/Project";
import { Footer } from "./components/Footer";
import { projects } from "./data/projects";

export default function App() {
  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="max-w-[1080px] px-16">
        <TopStrip />
        <Hero />
        <section>
          {projects.map((p, i) => (
            <Project key={p.slug} project={p} isFirst={i === 0} />
          ))}
        </section>
        <Footer />
      </main>
    </div>
  );
}
