import { cn } from "@/lib/utils";

/**
 * Decorative blob-shaped frame for hero/feature imagery.
 * The blob shape itself comes from the `--radius-blob` token.
 */
export function BlobFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-blob bg-soft p-3 shadow-soft", className)}>
      <div className="rounded-blob bg-surface-raised p-2">{children}</div>
    </div>
  );
}
