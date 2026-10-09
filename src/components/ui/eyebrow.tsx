import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-soft px-4 py-1.5",
        "font-display text-xs font-semibold uppercase tracking-widest text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}
