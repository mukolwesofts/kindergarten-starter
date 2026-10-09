import { cn } from "@/lib/utils";

/**
 * A soft wave used between sections. The wave fills with `currentColor`,
 * so set a text colour on it (e.g. `text-soft`) and it follows the theme.
 */
export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full overflow-hidden leading-none", className)}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={cn("block h-10 w-full sm:h-14", flip && "-scale-y-100")}
        fill="currentColor"
      >
        <path d="M0,40 C240,80 480,0 720,24 C960,48 1200,64 1440,32 L1440,72 L0,72 Z" />
      </svg>
    </div>
  );
}
