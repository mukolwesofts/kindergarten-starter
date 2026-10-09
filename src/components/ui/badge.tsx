import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-accent px-3 py-1",
        "font-display text-xs font-semibold text-on-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
