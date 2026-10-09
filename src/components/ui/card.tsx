import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface-raised p-6 shadow-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
