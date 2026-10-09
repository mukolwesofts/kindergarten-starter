import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function IconTile({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl",
        "bg-soft text-brand",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
    </span>
  );
}
