type ChevronProps = {
  size?: number;
  className?: string;
};

export function Chevron({ size = 10, className }: ChevronProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 4.5 L6 7.5 L9 4.5" />
    </svg>
  );
}
