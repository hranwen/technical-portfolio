import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
  },
};

export function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative border-b border-hair py-28"
    >
      <motion.div
        variants={item}
        className="mb-10 flex gap-7 text-[13px] text-muted"
      >
        <span className="before:mr-1 before:text-soft before:content-['──']">
          engineer
        </span>
        <span className="before:mr-1 before:text-soft before:content-['──']">
          mit
        </span>
        <span className="before:mr-1 before:text-soft before:content-['──']">
          building
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="max-w-[880px] text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.15] tracking-[-0.035em] text-ink"
      >
        Engineer working at the seam between{" "}
        <span className="text-muted">AI</span> and{" "}
        <span className="text-muted">infrastructure</span>. Currently building{" "}
        <span className="relative inline-block">
          Cascade
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.6, 0, 0.2, 1] }}
            style={{ originX: 0 }}
            className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-ink"
          />
        </span>
        , a data platform for finance firms.
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-10 max-w-[680px] text-[17px] leading-[1.65] text-ink"
      >
        Eight projects below — research, products, hardware, and tools. Some
        live, some shelved, all on file.
      </motion.p>
    </motion.section>
  );
}
