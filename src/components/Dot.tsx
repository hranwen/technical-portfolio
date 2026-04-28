type DotProps = {
  size?: number;
  className?: string;
};

export function Dot({ size = 3, className }: DotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 4 4"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="2" cy="2" r="1.5" />
    </svg>
  );
}
