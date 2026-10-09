import { whatsappUrl } from "@/config/site";
import { MessageCircle } from "lucide-react";

/**
 * Fixed WhatsApp link-out, bottom left. Pill with label on ≥640px,
 * icon-only circle below that. z-index sits above content (z-40 header)
 * and below modal layers.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-pill bg-whatsapp px-4 py-3 font-display text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:left-6"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
