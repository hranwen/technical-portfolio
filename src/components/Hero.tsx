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
      className="relative border-b border-hair py-16 sm:py-32"
    >
      <motion.div
        variants={item}
        className="mb-8 flex flex-wrap gap-4 text-[13px] text-muted sm:mb-12 sm:gap-8"
      >
        <span className="before:mr-2 before:text-soft before:content-['──']">
          new york
        </span>
        <span className="before:mr-2 before:text-soft before:content-['──']">
          mit '25
        </span>
        <span className="before:mr-2 before:text-soft before:content-['──']">
          founder
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="max-w-220 text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.15] tracking-[-0.035em] text-ink"
      >
        Working at the seam between{" "}
        <span className="text-muted">AI</span> and{" "}
        <span className="text-muted">infrastructure</span>. Currently building{" "}
        <span className="relative inline-block">
          Cascade
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.6, 0, 0.2, 1] }}
            style={{ originX: 0 }}
            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-ink"
          />
        </span>
        , a data platform for finance firms.
      </motion.h1>
    </motion.section>
  );
}
