import { cn } from "@/lib/utils";

export type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.from === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-brand text-surface"
            : "rounded-bl-md bg-soft text-ink",
        )}
      >
        {message.text}
      </p>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="Assistant is typing">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-soft px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
