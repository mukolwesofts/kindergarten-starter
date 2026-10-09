"use client";

import { useEffect, useRef, useState } from "react";
import { ChatPanel } from "./chat-panel";
import { MessageCircle, X } from "lucide-react";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-lift transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:right-6"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="size-6" />
        )}
      </button>
    </>
  );
}
