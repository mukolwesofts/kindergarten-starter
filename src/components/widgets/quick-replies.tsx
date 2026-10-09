import { chatbot } from "@/content/chatbot";

export function QuickReplies({
  onPick,
  disabled,
}: {
  onPick: (chip: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Quick replies">
      {chatbot.chips.map((chip) => (
        <button
          key={chip}
          type="button"
          disabled={disabled}
          onClick={() => onPick(chip)}
          className="min-h-11 rounded-pill border border-line bg-surface px-4 py-2 font-display text-xs font-medium text-ink transition hover:border-brand hover:text-brand disabled:opacity-50"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
