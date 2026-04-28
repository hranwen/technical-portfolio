export function Footer() {
  return (
    <footer className="grid grid-cols-[64px_1fr_auto] items-baseline gap-5 py-14 pb-18 text-[13px] text-muted">
      <span />
      <span>haoran wen / 2026</span>
      <div className="flex gap-5">
        <a
          href="mailto:hran.wen@gmail.com"
          className="border-b border-hair pb-px text-ink hover:border-ink"
        >
          email
        </a>
        <a href="#" className="border-b border-hair pb-px text-ink hover:border-ink">
          github
        </a>
        <a href="#" className="border-b border-hair pb-px text-ink hover:border-ink">
          linkedin
        </a>
      </div>
    </footer>
  );
}
