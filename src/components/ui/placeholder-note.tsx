import { showPlaceholderNotes } from "@/config/site";
import { Info } from "lucide-react";

/**
 * Small "confirm before publishing" helper shown next to placeholder
 * copy. Only rendered when NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTES=true.
 */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  if (!showPlaceholderNotes) return null;
  return (
    <p className="inline-flex items-start gap-1.5 text-xs text-muted">
      <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
