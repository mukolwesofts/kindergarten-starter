import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export type PhotoShape = "blob" | "arch" | "rounded";

const shapes: Record<PhotoShape, string> = {
  blob: "rounded-blob",
  arch: "rounded-arch",
  rounded: "rounded-card",
};

/**
 * An obviously-labelled, dashed photo slot. Swap for a real image later
 * by replacing this component with next/image in the same frame.
 */
export function PhotoPlaceholder({
  shape = "rounded",
  label,
  className,
}: {
  shape?: PhotoShape;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        "flex aspect-[4/3] w-full flex-col items-center justify-center gap-3",
        "border-3 border-dashed border-line bg-soft p-6 text-center",
        shapes[shape],
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-8 text-brand" />
      <div>
        <p className="font-display text-sm font-semibold text-brand">
          Photo placeholder
        </p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
