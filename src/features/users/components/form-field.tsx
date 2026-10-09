export function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display text-sm font-semibold text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  "min-h-11 rounded-xl border border-line bg-surface px-4 text-sm text-ink placeholder:text-muted";
