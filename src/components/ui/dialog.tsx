"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Minimal accessible dialog: Escape to close, focus trap-lite. */
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    panelRef.current
      ?.querySelector<HTMLElement>("input, select, button")
      ?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md rounded-card border border-line bg-surface p-6 shadow-lift"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
