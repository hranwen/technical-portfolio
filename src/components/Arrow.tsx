type ArrowProps = {
  size?: number;
  className?: string;
  direction?: "ne" | "left";
};

export function Arrow({ size = 10, className, direction = "ne" }: ArrowProps) {
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
      {direction === "left" ? (
        <>
          <path d="M9 6 L3 6" />
          <path d="M6 3 L3 6 L6 9" />
        </>
      ) : (
        <>
          <path d="M3.5 8.5 L8.5 3.5" />
          <path d="M4.5 3.5 L8.5 3.5 L8.5 7.5" />
        </>
      )}
    </svg>
  );
}
