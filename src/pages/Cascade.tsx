"use no memo";

import { Link } from "react-router-dom";
import { Arrow } from "../components/Arrow";
import { Dot } from "../components/Dot";
import { Pulse } from "../components/Pulse";
import { ScrollArea } from "../components/ui/ScrollArea";

const LOOM_ID = "REPLACE_WITH_LOOM_ID";

const stack = [
  "next.js",
  "fastapi",
  "supabase",
  "anthropic",
  "etl",
  "data engineering",
];

export function Cascade() {
  return (
    <ScrollArea className="h-screen bg-paper text-ink">
      <main className="mx-auto max-w-270 px-4 sm:px-16">
        <CaseStudyTopNav />
        <Header />
        <Section kicker="// the problem">
          <p>
            <span className="text-muted">90%</span> of FINRA-registered
            broker-dealers in the U.S. are small-sized, with no dedicated data
            engineering team. Teams get caught up with inaccessible reports,
            making operational processes a nightmare — running risk analysis
            for traders, performing reconciliations, setting up automations.
            Cascade provides the power of a full data engineering team.
          </p>
        </Section>
        <Section kicker="// the approach">
          <p>
            Cascade replaces the data-engineering layer, not the analyst.
            Reports already live somewhere — on a firm's network drive (where
            vendors SFTP) or in a shared inbox (where vendors email PDFs). An
            on-prem agent watches the filesystem; a Resend inbound webhook
            captures email. ARQ workers parse and normalize each report into
            Postgres. On top sits{" "}
            <span className="text-muted">Cas</span>, an Anthropic-powered agent
            with a curated set of skills. Cas designs dashboards from natural
            language, writes SQL + Python email automations, and runs them on
            cron. Analysts ask questions; Cas writes the queries. The bet is
            that giving an agent constrained tools (typed SQL access, dashboard
            schema, email composition) outperforms giving it unconstrained code
            execution.
          </p>
        </Section>
        <Section kicker="// architecture">
          <ArchitectureDiagram />
          <p className="mt-8 text-[13px] leading-[1.65] text-muted sm:text-[14px]">
            Two layers. Ingestion turns vendor files into rows; platform serves
            them — via REST, via the agent, via scheduled email automations.
            The choice worth flagging: Cas reads Supabase directly through a
            typed SQL tool, not through the API. Going through FastAPI would
            force every agent query into a hand-written endpoint; the SQL tool
            gives the agent generality without unconstrained code execution.
            The constraint is that schema becomes the agent's contract — it has
            to be stable and self-explanatory.
          </p>
        </Section>
        <Section kicker="// hard parts">
          <HardPart title="Parsing without breaking">
            Every vendor's PDF is different and drifts over time. Parsers are
            vendor-specific modules under <code>app/parsers/</code>; the
            registry maps inbound files to the right parser by fingerprint. ARQ
            retries on failure with exponential backoff. Coverage tools (
            <code>line_coverage.py</code>, <code>span_checker.py</code>) catch
            silent drift before it reaches the dashboard — a column that moved
            three pixels right doesn't make it into Postgres as misaligned data.
            The cost: per-vendor parser maintenance. The win: predictable
            ingestion that doesn't require a person to babysit.
          </HardPart>
          <HardPart title="Tool design for the agent">
            Agent quality is more about tool design than model choice. Tools
            need to be granular enough to compose, typed enough to fail fast on
            wrong calls, and observable enough to debug what the model tried.
            Skills (<code>dashboard_design</code>,{" "}
            <code>email_automation</code>, <code>export_workflow</code>) are
            higher-level groupings — each ships a focused system prompt and a
            curated tool subset. The agent doesn't get the full toolbox at
            once; it gets the toolbox for the task it's currently doing. This
            cuts hallucination and keeps reasoning short.
          </HardPart>
          <HardPart title="Multi-tenancy from day one">
            Finance firms can't share infrastructure. Every query, parse, and
            agent action carries a <code>tenant_id</code>; ARQ tasks
            reconstruct client context from it; an RBAC service mediates
            access. Adding a new tenant is config, not code. Authentication
            uses Supabase auth with row-level security as a backstop, so a bug
            in the application layer can't accidentally cross-pollinate
            firms. This was scaffolded before the first paying customer —
            painful then, free once compounding starts.
          </HardPart>
        </Section>
        <Section kicker="// demo">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-hair">
            <iframe
              src={`https://www.loom.com/embed/${LOOM_ID}?hide_owner=true&hide_share=true&hide_title=true`}
              allowFullScreen
              className="h-full w-full"
              title="Cascade product demo"
            />
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Walkthrough of ingestion, dashboard creation via Cas, and a
            scheduled email automation.
          </p>
        </Section>
        <Footer />
      </main>
    </ScrollArea>
  );
}

function CaseStudyTopNav() {
  return (
    <div className="relative flex items-center py-4 text-[13px] text-muted sm:py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-ink hover:opacity-70"
      >
        <Arrow direction="left" size={12} />
        portfolio
      </Link>
      <AsymmetricRule />
    </div>
  );
}

function Header() {
  return (
    <section className="relative py-16 sm:py-24">
      <h1 className="text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.15] tracking-[-0.035em] text-ink">
        cascade
      </h1>
      <p className="mt-6 text-[16px] leading-[1.6] text-muted sm:text-[18px]">
        An AI data platform for finance firms. Currently in a paid design
        partnership with a broker-dealer.
      </p>

      <div className="mt-12">
        <div className="mb-3 text-[12px] uppercase tracking-[0.04em] text-muted">
          // stack
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-muted">
          {stack.map((tech, i) => (
            <span key={tech} className="inline-flex items-center gap-2">
              {i > 0 && <Dot size={4} className="text-soft" />}
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 text-[12px] uppercase tracking-[0.04em] text-muted">
          // status
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-muted">
          <span className="inline-flex items-center gap-2 text-ink">
            <Pulse size={12} />
            building
          </span>
          <Dot size={4} className="text-soft" />
          <span>est. since 02/09/2026</span>
        </div>
      </div>
      <AsymmetricRule />
    </section>
  );
}

type SectionProps = {
  kicker: string;
  children: React.ReactNode;
};

function Section({ kicker, children }: SectionProps) {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mb-6 text-[12px] uppercase tracking-[0.04em] text-muted">
        {kicker}
      </div>
      <div className="text-[15px] leading-[1.65] text-ink">{children}</div>
      <AsymmetricRule />
    </section>
  );
}

function AsymmetricRule() {
  return (
    <div
      className="absolute bottom-0 left-0 h-px w-2/3 bg-hair"
      aria-hidden
    />
  );
}

type HardPartProps = {
  title: string;
  children: React.ReactNode;
};

function HardPart({ title, children }: HardPartProps) {
  return (
    <div className="border-t border-hair py-6 first:border-t-0 first:pt-0 last:pb-0">
      <h3 className="mb-2 text-[15px] font-medium text-ink">{title}</h3>
      <p className="text-[15px] leading-[1.65] text-ink">{children}</p>
    </div>
  );
}

function Footer() {
  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-wrap items-center justify-between gap-4 text-[13px]">
        <a
          href="https://www.trycascade.ai/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-b border-hair pb-px text-ink hover:border-ink"
        >
          <Arrow size={12} className="text-muted" />
          visit
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted hover:text-ink"
        >
          <Arrow direction="left" size={12} />
          portfolio
        </Link>
      </div>
      <div className="h-16" />
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <ScrollArea className="w-full">
      <svg
        viewBox="0 0 800 820"
        className="h-auto w-full min-w-[640px]"
        fontFamily="Geist Mono, ui-monospace, monospace"
        aria-label="Cascade system architecture: ingestion layer feeds Supabase; platform layer serves the dashboard"
      >
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-soft)" />
          </marker>
          <marker
            id="arrowhead-start"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill="var(--color-soft)" />
          </marker>
        </defs>

        {/* Zone labels */}
        <text
          x="400"
          y="22"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="2"
          fill="var(--color-muted)"
        >
          INGESTION
        </text>
        <line
          x1="40"
          y1="34"
          x2="320"
          y2="34"
          stroke="var(--color-hair)"
          strokeWidth="1"
        />
        <line
          x1="480"
          y1="34"
          x2="760"
          y2="34"
          stroke="var(--color-hair)"
          strokeWidth="1"
        />

        {/* Ingestion sources */}
        <DiagramBox
          x={80}
          y={70}
          w={240}
          h={90}
          title="on-prem agent"
          subtitle="watches firm SMB / local dirs"
        />
        <DiagramBox
          x={480}
          y={70}
          w={240}
          h={90}
          title="resend inbound webhook"
          subtitle="vendor email"
        />

        {/* Arrows: sources → workers */}
        <DiagramArrow d="M 200 160 Q 200 200 360 230" />
        <DiagramArrow d="M 600 160 Q 600 200 440 230" />

        {/* ARQ workers */}
        <DiagramBox
          x={280}
          y={230}
          w={240}
          h={80}
          title="ARQ workers"
          subtitle="parse + extract"
        />

        {/* Arrow: workers → supabase */}
        <DiagramArrow d="M 400 310 L 400 360" />

        {/* Supabase */}
        <DiagramBox
          x={240}
          y={360}
          w={320}
          h={80}
          title="supabase / postgres"
          subtitle="multi-tenant, row-level security"
        />

        {/* Platform divider */}
        <text
          x="400"
          y="498"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="2"
          fill="var(--color-muted)"
        >
          PLATFORM
        </text>
        <line
          x1="40"
          y1="510"
          x2="320"
          y2="510"
          stroke="var(--color-hair)"
          strokeWidth="1"
        />
        <line
          x1="480"
          y1="510"
          x2="760"
          y2="510"
          stroke="var(--color-hair)"
          strokeWidth="1"
        />

        {/* Platform services */}
        <DiagramBox
          x={60}
          y={550}
          w={200}
          h={100}
          title="fastapi"
          subtitle="REST"
        />
        <DiagramBox
          x={300}
          y={550}
          w={200}
          h={100}
          title="cas (agent)"
          subtitle="anthropic + skills + tools"
        />
        <DiagramBox
          x={540}
          y={550}
          w={200}
          h={100}
          title="ARQ cron"
          subtitle="email automations"
        />

        {/* Arrows: supabase ↔ platform */}
        <DiagramArrow d="M 280 440 Q 200 480 160 550" bidirectional />
        <DiagramArrow d="M 400 440 L 400 550" bidirectional />
        <DiagramArrow d="M 520 440 Q 600 480 640 550" bidirectional />

        {/* Arrow: fastapi → next.js */}
        <DiagramArrow d="M 160 650 Q 160 700 380 730" />

        {/* Next.js dashboard */}
        <DiagramBox
          x={260}
          y={730}
          w={280}
          h={70}
          title="next.js dashboard"
        />
      </svg>
    </ScrollArea>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
};

function DiagramBox({ x, y, w, h, title, subtitle }: BoxProps) {
  const cx = x + w / 2;
  const titleY = subtitle ? y + h / 2 - 4 : y + h / 2 + 4;
  const subtitleY = y + h / 2 + 16;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="var(--color-paper)"
        stroke="var(--color-hair)"
        strokeWidth="1"
      />
      <text
        x={cx}
        y={titleY}
        textAnchor="middle"
        fontSize="14"
        fill="var(--color-ink)"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={cx}
          y={subtitleY}
          textAnchor="middle"
          fontSize="11"
          fill="var(--color-muted)"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

type ArrowSvgProps = {
  d: string;
  bidirectional?: boolean;
};

function DiagramArrow({ d, bidirectional }: ArrowSvgProps) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-soft)"
      strokeWidth="1"
      markerEnd="url(#arrowhead)"
      markerStart={bidirectional ? "url(#arrowhead-start)" : undefined}
    />
  );
}
