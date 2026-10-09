"use client";

import { useEffect, useRef, useState } from "react";
import { chatbot } from "@/content/chatbot";
import { whatsappUrl } from "@/config/site";
import { site } from "@/config/site";
import { getReply } from "@/lib/chatbot";
import { ChatMessage, TypingIndicator, type Message } from "./chat-message";
import { QuickReplies } from "./quick-replies";
import { X, Send } from "lucide-react";

let nextId = 1;

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: chatbot.welcome },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus the input when the panel opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: nextId++, from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const reply = await getReply(trimmed);
    setMessages((m) => [...m, { id: nextId++, from: "bot", text: reply }]);
    setTyping(false);
    inputRef.current?.focus();
  }

  return (
    <div
      role="dialog"
      aria-label={`${site.shortName} demo chat`}
      className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col rounded-t-3xl border border-line bg-surface shadow-lift sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[360px] sm:rounded-3xl"
    >
      <div className="flex items-center gap-3 rounded-t-3xl bg-brand px-5 py-4 sm:rounded-t-3xl">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-surface">
            {site.name}
          </p>
        </div>
        <span className="rounded-pill bg-accent px-2.5 py-0.5 font-display text-[11px] font-semibold text-on-accent">
          Demo
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="grid size-9 place-items-center rounded-full text-surface hover:bg-surface/15"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex min-h-48 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      <div className="border-t border-line px-4 pt-3 pb-2">
        <QuickReplies onPick={send} disabled={typing} />
      </div>

      <form
        className="flex items-center gap-2 px-4 pb-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Type a message
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 rounded-pill border border-line bg-surface px-4 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          aria-label="Send message"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition hover:-translate-y-0.5 disabled:opacity-50 motion-reduce:hover:translate-y-0"
        >
          <Send aria-hidden="true" className="size-4" />
        </button>
      </form>

      <p className="px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-xs text-muted">
        {chatbot.footerNote}{" "}
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded text-brand underline underline-offset-2"
        >
          Open WhatsApp
        </a>
      </p>
    </div>
  );
}
