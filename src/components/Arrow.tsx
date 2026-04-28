type ArrowProps = {
  size?: number;
  className?: string;
};

export function Arrow({ size = 10, className }: ArrowProps) {
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
      <path d="M3.5 8.5 L8.5 3.5" />
      <path d="M4.5 3.5 L8.5 3.5 L8.5 7.5" />
    </svg>
  );
}
