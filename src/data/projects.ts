export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  num: string;
  slug: string;
  name: string;
  year: string;
  status: string;
  building?: boolean;
  description: string;
  stack: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    num: "01",
    slug: "cascade",
    name: "cascade",
    year: "2026",
    status: "building",
    building: true,
    description:
      "An AI data platform for finance firms. Cas, the agent inside, helps users build complex reconciliations, set up email automations, and work with their data without a data engineering team behind them.",
    stack: "next.js · python · postgres · langgraph",
    links: [
      { label: "visit", href: "#" },
      { label: "case study", href: "#" },
    ],
  },
  {
    num: "02",
    slug: "mohi",
    name: "mohi",
    year: "2025",
    status: "yc s25",
    description:
      "A low-latency Python SDK for AI agent observability. Decorator-driven capture of execution hierarchies — data and reasoning across agent pipelines, surfaced in real time.",
    stack: "python · async · opentelemetry",
    links: [
      { label: "company", href: "#" },
      { label: "docs", href: "#" },
    ],
  },
  {
    num: "03",
    slug: "ideator",
    name: "ideator",
    year: "2023",
    status: "live · 8k+ users",
    description:
      "An AI ideation tool used by teams at Accenture, Genpact, and other consulting firms. Three iterations from scratch — the latest became the basis of my MIT master's thesis.",
    stack: "next.js · gpt-4 · mit research",
    links: [
      { label: "ideator-beta.mit.edu", href: "https://ideator-beta.mit.edu/" },
      { label: "arxiv 2311.01937", href: "https://arxiv.org/abs/2311.01937" },
    ],
  },
  {
    num: "04",
    slug: "peasy",
    name: "peasy",
    year: "2023",
    status: "aws · 1k+ dl",
    description:
      "A VSCode extension for visualizing P-language error traces in distributed systems. Open-sourced JSON output upstream to the P repo. Featured at AWS re:Invent.",
    stack: "vscode · p-lang · aws · oss",
    links: [
      { label: "extension", href: "https://p-org.github.io/peasy-ide-vscode/" },
      { label: "re:invent", href: "#" },
    ],
  },
  {
    num: "05",
    slug: "augment-ui",
    name: "augment ui",
    year: "2024",
    status: "product hunt",
    description:
      "A platform for rapid frontend prototyping. Chat to create designs, prototype, and iterate.",
    stack: "next.js · llm · shadcn",
    links: [
      {
        label: "producthunt.com/augment-ui",
        href: "https://www.producthunt.com/products/augment-ui",
      },
    ],
  },
  {
    num: "06",
    slug: "orca",
    name: "orca",
    year: "2024",
    status: "github",
    description:
      "A RISC-V custom microcomputer with AES hardware acceleration in SystemVerilog. Built the AES core handling full encryption and decryption.",
    stack: "systemverilog · risc-v · aes · fpga",
    links: [{ label: "github / kosinw / orca", href: "https://github.com/kosinw/orca" }],
  },
  {
    num: "07",
    slug: "cci-web-builder",
    name: "cci web-builder",
    year: "2022",
    status: "arxiv",
    description:
      "Built when GPT-3 first dropped. An LLM-driven web builder that generated UI components from prompts and let users place them via drag-and-drop. Studied effectiveness across technical and non-technical builders.",
    stack: "gpt-3 · react · hci · mit cci",
    links: [{ label: "arxiv 2206.12390", href: "https://arxiv.org/abs/2206.12390" }],
  },
  {
    num: "08",
    slug: "ask-4-answers",
    name: "ask 4 answers",
    year: "2021",
    status: "archived",
    description:
      "A Q&A forum for universities. First foray into fullstack web development. Won Most Responsive UI and the MIT OpenLearning award.",
    stack: "react · node · mongo · mit weblab",
    links: [{ label: "weblab", href: "#" }],
  },
];
