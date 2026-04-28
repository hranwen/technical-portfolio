type PulseProps = {
  size?: number;
  className?: string;
};

export function Pulse({ size = 16, className }: PulseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.4" fill="currentColor" />
      <circle
        cx="8"
        cy="8"
        r="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <animate
          attributeName="r"
          values="2.4;7"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
